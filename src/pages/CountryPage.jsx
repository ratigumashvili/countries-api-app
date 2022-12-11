import LoadingSpinner from "../components/ui/LoadingSpinner";
import DetailsPageMeta from "../components/ui/DetailsPageMeta";

import { HiArrowLongLeft } from "react-icons/hi2";

import useFetch from "../hooks/useFetch";

import { useNavigate, useParams } from "react-router-dom";

import { useState, useEffect } from "react";

const URL = `https://restcountries.com/v2/`;

const CountryPage = () => {
  const [neighbors, setNeighbors] = useState([]);

  const { name: title } = useParams();
  const navigate = useNavigate();

  const { fetched: country, loading } = useFetch(URL + "name/" + title);

  useEffect(() => {
    if (country[0]?.borders) {
      const fetchNeighbors = async () => {
        const response = await fetch(
          URL + "alpha?codes=" + country[0].borders.join(",")
        );
        const data = await response.json();
        setNeighbors(data);
      };
      fetchNeighbors();
    }
  }, [country]);

  return (
    <section className="container country-page">
      {loading && <LoadingSpinner />}

      {!loading && (
        <article className="country-description">
          <div className="description-header">
            <button onClick={() => navigate(-1)}>
              <HiArrowLongLeft className="icon" /> Back
            </button>
          </div>
          <DetailsPageMeta {...country[0]} neighbors={neighbors} />
        </article>
      )}
    </section>
  );
};

export default CountryPage;
