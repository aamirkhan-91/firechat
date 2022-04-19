import SearchIcon from 'icons/SearchIcon';
import React, { FC } from 'react';

type Props = {
  query: string;
  onQueryChanged: (query: string) => void;
};

const Search: FC<Props> = ({ query, onQueryChanged }) => {
  const queryChangeHandler = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChanged(value);
  };

  return (
    <div className='relative flex-1'>
      <SearchIcon className='absolute top-1/2 left-2 -translate-y-1/2 transform text-base text-icon' />
      <input
        value={query}
        className='w-full rounded-lg border border-solid border-border bg-white-darker px-2 py-2 indent-7 text-base outline-none'
        placeholder='Search or start a new chat'
        onChange={queryChangeHandler}
      />
    </div>
  );
};

export default Search;
