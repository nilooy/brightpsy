import FormCard from "@ui/components/Cards/FormCard";
import Input from "@ui/components/Form/Input";
import React from "react";
import { AiOutlineClockCircle } from "@react-icons/all-files/ai/AiOutlineClockCircle";
import { GrAdd } from "@react-icons/all-files/gr/GrAdd";
import { useForm } from "react-hook-form";
import Grid from "@ui/components/Grid/Grid";
import { TimePicker } from "@material-ui/pickers";
import SwitchBox from "@ui/components/Form/SwitchBox";

const CreateAvailability = () => {
  const {
    register,
    handleSubmit,
    errors,
    control,
    formState: { isDirty, isSubmitting },
    reset,
  } = useForm();

  const days = [
    "Domenica",
    "Lunedì",
    "Martedi",
    "Mercoledi",
    "Giovedi",
    "Venerdi",
  ];

  return (
    <>
      <form className="xl:w-9/12 m-auto">
        <FormCard
          className="mt-12 p-4"
          title="Disponibiltà"
          TitleIcon={AiOutlineClockCircle}
        >
          {days.map((day) => (
            <>
              <Grid lg={4} xl={4} className="mt-4">
                <SwitchBox name={day} label={day} />
                <TimePicker
                  clearable
                  label="Dalle"
                  ampm={false}
                  inputVariant="outlined"
                />
                <TimePicker
                  clearable
                  label="Alle"
                  ampm={false}
                  inputVariant="outlined"
                />
                <div className="m-auto">
                  <button type="button">
                    <GrAdd />
                  </button>
                </div>
              </Grid>
            </>
          ))}
        </FormCard>
      </form>
    </>
  );
};

export default CreateAvailability;
