import LoadingSpinner from "../components/ui/LoadingSpinner";
import SearchFilter from "../components/SearchFilter";

import { useEffect, useState } from "react";
import Card from "../components/ui/Card";

const MainPage = ({ initialData, loading }) => {
  const [filteredData, setFilteredData] = useState(initialData);

  useEffect(() => {
    setFilteredData(initialData);
  }, [initialData]);

  return (
    <>
      <section className="container main-page">
        <SearchFilter
          initialData={initialData}
          setFilteredData={setFilteredData}
        />

        {loading && <LoadingSpinner />}

        {!loading && filteredData.length === 0 && <h1>Nothing found</h1>}

        <div className="cards-wrapper">
          {filteredData?.map((country) => (
            <Card key={country.numericCode} {...country} />
          ))}
        </div>
      </section>
    </>
  );
};

export default MainPage;
