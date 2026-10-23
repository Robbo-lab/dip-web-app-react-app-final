// Step 1: The export statement should be fixed
export const getUserInfo = (user) => {
  return `Name: ${user.firstName} ${user.lastName}, Age: ${user.age}`;
};

// Step 3 fix the map method & fix duplicated method
export const formatSkills = function (skills) {
  return skills.map((skill) => skill.toUpperCase());
};

// APOD Basic does not require an API key.
export const buildApiUrl = (parameters) => {
  // The new API requires single dates in the URL path as YYMMDD, not a date query parameter.
  if (parameters.date) {
    return `https://science.nasa.gov/wp-json/wp/v2/apod-basic/${parameters.date.replaceAll("-", "").slice(2)}`;
  }

  let apiUrl = "https://science.nasa.gov/wp-json/wp/v2/apod-basic?";

  for (const key in parameters) {
    apiUrl += `${key}=${encodeURIComponent(parameters[key])}&`;
  }

  return apiUrl;
};
