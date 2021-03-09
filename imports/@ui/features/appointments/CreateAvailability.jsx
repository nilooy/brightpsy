import FormCard from "@ui/components/Cards/FormCard";
import Input from "@ui/components/Form/Input";
import React, { useEffect, useState } from "react";
import { AiOutlineClockCircle } from "@react-icons/all-files/ai/AiOutlineClockCircle";
import { AiOutlineDelete } from "@react-icons/all-files/ai/AiOutlineDelete";
import { GrAdd } from "@react-icons/all-files/gr/GrAdd";
import HoldMyUi from "holdmyui";
import { Controller, useForm } from "react-hook-form";
import Grid from "@ui/components/Grid/Grid";
import { TimePicker } from "@material-ui/pickers";
import SwitchBox from "@ui/components/Form/SwitchBox";
import Container from "@ui/components/Basic/Container";
import { toast } from "react-toastify";

import {
  getFieldState,
  tranformTimeToDateObject,
  tranformDateObjectToTimeString,
} from "./availabilityFormHelper";
import {
  useAvailability,
  useAvailabilityUpdate,
} from "@ui/api-hooks/availability";

const MAX_ALLOWED_FIELDS = 4;

const CreateAvailability = () => {
  const { data: availabilities = {}, isLoading, refetch } = useAvailability();
  const availabilityUpdate = useAvailabilityUpdate();
  // This one for the fieldArray
  const {
    handleSubmit,
    register,
    control,
    formState: { isDirty, isSubmitting },
    reset,
  } = useForm({
    defaultValues: availabilities,
  });

  useEffect(() => {
    reset(tranformTimeToDateObject(availabilities));
  }, [availabilities]);

  const fieldState = getFieldState(control);

  useEffect(() => {
    createDefaultTimeslot((err, data) => {
      if (err) console.log(err);

      console.log(data);
    });
  }, []);

  const onSubmit = async (data) => {
    const formattedData = tranformDateObjectToTimeString(data);
    formattedData._id = availabilities._id;
    formattedData.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    console.log({ formattedData });

    availabilityUpdate.mutate(formattedData);

    if (availabilityUpdate.isSuccess) {
      toast("Disponibiltà aggiornato con successo", { autoClose: 2000 });
    }
  };

  const createDefaultTimeslot = (callback) => {
    Meteor.call("availability.createDefault", {}, callback);
  };

  const resetToDefaultTimeslot = () => {
    Meteor.call(
      "availability.resetToDefault",
      {
        data: { _id: availabilities._id },
      },
      (err) => {
        if (err) console.log(err);

        refetch();
      }
    );
  };

  const FormFooter = ({ isDirty }) => (
    <div className="fixed z-10 bottom-0 left-0 w-full py-4 sm:px-12 px-4 bg-gray-100 mt-6 flex justify-end rounded-bl rounded-br">
      <button
        className="btn text-sm focus:outline-none text-gray-600 border border-gray-300 py-2 px-6 mr-4 rounded hover:bg-gray-200 transition duration-150 ease-in-out"
        type="button"
        onClick={resetToDefaultTimeslot}
      >
        Reset to default
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
      when={isLoading || isSubmitting || availabilityUpdate.isLoading}
      preloader="Ripple"
      preloaderTop="50vh"
      color="#4ac959"
      type="fixed"
    >
      <Container>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full xl:w-9/12 m-auto"
        >
          <FormCard
            className="mt-12 p-4"
            title="Disponibiltà"
            TitleIcon={AiOutlineClockCircle}
          >
            {fieldState.map(({ label, name, fieldArr }) => (
              <Grid key={name} lg={4} xl={4} className="mt-4 border p-2">
                <div className="col-start-1 col-span-1 flex flex-col justify-center">
                  <SwitchBox
                    name={`${name}.isEnabled`}
                    label={label}
                    register={register}
                  />
                </div>

                <div className="col-start-2 col-span-2">
                  {fieldArr.fields.map((field, index) => (
                    <div className="flex" key={field.id}>
                      <Controller
                        control={control}
                        name={`${name}.timeSlots[${index}].from`}
                        defaultValue={field.from}
                        render={({ ref, ...rest }) => (
                          <TimePicker
                            clearable
                            margin="normal"
                            ampm={false}
                            id={name + "From"}
                            label="Dalle"
                            inputVariant="outlined"
                            {...rest}
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name={`${name}.timeSlots[${index}].to`}
                        defaultValue={field.to}
                        render={({ ref, ...rest }) => (
                          <TimePicker
                            clearable
                            margin="normal"
                            ampm={false}
                            id={name + "To"}
                            label="Alle"
                            format="HH:mm"
                            inputVariant="outlined"
                            {...rest}
                          />
                        )}
                      />

                      <span className="self-center">
                        {index ? (
                          <button
                            onClick={() => fieldArr.remove(index)}
                            type="button"
                            className="ml-2 text-xl"
                          >
                            <AiOutlineDelete />
                          </button>
                        ) : (
                          <div className="ml-6"></div>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
                {fieldArr.fields.length < MAX_ALLOWED_FIELDS && (
                  <div className="m-auto">
                    <button
                      onClick={() => {
                        fieldArr.append({ from: new Date(), to: new Date() });
                      }}
                      type="button"
                    >
                      <GrAdd />
                    </button>
                  </div>
                )}
              </Grid>
            ))}
          </FormCard>
          <div className="my-32"></div>
          <FormFooter isDirty={isDirty} />
        </form>
      </Container>
    </HoldMyUi>
  );
};

export default CreateAvailability;
