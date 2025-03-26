import {VariantProps} from 'class-variance-authority';

import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { userInfoVariants } from '@/constants';
interface UserInfoProps extends VariantProps<typeof userInfoVariants> {
  name: string;
  className?: string;
}
const UserInfo = ({ name, className, size }: UserInfoProps) => {

  return (
    <div className={cn(userInfoVariants({ size, className }))}>
      <Tooltip>
        <TooltipTrigger asChild>
          <p className="text-gray-500 hover:text-gray-800 line-clamp-1">
            {name}
          </p>
        </TooltipTrigger>
        <TooltipContent align="center" className="bg-black/70">
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
export default UserInfo;