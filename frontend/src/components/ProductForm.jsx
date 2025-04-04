import { useState, useEffect } from 'react';
import { createProduct, getBands, getSizes } from '../api/store';

export default function ProductForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    band: '',
    images: [],
    sizes_stock: []
  });
  const [bands, setBands] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const bandsRes = await getBands();
      const sizesRes = await getSizes();
      setBands(bandsRes.data);
      setSizes(sizesRes.data);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSizeStockChange = (sizeId, stock) => {
    const newSizesStock = formData.sizes_stock.filter(item => item.size !== sizeId);
    if (stock > 0) {
      newSizesStock.push({ size: sizeId, stock });
    }
    setFormData({
      ...formData,
      sizes_stock: newSizesStock
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(formData);
      setMessage('Producto creado exitosamente!');
      setFormData({
        name: '',
        description: '',
        price: '',
        band: '',
        images: [],
        sizes_stock: []
      });
    } catch (error) {
      setMessage('Error al crear el producto');
    }
  };

  return (
    <div className="form-container">
      <h2>Crear Nuevo Producto</h2>
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
          <label>Descripción:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Banda:</label>
          <select
            name="band"
            value={formData.band}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una banda</option>
            {bands.map(band => (
              <option key={band.id} value={band.id}>{band.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label>Tallas y Stock:</label>
          <div className="size-stock-container">
            {sizes.map(size => (
              <div key={size.id}>
                <label>{size.name}:</label>
                <input
                  type="number"
                  min="0"
                  value={
                    formData.sizes_stock.find(item => item.size === size.id)?.stock || 0
                  }
                  onChange={(e) => handleSizeStockChange(size.id, parseInt(e.target.value))}
                />
              </div>
            ))}
          </div>
        </div>
        
        <button type="submit">Crear</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}