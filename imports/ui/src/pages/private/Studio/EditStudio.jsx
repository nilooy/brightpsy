import React, { useContext, useEffect, useRef, useState } from "react";
import PageTitle from "../../../components/shared/Typography/PageTitle";
import { Input, HelperText, Label, Button, Textarea } from "@windmill/react-ui";
import { storage } from "../../../../firebase";
import { useHistory } from "react-router-dom";
import {
  addPhoto,
  createOrUpdateStudio,
} from "../../../../../api/services/studio/methods/createStudio";
import AutocompleteAddress from "../../../components/features/AutocompleteAddress/AutocompleteAddress";

import { AutocompleteContext } from "../../../components/features/AutocompleteAddress/AutoCompleteContext";
import { toast } from "react-toastify";
import Tag from "../../../components/features/TagManager/Tag";
import { TagContext } from "../../../components/features/TagManager/TagContext";
import { useStudioByUser } from "../../../apiHooks/studio";

const initialState = {
  _id: "",
  name: "",
  image: null,
  type: "personal",
  online: true,
  physical: false,
  desc: "",
  email: "",
  tel: "",
};

const EditStudio = () => {
  const { data: studio } = useStudioByUser();

  const uploadHiddenInput = useRef();

  const [form, setForm] = useState(initialState);

  const {
    tagState: { tags },
    loadTag,
  } = useContext(TagContext);

  useEffect(() => {
    if (!studio) return;

    const {
      _id,
      name,
      type,
      online,
      physical,
      tags,
      desc,
      email,
      tel,
    } = studio;
    setForm({
      ...form,
      _id,
      name,
      type,
      online,
      physical,
      desc,
      email,
      tel,
    });

    loadTag(tags);
  }, [studio]);

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

    const { name, type, online, physical, desc, email, tel } = form;

    createOrUpdateStudio.call(
      {
        studioId: form._id,
        name,
        address,
        type,
        online,
        physical,
        tags,
        desc,
        email,
        tel,
      },
      (error, result) => {
        if (error) {
          console.error(error);
        }
        if (result && !form.image) {
          uploadImage((imageUrl) => {
            addPhoto.call({ studioId: result, imageUrl }, (error) => {
              if (error) {
                console.error(error);
              }
              toast("Studio updated", { autoClose: 2000 });
            });
          });
        } else {
          toast("Studio updated", { autoClose: 2000 });
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

  const imageUrl = studio?.imageUrl
    ? studio?.imageUrl
    : form.image && URL.createObjectURL(form.image);

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
            <div className="w-64 h-full">
              <img src={imageUrl} alt="" />
            </div>
            <Input
              ref={uploadHiddenInput}
              type="file"
              className="mt-1 border hidden"
              name="image"
              onChange={handleChange}
            />
            <Button
              className="my-2"
              onClick={() => uploadHiddenInput.current.click()}
            >
              Change Image
            </Button>
            <HelperText className="p-3 text-gray-400">
              Upload image of your studio
            </HelperText>
          </Label>
          <Label className="mt-3">
            <span>Descrizione</span>
            <Textarea
              className="mt-2 border"
              rows="3"
              placeholder="Descrizione breve del studio"
              name="desc"
              onChange={handleChange}
              value={form.desc}
              required
            />
          </Label>

          <Label className="mt-2">
            <span>Email</span>
            <Input
              type="email"
              className="mt-1 border"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={form.email}
            />
          </Label>
          <Label className="mt-2">
            <span>Tel</span>
            <Input
              type="number"
              className="mt-1 border"
              placeholder="Tel"
              name="tel"
              onChange={handleChange}
              value={form.tel}
            />
          </Label>
          <div className="flex float-right">
            <Button layout="outline" className="mt-4 mx-2" type="submit">
              Preview
            </Button>
            <Button className="mt-4" type="submit">
              Update
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditStudio;
