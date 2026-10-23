import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const ThirdComponent = () => {
  const userName = useContext(UserContext);
  return (
    <div>
      <h3>Third Component: User is {userName}</h3>
    </div>
  );
};

export default ThirdComponent;
