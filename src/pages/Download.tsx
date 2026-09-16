import PageShell from "@/components/PageShell";
import DownloadSection from "@/components/DownloadSection";
import SaaSDownload from "@/components/SaaSDownload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Download = () => (
  <PageShell>
    <div className="container mx-auto flex justify-center px-6 pt-8">
      <Tabs defaultValue="on-premises" className="w-full">
        <div className="flex justify-center">
          <TabsList>
            <TabsTrigger value="on-premises">On-Premises</TabsTrigger>
            <TabsTrigger value="saas">SaaS</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="on-premises">
          <DownloadSection />
        </TabsContent>
        <TabsContent value="saas">
          <SaaSDownload />
        </TabsContent>
      </Tabs>
    </div>
  </PageShell>
);

export default Download;
