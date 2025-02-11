import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { cn } from '~/lib/utils';
import { TDopdownModalProps, TDropdownOptions } from '~/lib/types/modals.types';
import { Edit, Trash } from 'lucide-react';
import { useNavigate } from '@remix-run/react';
import { Dispatch, ReactNode, SetStateAction } from 'react';

type Props = {
  children: ReactNode;
  billId: string;
  onOpenDialog: () => void;
};

export default function TableActionsDropdown({
  children,
  onOpenDialog,
  billId,
}: Props) {
  const navigate = useNavigate();
  const dropdownOptions: TDropdownOptions[] = [
    {
      label: 'Edit',
      icon: Edit,
      onSelect: () => navigate(`/edit-bill/${billId}`),
      className: '',
    },
    {
      label: 'Delete',
      icon: Trash,
      onSelect: onOpenDialog,
      className: '',
    },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="">
        <DropdownMenuGroup>
          {dropdownOptions.map((option, index) => (
            <DropdownMenuItem
              className={cn(
                `flex items-center gap-2 cursor-pointer`,
                option.className
              )}
              key={index}
              onClick={option.onSelect}
            >
              <option.icon size={15} />
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
