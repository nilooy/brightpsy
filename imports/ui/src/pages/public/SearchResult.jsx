import React from "react";
import StudioCard from "../../components/shared/Cards/StudioCard";
import { useHistory } from "react-router-dom";
import { useStudios } from "../../apiHooks/studio";

const SearchResult = () => {
  const history = useHistory();
  const { data: studios } = useStudios();
  console.log(studios);
  return (
    <>
    
      <div className="lg:px-72  ">
        <div className=" m-6">
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
                doctor={studio.user[0].profile}
              />
            ))}
        </div>
      </div>
      
    </>
  );
};

export default SearchResult;
