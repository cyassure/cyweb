// Streams demo videos from the R2 bucket bound as VIDEOS. Served at
// /media/<key> (e.g. /media/videos/01-vulnerability-management.mp4), read-only.
// Supports HTTP Range requests so browsers can seek without downloading the
// whole file, and conditional requests so repeat views hit the cache.

const KEY_PATTERN = /^videos\/[A-Za-z0-9._-]+\.(mp4|webm|vtt|jpg|png)$/;

export async function handleMedia(request: Request, env: Env, url: URL): Promise<Response> {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method not allowed", { status: 405, headers: { Allow: "GET, HEAD" } });
  }

  const key = decodeURIComponent(url.pathname.slice("/media/".length));
  if (!KEY_PATTERN.test(key)) return new Response("Not found", { status: 404 });

  const object = await env.VIDEOS.get(key, {
    range: request.headers,
    onlyIf: request.headers,
  });
  if (object === null) return new Response("Not found", { status: 404 });

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("ETag", object.httpEtag);
  headers.set("Accept-Ranges", "bytes");
  headers.set("Cache-Control", "public, max-age=86400");

  // `onlyIf` matched an If-None-Match / If-Modified-Since: no body returned.
  if (!("body" in object)) return new Response(null, { status: 304, headers });

  const range = object.range as { offset?: number; length?: number; suffix?: number } | undefined;
  if (range && request.headers.has("Range")) {
    const size = object.size;
    const start = range.suffix !== undefined ? size - range.suffix : range.offset ?? 0;
    const length = range.suffix !== undefined ? range.suffix : range.length ?? size - start;
    headers.set("Content-Range", `bytes ${start}-${start + length - 1}/${size}`);
    headers.set("Content-Length", String(length));
    return new Response(request.method === "HEAD" ? null : object.body, { status: 206, headers });
  }

  headers.set("Content-Length", String(object.size));
  return new Response(request.method === "HEAD" ? null : object.body, { status: 200, headers });
}
