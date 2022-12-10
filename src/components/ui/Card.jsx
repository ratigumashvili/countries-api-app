import { useNavigate } from "react-router-dom";

const Card = ({ flag, name, population, region, capital }) => {
  const navigate = useNavigate();
  return (
    <div className="card" onClick={() => navigate(`countries/${name}`)}>
      <div className="card-header">
        <img src={flag} alt={name} />
      </div>
      <div className="card-body">
        <h2>{name}</h2>
        <h3>
          <span>Population:</span> {population.toLocaleString()}
        </h3>
        <h3>
          <span>Region:</span> {region}
        </h3>
        <h3>
          <span>Capital:</span> {capital}
        </h3>
      </div>
    </div>
  );
};

export default Card;
