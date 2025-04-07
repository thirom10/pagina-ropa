import Slider from '../../components/Slider.jsx';
import './styles/Home.css'
import Card from '../../components/Card.jsx';
import { getProducts, getBands } from '../../api/store';
import { useEffect, useState } from 'react';


const Home = () => {

  const [products, setProducts] = useState([]);
  const [bands, setBands] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
      try {
        const productsRes = await getProducts();
        console.log('Products data:', productsRes.data); // Para debuggear
        const bandsRes = await getBands();
        setBands(bandsRes.data);
        setProducts(productsRes.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      };
      fetchData();
    }, []);


  return (
    <>
      <Slider />
      <div className="content">
        <div className="shop-by-band">
          <h2>Shop by Band</h2>
          {bands.length > 0 ? (
            <div className="bands-icons">
              {bands.map(band => (
                <div key={band.id} className="band-item">
                  <img src={band.image} alt={band.name} className="band-image" />
                  <h3>{band.name}</h3>
                </div>
              ))}
            </div>
          ) : (
            <p>Loading bands...</p>
          )}
        </div>
        
        <section className="new-arrivals">
          <h2>New Arrivals</h2>
          <div className="products-grid">
            {products.length > 0 ? (
              products.map(product => (
                <Card 
                  key={product.id}
                  image={product.images[0]?.image} // Accedemos a la URL de la imagen
                  isNew={product.isNew}
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  name={product.name}
                  price={product.price}
                />
              ))
            ) : (
              <p>Loading products...</p>
            )}
          </div>
        </section>
      </div>
    </>
  );
};
export default Home;