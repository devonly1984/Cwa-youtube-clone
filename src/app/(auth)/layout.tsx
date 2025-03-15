import { ReactNode } from "react";

const Layout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {

  return (
    <div className="min-h-screen flex items-center justify-center">
      {children}
    </div>
  );
};
export default Layout;
