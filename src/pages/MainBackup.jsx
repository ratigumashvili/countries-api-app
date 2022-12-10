import LoadingSpinner from "../components/ui/LoadingSpinner";

import { useState, useEffect, useRef } from "react";

const URL = `https://restcountries.com/v2/`;
const REGIONS = [
  { id: 1, name: "Africa", value: "africa" },
  { id: 2, name: "Americas", value: "americas" },
  { id: 3, name: "Asia", value: "asia" },
  { id: 4, name: "Europe", value: "europe" },
  { id: 5, name: "Oceania", value: "oceania" },
];

const MainPage = () => {
  const [initialData, setInitialData] = useState({
    data: null,
    loading: false,
    errMsg: false,
  });

  const { data, loading, errMsg } = initialData;

  const inputRef = useRef();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setInitialData((prev) => ({ ...prev, loading: true, data: null }));
    try {
      const response = await fetch(URL + "all");
      const countries = await response.json();
      setInitialData((prev) => ({ ...prev, data: countries }));
    } catch (error) {
      console.log(error);
    } finally {
      setInitialData((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleSearchByName = async () => {
    const value = inputRef.current.value;

    setInitialData((prev) => ({ ...prev, errMsg: false }));
    try {
      const response = await fetch(URL + "name/" + value);
      if (!response.ok) {
        setInitialData((prev) => ({
          ...prev,
          errMsg: "No country found",
          data: null,
        }));
        throw new Error("No country found");
      }
      const countries = await response.json();
      setInitialData((prev) => ({ ...prev, data: countries }));
    } catch (error) {
      console.log(error);
    }
    inputRef.current.value = "";
  };

  const handleSearchByRegion = async (value) => {
    setInitialData((prev) => ({ ...prev, errMsg: false }));
    try {
      const response = await fetch(URL + "region/" + value);
      const countries = await response.json();
      setInitialData((prev) => ({ ...prev, data: countries }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="container main-page">
        <hr />
        <input
          type="text"
          ref={inputRef}
          placeholder="Search for a country..."
        />
        <button onClick={handleSearchByName}>Search</button>
        <button onClick={fetchData}>reset</button>
        <hr />
        <select onChange={(e) => handleSearchByRegion(e.target.value)}>
          {REGIONS.map(({ id, name, value }) => (
            <option key={id} value={value}>
              {name}
            </option>
          ))}
        </select>
        <hr />
        {loading && <LoadingSpinner />}
        {errMsg ? (
          <p>{errMsg}</p>
        ) : (
          data?.map((item, idx) => <p key={idx}>{item.name}</p>)
        )}
      </section>
    </>
  );
};

export default MainPage;
