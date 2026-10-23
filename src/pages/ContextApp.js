import React, { useState } from "react";
import SecondComponent from "../components/SecondComponent";
import FourthComponent from "../components/FourthComponent";
import { UserContext } from "../contexts/UserContext";

const ContextApp = () => {
  const [userName, setUserName] = useState("Lucas");

  return (
    <UserContext.Provider value={userName}>
      <div>
        <h1>Using Context API</h1>
        <SecondComponent />
        <FourthComponent />
        <p className="help is-size-7 mt-3">
          Context shares user state: Second nests Third; Third and Fourth read
          it with useContext and re-render when it changes.
        </p>
      </div>
    </UserContext.Provider>
  );
};

export default ContextApp;
