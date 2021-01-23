import React, { useState, useMemo } from "react";
import {
  createOrUpdateTag,
  removeTag,
} from "@api/services/tags/methods/tagCrud";

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
      ...tagState,
      tags: tagState.tags.filter((tag, index) => index !== id),
    });
  };

  const handleAddition = (tag) => {
    let { tags } = tagState;

    const isDuplicate = !!tags.find((t) => t.text === tag.text);

    if (isDuplicate) return;

    createOrUpdateTag.call({ text: tag.text }, (err, result) => {
      if (err) console.log(err);

      tag.id = result;

      setTagState({
        ...tagState,
        tags: [...tags, tag],
      });
    });
  };

  const loadTag = (tags) => {
    setTagState({
      ...tagState,
      tags,
    });
  };

  const setSuggestion = (suggestions) => {
    setTagState({
      ...tagState,
      suggestions,
    });
  };

  const value = useMemo(
    () => ({
      tagState,
      handleDelete,
      handleAddition,
      loadTag,
      setSuggestion,
    }),
    [tagState]
  );

  return <TagContext.Provider value={value}>{children}</TagContext.Provider>;
};
