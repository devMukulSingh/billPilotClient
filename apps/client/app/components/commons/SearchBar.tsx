import { Search, X } from 'lucide-react';
import { Input } from '../ui/input';
import { useSearchParams } from '@remix-run/react';
import { Button } from '../ui/button';
import { useState } from 'react';

type Props = {
  // onClearSearch: () => void;
  // onClearInput: () => void;
  // inputValue: string;
  // setInputValue: (value: string) => void;
};

export default function SearchBar({
  // onClearSearch,
  // onClearInput,
  // inputValue,
  // setInputValue,
}: Props) {
  const [inputValue, setInputValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  async function handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter') return;
    const query = (e.target as HTMLInputElement).value.trim();
    if (query === '') return;
    const params = new URLSearchParams();
    params.set(`query`, query);
    setSearchParams(params);
  }
  async function handleClearSearch() {
    if (!searchParams.get(`query`)) return;
    setSearchParams((prev) => {
      prev.delete(`query`);
      return prev;
    });
    setInputValue('');
  }
  function handleClearInput() {
    if (inputValue !== '') setInputValue('');
  }

  return (
    <div className="bg-slate-300 flex gap-2 items-center w-full h-16 px-5">
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
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={handleSearch}
          className="
          border-0
          focus-visible:ring-0 
          
      "
          placeholder="Search"
        />
        <X className="cursor-pointer" onClick={handleClearInput} />
      </div>
      <Button disabled={query ? false : true} onClick={handleClearSearch}>
        Clear Search
      </Button>
    </div>
  );
}
