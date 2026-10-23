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
    <div className="box has-text-text has-text-centered mt-5 p-5">
      <h1 className="title is-3 has-text-text">Lifecycle Monitor</h1>
      <p className="is-size-4 has-text-weight-semibold mb-5 has-text-text">Count: {count}</p>
      <button className="button is-link is-medium" onClick={incrementCount}>Increment</button>
    </div>
  );
}

export default Lifecycle;
