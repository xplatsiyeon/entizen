import styled from '@emotion/styled';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination } from 'swiper';
import Image from 'next/image';
import { FinalQuotationChargers } from 'QueryComponents/CompanyQuery';

interface Props {
  file?: FinalQuotationChargers[];
}
const Carousel = ({ file }: Props) => {
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
        <Slider key={el?.finalQuotationChargerIdx}>
          <div className="imgBox">
            <Image
              src={el?.finalQuotationChargerFiles?.url}
              alt={el?.finalQuotationChargerFiles?.originalName}
              layout="fill"
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
`;
const Slider = styled(SwiperSlide)`
  .imgBox {
    position: relative;
    width: 100%;
    height: 100%;
  }
`;
