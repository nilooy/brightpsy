import React from "react";
import { Studios } from "../../../../api/services/studio/models/StudioCollection";
import { useTracker } from "meteor/react-meteor-data";
import PageTitle from "../../components/shared/Typography/PageTitle";
import { Card, CardBody, Button } from "@windmill/react-ui";
import StudioCard from "../../components/shared/Cards/StudioCard";
import { useHistory } from "react-router-dom";
import { privatePath } from "../../routes/privatePath";

const UserSearch = () => {
  const history = useHistory();

  const { studios, isLoadingStudio } = useTracker(() => {
    const noDataAvailable = { studios: [] };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe("studios.public.getAll");

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const studios = Studios.find().fetch();

    return { studios };
  });

  return (
    <>
      <div className="flex justify-between mt-3 mb-2">
        <PageTitle>Studios</PageTitle>
      </div>

      <div className="lg:px-20">
        <div className="">
          {studios &&
            studios.map((studio) => (
              <StudioCard
                key={studio._id}
                onClick={() => history.push(privatePath.studioById(studio._id))}
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

export default UserSearch;
