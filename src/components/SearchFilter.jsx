import { useState, useEffect } from "react";

const REGIONS = [
  { id: 0, name: "Filter by region", value: "" },
  { id: 1, name: "Africa", value: "africa" },
  { id: 2, name: "Americas", value: "americas" },
  { id: 3, name: "Asia", value: "asia" },
  { id: 4, name: "Europe", value: "europe" },
  { id: 5, name: "Oceania", value: "oceania" },
];

const SearchFilter = ({ initialData, setFilteredData }) => {
  const [searchValue, setSearchValue] = useState("");
  const [regionValue, setRegionValue] = useState("");

  useEffect(() => {
    handleSearch(regionValue);
    handleSearch(searchValue);
    // eslint-disable-next-line
  }, [searchValue, regionValue]);

  const handleSearch = () => {
    let countries = [...initialData];

    if (regionValue) {
      countries = countries.filter((country) =>
        country.region.toLowerCase().includes(regionValue)
      );
    }

    if (searchValue) {
      countries = countries.filter((country) =>
        country.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    setFilteredData(countries);
  };

  return (
    <section className="container search-filter">
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <select
        value={regionValue}
        onChange={(e) => setRegionValue(e.target.value)}
      >
        {REGIONS.map(({ id, name, value }) => (
          <option key={id} value={value}>
            {name}
          </option>
        ))}
      </select>
    </section>
  );
};

export default SearchFilter;
