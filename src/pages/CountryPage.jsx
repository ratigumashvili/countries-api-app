import LoadingSpinner from "../components/ui/LoadingSpinner";

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
          <div className="description-flag">
            <img src={country[0]?.flag} alt={country[0]?.name} />
          </div>
          <div className="description-meta">
            <div className="meta-title">
              <h1>{country[0]?.name}</h1>
            </div>
            <div className="meta-left">
              <ul className="country-meta-list">
                <li>
                  <span className="meta-list-title">Native Name: </span>
                  {country[0]?.nativeName}
                </li>
                <li>
                  <span className="meta-list-title">Population: </span>
                  {country[0]?.population}
                </li>
                <li>
                  <span className="meta-list-title">Region: </span>
                  {country[0]?.region}
                </li>
                <li>
                  <span className="meta-list-title">Sub Region: </span>
                  {country[0]?.subregion}
                </li>
                <li>
                  <span className="meta-list-title">Capital: </span>
                  {country[0]?.capital}
                </li>
              </ul>
            </div>
            <div className="meta-right">
              <ul>
                {country[0]?.topLevelDomain?.length && (
                  <li>
                    <span className="meta-list-title">Top Level Domain: </span>
                    {country[0]?.topLevelDomain[0]}
                  </li>
                )}
                {country[0]?.currencies?.length && (
                  <li>
                    <span className="meta-list-title">Currencies: </span>
                    {country[0]?.currencies.map(({ code, name }) => (
                      <span className="meta-list__list" key={code}>
                        {name}
                      </span>
                    ))}
                  </li>
                )}
                {country[0]?.languages?.length && (
                  <li>
                    <span className="meta-list-title">Languages: </span>
                    {country[0]?.languages.map(({ name }) => (
                      <span className="meta-list__list" key={name}>
                        {name}
                      </span>
                    ))}
                  </li>
                )}
              </ul>
            </div>
            {neighbors.length !== 0 && (
              <div className="meta-bottom">
                <span className="meta-bottom-title">Border Countries: </span>
                {neighbors?.map(({ name, alpha3Code }) => (
                  <p
                    key={alpha3Code}
                    onClick={() => navigate(`/countries/${name}`)}
                  >
                    {name}
                  </p>
                ))}
              </div>
            )}
          </div>
        </article>
      )}
    </section>
  );
};

export default CountryPage;
