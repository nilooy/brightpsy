import React, { useContext } from "react";
import { TagContext } from "./TagContext";
import { WithContext as ReactTags } from "react-tag-input";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const Tag = () => {
  const { tagState, handleDelete, handleAddition } = useContext(TagContext);

  const { tags, suggestions } = tagState;

  return (
    <ReactTags
      tags={tags}
      suggestions={suggestions}
      handleDelete={handleDelete}
      handleAddition={handleAddition}
      placeholder="Tag separato con virgola"
      delimiters={delimiters}
      allowDragDrop={false}
    />
  );
};

export default Tag;
