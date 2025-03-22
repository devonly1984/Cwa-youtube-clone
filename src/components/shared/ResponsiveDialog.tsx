import { useIsMobile } from "@/hooks/use-mobile"
import {Dialog,DialogContent,DialogHeader,DialogTitle} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ReactNode } from "react";
interface ReponsiveDialogProps {
    children: ReactNode;
    open: boolean;
    title: string;
    onOpenChange: (open:boolean)=>void;
}
const ResponsiveDialog = ({
  children,
  open,
  title,
  onOpenChange,
}: ReponsiveDialogProps) => {
    const isMobile = useIsMobile();
    if (isMobile) {
        return (
          <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>{title}</DrawerTitle>
              </DrawerHeader>
              {children}
            </DrawerContent>
          </Drawer>
        );
    }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
export default ResponsiveDialog