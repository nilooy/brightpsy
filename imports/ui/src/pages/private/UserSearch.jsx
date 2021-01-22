import React from "react";
import PageTitle from "../../components/shared/Typography/PageTitle";
import StudioCard from "../../components/shared/Cards/StudioCard";
import { useHistory } from "react-router-dom";
import { privatePath } from "../../routes/privatePath";
import { useStudios } from "../../apiHooks/studio";

const UserSearch = () => {
  const history = useHistory();

  const { data: studios } = useStudios();

  return (
    <>
      <div className="flex justify-between mt-3 mb-2">
        <PageTitle>Studios</PageTitle>
      </div>

      <div className="lg:px-20">
        <div className="m-6">
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
