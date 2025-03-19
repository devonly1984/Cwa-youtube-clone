
import StudioLayout from "@/components/studio/layout/StudioLayout";
import { ReactNode } from "react";

const Layout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return <StudioLayout>{children}</StudioLayout>;
};
export default Layout;