import React from "react";
import CTA from "../../../components/ui/CTA";
import PageTitle from "../../../components/ui/Typography/PageTitle";
import SectionTitle from "../../../components/ui/Typography/SectionTitle";
import { Input, HelperText, Label, Select, Textarea } from "@windmill/react-ui";

const CreateStudio = () => {
  return (
    <>
      <PageTitle>Create Studio</PageTitle>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <form>
          <Label>
            <span>Studio Name</span>
            <Input
              className="mt-1 border"
              placeholder="eg: Maria Psicoterapia"
            />
          </Label>
          <Label className="mt-2">
            <span>Address</span>
            <Input
              className="mt-1 border"
              placeholder="eg: Maria Psicoterapia"
            />
          </Label>
        </form>
      </div>
    </>
  );
};

export default CreateStudio;
