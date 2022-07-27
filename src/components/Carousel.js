import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

import banner from "../styles/images/main_banner02.png";
import banner_gift from "../styles/images/main_banner.png";
import bannerMobile from "../styles/images/mobile/main_mo01.png";
import bannerMobileGift from "../styles/images/mobile/main_mo02.png";
import { useEffect, useState } from "react";

const Carousel = () => {
  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 1800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
  };

  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  });
  const [isMobile, setIsMobile] = useState();

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    if (windowSize.width < 600) {
      setIsMobile(true);
    } else if (windowSize.width >= 600) {
      setIsMobile(false);
    }
    return () => window.removeEventListener('resize', handleResize)
  }, [windowSize.width])
  
  return (
    <Wrap>
      <Slider {...settings}>
        <div>
          <img src={isMobile ? bannerMobile   : banner} alt="" />
        </div>
        <div>
          <a href="https://docs.google.com/forms/d/1LIU4LaYTaw1UWRPkThKzrF-jJ_1y3U_oj7OwVDOYjII/viewform?edit_requested=true" target="_black">
          <img src={isMobile ?  bannerMobileGift : banner_gift} alt="" />
          </a>
          
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

  .slick-prev:hover, .slick-prev:focus, .slick-next:hover, .slick-next:focus {
    outline: none;
 
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
