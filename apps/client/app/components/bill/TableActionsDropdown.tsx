import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { cn } from 'lib/utils';
import { TDopdownModalProps, TDropdownOptions } from 'types/modals.types';
import { Edit, Trash } from 'lucide-react';
import { useNavigate } from '@remix-run/react';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import DeleteDialog from './DeleteDialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BASE_URL_SERVER } from 'lib/constants';
import axios from 'axios';
import { useAuth } from '@clerk/remix';
import toast from 'react-hot-toast';

type Props = {
  children: ReactNode;
  bill: TBill;
  isOpenDialog: boolean;
  setIsOpenDialog: Dispatch<SetStateAction<boolean>>;
};

export default function TableActionsDropdown({
  children,
  bill,
  isOpenDialog,
  setIsOpenDialog,
}: Props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { userId } = useAuth();
  const { isPending, mutate } = useMutation<unknown, unknown, { id: string }>({
    mutationKey: ['delete_bill'],
    mutationFn: async (data) => {
      await axios.delete(`${BASE_URL_SERVER}/${userId}/bill/${data.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get_bills'] });
      setIsOpenDialog(false);
      toast.success('bill deleted');
    },
  });
  const dropdownOptions: TDropdownOptions[] = [
    {
      label: 'Edit',
      icon: Edit,
      onSelect: () => navigate(`/edit-bill/${bill.id}`),
      className: '',
    },
    {
      label: 'Delete',
      icon: Trash,
      onSelect: () => setIsOpenDialog(true),
      className: '',
    },
  ];
  return (
    <>
      {isOpenDialog && (
        <DeleteDialog
          disabled={isPending}
          onDelete={() => mutate({ id: bill.id })}
          description="This action can't be undone"
          open={isOpenDialog}
          onClose={() => setIsOpenDialog(false)}
          title="Are you sure?"
        />
      )}
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
    </>
  );
}
