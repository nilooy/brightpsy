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
          title="Professional Information"
          TitleIcon={AiOutlineInfoCircle}
        >
          <div className="container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
            <Input
              type="number"
              name="experience"
              label="Anni di Esperienza"
              placeholder="Lascia vuoto se non hai esperienza"
              register={register}
              error={errors.experience?.message}
            />

            <Input
              type="number"
              name="identity_numb"
              label="Alma ID"
              placeholder="Numero registrato a Alma"
              register={register({ required: true, maxLength: 5 })}
              error={errors.identity_numb?.message}
            />
          </div>

          <div className="flex flex-col w-full my-3">
            <label
              htmlFor={"languages"}
              className="pb-4 text-sm font-bold text-gray-800"
            >
              Languages
            </label>

            <Controller
              as={Select}
              id="languages"
              name="languages"
              isMulti
              getOptionLabel={(x) => x.language}
              getOptionValue={(x) => x.code}
              options={languageOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              control={control}
            />
          </div>

          <div>
            <label htmlFor={"mode"} className="text-sm font-bold text-gray-800">
              Modalita
            </label>

            <div className="container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 mt-3">
              <div className="border p-2">
                <SwitchBox
                  name="isPhysical"
                  label="In presenza"
                  helpText="Sedute in studio"
                  register={register}
                  error={errors.isPhysical?.message}
                />
              </div>
              <div className="border p-2">
                <SwitchBox
                  name="isVirtual"
                  label="Virtuale"
                  helpText="Sedute online"
                  register={register}
                  error={errors.isVirtual?.message}
                />
              </div>
            </div>
          </div>
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

        <FormCard
          className="mt-12 p-4"
          title="Social Informations"
          TitleIcon={AiOutlineInfoCircle}
        >
          <Input
            name="facebook"
            label="Facebook"
            placeholder="Facebook page or id link"
            register={register}
            error={errors.facebook?.message}
          />
          <Input
            name="instagram"
            label="Instagram"
            placeholder="Instagram link"
            register={register}
            error={errors.instagram?.message}
          />
          <Input
            name="twitter"
            label="Twitter"
            placeholder="Twitter link"
            register={register}
            error={errors.twitter?.message}
          />
          <Input
            name="youtube"
            label="Youtube"
            placeholder="Youtube channel link"
            register={register}
            error={errors.youtube?.message}
          />
        </FormCard>
        <FormFooter isDirty={isDirty} />
        <div className="my-32"></div>
      </form>
    </HoldMyUi>
  );
};

export default ProfileEditForm;
