import { Search, X } from 'lucide-react';
import React, {
  ChangeEvent,
  KeyboardEvent,
  MouseEventHandler,
  useState,
} from 'react';
import { Input } from '../ui/input';
import { useLocation, useSearchParams } from '@remix-run/react';
import { Button } from '../ui/button';
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { TApiResponse } from 'types/apiResponse.types';
import { setProducts } from 'redux/reducers/rootReducer';
import { useDispatch } from 'react-redux';
import { TInitialState } from 'redux/types/types';
import { UnknownAction } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

type Props = {
  // handleSearch: (e: KeyboardEvent<HTMLInputElement>) => Promise<void>;
  handleClearSearch: () => void;
};

export default function SearchBar({ handleClearSearch }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  async function handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter') return;
    const query = (e.target as HTMLInputElement).value.trim();
    if (query === '') return;
    const params = new URLSearchParams();
    params.set(`query`, query);
    setSearchParams(params);
  }

  const [inputValue, setInputValue] = useState('');
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
      <Button onClick={handleClearSearch}>Clear Search</Button>
    </div>
  );
}
