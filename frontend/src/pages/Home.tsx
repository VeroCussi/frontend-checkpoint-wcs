import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      id
      code
      name
      emoji
    }
  }
`;

export function HomePage() {
  const { data, loading, error } = useQuery(GET_COUNTRIES);
  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error.message}</p>;

  return (
    <div>
      <h1>Countries</h1>
      <div>
        {data?.countries?.map((country: any) => (
          <div key={country.id}>
            <span>{country.emoji}</span>
            <span>{country.name}</span>
            <span>({country.code})</span>
          </div>
        ))}
      </div>
    </div>
  );
}
