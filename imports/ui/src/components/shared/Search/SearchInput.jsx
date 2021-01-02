import React from "react";
import { SearchIcon } from "../../../assets/icons";
import { Input } from "@windmill/react-ui";
const SearchInput = () => {
  return (
    <div className="flex justify-center flex-1">
      <div className="relative w-full max-w-xl focus-within:text-purple-500 rounded-lg">
        <div className="absolute inset-y-0 flex items-center pl-2">
          <SearchIcon className="w-4 h-4" aria-hidden="true" />
        </div>
        <Input
          className="pl-8 text-gray-700 border"
          placeholder="Cerca psicologi vicino te"
          aria-label="Search"
        />
      </div>
    </div>
  );
};

export default SearchInput;
