import Slider from '../../components/Slider.jsx';
import './styles/Home.css'
import Card from '../../components/Card.jsx';

const Home = () => {
  const products = [
    {
      "id": 1,
      "title": "Metallica Master of Puppets Tee",
      "price": 29.99,
      "originalPrice": 29.99,
      "image": "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000",
      "isNew": true,
      "discount": null,
      "rating": 4.8,
      "reviewCount": 124,
      "isFavorite": false
    },
    {
      "id": 2,
      "title": "Anthrax Among the Living Hoodie",
      "price": 43.99,
      "originalPrice": 54.99,
      "image": "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000",
      "isNew": true,
      "discount": "20% OFF",
      "rating": 4.8,
      "reviewCount": 76,
      "isFavorite": false
    },
    {
      "id": 3,
      "title": "Iron Maiden Trooper Hoodie",
      "price": 44.99,
      "originalPrice": 49.99,
      "image": "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000",
      "isNew": true,
      "discount": "10% OFF",
      "rating": 4.7,
      "reviewCount": 98,
      "isFavorite": false
    },
    {
      "id": 4,
      "title": "Megadeth Rust in Peace Tee",
      "price": 23.79,
      "originalPrice": 27.99,
      "image": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000",
      "isNew": false,
      "discount": "15% OFF",
      "rating": 4.6,
      "reviewCount": 82,
      "isFavorite": false
    },
    {
      "id": 7,
      "title": "Pantera Cowboys from Hell Tee",
      "price": 27.99,
      "originalPrice": 32.99,
      "image": "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=1000",
      "isNew": true,
      "discount": "15% OFF",
      "rating": 4.5,
      "reviewCount": 67,
      "isFavorite": false
    },
  ]
  return (
    <>
      <Slider />
      <div className="content">
      <div className="shop-by-band">
        <h2>Shop by Band</h2>
        <div className="band-icons">
          <div className="band-item">
            <div className="band-image">
              <img src="https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8" alt="Metallica" />
            </div>
            <p>Metallica</p>
          </div>
          <div className="band-item">
            <div className="band-image">
              <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f" alt="Iron Maiden" />
            </div>
            <p>Iron Maiden</p>
          </div>
          <div className="band-item">
            <div className="band-image">
              <img src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3" alt="Black Sabbath" />
            </div>
            <p>Black Sabbath</p>
          </div>
          <div className="band-item">
            <div className="band-image">
              <img src="https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8" alt="Slayer" />
            </div>
            <p>Slayer</p>
          </div>
          <div className="band-item">
            <div className="band-image">
              <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f" alt="Megadeth" />
            </div>
            <p>Megadeth</p>
          </div>
          <div className="band-item">
            <div className="band-image">
              <img src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3" alt="Pantera" />
            </div>
            <p>Pantera</p>
          </div>
          <div className="band-item">
            <div className="band-image">
              <img src="https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8" alt="Judas Priest" />
            </div>
            <p>Judas Priest</p>
          </div>
          <div className="band-item">
            <div className="band-image">
              <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f" alt="Anthrax" />
            </div>
            <p>Anthrax</p>
          </div>
          <div className="band-item">
            <div className="band-image">
              <img src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3" alt="Slipknot" />
            </div>
            <p>Slipknot</p>
          </div>
          <div className="band-item">
            <div className="band-image">
              <img src="https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8" alt="Tool" />
            </div>
            <p>Tool</p>
          </div>
        </div>
      </div>
      
      <section className="new-arrivals">
        <h2>New Arrivals</h2>
        <div className="products-grid">
          {products.map(product => (
            <Card 
              key={product.id}
              image={product.image}
              isNew={product.isNew}
              rating={product.rating}
              reviewCount={product.reviewCount}
              title={product.title}
              price={product.price}
            />
          ))}
        </div>
      </section>
      </div>
      
    </>
  );
};
export default Home;