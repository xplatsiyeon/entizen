import { Swiper, SwiperSlide } from 'swiper/react';

import SwiperCore, { Pagination, Navigation, Autoplay } from 'swiper';
import RightNext from 'public/images/RightNextEllipse.svg';
import LeftNext from 'public/images/LeftNextEllipse.svg';
import Image from 'next/image';
import estimateByCompanyStyles from './company.module.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { COMPANY_LIST } from 'assets/company';
import { useMediaQuery } from 'react-responsive';
import { MyEstimateHeader } from 'components/myEstimate/header';
SwiperCore.use([Navigation, Pagination, Autoplay]);

const EstimateByCompany = () => {
  const company = 'starkoff';
  sessionStorage.setItem('USER_ID', 'test');

  const isTablet = useMediaQuery({
    query: '(max-width: 1023px)',
  });

  const [swiper, setSwiper] = useState<SwiperCore>();
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);
  const exampleNavigationPrevRef = useRef<HTMLButtonElement>(null);
  const exampleNavigationNextRef = useRef<HTMLButtonElement>(null);

  const tabAction = useCallback(() => {
    // 1. 네비게이션 메뉴들을 querySelectorAll을 통해 변수에 담는다.
    const gnbItems = document.querySelectorAll(`a.tabBarBtn`);
    // 2. 섹션들을 전부 querySelectorAll을 통해 변수에 담는다.
    const sections: NodeListOf<HTMLDivElement> =
      document.querySelectorAll(`div.tabPanel`);

    // 3. forEach 문을 통해 한번씩 순회한다.
    // 이때 index도 같이 가져온다.
    gnbItems.forEach((gnbItem: Element, index) => {
      //4. 네비게이션 메뉴에 클릭 이벤트를 준다.

      gnbItem.addEventListener('click', (e) => {
        // 5. 메뉴를 a 태그에 만들었기 때문에,
        // 태그의 기본 동작(링크 연결) 방지를 위해 preventDefault를 추가한다.
        e.preventDefault();
        // 6. 섹션들 중 네비게이션 메뉴의 index 에 해당하는 섹션의 높이값을 구하고,
        // 네비게이션 높이만큼 값을 빼준다.
        const sectionTop = sections[index]?.offsetTop - 400;
        const activeList: NodeListOf<HTMLLIElement> = document.querySelectorAll(
          `li.${estimateByCompanyStyles.active}`,
        );

        activeList.forEach((item: Element, index) => {
          item.setAttribute('class', estimateByCompanyStyles.tabBarItem);
        });
        gnbItem?.parentElement?.setAttribute(
          'class',
          `${estimateByCompanyStyles.tabBarItem} ${estimateByCompanyStyles.active}`,
        );

        // 7. 해당 위치로 스크롤을 이동시킨다.
        window.scroll({ top: sectionTop });
      });
    });
  }, []);
  useEffect(() => {
    tabAction();
  }, []);
  useEffect(() => {
    if (swiper) {
      swiper.slideTo(0, 0, false);
    }
  }, [swiper]);

  const estimateByCompanyData = COMPANY_LIST[company];

  return (
    <div className={estimateByCompanyStyles.byCompanyContainer}>
      <MyEstimateHeader></MyEstimateHeader>

      <div className={estimateByCompanyStyles.company}>
        <p className={estimateByCompanyStyles.companyTitle}>
          {estimateByCompanyData.name}
        </p>
        <div className={estimateByCompanyStyles.buttonWrap}>
          <a
            className={`${estimateByCompanyStyles.button} ${estimateByCompanyStyles.kakaoChatBtn}`}
            href="https://open.kakao.com/o/stFSO2Uf"
            target="_blank"
          >
            <span className={estimateByCompanyStyles.kakaoIcon}></span>
            채팅하기
          </a>
          <button
            onClick={() => {location.href = '/new/estimateForm/complete2'}}
            className={`${estimateByCompanyStyles.button}  ${estimateByCompanyStyles.applyBtn}`}
          >
            이 업체에게 현장실사 받기
          </button>
        </div>
      </div>
      <div
        className={`${estimateByCompanyStyles.companyBackgroundImg} ${estimateByCompanyStyles[company]}`}
      ></div>
      <div className={estimateByCompanyStyles.tabBarWrap}>
        <ul className={estimateByCompanyStyles.tabBarList}>
          <li
            className={`${estimateByCompanyStyles.tabBarItem} ${estimateByCompanyStyles.active}`}
          >
            <a href="#estimateInfo" role="tab" className={'tabBarBtn'}>
              특장점
            </a>
          </li>
          <li className={estimateByCompanyStyles.tabBarItem}>
            <a href="#detailInfo" role="tab" className={'tabBarBtn'}>
              상세 견적
            </a>
          </li>
          <li className={estimateByCompanyStyles.tabBarItem}>
            <a href="#performance" role="tab" className={'tabBarBtn'}>
              주요 실적
            </a>
          </li>
          <li className={estimateByCompanyStyles.tabBarItem}>
            <a href="#example" role="tab" className={'tabBarBtn'}>
              설치 사례
            </a>
          </li>
          <li className={estimateByCompanyStyles.tabBarItem}>
            <a href="#brand" role="tab" className={'tabBarBtn'}>
              브랜드 소개
            </a>
          </li>
        </ul>
      </div>
      <section className={estimateByCompanyStyles.mainContainer}>
        <div className={estimateByCompanyStyles.companyInfoWrap}>
          <div
            className={`${estimateByCompanyStyles.companyLogo} ${estimateByCompanyStyles[company]}`}
          ></div>
          <div className={estimateByCompanyStyles.companyInfo}>
            <div className={estimateByCompanyStyles.companyInfoEtc}>
              <p className={estimateByCompanyStyles.list}>
                <span className={estimateByCompanyStyles.title}>시공횟수</span>
                <span className={estimateByCompanyStyles.info}>
                  {estimateByCompanyData.companyInfo.info1}
                </span>
              </p>
              <p className={estimateByCompanyStyles.list}>
                <span className={estimateByCompanyStyles.title}>A/S현황</span>
                <span className={estimateByCompanyStyles.info}>
                  {estimateByCompanyData.companyInfo.info2}
                </span>
              </p>
              <p className={estimateByCompanyStyles.list}>
                <span className={estimateByCompanyStyles.title}>
                  추천 포인트
                </span>
                <span className={estimateByCompanyStyles.info}>
                  {estimateByCompanyData.companyInfo.info3}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div
          className={`${estimateByCompanyStyles.estimateInfoWrap} tabPanel`}
          role="tabpanel"
          data-content="estimateInfo"
        >
          <div className={`${estimateByCompanyStyles.title}`}>특장점</div>
          <div className={estimateByCompanyStyles.infoWrap}>
            <div className={estimateByCompanyStyles.infoBox}>
              <div className={estimateByCompanyStyles.infoTitle}>
                제품 특장점
              </div>
              <ul>
                {estimateByCompanyData.estimateInfo.info1.map((info: any) => (
                  <li>{info}</li>
                ))}
              </ul>
            </div>
            <div className={estimateByCompanyStyles.infoBox}>
              <div className={estimateByCompanyStyles.infoTitle}>
                서비스 특장점
              </div>
              <ul>
                {estimateByCompanyData.estimateInfo.info2.map((info: any) => (
                  <li>{info}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div
          className={`${estimateByCompanyStyles.estimateDetailWrap} tabPanel`}
          role="tabpanel"
          data-content="detailInfo"
        >
          <div className={`${estimateByCompanyStyles.title}`}>상세견적</div>
          {/* <div className={estimateByCompanyStyles.detailWrap}> */}
          <div className={estimateByCompanyStyles.detailInfo}>
            <div className={estimateByCompanyStyles.detailInfoEtc}>
              {estimateByCompanyData.detailInfo.default.map((item: any) => {
                return (
                  <p className={estimateByCompanyStyles.list}>
                    <span className={estimateByCompanyStyles.title}>
                      {item.title}
                    </span>
                    <span className={estimateByCompanyStyles.info}>
                      {item.info}
                    </span>
                  </p>
                );
              })}
              <div>
                <p className={estimateByCompanyStyles.subList}>
                  <span className={estimateByCompanyStyles.title}>
                    필요 시 추가비용 발생
                  </span>
                </p>
                {estimateByCompanyData.detailInfo.sub.map((item: any) => {
                  return (
                    <p className={estimateByCompanyStyles.list}>
                      <span className={estimateByCompanyStyles.title}>
                        {item.title}
                      </span>
                      <span className={estimateByCompanyStyles.info}>
                        {item.info}
                      </span>
                    </p>
                  );
                })}
              </div>
              <p className={estimateByCompanyStyles.subList}>
                <span className={estimateByCompanyStyles.title}>
                  개별 구매시
                </span>
                {estimateByCompanyData.detailInfo.etc.length > 0 ? (
                  estimateByCompanyData.detailInfo.etc.map((item: any) => {
                    return (
                      <span className={estimateByCompanyStyles.info}>
                        <strong>{item.title}</strong>
                        {item.info}
                      </span>
                    );
                  })
                ) : (
                  <span className={estimateByCompanyStyles.info}>
                    {/* <strong>{item.title}</strong> */}
                    {'개별구매 불가'}
                  </span>
                )}
              </p>
            </div>
          </div>
          {/* </div> */}
        </div>
      </section>
      <div className={estimateByCompanyStyles.certificateWrap}>
        <div className={estimateByCompanyStyles.certificateInfo}>
          <div className={estimateByCompanyStyles.title}>
            <span className={estimateByCompanyStyles.companyName}>
              {estimateByCompanyData.name}
            </span>
            를 선택하는<br></br> 또 하나의 지표
          </div>
          {!isTablet ? (
            <>
              <Swiper
                className={estimateByCompanyStyles.section2Slider}
                wrapperTag={'ul'}
                // loop={true}
                slidesPerView="auto"
                spaceBetween={24}
                onSwiper={setSwiper}
                // autoplay={{
                //   disableOnInteraction: false,
                // }}
                speed={500}
                navigation={{
                  prevEl: navigationPrevRef.current,
                  nextEl: navigationNextRef.current,
                }}
              >
                {estimateByCompanyData.certificateInfo.map(
                  (img: string, idx: number) => {
                    return (
                      <SwiperSlide
                        key={idx}
                        className={estimateByCompanyStyles.item}
                        tag={'li'}
                      >
                        <Image src={img} layout="fill" />
                      </SwiperSlide>
                    );
                  },
                )}
              </Swiper>
              <button
                className={`${estimateByCompanyStyles.swiperBtn} ${estimateByCompanyStyles.btnPrev}`}
                ref={navigationPrevRef}
              >
                이전
              </button>
              <button
                className={`${estimateByCompanyStyles.swiperBtn} ${estimateByCompanyStyles.btnNext}`}
                ref={navigationNextRef}
              >
                다음
              </button>
            </>
          ) : (
            <div className={estimateByCompanyStyles.section2Slider}>
              <ul className={estimateByCompanyStyles.section2SliderUl}>
                {estimateByCompanyData.certificateInfo.map(
                  (img: string, idx: number) => {
                    return (
                      <li key={idx} className={estimateByCompanyStyles.item}>
                        <Image
                          src={img}
                          // layout="fill"
                          width={169}
                          height={278}
                        />
                      </li>
                    );
                  },
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
      <section className={estimateByCompanyStyles.mainContainer}>
        <div
          className={`${estimateByCompanyStyles.performanceWrap} tabPanel`}
          role="tabpanel"
          data-content="performance"
        >
          <div className={`${estimateByCompanyStyles.title}`}>주요 실적</div>
          <div className={estimateByCompanyStyles.infoWrap}>
            {estimateByCompanyData.performanceInfo.map((item: any) => {
              return (
                <div className={estimateByCompanyStyles.infoBox}>
                  <p className={estimateByCompanyStyles.title}>
                    <span
                      className={estimateByCompanyStyles.certificateIcon}
                    ></span>
                    {item.title}
                  </p>
                  <p className={estimateByCompanyStyles.info}>{item.info}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div
          className={`${estimateByCompanyStyles.exampleWrap} tabPanel`}
          role="tabpanel"
          data-content="example"
        >
          <div className={`${estimateByCompanyStyles.title}`}>설치 사례</div>
          <div className={estimateByCompanyStyles.infoWrap}>
            <Swiper
              className={estimateByCompanyStyles.section2Slider}
              wrapperTag={'ul'}
              slidesPerView={isTablet ? 1.5 : "auto"}
              spaceBetween={24}
              onSwiper={setSwiper}
              speed={500}
              navigation={{
                prevEl: exampleNavigationPrevRef.current,
                nextEl: exampleNavigationNextRef.current,
              }}
            >
              {estimateByCompanyData.exampleInfo.map(
                (img: string, idx: number) => {
                  return (
                    <SwiperSlide
                      key={idx}
                      className={estimateByCompanyStyles.item}
                      tag={'li'}
                    >
                      <Image src={img} layout="fill" />
                    </SwiperSlide>
                  );
                },
              )}
            </Swiper>
            <button
              className={`${estimateByCompanyStyles.swiperBtn} ${estimateByCompanyStyles.btnPrev}`}
              ref={exampleNavigationPrevRef}
            >
              이전
            </button>
            <button
              className={`${estimateByCompanyStyles.swiperBtn} ${estimateByCompanyStyles.btnNext}`}
              ref={exampleNavigationNextRef}
            >
              다음
            </button>
          </div>
        </div>
        <div
          className={`${estimateByCompanyStyles.footerWrap} tabPanel`}
          role="tabpanel"
          data-content="brand"
        >
          <div className={estimateByCompanyStyles.title}>브랜드 소개</div>
          <p className={estimateByCompanyStyles.info}>
            {estimateByCompanyData.brandInfo}
          </p>
        </div>
      </section>
    </div>
  );
};
export default EstimateByCompany;
