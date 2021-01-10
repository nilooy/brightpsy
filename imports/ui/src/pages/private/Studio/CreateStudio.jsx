import React, { useContext, useState } from "react";
import PageTitle from "../../../components/shared/Typography/PageTitle";
import { Input, HelperText, Label, Button, Textarea } from "@windmill/react-ui";
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

const initialState = {
  name: "",
  image: null,
  type: "personal",
  online: true,
  physical: false,
  desc: "",
  email: "",
  tel: "",
};

const CreateStudio = () => {
  const [form, setForm] = useState(initialState);

  const { address } = useContext(AutocompleteContext);
  const {
    tagState: { tags },
  } = useContext(TagContext);

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
      { name, address, type, online, physical, tags, desc, email, tel },
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
              toast("Studio created successfully", { autoClose: 1000 });
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

  const imageUrl = form.image && URL.createObjectURL(form.image);

  return (
    <>
      <PageTitle>Create Studio</PageTitle>
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
          <Label className="mt-2">
            <span>Address</span>
            <AutocompleteAddress
              icon={<IoMapOutline className="w-5 h-5" aria-hidden="true" />}
              noForm={true}
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
          <Label>
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
          <Label>
            <span>Email</span>
            <Input
              className="mt-1 border"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={form.email}
            />
          </Label>
          <Label>
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
          <Button className="mt-4 float-right" type="submit">
            Create
          </Button>
        </form>
      </div>
    </>
  );
};

export default CreateStudio;
