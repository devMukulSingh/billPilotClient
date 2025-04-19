import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { cn } from 'lib/utils';
import { TDropdownOptions } from 'types/modals.types';
import { Edit, Trash } from 'lucide-react';
import { useNavigate } from '@remix-run/react';
import { ReactNode, useState } from 'react';
import DeleteDialog from '../bill/DeleteDialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL_SERVER } from 'lib/constants';
import { useAuth } from '@clerk/remix';
import EditDistributorDialog from './EditDistributorDialog';
import toast from 'react-hot-toast';
import { TDistributor } from 'types/api/distributor';
import { useDeleteDistributorMutation } from 'services/distributor/distributorApiSlice';

type Props = {
  children: ReactNode;
  distributor: TDistributor;
};

export default function TableActionsDropdown({ children, distributor }: Props) {
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [isOpenEditDialog, setIsOpenEditDialog] = useState(false);
  const { userId } = useAuth();
  const [trigger, { isLoading }] = useDeleteDistributorMutation();

  const dropdownOptions: TDropdownOptions[] = [
    {
      label: 'Edit',
      icon: Edit,
      onSelect: () => setIsOpenEditDialog(true),
      className: '',
    },
    {
      label: 'Delete',
      icon: Trash,
      onSelect: () => setIsOpenDeleteDialog(true),
      className: '',
    },
  ];
  async function handleDelete() {
    try {
      await trigger({
        id: distributor.id,
        userId,
      }).unwrap();
      toast.success('distributor deleted');
      setIsOpenDeleteDialog(false);
    } catch (e: any) {
      if (e?.data) toast.error(e.data.error);
      else toast.error('Unable to delete, please contact the developer');
    }
  }
  return (
    <>
      {
        <EditDistributorDialog
          distributor={distributor}
          openDialog={isOpenEditDialog}
          setOpenDialog={setIsOpenEditDialog}
        />
      }
      {isOpenDeleteDialog && (
        <DeleteDialog
          disabled={isLoading}
          title="Are you sure?"
          onDelete={handleDelete}
          open={isOpenDeleteDialog}
          description="This action cant be undone"
          onClose={() => setIsOpenDeleteDialog(false)}
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

// const { mutate, isLoading } = useMutation<unknown, unknown, { id: string }>({
//   mutationKey: ['delete_distributor'],
//   mutationFn: async (data) =>
//     await axios.delete(`${BASE_URL_SERVER}/${userId}/distributor/${data.id}`),
//   onSuccess: () => {
//     queryClient.invalidateQueries({ queryKey: ['get_distributors'] });
//     queryClient.invalidateQueries({ queryKey: ['get_all_distributors'] });
//     toast.success('distributor deleted');
//     setIsOpenDeleteDialog(false);
//   },
// });
