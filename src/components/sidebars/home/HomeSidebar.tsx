import { Sidebar, SidebarContent } from "@/components/ui/sidebar"
import MainSection from "@/components/sections/home/MainSection";
import { Separator } from "@/components/ui/separator";
import PersonalSection from "@/components/sections/home/PersonalSection";

const HomeSidebar = () => {
  return (
    <Sidebar className="pt-16 z-40 border-none" collapsible="icon">
      <SidebarContent className="bg-background">
        <MainSection />
        <Separator />
        <PersonalSection />
      </SidebarContent>
    </Sidebar>
  );
}
export default HomeSidebar