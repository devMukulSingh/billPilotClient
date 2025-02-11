import { TDialogModalProps } from '~/lib/types/modals.types';
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
}: TDialogModalProps) => {
  const onChange = () => {
    if (open) onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent className={dialogContentClassName}>
        <DialogTitle className=""> {title} </DialogTitle>
        <DialogDescription className="">{description} </DialogDescription>
        <div className={innerDivClassName}>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogModal;
