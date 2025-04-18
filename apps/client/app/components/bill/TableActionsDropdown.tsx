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
import { TBill } from 'types/api/bills';
import { useDeleteBillMutation } from 'services/bill/billApiSlice';

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
  const { userId } = useAuth();
  const [trigger, { isLoading }] = useDeleteBillMutation();

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
  async function handleDelete() {
    try {
      await trigger({
        id: bill.id,
        userId,
      });
      toast.success(`Bill deleted`);
      setIsOpenDialog(false);
    } catch (e) {
      toast.error(`Unable to create bill, please contact the developer`);
      console.log(e);
    }
  }
  return (
    <>
      {isOpenDialog && (
        <DeleteDialog
          disabled={isLoading}
          onDelete={handleDelete}
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

// const { isLoading, mutate } = useMutation<unknown, unknown, { id: string }>({
//   mutationKey: ['delete_bill'],
//   mutationFn: async (data) => {
//     await axios.delete(`${BASE_URL_SERVER}/${userId}/bill/${data.id}`);
//   },
//   onSuccess: () => {
//     queryClient.invalidateQueries({ queryKey: ['get_bills'] });
//

//   },
// });
