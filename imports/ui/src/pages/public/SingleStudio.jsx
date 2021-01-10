import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Studios } from "../../../../api/services/studio/models/StudioCollection";
import { PricePackages } from "../../../../api/services/pricePackages/models/PricePackageCollection";
import { useHistory, useParams } from "react-router-dom";
import { Card, CardBody, Button } from "@windmill/react-ui";

const SingleStudio = () => {
  const { id } = useParams();
  const history = useHistory();

  const { studio, pricePackages, isLoadingStudio } = useTracker(() => {
    const noDataAvailable = { studio: [] };

    const handler = Meteor.subscribe("studios.getById", id);

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const studio = Studios.find().fetch()[0];

    const pricePackages = PricePackages.find().fetch();

    return { studio, pricePackages };
  });

  console.log(studio);

  if (!studio) return null;

  return (
    <div>
      <section className="relative block" style={{ height: "500px" }}>
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage: `url('${studio.imageUrl}')`,
          }}
        >
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-50 bg-black"
          ></span>
        </div>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
          style={{ height: "70px", transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-gray-300 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </section>
      <section className="relative py-16 bg-gray-300">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    <img
                      alt="..."
                      src={studio.imageUrl}
                      className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                      style={{
                        maxWidth: "150px",
                        height: "150px",
                        width: "150px",
                      }}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="flex py-6 px-3 mt-32 sm:mt-0">
                    <button
                      className="bg-blue-500 active:bg-blue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                      onClick={() => history.push("/login")}
                    >
                      Message
                    </button>
                    <button
                      className="bg-blue-500 active:bg-blue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                      onClick={() => history.push("/login")}
                    >
                      Appointment
                    </button>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                        22
                      </span>
                      <span className="text-sm text-gray-500">Anni</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                        10
                      </span>
                      <span className="text-sm text-gray-500">Psicologi</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                        5
                      </span>
                      <span className="text-sm text-gray-500">Star</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
                  {studio.name}
                </h3>
                {studio.address && (
                  <div className="text-sm leading-normal mt-0 mb-1 text-gray-500 ">
                    Indirizzo: {studio.address}
                  </div>
                )}
                {studio.email && (
                  <div className="text-sm leading-normal mt-0 mb-1 text-gray-500 ">
                    Email: {studio.email}
                  </div>
                )}
                {studio.tel && (
                  <div className="text-sm leading-normal mt-0 mb-1 text-gray-500 ">
                    Tel: {studio.tel}
                  </div>
                )}
                <div className="mb-2 text-gray-700">
                  <i className="fas fa-briefcase mr-2 text-lg text-gray-500"></i>
                </div>
                <div className="mb-2 text-gray-700">
                  {studio.online ? "online" : ""}
                  {" - "}
                  {studio.physical ? "In presenza" : ""}
                </div>
                <div className="px-3 pb-4">
                  {studio.tags &&
                    studio.tags.map((tag) => (
                      <p
                        key={tag.id}
                        className="inline-block px-3 py-1 my-1 mr-2 text-xs font-semibold text-white bg-teal-400 rounded-full"
                      >
                        #{tag.text}
                      </p>
                    ))}
                </div>
              </div>
              <div className="mt-10 py-10 border-t border-gray-300 text-center ">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4 bg-gray-100">
                    <p className="mb-4 text-sm leading-relaxed text-gray-800">
                      <b>Descrizione: </b> {" " + studio.desc}
                    </p>
                  </div>
                </div>

                <div>
                  <h1 className="text-gray-600 text-3xl text-center my-2">
                    Packages
                  </h1>

                  <div className="grid gap-6 mb-8 md:grid-cols-4 p-2">
                    {pricePackages &&
                      pricePackages.map((item) => (
                        <Card
                          key={item._id}
                          className="flex h-full bg-gray-100 shadow-lg"
                        >
                          <CardBody>
                            <p className="mb-4 font-semibold text-gray-600 text-3xl dark:text-gray-300">
                              {item.title}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 p-2">
                              {item.desc}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                              {item.quantity} Sedute
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                              {item.hours} Ore
                            </p>
                            <p className="dark:text-gray-400 text-3xl text-green-400">
                              {item.cost} €
                            </p>
                          </CardBody>
                        </Card>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleStudio;
