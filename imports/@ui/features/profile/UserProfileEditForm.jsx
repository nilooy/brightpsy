import Input from "@ui/components/Form/Input";
import TextArea from "@ui/components/Form/TextArea";
import React from "react";
import { AiOutlineInfoCircle } from "@react-icons/all-files/ai/AiOutlineInfoCircle";
import FormCard from "@ui/components/Cards/FormCard";
import Select from "react-select";
import languages from "language-list";
import SwitchBox from "@ui/components/Form/SwitchBox";
import { Controller, useForm } from "react-hook-form";
import { methodCall } from "@ui/utils/asyncMeteorMethod";
import { useTracker } from "meteor/react-meteor-data";
import { toast } from "react-toastify";
import HoldMyUi from "holdmyui";

const ProfileEditForm = () => {
  const languageOptions = languages().getData();

  const { profile } = useTracker(() => Meteor.user());

  const {
    register,
    handleSubmit,
    errors,
    control,
    formState: { isDirty, isSubmitting },
  } = useForm({
    defaultValues: { ...profile },
  });

  const onSubmit = async (data) => {
    try {
      const res = await methodCall("user.updateProfile", { data });
      toast("Profile updated successfully", { autoClose: 2000 });
    } catch (error) {
      toast.error("Something went wrong", { autoClose: 2000 });
    }

    // TODO: add better error handling
    // setError('username', 'validate');
  };

  const FormFooter = ({ isDirty }) => (
    <div className="fixed z-10 bottom-0 left-0 w-full py-4 sm:px-12 px-4 bg-gray-100 mt-6 flex justify-end rounded-bl rounded-br">
      <button className="btn text-sm focus:outline-none text-gray-600 border border-gray-300 py-2 px-6 mr-4 rounded hover:bg-gray-200 transition duration-150 ease-in-out">
        Vedi come l'altri
      </button>
      {isDirty && (
        <button
          className="bg-green-200 transition duration-150 ease-in-out hover:bg-green-300 rounded text-gray-800 font-medium px-8 py-2 text-sm focus:outline-none"
          type="submit"
        >
          Aggiorna
        </button>
      )}
    </div>
  );

  return (
    <HoldMyUi
      when={isSubmitting}
      preloader="Ripple"
      preloaderTop="50vh"
      color="#4ac959"
      type="fixed"
      padding="0px"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="xl:w-9/12 m-auto">
        <FormCard
          className="mt-12 p-4"
          title="Personal Information"
          TitleIcon={AiOutlineInfoCircle}
        >
          <div className="container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
            <Input
              name="firstName"
              label="Nome"
              placeholder="Nome"
              register={register({ required: true, maxLength: 80 })}
              error={errors.firstName?.message}
            />
            <Input
              name="lastName"
              label="Cognome"
              placeholder="Cognome"
              register={register({ required: true, maxLength: 80 })}
              error={errors.lastName?.message}
            />
          </div>

          <TextArea
            label="Bio"
            name="bio"
            helpText="Character Limit: 200"
            register={register({ maxLength: 200 })}
            error={errors.bio?.message}
          />
        </FormCard>

        <FormCard
          className="mt-12 p-4"
          title="Contact Information"
          TitleIcon={AiOutlineInfoCircle}
        >
          <div className="container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
            <Input
              type="email"
              name="email"
              label="Email"
              placeholder="Email"
            />
            <Input
              type="number"
              name="tel"
              label="Tel/Cell"
              placeholder="+39 000 000 0000"
              register={register}
              error={errors.tel?.message}
            />
          </div>
        </FormCard>

        <FormFooter isDirty={isDirty} />
        <div className="my-32"></div>
      </form>
    </HoldMyUi>
  );
};

export default ProfileEditForm;
