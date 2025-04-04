import { useState } from 'react';
import GenreForm from './GenreForm';
import SizeForm from './SizeForm';
import BandForm from './BandForm';
import ProductForm from './ProductForm';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('genre');
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="dashboard">
      <header>
        <h1>Panel de Administración</h1>
        <button onClick={handleLogout}>Cerrar Sesión</button>
      </header>
      
      <nav>
        <button onClick={() => setActiveTab('genre')}>Géneros</button>
        <button onClick={() => setActiveTab('size')}>Tallas</button>
        <button onClick={() => setActiveTab('band')}>Bandas</button>
        <button onClick={() => setActiveTab('product')}>Productos</button>
      </nav>
      
      <div className="content">
        {activeTab === 'genre' && <GenreForm />}
        {activeTab === 'size' && <SizeForm />}
        {activeTab === 'band' && <BandForm />}
        {activeTab === 'product' && <ProductForm />}
      </div>
    </div>
  );
}