export const handleSearchCountryTest = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("No country found");
    }
    const countries = await response.json();
    return countries;
  } catch (error) {
    console.log(error);
  }
};

// export default handleSearchCountryTest;
