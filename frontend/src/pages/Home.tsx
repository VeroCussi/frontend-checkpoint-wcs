import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { Link } from "react-router-dom";

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
  if (loading) return <p className="text-center text-lg">Chargement...</p>;
  if (error) return <p className="text-center text-red-600">Erreur: {error.message}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Countries</h1>
        <Link 
          to="/add-country" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          + Ajouter un pays
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.countries?.map((country: any) => (
          <Link 
            key={country.id} 
            to={`/countries/${country.code}`}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg hover:border-blue-300 transition-all duration-200"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{country.emoji}</span>
              <div>
                <h3 className="font-semibold text-gray-800">{country.name}</h3>
                <p className="text-sm text-gray-500">({country.code})</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
