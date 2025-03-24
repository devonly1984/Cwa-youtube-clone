
import {StudioLayout} from "@/components/layouts";
import { ReactNode } from "react";

const Layout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return <StudioLayout>{children}</StudioLayout>;
};
export default Layout;