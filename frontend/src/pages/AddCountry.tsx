import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

// Query get continents
const GET_CONTINENTS = gql`
  query GetContinents {
    continents {
      id
      name
    }
  }
`;

// Query add countries
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
    <div>
      <h1>Ajouter un pays</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom du pays:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            minLength={2}
            maxLength={50}
            placeholder="ex: France"
          />
        </div>
        
        <div>
          <label>Code du pays:</label>
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
          />
        </div>
        
        <div>
          <label>Emoji:</label>
          <input
            type="text"
            name="emoji"
            value={formData.emoji}
            onChange={handleChange}
            required
            maxLength={4}
            placeholder="ex: 🇫🇷"
          />
        </div>
        
        <div>
          <label>Continent (optionnel):</label>
          <select
            name="continent"
            value={formData.continent}
            onChange={handleChange}
          >
            <option value="">Sélectionner un continent</option>
            {continentsData?.continents?.map((continent: any) => (
              <option key={continent.id} value={continent.id}>
                {continent.name}
              </option>
            ))}
          </select>
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? "Ajout en cours..." : "Ajouter le pays"}
        </button>
      </form>
      
      {error && <p>Erreur: {error.message}</p>}
      <button onClick={() => navigate("/")}>← Retour à la liste</button>
    </div>
  );
}