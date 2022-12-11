import { useNavigate } from "react-router-dom";

const DetailsPageMeta = ({
  flag,
  name,
  nativeName,
  population,
  region,
  subregion,
  capital,
  topLevelDomain,
  currencies,
  languages,
  neighbors,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="description-flag">
        <img src={flag} alt={name} />
      </div>
      <div className="description-meta">
        <div className="meta-title">
          <h1>{name}</h1>
        </div>
        <div className="meta-left">
          <ul className="country-meta-list">
            <li>
              <span className="meta-list-title">Native Name: </span>
              {nativeName}
            </li>
            <li>
              <span className="meta-list-title">Population: </span>
              {population}
            </li>
            <li>
              <span className="meta-list-title">Region: </span>
              {region}
            </li>
            <li>
              <span className="meta-list-title">Sub Region: </span>
              {subregion}
            </li>
            <li>
              <span className="meta-list-title">Capital: </span>
              {capital}
            </li>
          </ul>
        </div>
        <div className="meta-right">
          <ul>
            {topLevelDomain?.length && (
              <li>
                <span className="meta-list-title">Top Level Domain: </span>
                {topLevelDomain[0]}
              </li>
            )}
            {currencies?.length && (
              <li>
                <span className="meta-list-title">Currencies: </span>
                {currencies.map(({ code, name }) => (
                  <span className="meta-list__list" key={code}>
                    {name}
                  </span>
                ))}
              </li>
            )}
            {languages?.length && (
              <li>
                <span className="meta-list-title">Languages: </span>
                {languages.map(({ name }) => (
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
    </>
  );
};

export default DetailsPageMeta;
