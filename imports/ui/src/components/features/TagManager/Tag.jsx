import React, { useContext } from "react";
import { TagContext } from "./TagContext";
import { WithContext as ReactTags } from "react-tag-input";
import { Tags } from "../../../../../api/services/tags/model/TagsCollection";
import { useTracker } from "meteor/react-meteor-data";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const Tag = () => {
  const { tagState, handleDelete, handleAddition } = useContext(TagContext);

  const { suggestions } = useTracker(() => {
    const noDataAvailable = { suggestions: [] };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe("tags.get");

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const results = Tags.find().fetch();
    const suggestions = [];

    results.forEach((item) => {
      suggestions.push({
        id: item._id,
        text: item.text,
      });
    });

    return { suggestions };
  });

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
