import LoadingSpinner from "../components/ui/LoadingSpinner";
import SearchFilter from "../components/SearchFilter";

import { useEffect, useState } from "react";

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
        {loading ? (
          <LoadingSpinner />
        ) : (
          <ol>
            {filteredData?.map(({ name, numericCode }) => (
              <li key={numericCode}>{name}</li>
            ))}
          </ol>
        )}
        {filteredData.length === 0 && <h1>No country Found</h1>}
      </section>
    </>
  );
};

export default MainPage;
