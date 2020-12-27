import React, { useContext } from "react";
import { Dropdown, DropdownItem, Button } from "@windmill/react-ui";

import { StudioContext } from "../../context/StudioContext";

const SelectStudio = () => {
  const {
    studios,
    toggleStudioMenu,
    isStudioMenuOpen,
    selectedStudio,
    setSelectStudio,
  } = useContext(StudioContext);

  return (
    <>
      <Button
        onClick={toggleStudioMenu}
        aria-label="Select Studio"
        aria-haspopup="true"
      >
        {selectedStudio ? selectedStudio.name : "Select Studio"} &#x261F;
      </Button>

      <Dropdown
        align="right"
        isOpen={isStudioMenuOpen}
        onClose={toggleStudioMenu}
      >
        {studios &&
          studios.map((item) => (
            <DropdownItem
              key={item._id}
              tag="button"
              className="justify-between"
              onClick={() => setSelectStudio(item)}
            >
              <span>{item.name}</span>
            </DropdownItem>
          ))}
      </Dropdown>
    </>
  );
};

export default SelectStudio;
