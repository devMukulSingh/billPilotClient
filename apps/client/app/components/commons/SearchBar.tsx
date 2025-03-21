// import { Search } from 'lucide-react';
// import React, { ChangeEvent, MouseEventHandler } from 'react';
// import { Input } from '../ui/input';
// import { useSearchParams } from '@remix-run/react';

// type Props = {};

// export default function SearchBar({}: Props) {
//   const [searchParams,setSearchParams ] = useSearchParams();
//   function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
//     const query = e.target.value.trim();
//     if (!query || query === '') return;
//   }
//   function handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
//     const query = (e.target as HTMLInputElement).value;
//     const params = new URLSearchParams();
//     params.set("query",query);
//     setSearchParams(params);
//   }
//   return (
//     <div
//       className="
//       flex 
//       items-center
//       gap-2
//       w-auto 
//       md:w-1/3 
//       border 
//       bg-white
//       rounded-lg
//       sticky
//       top-0
//       px-2
//       "
//     >
//       <Search />
//       <Input
//         onKeyUp={handleSearch}
//         onChange={handleOnChange}
//         className="
//           border-0
//           focus-visible:ring-0 
          
//       "
//         placeholder="Search"
//       />
//     </div>
//   );
// }
