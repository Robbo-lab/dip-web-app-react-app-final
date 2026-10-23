import React, { useState } from "react";

const ApodForm = ({ fetchApodData }) => {
  const [date, setDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [count, setCount] = useState(5);

  const handleSubmit = () => {
    const parameters = {};

    if (startDate)
      parameters.date_from = startDate.replaceAll("-", "").slice(2);
    if (endDate) parameters.date_to = endDate.replaceAll("-", "").slice(2);
    if (count) parameters.per_page = count;
    if (date) parameters.date = date;

    fetchApodData(parameters);
  };

  return (
    <>
      <div className="container">
        <h1 className="title">NASA Astronomy Picture of the Day</h1>

        <div className="field">
          <label className="label">Date (YYYY-MM-DD)</label>
          <div className="control">
            <input
              id="date"
              className="input"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Start Date (YYYY-MM-DD)</label>
          <div className="control">
            <input
              id="start_date"
              className="input"
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">End Date (YYYY-MM-DD)</label>
          <div className="control">
            <input
              id="end_date"
              className="input"
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">
            Results per page (1–25; list requests only)
          </label>
          <div className="control">
            <input
              id="count"
              min="1"
              max="25"
              className="input"
              type="number"
              value={count}
              onChange={(event) => setCount(event.target.value)}
            />
          </div>
        </div>

        <div className="field m-4">
          <div className="control">
            <button
              id="fetch-apod"
              className="button is-link"
              type="submit"
              onClick={handleSubmit}
            >
              Fetch APOD
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApodForm;
