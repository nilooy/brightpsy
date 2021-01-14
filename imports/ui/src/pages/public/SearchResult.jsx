import React from "react";
import StudioCard from "../../components/shared/Cards/StudioCard";
import { useTracker } from "meteor/react-meteor-data";
import { Studios } from "../../../../api/services/studio/models/StudioCollection";
import { useHistory } from "react-router-dom";

const SearchResult = () => {
  const history = useHistory();
  const { studios, isLoadingStudio } = useTracker(() => {
    const noDataAvailable = { studios: [] };

    const handler = Meteor.subscribe("studios.public.getAll");

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const studios = Studios.find().fetch();

    return { studios };
  });

  return (
    <>
      <div className="lg:px-72">
        <div className="">
          {studios &&
            studios.map((studio) => (
              <StudioCard
                key={studio._id}
                onClick={() => history.push("/studio/" + studio._id)}
                title={studio.name}
                address={studio.address}
                desc={studio?.desc?.substring(0, 100) + " ..."}
                tags={studio.tags}
                imageUrl={studio.imageUrl}
                online={studio.online}
                physical={studio.physical}
                doctor={studio.doctor}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default SearchResult;
