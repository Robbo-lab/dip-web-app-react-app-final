import React, { useState } from "react";
import ApodForm from "../components/ApodForm";
import ApodContent from "../components/ApodContent";
import { buildApiUrl } from "../utils/utils.js";

export default function ApodPage() {
  // Here you can manage state and logic related to both ApodForm and ApodContent
  const [apodData, setApodData] = useState(null);
  const [error, setError] = useState("");

  const fetchApodData = async (params) => {
    setApodData(null);
    setError("");

    try {
      const apiUrl = buildApiUrl(params);
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || `Request failed (${response.status})`);
      }
      setApodData(Array.isArray(data) ? data : [data]);
    } catch (err) {
      setError(`Error fetching data: ${err.message}`);
    }
  };

  return (
    <div>
      <ApodForm fetchApodData={fetchApodData} />
      <ApodContent apodData={apodData} error={error} />
    </div>
  );
}
