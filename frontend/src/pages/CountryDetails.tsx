import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { useParams, Link } from "react-router-dom";

const GET_COUNTRY = gql`
  query GetCountry($code: String!) {
    country(code: $code) {
      id
      code
      name
      emoji
      continent {
        id
        name
      }
    }
  }
`;

export function CountryDetails() {
  const { code } = useParams<{ code: string }>();
  const { data, loading, error } = useQuery(GET_COUNTRY, {
    variables: { code }
  });

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error.message}</p>;
  if (!data?.country) return <p>Pays non trouvé</p>;

  const country = data.country;

  return (
    <div>
      <h1>Détails du pays</h1>
      <div>
        <h2>{country.emoji} {country.name}</h2>
        <p>Code: {country.code}</p>
        {country.continent && (
          <p>Continent: {country.continent.name}</p>
        )}
      </div>
      <Link to="/">← Retour à la liste</Link>
    </div>
  );
}