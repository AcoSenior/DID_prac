import styled from 'styled-components';
import 'react-alice-carousel/lib/alice-carousel.css';
import AliceCarousel from 'react-alice-carousel';

const Carousel = () => {
  const responsive = {
    512: {
      items: 3,
    },
  };

  const images = ['1.jpeg', '2.jpeg', '3.jpeg', '4.jpeg'];

  const imgItems = images.map((image) => {
    return (
      <ItemsContain>
        <ItemsWrap>
          <img src={image} alt="" />
        </ItemsWrap>
      </ItemsContain>
    );
  });

  return (
    <Contain>
      <AliceCarousel mouseTracking infinite={1000} animationDuration={2000} disableDotsControls disableButtonsControls responsive={responsive} autoPlay items={imgItems} />
    </Contain>
  );
};

export default Carousel;

const Contain = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0 auto;
  position: absolute;
  z-index: 0;
`;

const ItemsContain = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 1rem;
`;

const ItemsWrap = styled.div`
  width: 100%;
  height: 50rem;
  border-radius: 20px;
  overflow: hidden;
  margin: 0 3rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
