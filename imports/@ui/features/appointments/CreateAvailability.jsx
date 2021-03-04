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
import { getUniqueId } from "@ui/utils/helpers";

const initialState = [
  { label: "Domenica", name: "sun", fields: [getUniqueId()] },
  { label: "Lunedì", name: "mon", fields: [getUniqueId()] },
  { label: "Martedi", name: "tue", fields: [getUniqueId()] },
  { label: "Mercoledi", name: "wed", fields: [getUniqueId()] },
  { label: "Giovedi", name: "thu", fields: [getUniqueId()] },
  { label: "Venerdi", name: "fri", fields: [getUniqueId()] },
  { label: "Sabato", name: "sat", fields: [getUniqueId()] },
];

const MAX_ALLOWED_FIELDS = 4;

const CreateAvailability = () => {
  const {
    register,
    handleSubmit,
    errors,
    control,
    formState: { isDirty, isSubmitting },
    reset,
    watch,
  } = useForm();

  const [days, setDays] = useState(initialState);

  useEffect(() => {
    createDefaultTimeslot((err, data) => {
      if (err) console.log(err);

      console.log(data);
    });
  }, []);

  console.log(watch());

  const onSubmit = async (data) => {
    let formattedData = {};

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

    console.log({ formattedData });

    /*    Meteor.call("availability.create", { data: formattedData }, (err, data) => {
      if (err) console.log(err);

      console.log({ success: data });
    }); */
  };

  const createDefaultTimeslot = (callback) => {
    Meteor.call("availability.createDefault", {}, callback);
  };

  const addTimeSlot = (name) => {
    setDays(
      days.map((day) =>
        day.name === name && day.fields.length < MAX_ALLOWED_FIELDS
          ? { ...day, fields: [...day.fields, getUniqueId()] }
          : day
      )
    );
  };

  const removeTimeSlot = (name, index) => {
    setDays(
      days.map((day) => {
        console.log(
          day.name === name
            ? { ...day, fields: day.fields.filter((field) => field === index) }
            : day
        );
        return day.name === name
          ? { ...day, fields: day.fields.filter((field) => field === index) }
          : day;
      })
    );
  };

  console.log({ days });

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
          {days.map(({ label, name, fields }) => (
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
                  {fields.map((index) => (
                    <div className="flex" key={name + index} id={name + index}>
                      <Controller
                        control={control}
                        name={`${name}[${{ index }}].from`}
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
                        name={`${name}[${{ index }}].to`}
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
                        <button
                          onClick={() => removeTimeSlot(name, index)}
                          type="button"
                          className="ml-2 text-xl"
                        >
                          <AiOutlineDelete />
                        </button>
                      </span>
                    </div>
                  ))}
                </div>
                {fields.length < MAX_ALLOWED_FIELDS && (
                  <div className="m-auto">
                    <button onClick={() => addTimeSlot(name)} type="button">
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
