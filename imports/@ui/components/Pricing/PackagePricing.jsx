import React from "react";
import { AiOutlineCheckCircle } from "@react-icons/all-files/ai/AiOutlineCheckCircle";

const PackagePricing = ({ title, visits, color, onBuy }) => {
  const { price, numOfVisits } = visits;

  const perVisits =
    Math.round((price / numOfVisits + Number.EPSILON) * 100) / 100;

  return (
    <div className="py-5 px-4 border border-gray-200 shadow rounded-lg text-center ">
      <h4 className={`text-2xl text-${color}-700 font-semibold pb-8`}>
        {title}
      </h4>
      <ul className="flex flex-col mb-2">
        <li className="flex items-center self-center">
          <AiOutlineCheckCircle className={`text-${color}-700 mr-1`} />
          <p className="text-gray-500 text-base font-normal">
            {numOfVisits} Sedute
          </p>
        </li>
      </ul>
      <p className={`text-base text-${color}-700 relative pl-3`}>
        <span className="text-2xl font-semibold">{perVisits}</span>
        <span className="font-light text-lg">&euro;</span>
        <span className="font-light text-lg ml-1">/sedute</span>
      </p>

      <p
        className={`text-md text-${color}-700 bg-${color}-100 relative pl-3 mt-3 rounded-2xl`}
      >
        <span className="font-light text-lg">Totale: </span>
        <span className="text-xl font-semibold">
          {(perVisits * numOfVisits).toFixed(2)}
        </span>
        <span className="font-light text-lg">&euro;</span>
      </p>
      <button
        onClick={() => onBuy(perVisits)}
        className="mt-5 w-full bg-gray-200 hover:bg-gray-300 focus:outline-none transition duration-150 ease-in-out rounded text-${color}-700 px-8 py-3 text-base font-semibold"
      >
        Acquista
      </button>
    </div>
  );
};

export default PackagePricing;
