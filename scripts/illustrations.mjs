// Generates the flat cartoon illustrations in src/assets/illustrations/.
// Run: node scripts/illustrations.mjs
// Scenes are composed from a few figure builders (seated, standing, behind) in the
// CyWeb palette, so a new pose or person is a parameter change, not a new drawing.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "../src/assets/illustrations");

const C = {
  ink: "#07122a", navy: "#0d1d40", navy2: "#16295a", cobalt: "#2f4cf5", chair: "#33467a", shoe: "#1b2340",
  red: "#ff3b3b", pink: "#ff5c8a", orange: "#ff8c00", yellow: "#f5c518", sky: "#38bdf8", teal: "#2dd4bf",
  blue: "#4d9eff", violet: "#b06eff", green: "#00c8a0",
};
const SKIN = ["#f4cfa8", "#dca577", "#b07448", "#7c4a2b"];
const HAIR = ["#1c1a2e", "#5b3a22", "#c98b4b", "#30261f", "#8a8f9c"];

const svg = (inner, vb, label) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" role="img" aria-label="${label}" font-family="IBM Plex Sans, system-ui, sans-serif">${inner}</svg>\n`;
const g = (x, y, inner, flip = false) => `<g transform="translate(${x} ${y})${flip ? " scale(-1 1)" : ""}">${inner}</g>`;

