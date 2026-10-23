import React, { useState, useEffect } from "react";

export default function LikesComponent() {
  console.log("Like Component Connected");
  const [likes, setLikes] = useState();
  const [dislikes, setDisLikes] = useState();

  const names = ["Ada Lovelace", "Grace Hopper", "Margaret Hamilton"];

  function Header() {
    return <h2 className="title is-2 has-text-text">Header</h2>;
  }

  function AlertMessage({ like }) {
    return !like ? (
      <div></div>
    ) : like == 1 ? (
      <div className="notification is-success">You recieved a like</div>
    ) : (
      <div className="notification is-danger">You recieved a dislike</div>
    );
  }

  function handleLikeClick() {
    !likes ? setLikes(1) : setLikes(likes + 1);
  }

  useEffect(() => {
    <AlertMessage like={1} />;
  }, [likes]);

  function handleDisLikeClick() {
    !dislikes ? setDisLikes(1) : setDisLikes(dislikes + 1);
  }

  useEffect(() => {
    <AlertMessage like={0} />;
  }, [dislikes]);

  console.log(likes);

  return (
    <>
      <section className="section py-4">
        <div className="container box has-text-text has-text-centered">
          <Header />
          <div>
            <ul className="mb-5">
              {names.map((name) => (
                <li key={name} className="py-2 has-text-weight-medium">{name}</li>
              ))}
            </ul>
            <button className="button is-success is-medium m-2" onClick={handleLikeClick}>
              Like
            </button>
            <button className="button is-danger is-medium m-2" onClick={handleDisLikeClick}>
              Dislike
            </button>
          </div>
        </div>
      </section>
      <section className="section py-4">
        <div className="container has-text-centered">
          <AlertMessage />
        </div>
      </section>
    </>
  );
}
