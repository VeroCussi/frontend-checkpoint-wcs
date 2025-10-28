import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { useNavigate, Link } from "react-router-dom";

const GET_CONTINENTS = gql`
  query GetContinents {
    continents {
      id
      name
    }
  }
`;

const ADD_COUNTRY = gql`
  mutation AddCountry($data: NewCountryInput!) {
    addCountry(data: $data) {
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

export function AddCountry() {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    emoji: "",
    continent: ""
  });
  
  const [addCountry, { loading, error }] = useMutation(ADD_COUNTRY);
  const { data: continentsData } = useQuery(GET_CONTINENTS);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const countryData = {
        name: formData.name,
        code: formData.code,
        emoji: formData.emoji,
        ...(formData.continent && { 
          continent: { id: parseInt(formData.continent) }
        })
      };
      
      await addCountry({
        variables: { data: countryData }
      });
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link 
        to="/" 
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        ← Retour à la liste
      </Link>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Ajouter un pays</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom du pays:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              minLength={2}
              maxLength={50}
              placeholder="ex: France"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Code du pays:
            </label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              required
              minLength={2}
              maxLength={3}
              placeholder="ex: FR"
              style={{ textTransform: 'uppercase' }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Emoji:
            </label>
            <input
              type="text"
              name="emoji"
              value={formData.emoji}
              onChange={handleChange}
              required
              maxLength={4}
              placeholder="ex: 🇫🇷"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Continent (optionnel):
            </label>
            <select
              name="continent"
              value={formData.continent}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sélectionner un continent</option>
              {continentsData?.continents?.map((continent: any) => (
                <option key={continent.id} value={continent.id}>
                  {continent.name}
                </option>
              ))}
            </select>
          </div>
        
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-md transition-colors"
          >
            {loading ? "Ajout en cours..." : "Ajouter le pays"}
          </button>
        </form>
        
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            Erreur: {error.message}
          </div>
        )}
      </div>
    </div>
  );
}