import DialogModal from "../modals/DialogModal";
import { Button } from "../ui/button";

type Props = {
  title?: string;
  open: boolean;
  onClose: () => void;
  dialogContentClassName?: string;
  innerDivClassName?: string;
  description?: string;
  onDelete : () => void;
};

export default function DeleteDialog({ onClose, open, title,description,onDelete }: Props) {
  return (
    <DialogModal
      dialogContentClassName="w-[20rem]"
      innerDivClassName="flex justify-between"
      open={open}
      title={title}
      onClose={onClose}
      description={description}
    >
      <Button onClick={onDelete} variant={"destructive"}>
        Delete
      </Button>
      <Button onClick={ onClose}>Cancel</Button>
    </DialogModal>
  );
}
