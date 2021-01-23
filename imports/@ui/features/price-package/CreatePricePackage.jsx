import React, { useState } from "react";
import PageTitle from "@ui/components/Typography/PageTitle";
import { Input, Label, Button, Textarea } from "@windmill/react-ui";

import { useHistory } from "react-router-dom";
import { createOrUpdatePricePackage } from "@api/services/price-packages/methods/createPricePackage";
import { privatePath } from "@ui/routes/privatePath";

const initialState = {
  title: "",
  desc: "",
  quantity: "",
  hours: "",
  cost: "",
};

const CreatePricePackage = () => {
  const [form, setForm] = useState(initialState);

  const history = useHistory();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, desc, quantity, hours, cost } = form;
    createOrUpdatePricePackage.call(
      { title, desc, quantity, hours, cost },
      (error, result) => {
        if (error) {
          console.error(error);
        }
        if (result) {
          console.log(result);
          history.push(privatePath.packages);
        }
      }
    );
  };

  return (
    <>
      <PageTitle>Create Packages</PageTitle>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <form onSubmit={handleSubmit}>
          <Label>
            <span>Title</span>
            <Input
              className="mt-1 border"
              placeholder="eg: Bambini 2x"
              name="title"
              onChange={handleChange}
              value={form.title}
              required
            />
          </Label>

          <Label>
            <span>Descrizione</span>
            <Textarea
              className="mt-2 border"
              rows="3"
              placeholder="Scrivi descrizione del pacchetto"
              name="desc"
              onChange={handleChange}
              value={form.desc}
              required
            />
          </Label>

          <Label className="mt-2">
            <span>Sedute</span>
            <Input
              type="number"
              className="mt-1 border"
              placeholder="0"
              name="quantity"
              onChange={handleChange}
              value={form.quantity}
              required
            />
          </Label>

          <Label className="mt-2">
            <span>Ore</span>
            <Input
              type="number"
              className="mt-1 border"
              placeholder="0"
              name="hours"
              onChange={handleChange}
              value={form.hours}
              required
            />
          </Label>

          <Label className="mt-2">
            <span>Costo</span>
            <Input
              type="number"
              className="mt-1 border"
              placeholder="€"
              name="cost"
              onChange={handleChange}
              value={form.cost}
              required
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

export default CreatePricePackage;