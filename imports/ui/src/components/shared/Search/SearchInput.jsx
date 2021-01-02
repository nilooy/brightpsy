import React from "react";
import { SearchIcon } from "../../../assets/icons";
import AutocompleteAddress from "../AutocompleteAddress/AutocompleteAddress";
const SearchInput = () => {
  return (
    <div className="flex justify-center flex-1">
      <div className="relative w-full max-w-xl focus-within:text-purple-500 rounded-lg">
        <div className="absolute inset-y-0 flex items-center pl-2">
          <SearchIcon className="w-4 h-4" aria-hidden="true" />
        </div>

        <AutocompleteAddress />
      </div>
    </div>
  );
};

export default SearchInput;
