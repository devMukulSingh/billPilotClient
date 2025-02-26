import DialogModal from '../modals/DialogModal';
import { Button } from '../ui/button';

type Props = {
  title?: string;
  open: boolean;
  onClose: () => void;
  dialogContentClassName?: string;
  innerDivClassName?: string;
  description?: string;
  onDelete: () => void;
  disabled:boolean
};

export default function DeleteDialog({
  onClose,
  open,
  title,
  description,
  onDelete,
  disabled,
}: Props) {
  return (
    <DialogModal
      dialogContentClassName="w-[20rem]"
      innerDivClassName="flex justify-between"
      open={open}
      title={title}
      onClose={onClose}
      description={description}
    >
      <Button disabled={disabled} onClick={onDelete} variant={'destructive'}>
        Delete
      </Button>
      <Button disabled={disabled} onClick={onClose}>
        Cancel
      </Button>
    </DialogModal>
  );
}
