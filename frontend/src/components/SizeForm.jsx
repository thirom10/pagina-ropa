import { useState } from 'react';
import { createSize } from '../api/store';

export default function SizeForm() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createSize({ name });
      setMessage('Talla creada exitosamente!');
      setName('');
    } catch (error) {
      setMessage('Error al crear la talla');
    }
  };

  return (
    <div className="form-container">
      <h2>Crear Nueva Talla</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Talla:</label>
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