import { Search } from 'lucide-react';
import { Input } from '../ui/input';

type Props = {};

export default function Header({}: Props) {
  return (
    <div
      className="
      flex
      items-center 
      h-16
      px-5 
      bg-slate-300
     "
    >
      <div
        className="
      flex 
      items-center
      gap-2
      w-auto 
      md:w-1/3 
      border 
      bg-white
      rounded-lg
      sticky
      top-0
      px-2
      "
      >
        <Search />
        <Input
          className="
      focus-visible:ring-0 
      border-0
      "
          placeholder="Search"
        />
      </div>
    </div>
  );
}
