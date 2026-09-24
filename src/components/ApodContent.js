import React from "react";

// Activity 4 - add the retrieved data & implement the template
const ApodContent = ({ apodData }) => {
  // console.log(apodData);
  // Step 3 - add a default value for the data
  if (!apodData) {
    return (
      <p className="has-text-centered">
        Please enter parameters and click "Fetch APOD".
      </p>
    );
  }

  return (
    // template
    <div>
      {/* Step 2: Now change this to a ternary */}
      {apodData.map((data, index) => {
        return (
          <div key={index} className="box">
            {data.media_type === "image" ? (
              <figure className="image is-4by3">
                <img src={data.url} alt={data.title} />
              </figure>
            ) : (
              <div key={index} className="box">
                <div className="video-container">
                  <video
                    className="image is-4by3"
                    width="640"
                    height="360"
                    controls
                  >
                    <source src={data.url} type="video/mp4"></source>
                    Your browser does not support the video tag
                  </video>
                </div>
                <h2 className="title is-4">{data.title}</h2>
                <p>{data.explanation}</p>
              </div>
            )}
            <h2 className="title is-4">{data.title}</h2>
            <p>{data.explanation}</p>
          </div>
        );
      })}
    </div>
  );
};
export default ApodContent;
