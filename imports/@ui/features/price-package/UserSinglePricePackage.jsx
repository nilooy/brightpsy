import React from "react";
import Container from "@ui/components/Basic/Container";
import { Carousel } from "react-responsive-carousel";
import DotBg from "@ui/assets/svg/DotBg";
import { useParams } from "react-router-dom";
import { usePricePackageById } from "@ui/api-hooks/price-package";

const UserSinglePricePackage = () => {
  const { id: packageId } = useParams();

  const { data: packageData = {} } = usePricePackageById(packageId);
  console.log(packageData);

  const { title, desc, images } = packageData;

  return (
    packageData && (
      <Container>
        <section className="mx-auto container py-12 lg:px-4 xl:px-0">
          <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row">
            <div className="flex flex-col lg:w-6/12 md:w-6/12 px-4 lg:px-0 justify-center p-2">
              <h1 className="text-5xl sm:text-6xl md:text-4xl lg:text-6xl font-extrabold leading-tight text-gray-800">
                {title}
              </h1>
              <p className="text-lg text-gray-600 font-light leading-relaxed pt-8">
                {desc}
              </p>
              <div className="mt-12 flex flex-wrap">
                <div className="mr-6 mt-5 sm:mt-0 md:mt-5 lg:mt-0">
                  <button className="focus:outline-none bg-green-700 transition duration-150 ease-in-out hover:bg-green-600 rounded text-white px-8 py-4 text-xl">
                    Get Started
                  </button>
                </div>
                <div className="mt-5 sm:mt-0 md:mt-5 lg:mt-0">
                  <button className="focus:outline-none transition duration-150 ease-in-out hover:bg-gray-200 rounded border border-green-600 text-green-600 px-8 py-4 text-xl">
                    Live Demo
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-6 md:mt-0 h-64 md:h-auto md:w-1/2 relative lg:mt-0 pl-6 sm:pl-20 pt-10 flex justify-end sm:block">
              <div className="ml-12 -mb-32 absolute left-0 w-5/6 h-full">
                <Carousel className="inset-0 absolute object-cover object-center z-10 shadow-md w-full h-full">
                  {images &&
                    images.map((img) => (
                      <div>
                        <img src={img} alt={img + "-" + packageId} />
                      </div>
                    ))}
                </Carousel>
              </div>
              <div className="absolute h-full w-full top-0 left-0 flex flex-col items-start">
                <DotBg />
              </div>
            </div>
          </div>
        </section>
      </Container>
    )
  );
};

export default UserSinglePricePackage;
