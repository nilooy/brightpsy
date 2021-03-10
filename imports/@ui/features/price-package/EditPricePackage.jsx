import Input from "@ui/components/Form/Input";
import TextArea from "@ui/components/Form/TextArea";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineInfoCircle } from "@react-icons/all-files/ai/AiOutlineInfoCircle";
import { AiOutlineClockCircle } from "@react-icons/all-files/ai/AiOutlineClockCircle";
import { AiFillMinusCircle } from "@react-icons/all-files/ai/AiFillMinusCircle";
import { CgSpinnerTwoAlt } from "@react-icons/all-files/cg/CgSpinnerTwoAlt";
import FormCard from "@ui/components/Cards/FormCard";
import Creatable from "react-select/creatable";
import SwitchBox from "@ui/components/Form/SwitchBox";
import { Controller, useForm } from "react-hook-form";
import { methodCall } from "@ui/utils/asyncMeteorMethod";
import { toast } from "react-toastify";
import HoldMyUi from "holdmyui";
import { useTags } from "@ui/api-hooks/tag";
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@windmill/react-ui";
import Select from "@ui/components/Form/Select";
import { usePackageImage } from "@ui/api-hooks/file";
import { usePricePackageById } from "@ui/api-hooks/price-package";
import { useHistory, useParams } from "react-router-dom";
import Confirmation from "@ui/components/Modal/Confirmation";
import { privatePath } from "@ui/routes/privatePath";

