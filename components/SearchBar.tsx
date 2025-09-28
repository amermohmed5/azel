
import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  isDisabled: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange, isDisabled }) => {
  return (
    <div className="relative w-full max-w-lg">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-slate-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        type="search"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        disabled={isDisabled}
        placeholder="ابحث بسعر المادة..."
        className="block w-full p-4 ps-10 text-sm text-white border border-slate-600 rounded-lg bg-slate-700 placeholder-slate-400 focus:ring-sky-500 focus:border-sky-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </div>
  );
};

export default SearchBar;