import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

import banner from "../styles/images/main_banner02.png";
import banner_gift from "../styles/images/main_banner.png";

const Carousel = () => {
  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
  };

  return (
    <Wrap>
      <Slider {...settings}>
        <div>
          <img src={banner} alt="" />
        </div>
        <div>
          <img src={banner_gift} alt="" />
        </div>
      </Slider>
    </Wrap>
  );
};

const Wrap = styled.div`
  img {
    max-width: 100%;
  }
  .slick-slide {
    width: 30px;
  }

  .slick-list {
    border-radius: 15px;
  }

  .slick-dots {
    .slick-active {
      button::before {
        color: ${(props) => props.theme.keyColor};
        position: absolute;
        top: -40px;
      }
    }
    button::before {
      color: #eee;
      position: absolute;
      top: -40px;
    }
  }
`;

export default Carousel;