const EditPricePackage = () => {
  const history = useHistory();
  const uploadInput = useRef();
  const { id: packageId } = useParams();
  const { data: packageData } = usePricePackageById(packageId);
  const { data: savedTags } = useTags();

  const tagsSuggestion = savedTags?.map((tag) => ({
    value: tag?.text,
    label: tag?.text,
  }));

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [images, setImages] = useState([]);

  const {
    register,
    handleSubmit,
    errors,
    control,
    formState: { isDirty, isSubmitting },
    reset,
    watch,
  } = useForm({
    defaultValues: packageData,
  });

  useEffect(() => {
    if (packageData) {
      console.log(packageData);
      reset(packageData);
      setImages(packageData.images);
    }
  }, [packageData]);

  const setImagesOnUpload = (image) => {
    setImages([image, ...images]);
    uploadInput.current.value = [];
  };

  const imageMutation = usePackageImage(setImagesOnUpload);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    file.field = e.target.name;
    imageMutation.mutate(file);
    console.log(imageMutation);
  };

  const onSubmit = async (data) => {
    console.log(data);
    data._id = packageData._id;
    data.images = images;
    try {
      const res = await methodCall("pricePackage.create", { data });
      toast("Package created successfully", { autoClose: 2000 });
      history.push(privatePath.packages);
    } catch (error) {
      toast.error("Something went wrong", { autoClose: 2000 });
    }

    // TODO: add better error handling
    // setError('username', 'validate');
  };

  const onDeleteConfirm = async () => {
    try {
      const res = await methodCall("pricePackage.remove", {
        id: packageData._id,
      });
      history.push(privatePath.packages);
      toast.warning("Package Deleted", { autoClose: 2000 });
    } catch (error) {
      toast.error("Something went wrong", { autoClose: 2000 });
    }
  };

  console.log({ packageData });

  const FormFooter = ({ isDirty }) => (
    <div className="fixed z-10 bottom-0 left-0 w-full py-4 sm:px-12 px-4 bg-gray-100 mt-6 flex justify-end rounded-bl rounded-br">
      <button
        onClick={() => setDeleteConfirmationOpen(true)}
        className="btn text-sm focus:outline-none text-red-600 border py-2 px-6 mr-4 rounded hover:bg-gray-200 transition duration-150 ease-in-out"
        type="button"
      >
        Remove
      </button>
      <button
        type="button"
        className="btn text-sm focus:outline-none text-gray-600 border border-gray-300 py-2 px-6 mr-4 rounded hover:bg-gray-200 transition duration-150 ease-in-out"
      >
        Draft
      </button>
      {/* Submit button */}
      <button
        className="bg-green-200 transition duration-150 ease-in-out hover:bg-green-300 rounded text-gray-800 font-medium px-8 py-2 text-sm focus:outline-none"
        type="button"
        onClick={handleSubmit(onSubmit)}
      >
        Aggiorna
      </button>

      <Confirmation
        onConfirm={onDeleteConfirm}
        isOpen={deleteConfirmationOpen}
        setOpen={setDeleteConfirmationOpen}
        title="Sei sicuro di remuovere"
      />
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
      {/* To prevent submit the form on pressing enter, adding onClick on the button instead of onSubmit form */}
      <form className="xl:w-9/12 m-auto">
        <FormCard
          className="mt-12 p-4"
          title={"Modifica il pachetto"}
          TitleIcon={AiOutlineInfoCircle}
        >
          <Input
            name="title"
            label="Titolo"
            placeholder="eg: Consulenza di solitudine"
            register={register({ required: true, maxLength: 80 })}
            error={errors.firstName?.message}
          />

          <div>
            <label htmlFor={"mode"} className="text-sm font-bold text-gray-800">
              Modalita del pachetto
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

          <div className="flex flex-col w-full my-3">
            <label
              htmlFor={"tags"}
              className="pb-4 text-sm font-bold text-gray-800"
            >
              Tags
            </label>

            <Controller
              as={Creatable}
              id="tags"
              name="tags"
              isMulti
              options={tagsSuggestion?.length ? tagsSuggestion : undefined}
              control={control}
            />
          </div>

          <TextArea
            label="Descrizione"
            name="desc"
            helpText="Character Limit: 1000"
            register={register({ maxLength: 1000 })}
            error={errors.bio?.message}
          />
        </FormCard>

        <FormCard
          className="p-4 bg-green-100"
          title="Sedute"
          TitleIcon={AiOutlineInfoCircle}
        >
          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell className="flex">
                    <p>Nota:</p>{" "}
                    <small className="ml-2 text-gray-400">
                      Scrivi 0 per gratis (eg: 1 Sedute: 0)
                    </small>
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="flex">
                      <p className="w-full self-center text-center bg-gray-200 py-3">
                        Durata del sedute
                      </p>
                      <Input
                        name="duration"
                        type="number"
                        placeholder="Minuti"
                        error={errors.duration?.message}
                        register={register}
                        suffix={
                          <div className="p-2 bg-green-200">
                            <AiOutlineClockCircle className="text-3xl  flex flex-col justify-center" />
                          </div>
                        }
                      />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Input
                      name="visits[0].price"
                      placeholder="Prezzo"
                      register={register({ required: true })}
                      error={errors.price?.message}
                      suffix="&euro;"
                      prefix={
                        <Select
                          name="visits[0].numOfVisits"
                          options={[1]}
                          defaultValue={1}
                          readOnly={true}
                          register={register({ required: true })}
                        />
                      }
                      required
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Input
                      name="visits[1].price"
                      placeholder="Prezzo"
                      register={register}
                      error={errors.price?.message}
                      suffix="&euro;"
                      register={register({ required: true })}
                      prefix={
                        <Select
                          name="visits[1].numOfVisits"
                          options={[3, 4, 5]}
                          defaultValue={3}
                          register={register}
                          register={register({ required: true })}
                        />
                      }
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Input
                      name="visits[2].price"
                      placeholder="Prezzo"
                      register={register}
                      error={errors.price?.message}
                      suffix="&euro;"
                      register={register({ required: true })}
                      prefix={
                        <Select
                          name="visits[2].numOfVisits"
                          register={register}
                          options={[6, 7, 8, 9, 10]}
                          defaultValue={10}
                          register={register({ required: true })}
                        />
                      }
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </FormCard>
        <FormCard
          className="p-4 bg-green-100"
          title="Foto"
          TitleIcon={AiOutlineInfoCircle}
        >
          <p className="text-gray-400 ml-3">Si può caricare max 3 foto</p>
          <div id="upload-box">
            {images.length !== 3 && (
              <button
                className="bg-blue-600 transition duration-150 ease-in-out hover:bg-green-300 rounded text-white font-medium px-8 py-2 text-xl focus:outline-none flex"
                type="button"
                onClick={() => uploadInput.current.click()}
              >
                {imageMutation.isLoading && (
                  <CgSpinnerTwoAlt className="self-center mr-2 animate-spin" />
                )}
                Carica Foto
              </button>
            )}
            <input
              type="file"
              className="hidden"
              ref={uploadInput}
              onChange={handleImageUpload}
            />
            <input ref={register} name="images" className="hidden" />
          </div>
          <div className="container w-11/12 mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-12 gap-8">
            {images.length ? (
              images.map(
                (img, index) =>
                  img && (
                    <div className="relative border-4 border-gray-300 p-2">
                      <img key={img} src={img} alt={img + "-packages"} />
                      <AiFillMinusCircle
                        className="bg-gray-100 text-red-500 text-3xl absolute top-0 right-0 shadow-lg rounded-full cursor-pointer hover:text-3xl"
                        onClick={() =>
                          setImages(images.filter((i) => i !== img))
                        }
                      />
                    </div>
                  )
              )
            ) : (
              <div className="border-6 rounded-2xl shadow-lg border-white bg-gray-300 w-64 h-64 flex justify-center flex-col text-2xl p-2 text-gray-600 text-center">
                <p>Nessun foto caricate</p>
              </div>
            )}
          </div>
        </FormCard>
        <FormFooter isDirty={isDirty} />
      </form>
      <div className="my-32"></div>
    </HoldMyUi>
  );
};

export default EditPricePackage;
