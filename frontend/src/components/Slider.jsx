// Correct Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// Styles
import './styles/Slider.css';

const Slider = () => {
  return (
    <div className="swiper-container">
      <Swiper
        pagination={{
          clickable: true,
        }}
        
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide id='a'>
          <h1>NEW METALLICA COLLECTION</h1>
          <p>Limited edition merchandise from the masters of metal</p>
          <button className='red-btn'>
            Explore
          </button>
        </SwiperSlide>
        <SwiperSlide id='b'>
        <h1>NEW METALLICA COLLECTION</h1>
          <p>Limited edition merchandise from the masters of metal</p>
          <button className='red-btn'>
            Explore
          </button>
        </SwiperSlide>
        <SwiperSlide id='c'>
        <h1>NEW METALLICA COLLECTION</h1>
          <p>Limited edition merchandise from the masters of metal</p>
          <button className='red-btn'>
            Explore
          </button>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
