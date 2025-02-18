import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

export type TDopdownModalProps = {
  children: ReactNode;
  dropdownOptions: TDropdownOptions[];
};

export type TDropdownOptions = {
  label: string;
  onSelect: () => void;
  icon: LucideIcon;
  className?: string;
};
export type TDialogModalProps = {
  children: ReactNode;
  title?: string;
  open: boolean;
  onClose: () => void;
  dialogContentClassName?: string;
  innerDivClassName?: string;
  description?: string;
  titleIcon?:LucideIcon
  // modal : boolean
  // innerDivRef : HTMLDivElement |null
};
