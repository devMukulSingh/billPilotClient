import { TDialogModalProps } from 'types/modals.types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '../ui/dialog';

const DialogModal = ({
  children,
  title = '',
  onClose,
  open,
  description = '',
  dialogContentClassName,
  innerDivClassName,
  titleIcon,
}: TDialogModalProps) => {
  const onChange = () => {
    if (open) onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent className={dialogContentClassName}>
        <DialogTitle className="flex gap-2"> {title} </DialogTitle>
        <DialogDescription className="">{description} </DialogDescription>
        <div className={innerDivClassName}>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogModal;
