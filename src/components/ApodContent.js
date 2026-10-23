import React from "react";

// Activity 4 - add the retrieved data & implement the template
const ApodContent = ({ apodData, error }) => {
  if (error) {
    return <p className="notification is-danger" role="alert">{error}</p>;
  }
  // console.log(apodData);
  // Step 3 - add a default value for the data
  if (!apodData) {
    return (
      <p className="has-text-centered">
        Please enter parameters and click "Fetch APOD".
      </p>
    );
  }

  if (apodData.length === 0) {
    return <p className="has-text-centered">No APOD entries found.</p>;
  }

  return (
    // template
    <div>
      {/* Step 2: Now change this to a ternary */}
      {apodData.map((data, index) => {
        const explanation = new DOMParser()
          .parseFromString(data.explanation || "", "text/html")
          .body.textContent;

        return (
          <div key={index} className="box">
            {data.media_type === "image" && data.hdurl ? (
              <figure className="image is-4by3">
                <img src={data.hdurl} alt={data.title} loading="lazy" />
              </figure>
            ) : (
              <div key={index} className="box">
                <div className="video-container">
                  <a href={data.permalink || data.url} target="_blank" rel="noopener noreferrer">
                    View this {data.media_type === "image" ? "image" : "media"} on NASA
                  </a>
                </div>
              </div>
            )}
            <h2 className="title is-4">{data.title}</h2>
            <p>{data.date}</p>
            <p>{explanation}</p>
          </div>
        );
      })}
    </div>
  );
};
export default ApodContent;
