import { privatePath } from "@ui/routes/privatePath";
import React from "react";
import { useHistory } from "react-router-dom";
import { SearchIcon } from "@ui/assets/icons";
import { Input } from "@windmill/react-ui";
import { useUserRole } from "@ui/api-hooks/user";
import { useSearchQuery } from "@ui/api-hooks/helper";

const UserGlobalSearchInput = () => {
  const { isDoctor } = useUserRole();
  if (isDoctor) return null;

  const history = useHistory();
  const searchQuery = useSearchQuery();
  const searchValue = searchQuery.get("q");

  return (
    <div className="flex justify-center flex-1 lg:mr-32">
      <div className="relative w-full max-w-xl mr-6 focus-within:text-blue-500">
        <div className="absolute inset-y-0 flex items-center pl-2">
          <SearchIcon className="w-4 h-4" aria-hidden="true" />
        </div>
        <Input
          className="pl-8 text-gray-700 border text-xl"
          placeholder="Di a noi il tuo problema"
          aria-label="Search"
          onChange={(e) => {
            history.replace(privatePath.search + "?q=" + e.target.value);
          }}
          value={searchValue ? searchValue : ""}
        />
      </div>
    </div>
  );
};

export default UserGlobalSearchInput;
