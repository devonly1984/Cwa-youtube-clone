import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import StudioNavbar from "@/components/navbars/studio/StudioNavbar";
import { StudioSidebar } from "@/components/sidebars";

const StudioLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <SidebarProvider>
      <div className="w-full">
        <StudioNavbar />

        <div className="flex min-h-screen pt-[4rem]">
          <StudioSidebar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};
export default StudioLayout;