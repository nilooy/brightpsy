import { Tags } from "../model/TagsCollection";

Meteor.methods({
  "tag.create"({ text }) {
    check(text, String);

    const findTag = Tags.find({ text: text }).fetch()[0];

    console.log("findTag", findTag);

    if (findTag) return findTag._id;

    const savedTag = Tags.insert({
      text,
    });

    return savedTag?.insertedId;
  },
  "tag.remove"({ _id }) {
    check(_id, String);

    Tags.remove({ _id: id, userId: this.userId });
  },
  "tag.getAll"() {
    return Tags.find({}).fetch();
  },
});
