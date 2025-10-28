import { useState } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const ADD_COUNTRY = gql`
  mutation AddCountry($data: NewCountryInput!) {
    addCountry(data: $data) {
      id
      code
      name
      emoji
    }
  }
`;

export function AddCountry() {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    emoji: ""
  });
  const [addCountry, { loading, error }] = useMutation(ADD_COUNTRY);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addCountry({
        variables: { data: formData }
      });
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <button type="submit" disabled={loading}>
          {loading ? "Ajout en cours..." : "Ajouter le pays"}
        </button>
      </form>
      {error && <p>Erreur: {error.message}</p>}
      <button onClick={() => navigate("/")}>← Retour à la liste</button>
    </div>
  );
}