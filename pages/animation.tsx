import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { Component } from 'react';
import Slider from 'react-slick';
import styled from '@emotion/styled';

const AutoPlay = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    innerWidth: '20px',
  };
  return (
    <div>
      <h2>Auto Play</h2>
      <SliderBox {...settings}>
        <Div>
          <h3>1</h3>
        </Div>
        <Div>
          <h3>2</h3>
        </Div>
        <Div>
          <h3>3</h3>
        </Div>
        <Div>
          <h3>4</h3>
        </Div>
        <Div>
          <h3>5</h3>
        </Div>
        <Div>
          <h3>6</h3>
        </Div>
      </SliderBox>
    </div>
  );
};

export default AutoPlay;

const SliderBox = styled(Slider)`
  display: flex;
  gap: 20px;
`;

const Div = styled.div`
  width: 100px;
  height: 100px;
  background-color: red;
`;
