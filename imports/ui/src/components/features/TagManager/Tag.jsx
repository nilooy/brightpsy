import React, { useContext } from "react";
import { TagContext } from "./TagContext";
import { WithContext as ReactTags } from "react-tag-input";
import { Tags } from "../../../../../api/services/tags/model/TagsCollection";
import { useTracker } from "meteor/react-meteor-data";
import { useTags } from "../../../apiHooks/tag";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const Tag = () => {
  const { tagState, handleDelete, handleAddition } = useContext(TagContext);

  const { data: savedTags } = useTags();

  const suggestions =
    savedTags &&
    savedTags.map((tag) => ({
      id: tag._id,
      text: tag.text,
    }));

  console.log(savedTags);

  const { tags } = tagState;

  return (
    <ReactTags
      tags={tags}
      suggestions={suggestions}
      handleDelete={handleDelete}
      handleAddition={handleAddition}
      placeholder="Tag separato con virgola"
      delimiters={delimiters}
      allowDragDrop={false}
      allowUnique={true}
    />
  );
};

export default Tag;
