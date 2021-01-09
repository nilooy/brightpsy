import React, { useState, useMemo } from "react";
import {
  createOrUpdateTag,
  removeTag,
} from "../../../../../api/services/tags/methods/tagCrud";

// create context
export const TagContext = React.createContext();

const initialState = {
  tags: [],
  suggestions: [],
};

export const TagProvider = ({ children }) => {
  const [tagState, setTagState] = useState(initialState);

  const handleDelete = (id) => {
    const tagToRemove = tagState.tags[id];

    removeTag.call({ id: tagToRemove._id });

    setTagState({
      tags: tagState.tags.filter((tag, index) => index !== id),
    });
  };

  const handleAddition = (tag) => {
    let { tags } = tagState;

    createOrUpdateTag.call({ text: tag.text }, (err, result) => {
      if (err) console.log(err);

      tag.id = result;

      setTagState({
        tags: [...tags, tag],
      });
    });
  };

  const loadTag = (tags) => {
    setTagState({
      tags,
    });
  };

  const value = useMemo(
    () => ({
      tagState,
      handleDelete,
      handleAddition,
      loadTag,
    }),
    [tagState]
  );

  return <TagContext.Provider value={value}>{children}</TagContext.Provider>;
};