// Seated, side view, facing +x. Origin = hip.
function seated({ skin, hair, shirt, pants, style = "short", headset, glasses, hood, arm = [[28, -26], [54, -32]] }) {
  let s = "";
  s += `<rect x="-34" y="-74" width="10" height="80" rx="5" fill="${C.chair}"/><rect x="-36" y="0" width="54" height="9" rx="4" fill="${C.chair}"/>`;
  s += `<rect x="-12" y="9" width="6" height="50" fill="${C.chair}"/><rect x="-34" y="57" width="52" height="6" rx="3" fill="${C.chair}"/>`;
  s += `<path d="M0 0 L44 0 L44 54" stroke="${pants}" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  s += `<path d="M42 59 L61 59" stroke="${C.shoe}" stroke-width="9" stroke-linecap="round"/>`;
  s += `<rect x="-17" y="-64" width="34" height="70" rx="15" fill="${shirt}"/>`;
  s += `<rect x="-17" y="-64" width="12" height="70" rx="6" fill="#000" opacity=".07"/>`;
  s += `<rect x="-2" y="-75" width="9" height="13" rx="3" fill="${skin}"/>`;
  if (style === "long") s += `<rect x="-17" y="-98" width="17" height="44" rx="8" fill="${hair}"/>`;
  if (hood) s += `<circle cx="0" cy="-88" r="22" fill="${hood}"/>`;
  s += `<circle cx="0" cy="-91" r="17" fill="${hood ? C.ink : hair}"/>`;
  if (style === "bun") s += `<circle cx="-14" cy="-105" r="7.5" fill="${hair}"/>`;
  s += `<circle cx="6" cy="-85" r="15" fill="${skin}"/>`;
  if (!hood) s += `<path d="M-8 -98 Q 6 -110 21 -94 Q 10 -100 -2 -92 Z" fill="${hair}"/>`;
  s += `<circle cx="1" cy="-84" r="3.6" fill="#000" opacity=".12"/><circle cx="15" cy="-87" r="1.9" fill="${C.ink}"/>`;
  s += `<path d="M14 -77 Q 17 -75 20 -78" stroke="${C.ink}" stroke-width="1.4" fill="none" stroke-linecap="round"/>`;
  if (glasses) s += `<rect x="11" y="-91" width="10" height="7" rx="2.5" fill="none" stroke="${C.ink}" stroke-width="1.6"/><path d="M11 -88 L2 -87" stroke="${C.ink}" stroke-width="1.4"/>`;
  if (headset) s += `<path d="M-9 -97 A 18 18 0 0 1 21 -99" stroke="${C.ink}" stroke-width="4" fill="none"/><rect x="-3" y="-92" width="9" height="13" rx="3.5" fill="${C.ink}"/><path d="M4 -80 Q 12 -70 21 -73" stroke="${C.ink}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
  const [a, b] = arm;
  s += `<path d="M2 -52 L${a[0]} ${a[1]} L${b[0]} ${b[1]}" stroke="${shirt}" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  s += `<circle cx="${b[0] + 3}" cy="${b[1]}" r="5.5" fill="${skin}"/>`;
  return s;
}

// Standing, facing the viewer. Origin = between the feet.
function standing({ skin, hair, shirt, pants, style = "short", pose = "down", glasses, tie }) {
  let s = "";
  if (style === "long") s += `<rect x="-20" y="-178" width="40" height="52" rx="15" fill="${hair}"/>`;
  s += `<rect x="-13" y="-74" width="11" height="72" rx="5" fill="${pants}"/><rect x="2" y="-74" width="11" height="72" rx="5" fill="${pants}"/>`;
  s += `<ellipse cx="-8" cy="0" rx="10" ry="5" fill="${C.shoe}"/><ellipse cx="8" cy="0" rx="10" ry="5" fill="${C.shoe}"/>`;
  s += `<rect x="-22" y="-144" width="44" height="80" rx="16" fill="${shirt}"/>`;
  if (tie) s += `<path d="M0 -140 L-4 -128 L0 -104 L4 -128 Z" fill="${tie}"/>`;
  s += `<rect x="-4.5" y="-155" width="9" height="13" rx="3" fill="${skin}"/>`;
  s += `<circle cx="0" cy="-167" r="18.5" fill="${hair}"/>`;
  if (style === "bun") s += `<circle cx="0" cy="-189" r="8" fill="${hair}"/>`;
  s += `<circle cx="0" cy="-160" r="16" fill="${skin}"/>`;
  s += `<path d="M-16 -164 Q -12 -182 4 -180 Q 16 -178 17 -164 Q 6 -174 -16 -164 Z" fill="${hair}"/>`;
  s += `<circle cx="-5.5" cy="-161" r="1.8" fill="${C.ink}"/><circle cx="5.5" cy="-161" r="1.8" fill="${C.ink}"/>`;
  s += `<path d="M-4 -153 Q 0 -150 4 -153" stroke="${C.ink}" stroke-width="1.4" fill="none" stroke-linecap="round"/>`;
  if (glasses) s += `<rect x="-10" y="-165" width="8" height="6.5" rx="2.5" fill="none" stroke="${C.ink}" stroke-width="1.5"/><rect x="2" y="-165" width="8" height="6.5" rx="2.5" fill="none" stroke="${C.ink}" stroke-width="1.5"/>`;
  const arm = (d, hand) => `<path d="${d}" stroke="${shirt}" stroke-width="11" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${hand[0]}" cy="${hand[1]}" r="5.5" fill="${skin}"/>`;
  s += arm("M-19 -132 L-27 -102 L-24 -78", [-24, -74]);
  if (pose === "point") s += arm("M19 -132 L44 -146 L66 -166", [69, -169]);
  else if (pose === "marker") s += arm("M19 -132 L40 -150 L48 -176", [49, -180]) + `<rect x="45" y="-198" width="7" height="16" rx="2" fill="${C.ink}"/>`;
  else if (pose === "clipboard")
    s += `<rect x="-6" y="-124" width="30" height="38" rx="3" fill="#fff" stroke="#c9d3ea" stroke-width="2"/><rect x="3" y="-128" width="12" height="6" rx="2" fill="${C.chair}"/>` +
      [0, 1, 2].map((i) => `<path d="M0 ${-112 + i * 9} l3 3 l5 -6" stroke="${C.green}" stroke-width="2" fill="none"/><rect x="11" y="${-112 + i * 9}" width="9" height="2.5" rx="1" fill="#c9d3ea"/>`).join("") +
      arm("M19 -132 L28 -104 L18 -96", [16, -96]);
  else if (pose === "laptop")
    s += `<rect x="-26" y="-112" width="52" height="5" rx="2" fill="#9aa6c4"/><rect x="-22" y="-140" width="44" height="28" rx="3" fill="#c9d3ea" transform="rotate(-8 0 -112)"/>` +
      arm("M19 -132 L26 -112 L14 -108", [12, -108]);
  else s += arm("M19 -132 L27 -102 L24 -78", [24, -74]);
  return s;
}

