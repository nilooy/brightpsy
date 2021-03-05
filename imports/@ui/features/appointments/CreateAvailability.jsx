import FormCard from "@ui/components/Cards/FormCard";
import Input from "@ui/components/Form/Input";
import React, { useEffect, useState } from "react";
import { AiOutlineClockCircle } from "@react-icons/all-files/ai/AiOutlineClockCircle";
import { AiOutlineDelete } from "@react-icons/all-files/ai/AiOutlineDelete";
import { GrAdd } from "@react-icons/all-files/gr/GrAdd";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import Grid from "@ui/components/Grid/Grid";
import { TimePicker } from "@material-ui/pickers";
import SwitchBox from "@ui/components/Form/SwitchBox";
import Container from "@ui/components/Basic/Container";
import { format } from "date-fns";
import {
  getFieldState,
  tranformTimeToDateObject,
} from "./availabilityFormHelper";
import { useAvailability } from "@ui/api-hooks/availability";

const MAX_ALLOWED_FIELDS = 4;

const CreateAvailability = () => {
  const { data: availabilities = {} } = useAvailability();

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

  // Will update the mainForm data when fieldArray changed
  /*   useEffect(() => {
    if (fieldValues) {
      Object.keys(fieldValues).forEach((item) => {
        register({ name: `${item}.timeSlots` });
        setValue(`${item}.timeSlots`, fieldValues[item]);
      });
    }
  }, [fieldValues]); */

  useEffect(() => {
    createDefaultTimeslot((err, data) => {
      if (err) console.log(err);

      console.log(data);
    });
  }, []);

  const onSubmit = async (data) => {
    /*    let formattedData = {};

    Object.keys(data).forEach((key) => {
      console.log(data[key].isEnabled);
      if (data[key].isEnabled)
        formattedData[key] = {
          from: data[key]?.from
            ? format(new Date(data[key].from), "kk:mm")
            : undefined,
          to: data[key]?.to
            ? format(new Date(data[key].to), "kk:mm")
            : undefined,
        };
    });

    console.log({ formattedData }); */

    console.log({ data });
  };

  const createDefaultTimeslot = (callback) => {
    Meteor.call("availability.createDefault", {}, callback);
  };

  const FormFooter = ({ isDirty }) => (
    <div className="fixed z-10 bottom-0 left-0 w-full py-4 sm:px-12 px-4 bg-gray-100 mt-6 flex justify-end rounded-bl rounded-br">
      <button className="btn text-sm focus:outline-none text-gray-600 border border-gray-300 py-2 px-6 mr-4 rounded hover:bg-gray-200 transition duration-150 ease-in-out">
        Vedi come l'altri
      </button>
      {/* {isDirty && ( */}
      <button
        className="bg-green-200 transition duration-150 ease-in-out hover:bg-green-300 rounded text-gray-800 font-medium px-8 py-2 text-sm focus:outline-none"
        type="submit"
      >
        Aggiorna
      </button>
      {/* )} */}
    </div>
  );

  console.log({ fieldState });

  return (
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
            <>
              <Grid lg={4} xl={4} className="mt-4 border p-2">
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
            </>
          ))}
        </FormCard>
        <div className="my-32"></div>
        <FormFooter isDirty={isDirty} />
      </form>
    </Container>
  );
};

export default CreateAvailability;
