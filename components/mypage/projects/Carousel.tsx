import styled from '@emotion/styled';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination } from 'swiper';
import Image from 'next/image';
import { ProjectCompletionFiles } from 'QueryComponents/CompanyQuery';
import { useEffect } from 'react';

interface Props {
  file?: ProjectCompletionFiles[];
}
const Carousel = ({ file }: Props) => {
  useEffect(() => {
    console.log('캐러쉘');
    console.log(file);
  }, []);
  return (
    <Wrapper
      pagination={{
        type: 'fraction',
      }}
      navigation={false}
      modules={[Pagination]}
      className="mySwiper"
    >
      {file?.map((el) => (
        <Slider key={el?.projectCompletionFileIdx}>
          <div className="imgBox">
            <Image
              src={el?.url}
              alt={el?.originalName}
              layout="fill"
              priority={true}
              unoptimized={true}
            />
          </div>
        </Slider>
      ))}
    </Wrapper>
  );
};

export default Carousel;

const Wrapper = styled(Swiper)`
  height: 100%;

  .swiper-pagination{
    width: fit-content;
    right: 9.75pt;
    left: auto;
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 500;
    font-size: 7.5pt;
    line-height: 9pt;
    letter-spacing: -0.02em;
    color: #FFFFFF;
    padding: 1.5pt 4.5pt;

    background: rgba(0, 0, 0, 0.3);
    border-radius: 7.5pt;
  }
`;
const Slider = styled(SwiperSlide)`
  .imgBox {
    position: relative;
    width: 100%;
    height: 100%;
  }
`;
