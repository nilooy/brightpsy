import { useSearchQuery } from "@ui/api-hooks/helper";
import { usePricePackageById } from "@ui/api-hooks/price-package";
import { useUserData } from "@ui/api-hooks/user";
import { privatePath } from "@ui/routes/privatePath";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const PaymentSuccess = () => {
  const history = useHistory();
  const searchQuery = useSearchQuery();
  const sessionId = searchQuery.get("session_id");

  const [packageId, setPackageId] = useState("");

  const { data: packageData = {} } = usePricePackageById(packageId);

  useEffect(() => {
    Meteor.call("stripe.checkoutSuccess", { sessionId }, (err, data) => {
      if (err) console.log(err);

      setPackageId(data.packageId);
    });
  }, [sessionId]);

  return (
    <section className="max-w-8xl pt-16 mx-auto container bg-white">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 px-4 md:px-2 lg:px-12 py-10 flex items-center">
          <img className="rounded" src="/img/undraw_mindfulness_scgo.png" alt />
        </div>
        <div className="flex flex-col justify-center w-full md:w-1/2 px-4 md:pr-12">
          <div className="pl-4">
            <h3 className="text-4xl font-bold leading-tight text-gray-800">
              Your order have been proceed successfully
            </h3>
            <p className="text-xl text-gray-600 leading-normal pt-4">
              We are waiting for the psycologist to fix a date soon for the
              appointment. You can also chat with the psycologist if you have
              any doubts but we recommend to wait for at least an hour after the
              order to the psycologist to fix the appointment
            </p>
            <div className="flex flex-wrap">
              <button
                onClick={() =>
                  history.push(privatePath.inboxById(packageData.userId))
                }
                className="my-8 lg:mb-0 bg-green-200 transition duration-150 ease-in-out hover:bg-green-300 focus:outline-none rounded text-green-700 px-8 py-4 text-xl"
              >
                Chatta
              </button>
              <button className="my-8 mx-2 lg:mb-0 bg-blue-200 transition duration-150 ease-in-out hover:bg-blue-300 focus:outline-none rounded text-blue-700 px-8 py-4 text-xl">
                Vai a pagina di ordine
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSuccess;
