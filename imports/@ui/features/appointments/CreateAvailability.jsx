import FormCard from "@ui/components/Cards/FormCard";
import Input from "@ui/components/Form/Input";
import React from "react";
import { AiOutlineClockCircle } from "@react-icons/all-files/ai/AiOutlineClockCircle";
import { GrAdd } from "@react-icons/all-files/gr/GrAdd";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import Grid from "@ui/components/Grid/Grid";
import { TimePicker } from "@material-ui/pickers";
import SwitchBox from "@ui/components/Form/SwitchBox";
import Container from "@ui/components/Basic/Container";
import { format } from "date-fns";

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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "test",
  });

  const days = [
    { label: "Domenica", name: "sun" },
    { label: "Lunedì", name: "mon" },
    { label: "Martedi", name: "tue" },
    { label: "Mercoledi", name: "wed" },
    { label: "Giovedi", name: "thu" },
    { label: "Venerdi", name: "fri" },
    { label: "Sabato", name: "sat" },
  ];

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

  console.log({ ss: watch() });

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
          {days.map(({ label, name }) => (
            <>
              <Grid lg={3} xl={3} className="mt-4">
                <SwitchBox
                  name={`${name}.isEnabled`}
                  label={label}
                  register={register}
                />

                <Grid>
                  {fields.map((field, index) => (
                    <span key={field.id}>
                      <Controller
                        control={control}
                        name={`${name}[${{ index }}].from`}
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
                        name={`${name}[${{ index }}].to`}
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
                    </span>
                  ))}
                </Grid>

                <div className="m-auto">
                  <button
                    onClick={() => append({ from: "", to: "" })}
                    type="button"
                  >
                    <GrAdd />
                  </button>
                </div>
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
