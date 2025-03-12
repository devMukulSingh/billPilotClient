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
import { ReactNode, useState } from 'react';
import DeleteDialog from '../bill/DeleteDialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL_SERVER } from '~/lib/constants';
import { useAuth } from '@clerk/remix';
import { TProduct } from '~/lib/types/db.types';
import toast from 'react-hot-toast';
import EditProductDialog from './EditProductDialog';

type Props = {
  children: ReactNode;
  product: TProduct;
};

export default function TableActionsDropdown({ children, product }: Props) {
  const queryClient = useQueryClient();
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [isOpenEditDialog, setIsOpenEditDialog] = useState(false);
  const { userId } = useAuth();
  const { mutate, isPending } = useMutation<unknown, unknown, { id: string }>({
    mutationKey: ['delete_product'],
    mutationFn: async (data) =>
      await axios.delete(
        `${BASE_URL_SERVER}/${userId}/product/${data.id}`
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get_products'] });
      toast.success('product deleted');
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
        <EditProductDialog
          product={product}
          openDialog={isOpenEditDialog}
          setOpenDialog={setIsOpenEditDialog}
        />
      }
      {isOpenDeleteDialog && (
        <DeleteDialog
          disabled={isPending}
          title="Are you sure?"
          onDelete={() => mutate({ id: product.id })}
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
