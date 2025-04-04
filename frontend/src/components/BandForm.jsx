import { useState, useEffect } from 'react';
import { createBand, getGenres } from '../api/store';

export default function BandForm() {
  const [formData, setFormData] = useState({
    name: '',
    formation_year: '',
    description: '',
    genres: [],
    members: []
  });
  const [genres, setGenres] = useState([]);
  const [members, setMembers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const genresRes = await getGenres();
      setGenres(genresRes.data);
      setMembers(membersRes.data);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGenreChange = (genreId) => {
    setFormData({
      ...formData,
      genres: formData.genres.includes(genreId)
        ? formData.genres.filter(id => id !== genreId)
        : [...formData.genres, genreId]
    });
  };

  const handleMemberChange = (memberId) => {
    setFormData({
      ...formData,
      members: formData.members.includes(memberId)
        ? formData.members.filter(id => id !== memberId)
        : [...formData.members, memberId]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBand(formData);
      setMessage('Banda creada exitosamente!');
      setFormData({
        name: '',
        formation_year: '',
        description: '',
        genres: [],
        members: []
      });
    } catch (error) {
      setMessage('Error al crear la banda');
    }
  };

  return (
    <div className="form-container">
      <h2>Crear Nueva Banda</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Año de formación:</label>
          <input
            type="number"
            name="formation_year"
            value={formData.formation_year}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label>Géneros:</label>
          <div className="checkbox-group">
            {genres.map(genre => (
              <label key={genre.id}>
                <input
                  type="checkbox"
                  checked={formData.genres.includes(genre.id)}
                  onChange={() => handleGenreChange(genre.id)}
                />
                {genre.name}
              </label>
            ))}
          </div>
        </div>
        
        <div>
          <label>Miembros:</label>
          <div className="checkbox-group">
            {members.map(member => (
              <label key={member.id}>
                <input
                  type="checkbox"
                  checked={formData.members.includes(member.id)}
                  onChange={() => handleMemberChange(member.id)}
                />
                {member.name} ({member.role})
              </label>
            ))}
          </div>
        </div>
        
        <button type="submit">Crear</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}