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
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@clerk/remix';
import toast from 'react-hot-toast';
import EditProductDialog from './EditProductDialog';
import { useDeleteProductMutation } from 'services/product/productApiSlice';
import { TProduct } from 'types/api/product';

type Props = {
  children: ReactNode;
  product: TProduct;
};

export default function TableActionsDropdown({ children, product }: Props) {
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [isOpenEditDialog, setIsOpenEditDialog] = useState(false);
  const { userId } = useAuth();
  const [trigger, { isLoading }] = useDeleteProductMutation();

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
        id: product.id,
        userId,
      }).unwrap();
      toast.success('product deleted');
      setIsOpenDeleteDialog(false);
    } catch (e: any) {
      if (e?.data) toast.error(e.data.error);
      else console.log(e);
    }
  }
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
//   mutationKey: ['delete_product'],
//   mutationFn: async (data) =>
//     await axios.delete(`${BASE_URL_SERVER}/${userId}/product/${data.id}`),
//   onSuccess: () => {
//     queryClient.invalidateQueries({ queryKey: ['get_products'] });
//     queryClient.invalidateQueries({ queryKey: ['get_all_products'] });
//     toast.success('product deleted');
//     setIsOpenDeleteDialog(false);
//   },
// });