// Seated, seen from behind. Origin = desk top, centre of the person.
function behind({ skin, hair, shirt, style = "short" }) {
  let s = `<rect x="-26" y="-50" width="52" height="56" rx="22" fill="${shirt}"/>`;
  s += `<rect x="-5" y="-60" width="10" height="12" fill="${skin}"/>`;
  s += `<circle cx="-15" cy="-70" r="4.5" fill="${skin}"/><circle cx="15" cy="-70" r="4.5" fill="${skin}"/>`;
  if (style === "long") s += `<rect x="-15" y="-80" width="30" height="40" rx="12" fill="${hair}"/>`;
  s += `<circle cx="0" cy="-74" r="16" fill="${hair}"/>`;
  if (style === "bun") s += `<circle cx="0" cy="-94" r="7" fill="${hair}"/>`;
  s += `<rect x="-20" y="-18" width="40" height="24" rx="6" fill="${C.chair}"/>`;
  return s;
}

const monitor = (x, y, w, h, screen) =>
  `<rect x="${x + w / 2 - 4}" y="${y + h}" width="8" height="14" fill="${C.chair}"/><rect x="${x + w / 2 - 20}" y="${y + h + 12}" width="40" height="5" rx="2" fill="${C.chair}"/>` +
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="${C.ink}"/><rect x="${x + 5}" y="${y + 5}" width="${w - 10}" height="${h - 10}" rx="2" fill="${C.navy2}"/>` + screen;
const bars = (x, y, vals, cols, w = 10, gap = 6, max = 50) =>
  vals.map((v, i) => `<rect x="${x + i * (w + gap)}" y="${y - v * max}" width="${w}" height="${v * max}" rx="1.5" fill="${cols[i % cols.length]}"/>`).join("");
const pill = (x, y, label, fill, fg = C.ink) => {
  const w = label.length * 7.6 + 20;
  return `<rect x="${x}" y="${y}" width="${w}" height="24" rx="12" fill="${fill}"/><text x="${x + w / 2}" y="${y + 16.5}" text-anchor="middle" font-size="12" font-weight="600" fill="${fg}">${label}</text>`;
};
const desk = (x, y, w, fill = "#c9d3ea") =>
  `<rect x="${x}" y="${y}" width="${w}" height="9" rx="3" fill="${fill}"/><rect x="${x + 10}" y="${y + 9}" width="7" height="${300 - y}" fill="${fill}"/><rect x="${x + w - 17}" y="${y + 9}" width="7" height="${300 - y}" fill="${fill}"/>`;
const VB = "0 0 640 360";

const scenes = {};

scenes["mdr"] = svg(
  `<rect width="640" height="360" fill="${C.navy}"/>` +
  `<rect x="40" y="36" width="160" height="120" rx="6" fill="#142b62"/><circle cx="160" cy="76" r="18" fill="#f5e7b4"/><circle cx="168" cy="70" r="16" fill="#142b62"/>` +
  [[70, 60], [100, 110], [130, 52], [62, 128], [182, 128]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2" fill="#cfe0ff"/>`).join("") +
  `<rect x="0" y="300" width="640" height="60" fill="#0a1734"/>` +
  `<path d="M352 128 L300 182 L330 196 L420 150 Z" fill="${C.blue}" opacity=".10"/>` +
  desk(270, 232, 340, "#22335f") +
  monitor(340, 110, 128, 88, bars(358, 186, [0.3, 0.55, 0.4, 0.8, 0.5, 0.65], [C.blue, C.sky, C.teal, C.orange, C.violet, C.blue])) +
  monitor(482, 100, 120, 98,
    `<polyline points="494,180 512,166 530,172 548,140 566,150 586,124" fill="none" stroke="${C.teal}" stroke-width="3" stroke-linejoin="round"/>` +
    `<rect x="494" y="112" width="58" height="16" rx="3" fill="${C.red}"/><text x="523" y="124" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">CRITICAL</text>`) +
  `<rect x="372" y="226" width="86" height="6" rx="2" fill="#4b5e93"/>` +
  `<rect x="560" y="214" width="16" height="18" rx="3" fill="${C.orange}"/><path d="M576 218 q 7 4 0 9" stroke="${C.orange}" stroke-width="2.5" fill="none"/>` +
  g(322, 262, seated({ skin: SKIN[2], hair: HAIR[0], shirt: C.cobalt, pants: "#1c2a55", headset: true, arm: [[26, -24], [52, -34]] })),
  VB, "Security analyst with a headset working at two monitors at night");

