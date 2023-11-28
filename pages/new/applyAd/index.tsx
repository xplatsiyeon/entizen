import { SuggestionHeader } from 'components/applyAd/header';
import ApplyAdMainStyles from './applyAd.module.scss';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'; // basic
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
SwiperCore.use([Navigation, Pagination, Autoplay]);

import 'swiper/css'; //basic
import { SlideItem } from 'components/applyAd/slideItem';
import { useMediaQuery } from 'react-responsive';

const ApplyAdMain = () => {
  const [swiper, setSwiper] = useState<SwiperCore>();
  const isTablet = useMediaQuery({
    query: '(max-width: 1023px)',
  });

  const imageFigure = useMemo(() => {
    const imageTags = [];
    for (let i = 1; i <= 8; i++) {
      imageTags.push(
        <img
          className={ApplyAdMainStyles['figure' + i]}
          alt={`figure${i}`}
          src={`/images/suggestion/figure${i}.png`}
        ></img>,
      );
    }

    return imageTags;
  }, []);
  useEffect(() => {
    if (swiper) {
      swiper.slideTo(0, 0, false);
    }
  }, [swiper]);
  // useEffect(() => {
  //   let ww = window.innerWidth;
  //   let mySwiper: any;
  //   responsiveSwiper();

  //   function initSwiper() {
  //     return (mySwiper = new (Swiper as any)(
  //       `.${ApplyAdMainStyles.section2Slider}`,
  //       {
  //         // wrapperElement: 'ul',
  //         loop: true,
  //         slidesPerView: 'auto',
  //         spaceBetween: 40,
  //         autoplay: {
  //           disableOnInteraction: false,
  //         },
  //         speed: 500,
  //       },
  //     ));
  //   }

  //   function responsiveSwiper() {
  //     console.log(mySwiper);
  //     if (ww >= 1023) {
  //       // swipWrapper[0].removeAttribute('style');
  //       initSwiper();
  //     } else {
  //       const swipWrapper = document.getElementsByClassName('swiper-wrapper');
  //       swipWrapper[0].setAttribute(
  //         'style',
  //         `display: flex;
  //         flex-direction: column;
  //         justify-content: space-between;
  //         align-items: center;`,
  //       );
  //       if (typeof mySwiper === 'object') mySwiper.destroy();
  //       // setSwiper(undefined);
  //     }
  //   }

  //   window.addEventListener('resize', function () {
  //     ww = window.innerWidth;
  //     responsiveSwiper();
  //   });
  // }, []);

  return (
    <div className={ApplyAdMainStyles.applyAdMain}>
      <SuggestionHeader></SuggestionHeader>
      <div className={ApplyAdMainStyles.mainContainer}>
        <section
          className={`${ApplyAdMainStyles.mainSection} ${ApplyAdMainStyles.section1}`}
        >
          <div className={ApplyAdMainStyles.imgWrap}>{imageFigure}</div>
          <div className={ApplyAdMainStyles.infoWrap}>
            <p>내 상황에 딱 맞는 충전기</p>
            <p>비교 견적 받아보세요</p>
          </div>
          <div className={ApplyAdMainStyles.buttonWrap}>
            <button
              className={ApplyAdMainStyles.estimateBtn}
              onClick={() => {
                location.href = '/myEstimate';
              }}
            >
              맞춤 견적 받기
            </button>
            <img
              className={ApplyAdMainStyles.mouseWheel}
              src="/images/suggestion/mouseWheel.png"
              alt="mouseWheel"
            ></img>
          </div>
        </section>
        <div className={ApplyAdMainStyles.infoSquare}>
          <video
            autoPlay
            loop
            muted
            poster="/images/suggestion/infoSquare.png"
            className={ApplyAdMainStyles.img}
          >
            <source
              src="https://drive.google.com/uc?export=view&id=1Wh6BUhaVgscMWBwXMMhb5uyuYlqMiXSU"
              // src="https://drive.google.com/file/d/1Wh6BUhaVgscMWBwXMMhb5uyuYlqMiXSU/view?usp=sharing"
              type="video/mp4"
            />
          </video>
          {/* <img
            src="/images/suggestion/infoSquare.png"
            alt="infoSquare"
            className={ApplyAdMainStyles.img}
          ></img> */}
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

            <div className={ApplyAdMainStyles.etcInfo}>
              <div className={ApplyAdMainStyles.imgWrap}>
                <img
                  className={ApplyAdMainStyles.section3Img_1}
                  src="/images/suggestion/section3_1.png"
                  alt="section3_1"
                ></img>
                <img
                  className={ApplyAdMainStyles.section3Img_2}
                  src="/images/suggestion/section3_2.png"
                  alt="section3_2"
                ></img>
                <img
                  className={ApplyAdMainStyles.section3Img_3}
                  src="/images/suggestion/section3_3.png"
                  alt="section3_3"
                ></img>
              </div>
              <div className={ApplyAdMainStyles.estimateEtc}>
                <img
                  className={ApplyAdMainStyles.section3Img_4}
                  src="/images/suggestion/section3_4.png"
                  alt="section3_4"
                ></img>
              </div>
            </div>
          </article>
        </section>
        <section
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
              {/* <img
                className={ApplyAdMainStyles.section4}
                src="/images/suggestion/section4.png"
                alt="section4"
              ></img> */}
            </div>
          </article>
        </section>

        <div
          className={`${ApplyAdMainStyles.mainSection} ${ApplyAdMainStyles.section5}`}
        >
          <div className={ApplyAdMainStyles.imgWrap}>
            {/* <img
              className={ApplyAdMainStyles.section5Img_2}
              src="/images/suggestion/section5_2.png"
              alt="section5_2"
            ></img> */}

            <div style={{ alignSelf: 'center' }}>
              <p className={ApplyAdMainStyles.pInfo}>
                내일의 충전생활, 그 일상을 오늘로.
              </p>
              <div className={ApplyAdMainStyles.info}>
                <p>생활 반경 속 나를 위한 충전기,</p>
                <p>더 쉽게 누릴 수 있도록 엔티즌이 함께 합니다.</p>
              </div>
            </div>
            {/* <img
              className={ApplyAdMainStyles.section5Img_1}
              src="/images/suggestion/section5_1.png"
              alt="section5_1"
            ></img> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyAdMain;
