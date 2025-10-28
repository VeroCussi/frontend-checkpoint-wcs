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

  if (loading) return <p className="text-center text-lg">Chargement...</p>;
  if (error) return <p className="text-center text-red-600">Erreur: {error.message}</p>;
  if (!data?.country) return <p className="text-center text-red-600">Pays non trouvé</p>;

  const country = data.country;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link 
        to="/" 
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        ← Retour à la liste
      </Link>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Détails du pays</h1>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <span className="text-4xl">{country.emoji}</span>
            <h2 className="text-xl font-semibold text-gray-800">{country.name}</h2>
          </div>
          
          <div className="border-t pt-4">
            <p className="text-gray-600">
              <span className="font-semibold">Code:</span> {country.code}
            </p>
            {country.continent && (
              <p className="text-gray-600">
                <span className="font-semibold">Continent:</span> {country.continent.name}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}