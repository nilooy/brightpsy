import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import ThemedSuspense from "../../components/shared/ThemedSuspense";

const Home = () => {
  const history = useHistory();

  useEffect(() => {
    if (Meteor.useId) {
      history.push("/dashboard");
    } else {
      setTimeout(() => {
        history.push("/dashboard");
      }, 1500);
    }
  }, []);

  return <ThemedSuspense />;
};

export default Home;
