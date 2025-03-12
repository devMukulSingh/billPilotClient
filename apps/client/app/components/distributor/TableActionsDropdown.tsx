import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { cn } from '~/lib/utils';
import { TDropdownOptions } from '~/lib/types/modals.types';
import { Edit, Trash } from 'lucide-react';
import { useNavigate } from '@remix-run/react';
import { ReactNode, useState } from 'react';
import DeleteDialog from '../bill/DeleteDialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL_SERVER } from '~/lib/constants';
import { useAuth } from '@clerk/remix';
import EditDistributorDialog from './EditDistributorDialog';
import { TDistributor } from '~/lib/types/db.types';
import toast from 'react-hot-toast';

type Props = {
  children: ReactNode;
  distributor: TDistributor;
};

export default function TableActionsDropdown({ children, distributor }: Props) {
  const queryClient = useQueryClient();
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [isOpenEditDialog, setIsOpenEditDialog] = useState(false);
  const { userId } = useAuth();
  const { mutate, isPending } = useMutation<unknown, unknown, { id: string }>({
    mutationKey: ['delete_distributor'],
    mutationFn: async (data) =>
      await axios.delete(
        `${BASE_URL_SERVER}/${userId}/distributor/${data.id}`
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get_distributors'] });
      toast.success('distributor deleted');
      setIsOpenDeleteDialog(false);
    },
  });
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
          disabled={isPending}
          title="Are you sure?"
          onDelete={() => mutate({ id: distributor.id })}
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
