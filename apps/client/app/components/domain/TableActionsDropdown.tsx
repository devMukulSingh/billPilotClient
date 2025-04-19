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
import { ReactNode, useState } from 'react';
import DeleteDialog from '../bill/DeleteDialog';
import { useAuth } from '@clerk/remix';
import EditDomainDialog from './EditDomainDialog';
import toast from 'react-hot-toast';
import { useDeleteDomainMutation } from 'services/domain/domainSlice';
import { TDomain } from 'types/api/domain';

type Props = {
  children: ReactNode;
  domain: TDomain;
};

export default function TableActionsDropdown({ children, domain }: Props) {
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [isOpenEditDialog, setIsOpenEditDialog] = useState(false);
  const { userId } = useAuth();
  const [trigger, { isLoading }] = useDeleteDomainMutation();
  async function handleDelete() {
    try {
      await trigger({
        id: domain.id,
        userId,
      }).unwrap();
      toast.success('Domain deleted', { position: 'bottom-right' });
    } catch (e) {
      toast.error('Unable to delete domain, please contact the developer');
      console.log(e);
    }
  }

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
        <EditDomainDialog
          domain={domain}
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
//   mutationKey: ['delete_domain'],
//   mutationFn: async (data) =>
//     await axios.delete(`${BASE_URL_SERVER}/${userId}/domain/${data.id}`),
//   onSuccess: () => {
//     queryClient.invalidateQueries({ queryKey: ['get_domains'] });
//     queryClient.invalidateQueries({ queryKey: ['get_all_domains'] });
//     toast.success('Domain deleted');
//     setIsOpenDeleteDialog(false);
//   },
// });
