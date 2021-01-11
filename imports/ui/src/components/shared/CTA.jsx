import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { PricePackageContext } from "../../context/PricePackageContext";
import { StudioContext } from "../../context/StudioContext";
import { useTracker } from "meteor/react-meteor-data";
import { privatePath } from "../../routes/privatePath";

function CTA() {
  const { selectedStudio } = useContext(StudioContext);
  const { pricePackages } = useContext(PricePackageContext);
  const user = useTracker(() => Meteor.user());

  const history = useHistory();

  return (
    <button
      className="flex items-center justify-between p-4 mb-8 text-sm font-semibold text-purple-100 bg-purple-600 rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple"
      href="https://github.com/estevanmaito/windmill-dashboard-react"
      onClick={() =>
        history.push(
          selectedStudio ? privatePath.packagesCreate : privatePath.studioCreate
        )
      }
    >
      <div className="flex items-center">
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        <span>Benvenuto {user?.profile?.firstName} a Studio Psicologi</span>
      </div>
      {selectedStudio ? (
        <span>
          Crea Paccetti{" "}
          <span dangerouslySetInnerHTML={{ __html: "&RightArrow;" }}></span>
        </span>
      ) : (
        <span>
          Crea Studio per iniziare{" "}
          <span dangerouslySetInnerHTML={{ __html: "&RightArrow;" }}></span>
        </span>
      )}
    </button>
  );
}

export default CTA;