const mapDots = (() => {
  const blobs = [[200, 108, 46, 24], [262, 150, 22, 28], [338, 100, 26, 16], [356, 140, 22, 30], [430, 110, 52, 26], [470, 160, 22, 12]];
  let d = "";
  blobs.forEach(([cx, cy, rx, ry]) => {
    for (let x = cx - rx; x <= cx + rx; x += 8)
      for (let y = cy - ry; y <= cy + ry; y += 8)
        if (((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1) d += `<circle cx="${x}" cy="${y}" r="2" fill="#3a5aa8"/>`;
  });
  return d;
})();
scenes["soc-team"] = svg(
  `<rect width="640" height="360" fill="#eaf0fb"/>` +
  `<rect x="120" y="36" width="400" height="178" rx="10" fill="${C.ink}"/><rect x="128" y="44" width="384" height="162" rx="5" fill="${C.navy}"/>` + mapDots +
  [[210, 104, C.red], [356, 132, C.orange], [440, 104, C.yellow], [262, 146, C.teal]]
    .map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="11" fill="${c}" opacity=".28"/><circle cx="${x}" cy="${y}" r="5" fill="${c}"/>`).join("") +
  `<rect x="140" y="176" width="110" height="20" rx="3" fill="#1b2e63"/><rect x="146" y="182" width="8" height="8" rx="2" fill="${C.red}"/><rect x="160" y="183" width="80" height="6" rx="2" fill="#5d72b0"/>` +
  `<rect x="390" y="176" width="110" height="20" rx="3" fill="#1b2e63"/><rect x="396" y="182" width="8" height="8" rx="2" fill="${C.orange}"/><rect x="410" y="183" width="80" height="6" rx="2" fill="#5d72b0"/>` +
  `<rect x="0" y="300" width="640" height="60" fill="#d8e1f3"/>` +
  [165, 320, 475].map((x) => `<rect x="${x - 34}" y="236" width="68" height="44" rx="4" fill="${C.ink}"/><rect x="${x - 4}" y="280" width="8" height="10" fill="${C.chair}"/>`).join("") +
  `<rect x="60" y="290" width="520" height="10" rx="3" fill="#b9c6e3"/>` +
  g(165, 330, behind({ skin: SKIN[1], hair: HAIR[1], shirt: C.pink, style: "long" })) +
  g(320, 330, behind({ skin: SKIN[3], hair: HAIR[0], shirt: C.sky })) +
  g(475, 330, behind({ skin: SKIN[0], hair: HAIR[2], shirt: C.violet, style: "bun" })),
  VB, "Three analysts at their desks facing a wall screen with a threat map");

scenes["grc"] = svg(
  `<rect width="640" height="360" fill="#e8f8f2"/><rect x="0" y="300" width="640" height="60" fill="#cdeee2"/>` +
  `<path d="M430 52 L520 84 L520 160 Q520 236 430 276 Q340 236 340 160 L340 84 Z" fill="${C.green}"/><path d="M430 70 L504 96 L504 160 Q504 222 430 256 Z" fill="#fff" opacity=".14"/>` +
  `<path d="M392 160 L420 190 L472 128" stroke="#fff" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
  pill(520, 70, "NIS2", "#fff") + pill(536, 112, "DORA", "#fff") + pill(520, 196, "ISO 27001", "#fff") + pill(540, 238, "GDPR", "#fff") +
  `<rect x="244" y="230" width="70" height="70" rx="4" fill="#fff" stroke="#b8e3d4" stroke-width="2"/><rect x="236" y="244" width="70" height="56" rx="4" fill="#fff" stroke="#b8e3d4" stroke-width="2"/>` +
  [0, 1, 2, 3].map((i) => `<rect x="248" y="${256 + i * 10}" width="${40 - i * 5}" height="4" rx="2" fill="#b8e3d4"/>`).join("") +
  g(170, 305, standing({ skin: SKIN[0], hair: HAIR[1], shirt: C.cobalt, pants: C.ink, style: "long", pose: "clipboard", glasses: true })),
  VB, "Compliance lead holding a checklist next to a shield with NIS2, DORA, ISO 27001 and GDPR badges");

scenes["vciso"] = svg(
  `<rect width="640" height="360" fill="#f1ecfd"/><rect x="0" y="300" width="640" height="60" fill="#e0d6f8"/>` +
  `<rect x="348" y="44" width="250" height="160" rx="8" fill="#fff"/><text x="368" y="74" font-size="13" font-weight="600" fill="${C.ink}">Risk score</text>` +
  bars(372, 186, [0.35, 0.5, 0.62, 0.78, 0.95], [C.violet], 26, 14, 90) +
  `<polyline points="385,160 425,146 465,128 505,112 545,92" fill="none" stroke="${C.green}" stroke-width="3"/>` +
  `<rect x="40" y="252" width="230" height="10" rx="3" fill="#c7b7ef"/><rect x="56" y="262" width="7" height="38" fill="#c7b7ef"/><rect x="247" y="262" width="7" height="38" fill="#c7b7ef"/>` +
  `<rect x="132" y="240" width="26" height="12" rx="2" fill="#fff"/><circle cx="210" cy="246" r="6" fill="#fff"/>` +
  g(92, 280, seated({ skin: SKIN[2], hair: HAIR[4], shirt: "#4b5e93", pants: C.ink, glasses: true, arm: [[24, -30], [52, -30]] })) +
  g(192, 280, seated({ skin: SKIN[0], hair: HAIR[3], shirt: C.teal, pants: C.ink, style: "long", arm: [[24, -30], [50, -30]] })) +
  g(316, 305, standing({ skin: SKIN[1], hair: HAIR[0], shirt: "#fff", pants: C.ink, pose: "point", tie: C.violet })),
  VB, "Virtual CISO presenting a falling risk chart to two board members");

const code = [[C.pink, 60], [C.sky, 110], [C.yellow, 80], [C.teal, 130], [C.violet, 70], [C.green, 100]];
scenes["pentest"] = svg(
  `<rect width="640" height="360" fill="#fdecf1"/><rect x="0" y="300" width="640" height="60" fill="#f8d4df"/>` +
  `<rect x="376" y="40" width="226" height="150" rx="8" fill="${C.ink}"/><circle cx="392" cy="54" r="4" fill="${C.red}"/><circle cx="406" cy="54" r="4" fill="${C.yellow}"/><circle cx="420" cy="54" r="4" fill="${C.green}"/>` +
  code.map(([c, w], i) => `<text x="390" y="${84 + i * 17}" font-size="12" font-weight="700" fill="${C.green}">$</text><rect x="404" y="${75 + i * 17}" width="${w}" height="7" rx="3" fill="${c}"/>`).join("") +
  `<g transform="translate(320 92)"><ellipse cx="0" cy="0" rx="17" ry="22" fill="${C.pink}"/><circle cx="0" cy="-26" r="10" fill="${C.pink}"/>` +
  [-12, 0, 12].map((y) => `<path d="M-16 ${y} L-28 ${y - 6} M16 ${y} L28 ${y - 6}" stroke="${C.pink}" stroke-width="4" stroke-linecap="round"/>`).join("") +
  `<path d="M-30 -36 L30 30" stroke="${C.ink}" stroke-width="6" stroke-linecap="round"/></g>` +
  desk(250, 236, 220, "#e8b8c7") +
  `<rect x="330" y="230" width="84" height="6" rx="2" fill="#5b6b94"/><rect x="398" y="182" width="8" height="52" rx="3" fill="#5b6b94" transform="rotate(-14 402 232)"/>` +
  `<rect x="402" y="186" width="46" height="44" rx="3" fill="#1b2e63" transform="rotate(-14 402 232)"/>` +
  g(268, 266, seated({ skin: SKIN[1], hair: HAIR[0], shirt: "#2b2f45", pants: "#3a4466", hood: "#2b2f45", arm: [[28, -26], [60, -34]] })),
  VB, "Ethical hacker in a hoodie at a laptop next to a terminal and a crossed-out bug");

const box = (x, y, w, h, c, label) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${c}" opacity=".18"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="none" stroke="${c}" stroke-width="2.5"/>` +
  `<text x="${x + w / 2}" y="${y + h / 2 + 4}" text-anchor="middle" font-size="12" font-weight="600" fill="${C.ink}">${label}</text>`;
const arrow = (x1, y1, x2, y2) => `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${C.ink}" stroke-width="2" marker-end="url(#ah)"/>`;
scenes["consulting"] = svg(
  `<defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="${C.ink}"/></marker></defs>` +
  `<rect width="640" height="360" fill="#e9f3fd"/><rect x="0" y="300" width="640" height="60" fill="#d3e6f8"/>` +
  `<rect x="262" y="34" width="340" height="200" rx="8" fill="#fff" stroke="#c4d6ee" stroke-width="3"/><rect x="262" y="234" width="340" height="8" fill="#c4d6ee"/>` +
  box(282, 62, 92, 40, C.sky, "Cloud") + box(282, 160, 92, 40, C.blue, "Endpoints") + box(420, 110, 92, 44, C.cobalt, "Cy360") +
  box(540, 62, 46, 40, C.teal, "M365") + box(540, 160, 46, 40, C.orange, "OT") +
  arrow(374, 82, 418, 122) + arrow(374, 180, 418, 144) + arrow(540, 82, 514, 118) + arrow(540, 180, 514, 146) +
  g(232, 305, standing({ skin: SKIN[3], hair: HAIR[0], shirt: C.sky, pants: C.ink, pose: "marker" })) +
  g(110, 305, standing({ skin: SKIN[0], hair: HAIR[2], shirt: C.orange, pants: "#33467a", pose: "laptop", style: "bun" })),
  VB, "Consultant drawing an architecture diagram on a whiteboard while a colleague takes notes on a laptop");

// 24×7 handover: night shift in Rijswijk on the left, day shift in Gurgaon on the right.
scenes["handover"] = svg(
  `<rect width="320" height="360" fill="${C.navy}"/><rect x="320" width="320" height="360" fill="#fff4dc"/>` +
  `<circle cx="70" cy="62" r="20" fill="#f5e7b4"/><circle cx="80" cy="55" r="18" fill="${C.navy}"/>` +
  [[130, 90], [200, 80], [280, 70], [40, 120]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2" fill="#cfe0ff"/>`).join("") +
  `<circle cx="570" cy="64" r="24" fill="#ffc93c"/><circle cx="570" cy="64" r="36" fill="#ffc93c" opacity=".25"/>` +
  `<rect x="0" y="300" width="320" height="60" fill="#0a1734"/><rect x="320" y="300" width="320" height="60" fill="#f5e0b5"/>` +
  desk(120, 236, 170, "#22335f") + desk(350, 236, 170, "#e7cf9f") +
  monitor(180, 150, 96, 70, bars(194, 210, [0.4, 0.7, 0.5, 0.85], [C.blue, C.teal, C.violet, C.orange], 12, 8, 46)) +
  monitor(364, 150, 96, 70, `<polyline points="376,206 396,190 414,196 432,172 448,178" fill="none" stroke="${C.teal}" stroke-width="3" stroke-linejoin="round"/>`) +
  g(150, 266, seated({ skin: SKIN[0], hair: HAIR[2], shirt: C.cobalt, pants: "#1c2a55", headset: true, arm: [[26, -24], [52, -34]] })) +
  g(490, 266, seated({ skin: SKIN[2], hair: HAIR[0], shirt: C.orange, pants: C.ink, style: "long", headset: true, arm: [[26, -24], [52, -34]] }), true) +
  `<g transform="translate(320 104)"><rect x="-62" y="-18" width="124" height="36" rx="18" fill="#fff" stroke="${C.cobalt}" stroke-width="2"/><text x="0" y="6" text-anchor="middle" font-size="14" font-weight="700" fill="${C.ink}">24×7 handover</text></g>` +
  `<text x="200" y="42" text-anchor="middle" font-size="15" font-weight="600" fill="#cfe0ff">Rijswijk · NL</text>` +
  `<text x="450" y="42" text-anchor="middle" font-size="15" font-weight="600" fill="#7a4b00">Gurgaon · IN</text>`,
  VB, "Two analysts with headsets handing over the SOC shift between Rijswijk at night and Gurgaon by day");

// About Us banner — two offices linked by a 24×7 arc.
const windowsGrid = (x, y, cols, rows, w, h, gx, gy, lit) => {
  let s = "";
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      const on = (r * 3 + c * 5) % 7 < 2;
      s += `<rect x="${x + c * (w + gx)}" y="${y + r * (h + gy)}" width="${w}" height="${h}" rx="1" fill="${on ? lit : "#ffffff"}" opacity="${on ? 1 : 0.55}"/>`;
    }
  return s;
};
scenes["offices"] = svg(
  `<defs><linearGradient id="sky" x1="0" x2="1"><stop offset="0" stop-color="#16295a"/><stop offset=".5" stop-color="#4d6fd8"/><stop offset="1" stop-color="#ffcf8a"/></linearGradient></defs>` +
  `<rect width="1280" height="360" fill="url(#sky)"/><rect y="300" width="1280" height="60" fill="#0d1d40" opacity=".35"/>` +
  `<circle cx="150" cy="80" r="26" fill="#f5e7b4"/><circle cx="162" cy="72" r="24" fill="#1b3170"/>` +
  `<circle cx="1140" cy="86" r="34" fill="#fff3c4"/><circle cx="1140" cy="86" r="48" fill="#fff3c4" opacity=".25"/>` +
  `<path d="M250 300 L250 92 Q 300 60 352 92 L352 300 Z" fill="#dfe6f5"/><path d="M244 96 Q 300 58 360 96" stroke="#9fb0d6" stroke-width="7" fill="none" stroke-linecap="round"/>` +
  Array.from({ length: 12 }, (_, i) => `<rect x="258" y="${108 + i * 16}" width="86" height="7" rx="2" fill="${i % 4 === 1 ? C.blue : "#7f93c4"}" opacity=".85"/>`).join("") +
  `<rect x="352" y="160" width="60" height="140" fill="#cdd7ee"/>` + windowsGrid(362, 172, 3, 7, 10, 8, 8, 9, C.sky) +
  `<rect x="160" y="200" width="80" height="100" fill="#b9c6e3"/>` + windowsGrid(170, 212, 4, 5, 9, 8, 8, 9, C.teal) +
  `<text x="300" y="336" text-anchor="middle" font-size="18" font-weight="700" fill="#fff">Rijswijk · NL</text>` +
  `<rect x="900" y="110" width="70" height="190" fill="#c8e7f5"/>` + windowsGrid(908, 120, 4, 12, 10, 9, 5, 5, C.orange) +
  `<rect x="980" y="70" width="90" height="230" fill="#e3f2fa"/>` + windowsGrid(990, 82, 5, 15, 10, 9, 6, 5, C.yellow) +
  `<rect x="1080" y="160" width="64" height="140" fill="#bfe0f0"/>` + windowsGrid(1088, 170, 4, 8, 9, 9, 5, 6, C.pink) +
  `<text x="1020" y="336" text-anchor="middle" font-size="18" font-weight="700" fill="#fff">Gurgaon · IN</text>` +
  `<path d="M370 120 Q 640 -40 900 120" stroke="#fff" stroke-width="3" stroke-dasharray="2 10" stroke-linecap="round" fill="none"/>` +
  `<g transform="translate(640 66)"><rect x="-74" y="-22" width="148" height="44" rx="22" fill="#fff"/><text x="0" y="7" text-anchor="middle" font-size="18" font-weight="700" fill="${C.ink}">24×7 SOC</text></g>` +
  `<circle cx="470" cy="62" r="6" fill="${C.teal}"/><circle cx="810" cy="62" r="6" fill="${C.orange}"/>`,
  "0 0 1280 360", "Rijswijk office tower and Gurgaon glass towers linked by a 24×7 SOC handover arc");

// Leadership avatars — head and shoulders in a coloured disc. `placeholder` draws a faceless
// silhouette for roles that are not yet filled.
// Optional details for avatars drawn from a reference photo: `sweep` (fuller, side-swept hair), `brows`,
// `stubble`, `grin` (open smile) and `blazer` + `turtleneck` colours.
const avatar = (id, { bg, skin, hair, shirt, style = "short", glasses, beard, placeholder, sweep, brows, stubble, grin, blazer, turtleneck }) => {
  let s = `<clipPath id="c-${id}"><circle cx="60" cy="60" r="60"/></clipPath><circle cx="60" cy="60" r="60" fill="${bg}"/><g clip-path="url(#c-${id})">`;
  if (placeholder) {
    s += `<rect x="22" y="88" width="76" height="50" rx="26" fill="#ffffff" opacity=".55"/><circle cx="60" cy="56" r="22" fill="#ffffff" opacity=".55"/>`;
    s += `<text x="60" y="64" text-anchor="middle" font-size="22" font-weight="700" fill="${bg}">?</text></g>`;
    return svg(s, "0 0 120 120", "Placeholder avatar");
  }
  if (style === "long") s += `<rect x="36" y="30" width="48" height="66" rx="20" fill="${hair}"/>`;
  if (blazer) {
    s += `<rect x="18" y="88" width="84" height="50" rx="26" fill="${blazer}"/>`;
    s += `<path d="M47 90 L60 118 L73 90 Z" fill="${turtleneck}"/><rect x="48" y="73" width="24" height="22" rx="9" fill="${turtleneck}"/><path d="M50 82 L70 82 M50 87 L70 87" stroke="#000" stroke-width="1" opacity=".18"/>`;
    s += `<path d="M47 89 L60 120 L50 124 L36 97 Z" fill="#000" opacity=".22"/><path d="M73 89 L60 120 L70 124 L84 97 Z" fill="#000" opacity=".22"/>`;
  } else {
    s += `<rect x="22" y="88" width="76" height="50" rx="26" fill="${shirt}"/><rect x="53" y="74" width="14" height="18" rx="5" fill="${skin}"/>`;
  }
  s += sweep ? `<ellipse cx="60" cy="49" rx="24" ry="21" fill="${hair}"/>` : `<circle cx="60" cy="50" r="24" fill="${hair}"/>`;
  if (sweep) s += `<circle cx="39.5" cy="60" r="4" fill="${skin}"/><circle cx="80.5" cy="60" r="4" fill="${skin}"/>`;
  s += `<circle cx="60" cy="58" r="21" fill="${skin}"/>`;
  s += sweep
    ? `<path d="M37 61 Q 33 31 57 27 Q 84 25 84 56 Q 81 44 73 43 Q 66 37 56 40 Q 46 42 42 50 Q 39 55 37 61 Z" fill="${hair}"/>`
    : `<path d="M39 54 Q 42 30 62 31 Q 80 32 82 52 Q 66 40 39 54 Z" fill="${hair}"/>`;
  if (stubble) s += `<path d="M41 61 Q 43 83 60 85 Q 77 83 79 61 Q 74 77 60 78 Q 46 77 41 61 Z" fill="${hair}" opacity=".38"/><path d="M53 66.5 Q 60 63.5 67 66.5" stroke="${hair}" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".55"/>`;
  if (brows) s += `<path d="M46.5 52 Q 52 48.5 57 51" stroke="${hair}" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M63 51 Q 68 48.5 73.5 52" stroke="${hair}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
  if (beard) s += `<path d="M42 62 Q 44 82 60 84 Q 76 82 78 62 Q 70 74 60 74 Q 50 74 42 62 Z" fill="${hair}"/>`;
  s += `<circle cx="52" cy="58" r="2.2" fill="${C.ink}"/><circle cx="68" cy="58" r="2.2" fill="${C.ink}"/>`;
  s += grin
    ? `<path d="M51 68.5 Q 60 78 69 68.5 Z" fill="#fff" stroke="${C.ink}" stroke-width="1.4" stroke-linejoin="round"/>`
    : `<path d="M54 68 Q 60 72 66 68" stroke="${beard ? "#fff" : C.ink}" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;
  if (glasses) s += `<rect x="46" y="53" width="11" height="8" rx="3" fill="none" stroke="${C.ink}" stroke-width="1.6"/><rect x="63" y="53" width="11" height="8" rx="3" fill="none" stroke="${C.ink}" stroke-width="1.6"/><path d="M57 57 L63 57" stroke="${C.ink}" stroke-width="1.4"/>`;
  return svg(s + `</g>`, "0 0 120 120", "Cartoon avatar");
};
const avatars = {
  // Drawn from Deepak's photo: side-swept dark hair, stubble, wide smile, grey turtleneck, cobalt blazer.
  "avatar-deepak-bhatnagar": { bg: C.yellow, skin: "#c48a5e", hair: HAIR[0], sweep: true, brows: true, stubble: true, grin: true, blazer: "#2a4fd6", turtleneck: "#5d6270" },
  "avatar-jeroen-van-dijk": { bg: C.orange, skin: SKIN[0], hair: HAIR[2], shirt: "#33467a" },
  "avatar-hiteshwar-hooda": { bg: C.teal, skin: SKIN[2], hair: HAIR[0], shirt: C.cobalt, beard: true },
  "avatar-bhupender-mahalwal": { bg: C.pink, skin: SKIN[1], hair: HAIR[3], shirt: "#ffffff" },
  "avatar-placeholder-violet": { bg: C.violet, placeholder: true },
  "avatar-placeholder-green": { bg: C.green, placeholder: true },
};

mkdirSync(OUT, { recursive: true });
for (const [name, body] of Object.entries(scenes)) writeFileSync(join(OUT, `${name}.svg`), body);
for (const [name, spec] of Object.entries(avatars)) writeFileSync(join(OUT, `${name}.svg`), avatar(name, spec));
console.log(`Wrote ${Object.keys(scenes).length + Object.keys(avatars).length} illustrations to ${OUT}`);
