import React, { useState } from "react";
import PageTitle from "../../../components/ui/Typography/PageTitle";
import { Input, HelperText, Label, Button } from "@windmill/react-ui";
import { storage } from "../../../../firebase";
import { Meteor } from "meteor/meteor";

const initialState = {
  name: "",
  address: "",
  image: null,
};

const CreateStudio = () => {
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, address, image } = form;

    Meteor.call("studio.create", { name, address, image }, (error, result) => {
      if (error) {
        console.error(error);
      }
      if (result) {
        uploadImage((imageUrl) => {
          Meteor.call(
            "studio.addPhoto",
            { studioId: result, imageUrl },
            (error) => {
              if (error) {
                console.error(error);
              }
            }
          );
        });
      }
      console.log(result);
    });
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
            <Input
              className="mt-1 border"
              placeholder="eg: Maria Psicoterapia"
              name="address"
              onChange={handleChange}
              value={form.address}
              required
            />
          </Label>

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

export default CreateStudio;
