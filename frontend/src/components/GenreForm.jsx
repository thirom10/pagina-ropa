import { useState } from 'react';
import { createGenre } from '../api/store';

export default function GenreForm() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createGenre({ name });
      setMessage('Género creado exitosamente!');
      setName('');
    } catch (error) {
      setMessage('Error al crear el género');
    }
  };

  return (
    <div className="form-container">
      <h2>Crear Nuevo Género</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Crear</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}