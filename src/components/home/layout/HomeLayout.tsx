import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import HomeNavbar from "../navbar/HomeNavbar";
import HomeSidebar from "../sidebar/HomeSidebar";

const HomeLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <SidebarProvider>
      <div className="w-full">
        <HomeNavbar />

        <div className="flex min-h-screen pt-[4rem]">
          <HomeSidebar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};
export default HomeLayout;