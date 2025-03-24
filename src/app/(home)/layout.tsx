
import {HomeLayout} from "@/components/layouts";
import { ReactNode } from "react";

const Layout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return <HomeLayout>{children}</HomeLayout>;
};
export default Layout;