//Set break points where you lose the code
import React, { useState, useEffect } from "react";

function Lifecycle() {
  const [count, setCount] = useState(["anything"]);

  useEffect(() => {
    return () => {
      // console.log("Component will unmount");
    };
  }, [count]);

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <>
      <h1 className="title is-3 has-text-text">Lifecycle Monitor</h1>
      <p className="is-size-4 has-text-weight-semibold mb-5 has-text-text">
        Count: {count}
      </p>
      <button className="button is-link is-medium" onClick={incrementCount}>
        Increment
      </button>
      <p className="help is-size-7 mt-3">State, effects, and cleanup.</p>
    </>
  );
}

export default Lifecycle;
