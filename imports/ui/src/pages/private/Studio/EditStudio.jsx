import React, { useContext, useEffect, useState } from "react";
import PageTitle from "../../../components/shared/Typography/PageTitle";
import { Input, HelperText, Label, Button } from "@windmill/react-ui";
import { storage } from "../../../../firebase";
import { Meteor } from "meteor/meteor";
import { useHistory } from "react-router-dom";
import {
  addPhoto,
  createOrUpdateStudio,
} from "../../../../../api/services/studio/methods/createStudio";
import AutocompleteAddress from "../../../components/features/AutocompleteAddress/AutocompleteAddress";

import { IoMapOutline } from "@react-icons/all-files/io5/IoMapOutline";
import { AutocompleteContext } from "../../../components/features/AutocompleteAddress/AutoCompleteContext";
import { toast } from "react-toastify";
import Tag from "../../../components/features/TagManager/Tag";
import { TagContext } from "../../../components/features/TagManager/TagContext";
import { StudioContext } from "../../../context/StudioContext";

const initialState = {
  _id: "",
  name: "",
  image: null,
  type: "personal",
  online: true,
  physical: false,
};

const EditStudio = () => {
  const [form, setForm] = useState(initialState);

  const { studios } = useContext(StudioContext);
  const {
    tagState: { tags },
    loadTag,
  } = useContext(TagContext);

  useEffect(() => {
    if (!studios) return;

    console.log(studios);

    const { _id, name, type, online, physical, tags } = studios[0];
    setForm({
      ...form,
      _id,
      name,
      type,
      online,
      physical,
    });

    loadTag(tags);
  }, [studios]);

  const { address } = useContext(AutocompleteContext);

  const history = useHistory();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file"
          ? e.target.files[0]
          : e.target.type === "checkbox"
          ? e.target.checked
          : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, type, online, physical } = form;

    createOrUpdateStudio.call(
      { name, address, type, online, physical, tags },
      (error, result) => {
        if (error) {
          console.error(error);
        }
        if (result) {
          uploadImage((imageUrl) => {
            addPhoto.call({ studioId: result, imageUrl }, (error) => {
              if (error) {
                console.error(error);
              }
              toast("Studio created successfully");
              history.push("/studio/edit");
            });
          });
        }
      }
    );
  };

  const uploadImage = (callback) => {
    const { image } = form;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => console.log(error),
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            callback(url);
          });
      }
    );
  };

  const imageUrl = studios[0].imageUrl
    ? studios[0].imageUrl
    : form.image && URL.createObjectURL(form.image);

  console.log(imageUrl);

  return (
    <>
      <PageTitle>Edit Studio</PageTitle>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <form onSubmit={handleSubmit}>
          <Label>
            <span>Studio Name</span>
            <Input
              className="mt-1 border"
              placeholder="eg: Maria Psicoterapia"
              name="name"
              onChange={handleChange}
              value={form.name}
              required
            />
          </Label>

          <div className="mt-4">
            <Label>Studio Type</Label>
            <div className="mt-2">
              <Label radio>
                <Input
                  className="border"
                  type="radio"
                  value="personal"
                  checked={form.type === "personal"}
                  name="type"
                  onChange={handleChange}
                />
                <span className="ml-2">Personal</span>
              </Label>
              <Label className="ml-6" radio>
                <Input
                  className="border"
                  type="radio"
                  value="business"
                  checked={form.type === "business"}
                  name="type"
                  onChange={handleChange}
                />
                <span className="ml-2">Business</span>
              </Label>
            </div>
          </div>

          <div className="mt-4">
            <Label>Modalità</Label>
            <div className="mt-2">
              <Label radio>
                <Input
                  className="border"
                  type="checkbox"
                  name="online"
                  value={form.online}
                  checked={form.online}
                  onChange={handleChange}
                />
                <span className="ml-2">Online</span>
              </Label>
              <Label className="ml-6" radio>
                <Input
                  className="border"
                  type="checkbox"
                  name="physical"
                  value={form.physical}
                  checked={form.physical}
                  onChange={handleChange}
                />
                <span className="ml-2">In presenza</span>
              </Label>
            </div>
          </div>

          <div className="mt-4">
            <Label>Tags / Servizi</Label>
            <div className="mt-2">
              <Tag />
            </div>
          </div>

          <Label className="mt-2">
            <span>Studio Images</span>
            <div className="sm:w-2/4 w-full h-full m-auto">
              <img src={imageUrl} alt="" />
            </div>
            <Input
              type="file"
              className="mt-1 border"
              name="image"
              onChange={handleChange}
              required
            />
            <HelperText className="p-3 text-gray-400">
              Upload image of your studio
            </HelperText>
          </Label>
          <Button className="mt-4 float-right" type="submit">
            Create
          </Button>
        </form>
      </div>
    </>
  );
};

export default EditStudio;
