"use client";

// import { SuggestionHeader } from 'components/applyAd/header';
import WebHeader from '../../components/brought/newHeader/BeforeHeaderA';
import ApplyAdMainStyles from './applyAd.module.scss';
import {  useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

SwiperCore.use([Navigation, Pagination, Autoplay]);

import 'swiper/css'; //basic
import { SlideItem } from '../../components/brought/applyAd/slideItem';
import { useMediaQuery } from 'react-responsive';

import LegacyImage from 'next/legacy/image';
import TagManager from 'react-gtm-module';
import Image from 'next/image';
import Sec02Img from '/public/pages/applyAd/section2.png';
import Sec04Item1 from '/public/pages/applyAd/section4_item1.svg';
import Sec04Item2 from '/public/pages/applyAd/section4_item2.svg';
import Sec04Item3 from '/public/pages/applyAd/section4_item3.svg';
import Sec05Img from '/public/pages/applyAd/section5.png';
import Sec04PcImg from '/public/pages/applyAd/section4pc.png';
import Sec05PcImg from '/public/pages/applyAd/section5pc.png';
import Img01 from '/public/pages/applyAd/slide1.png';
import Img02 from '/public/pages/applyAd/slide2.png';
import Img03 from '/public/pages/applyAd/slide3.png';

const ApplyAdMain = () => {
  console.log('1st live - 기존 퍼널 주소입력 수정');

  const [swiper, setSwiper] = useState<SwiperCore>();
  const isTablet = useMediaQuery({
    query: '(max-width: 1023px)',
  });

  const onClickSendBtn = () => {
    //GA4 이벤트 전송
    const tagManagerArgs = {
      dataLayer: {
        event: 'click_get_custom_estimate',
      },
    };
    TagManager.dataLayer(tagManagerArgs);
    location.href = '/selection';
  };

  useEffect(() => {
    if (swiper) {
      swiper.slideTo(0, 0, false);
    }
  }, [swiper]);
  return (
    <div className={ApplyAdMainStyles.applyAdMain}>
      <WebHeader />
      <div className={ApplyAdMainStyles.imgWrap}></div>
      {/* <div className={ApplyAdMainStyles.imgWrap}>{imageFigure}</div> */}
      <div className={ApplyAdMainStyles.mainContainer}>
        <section
          className={`${ApplyAdMainStyles.mainSection} ${ApplyAdMainStyles.section1}`}
        >
          <div className={ApplyAdMainStyles.infoWrap}>
            <p>내 상황에 딱 맞는 충전기</p>
            <p>비교 견적 받아보세요</p>
          </div>

          <div className={ApplyAdMainStyles.buttonWrap}>
            <button
              className={ApplyAdMainStyles.estimateBtn}
              onClick={onClickSendBtn}
            >
              맞춤 견적 받기
            </button>
            <img
              className={ApplyAdMainStyles.mouseWheel}
              src="/components/suggestion/mouseWheel.png"
              alt="mouseWheel"
            ></img>
         
          </div>
        </section>
        <div className={ApplyAdMainStyles.infoSquare}>
          <video
            autoPlay
            playsInline
            loop
            muted
            poster="/components/suggestion/infoSquare.png"
            className={ApplyAdMainStyles.img}
          >
            <source
              src="https://drive.google.com/uc?export=view&id=1Wh6BUhaVgscMWBwXMMhb5uyuYlqMiXSU"
              type="video/mp4"
            />
          </video>
        </div>
        <section
          className={`${ApplyAdMainStyles.mainSection} ${ApplyAdMainStyles.section2}`}
        >
          <article className={ApplyAdMainStyles.articleInfo}>
            <div>
              <p className={ApplyAdMainStyles.pInfo}>보기 쉬운 비교 견적</p>
              <div className={ApplyAdMainStyles.info}>
                <p>가격부터 핵심 포인트</p>
                <p>한번에 비교하고</p>
              </div>
            </div>

            {!isTablet ? (
              <Swiper
                className={ApplyAdMainStyles.section2Slider}
                wrapperTag={'ul'}
                loop={true}
                slidesPerView="auto"
                spaceBetween={40}
                onSwiper={setSwiper}
                autoplay={{
                  disableOnInteraction: false,
                }}
                speed={500}
              >
                <div className={ApplyAdMainStyles.sliderWrapper}>
                  <SwiperSlide
                    className={ApplyAdMainStyles.item}
                    tag={'li'}
                    key={0}
                  >
                    <SlideItem
                      companyName={'A사'}
                      info1={'8000기 이상 시공'}
                      info2={'A/S지점 11곳, A/S직원 500명'}
                      info3={'생산물배상책임보험 5억 가입'}
                      totalPrice={'총 1,100,000원 부터 ~'}
                    ></SlideItem>
                  </SwiperSlide>
                  <SwiperSlide
                    className={ApplyAdMainStyles.item}
                    tag={'li'}
                    key={1}
                  >
                    <SlideItem
                      companyName={'B사'}
                      info1={'7600기 이상 시공'}
                      info2={'A/S지점 11곳, A/S직원 300명'}
                      info3={'생산물배상책임보험 5억 가입'}
                      totalPrice={'총 1,125,000원 부터 ~'}
                    ></SlideItem>
                  </SwiperSlide>
                </div>
              </Swiper>
            ) : (
              <div className={ApplyAdMainStyles.sliderWrapper}>
                <SwiperSlide
                  className={ApplyAdMainStyles.item}
                  tag={'li'}
                  key={0}
                >
                  <SlideItem
                    companyName={'A사'}
                    info1={'8000기 이상 시공'}
                    info2={'A/S지점 11곳, A/S직원 500명'}
                    info3={'생산물배상책임보험 5억 가입'}
                    totalPrice={'총 1,100,000원 부터 ~'}
                  ></SlideItem>
                </SwiperSlide>
                <SwiperSlide
                  className={ApplyAdMainStyles.item}
                  tag={'li'}
                  key={1}
                >
                  <SlideItem
                    companyName={'B사'}
                    info1={'7600기 이상 시공'}
                    info2={'A/S지점 11곳, A/S직원 300명'}
                    info3={'생산물배상책임보험 5억 가입'}
                    totalPrice={'총 1,125,000원 부터 ~'}
                  ></SlideItem>
                </SwiperSlide>
              </div>
            )}
          </article>
        </section>
        <div className={ApplyAdMainStyles.mobileSection2}>
          <Image
            src={Sec02Img}
            alt="Sec02Img"
            layout="intrinsic"
            objectFit="contain"
          />
        </div>
        <section
          className={`${ApplyAdMainStyles.mainSection} ${ApplyAdMainStyles.section3}`}
        >
          <article className={ApplyAdMainStyles.articleInfo}>
            <div>
              <p className={ApplyAdMainStyles.pInfo}>
                핵심 정보로 꽉 찬 견적서
              </p>
              <div className={ApplyAdMainStyles.info}>
                <p>설치사례와 상세견적까지</p>
                <p>세부내용 확인해요</p>
              </div>
            </div>

            {/* pc */}
            <div className={ApplyAdMainStyles.etcInfo}>
              <div className={ApplyAdMainStyles.imgWrap}>
                <img
                  className={ApplyAdMainStyles.section3Img_1}
                  src="/components/suggestion/section3_1.png"
                  alt="section3_1"
                ></img>
                <img
                  className={ApplyAdMainStyles.section3Img_2}
                  src="/components/suggestion/section3_2.png"
                  alt="section3_2"
                ></img>
                <img
                  className={ApplyAdMainStyles.section3Img_3}
                  src="/components/suggestion/section3_3.png"
                  alt="section3_3"
                ></img>
              </div>
              <div className={ApplyAdMainStyles.estimateEtc}>
                <img
                  className={ApplyAdMainStyles.section3Img_4}
                  src="/components/suggestion/section3_4.png"
                  alt="section3_4"
                ></img>
           
              </div>
            </div>

            {/* mobile */}
            <Swiper
              className={ApplyAdMainStyles.mobileSection3Slider}
              spaceBetween={12}
              slidesPerView={'auto'}
              slidesOffsetBefore={10}
              slidesOffsetAfter={10}
            >
              {[Img01, Img02, Img03]?.map((el, idx) => {
                return (
                  <SwiperSlide key={idx} style={{ width: '160px' }}>
                    <Image
                      src={el}
                      layout="fixed"
                      width={160}
                      height={240}
                      className={ApplyAdMainStyles.sliderItems}
                      alt=''
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>

            {/* mobile */}
            <div className={ApplyAdMainStyles.mobileSection3}>
              {/* <Image
                src={Sec03Img}
                alt="Sec03Img"
                layout="intrinsic"
                objectFit="contain"
              /> */}

              <div className={ApplyAdMainStyles.wrapper}>
                <div className={ApplyAdMainStyles.items}>
                  <div className={ApplyAdMainStyles.content}>
                    <div
                      className={`${ApplyAdMainStyles.item} ${ApplyAdMainStyles.item1}`}
                    >
                      <span>충전기 + 설치</span>
                      <span>1,050,000 원</span>
                    </div>
                    <div
                      className={`${ApplyAdMainStyles.item} ${ApplyAdMainStyles.item2}`}
                    >
                      <span>운영관리비</span>
                      <span>0 원/월</span>
                    </div>
                    <div className={ApplyAdMainStyles.itemSupport}>
                      <span>필요 시 추가비용 발생</span>
                    </div>
                    <div
                      className={`${ApplyAdMainStyles.item} ${ApplyAdMainStyles.item3}`}
                    >
                      <span>보호함</span>
                      <span>0 원</span>
                    </div>
                    <div
                      className={`${ApplyAdMainStyles.item} ${ApplyAdMainStyles.item4}`}
                    >
                      <span>헬멧형 케노피</span>
                      <span>200,000 원</span>
                    </div>
                    <div
                      className={`${ApplyAdMainStyles.item} ${ApplyAdMainStyles.item5}`}
                    >
                      <span>스탠드</span>
                      <span>250,000 원</span>
                    </div>
                    <div className={ApplyAdMainStyles.itemSupport}>
                      <span>개별 구매시</span>
                    </div>
                  </div>
                  <div
                    className={`${ApplyAdMainStyles.content} ${ApplyAdMainStyles.content2}`}
                  >
                    <div className={ApplyAdMainStyles.each}>
                      <span>충전기</span>
                      <span>600,000 원</span>
                    </div>
                    <div className={ApplyAdMainStyles.each}>
                      <span>설치</span>
                      <span>600,000 원</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </section>
        {/* <section
          className={`${ApplyAdMainStyles.mainSection} ${ApplyAdMainStyles.section4}`}
        >
          <article className={ApplyAdMainStyles.articleInfo}>
            <div>
              <p className={ApplyAdMainStyles.pInfo}>
                1:1 채팅으로 궁금증 해결
              </p>
              <div className={ApplyAdMainStyles.info}>
                <p>궁금한 내용을 해결하고</p>
                <p>편리하게 충전기 설치</p>
              </div>
            </div>
            <div className={ApplyAdMainStyles.imgWrap}>
              <div className={ApplyAdMainStyles.chatImg}></div>
            </div>
          </article>
        </section> */}
        <div className={ApplyAdMainStyles.pcSection4}>
          <Image
            src={Sec04PcImg}
            alt="Sec04PcImg"
            layout="intrinsic"
            objectFit="contain"
          />
        </div>
        <div className={ApplyAdMainStyles.mobileSection4}>
          {/* 기존 이미지
          <Image
            src={Sec04Img}
            alt="Sec04Img"
            layout="intrinsic"
            objectFit="contain"
          /> */}

          <div className={ApplyAdMainStyles.wrapper}>
            <div className={ApplyAdMainStyles.title}>
              <p>1:1 채팅으로 궁금증 해결</p>
              <p>
                궁금한 내용을 해결하고
                <br />
                편리하게 충전기 설치
              </p>
            </div>
            <div className={ApplyAdMainStyles.content}>
              <div className={ApplyAdMainStyles.items}>
                <Image src={Sec04Item1} alt={''} />
                <Image src={Sec04Item2} alt={''} />
                <Image src={Sec04Item3} alt={''} />
              </div>
            </div>
          </div>
        </div>

        {/* <div
          className={`${ApplyAdMainStyles.mainSection} ${ApplyAdMainStyles.section5}`}
        >
          <div className={ApplyAdMainStyles.imgWrap}>
            <div style={{ alignSelf: 'center' }}>
              <p className={ApplyAdMainStyles.pInfo}>
                내일의 충전생활, 그 일상을 오늘로.
              </p>
              <div className={ApplyAdMainStyles.info}>
                <p>생활 반경 속 나를 위한 충전기,</p>
                <p>더 쉽게 누릴 수 있도록 엔티즌이 함께 합니다.</p>
              </div>
            </div>
          </div>
        </div> */}
        <div className={ApplyAdMainStyles.pcSection5}>
          <Image
            src={Sec05PcImg}
            alt="Sec05PcImg"
            layout="intrinsic"
            objectFit="contain"
          />
        </div>
        <div className={ApplyAdMainStyles.mobileSection5}>
          <Image
            src={Sec05Img}
            alt="Sec05Img"
            layout="intrinsic"
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  );
};

export default ApplyAdMain;
