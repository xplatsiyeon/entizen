import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import styles from './index.module.css';
import classNames from 'classnames';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';

import as_01 from 'public/new/electric/as_01.png';
import as_02 from 'public/new/electric/as_02.png';
import bannerImage from 'public/new/electric/banner.png';
import carbonNextArrow from 'public/new/electric/carbon_next_arrow.png';
import chart from 'public/new/electric/chart.png';
import consulting_01 from 'public/new/electric/consulting_01.png';
import consulting_02 from 'public/new/electric/consulting_02.png';
import entizen_01 from 'public/new/electric/entizen_01.png';
import entizen_02 from 'public/new/electric/entizen_02.png';
import entizen_03 from 'public/new/electric/entizen_03.png';
import entizen_mb_01 from 'public/new/electric/entizen_mb_01.png';
import entizen_mb_02 from 'public/new/electric/entizen_mb_02.png';
import entizen_mb_03 from 'public/new/electric/entizen_mb_03.png';
import phone_01 from 'public/new/electric/phone_01.png';
import phone_02 from 'public/new/electric/phone_02.png';
import why_01 from 'public/new/electric/why_01.png';
import why_02 from 'public/new/electric/why_02.png';
import why_03 from 'public/new/electric/why_03.png';
import why_04 from 'public/new/electric/why_04.png';
import chartImage from 'public/new/electric/chart.png';
import chartImageMb from 'public/new/electric/chart_mb.png';
import step_arrow from 'public/new/estimate/step_arrow.svg';
import WebHeader from 'components/NewHeader/BeforeHeaderA';

import { Drawer } from '@mui/material';
import styled from '@emotion/styled';
import Hamburger from 'public/images/list-bar.svg';
import HamburgerBar from 'componentsWeb/HamburgerBar';

import TagManager from 'react-gtm-module'

const Electric = () => {
    const isMobile = useMediaQuery({
        query: '(max-width:899.25pt)',
    });
    const router = useRouter();

    const [state, setState] = useState({ right: false });
    const toggleDrawer =
    (anchor: string, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
        return;
        }
        setState({ ...state, [anchor]: open });
    };

    const clickGetMoreEstimate = () => {
        const tagManagerArgs = {
            dataLayer: {
                event: "click_get_more_estimate",
            },
        };
        TagManager.dataLayer(tagManagerArgs);
        router.push('/new/estimateForm/form2');
    }
    

    const IconBox = styled.div`
        position: absolute;
        display: flex;
        align-items: center;
        top: 0;
        right: 15pt;
        gap: 22pt;

        @media (min-width: 900pt) {
        display: none;
        }
    `;
    
   return (
    <div id="electric">
        <WebHeader/>
        {isMobile && (
            <>
              {(['right'] as const).map((anchor) => (
                <React.Fragment key={anchor}>
                  <div onClick={toggleDrawer(anchor, true)}>
                    <IconBox>
                      <Image src={Hamburger} alt="listIcon" />
                    </IconBox>
                  </div>
                  <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                    // PaperProps={{ style: { borderRadius: '20pt 20pt 0 0' } }}
                  >
                    <HamburgerBar
                      anchor={anchor}
                      toggleDrawer={toggleDrawer}
                      setState={setState}
                      state={state}
                    />
                  </Drawer>
                </React.Fragment>
              ))}
            </>
          )}
        {/* banner */}
        <section className={styles.sec_01}>
            <div className={classNames(styles.container, styles.banner_container)}>
                <div className={styles.banner_image} style={{ height: '17.5rem' }}>
                    <Image 
                        src={bannerImage}
                        // layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                    />
                </div>
            </div>
            </section>

            {/* sub banner */}
            <section className={styles.sec_02}>
                <div className={classNames(styles.container, styles.sub_banner_container)}>
                    <div className={styles.text_01}>수익형 전기차 충전기 설치</div>
                    <div className={styles.text_02}>견적비교부터 설치 후 A/S까지 엔티즌으로 미리 준비하세요</div>
                </div>
            </section>

            {/* section chart */}
            <section className={styles.sec_03}>
                <div className={styles.container}>
                    <div className={styles.chart_container}>
                        <div className={styles.chart_wrapper}><Image src={isMobile ? chartImageMb : chartImage}/></div>
                    </div>
                    <div className={styles.news_container}>
                        <div className={styles.item}>‘540조’ 먹거리 전쟁 본격화... 전기차 충전 시장 뜨거워진다</div>
                        <div className={styles.item}>전기차 뒤따르는 충전 시장...2030년 584조원 규모</div>
                        <div className={styles.item}>{`[452조 전기차 충전시장] 내년 세계시장규모 76.5조-> 2030년 452조 예상`}</div>
                        <div className={styles.item}>[‘급성장’전기차 충전 인프라] 10조 황금알 낳는 ‘이머징 마켓’... 대기업들 선점경쟁 ‘불꽃’</div>
                    </div>
                </div>
            </section>

            {/* section content */}
            <section className={styles.sec_04}>
                <div className={classNames(styles.container, styles.content_container)}>
                    {/* 섹션 제목 */}
                    <div className={classNames(styles.wrapper, styles.content_wrapper_01)}>
                        <div className={styles.title}>
                            이런 변화에 맞춰 렌터카 시장도<br/>발빠르게 움직이고 있죠
                        </div>
                        <div className={styles.item_wrapper}>
                            <div className={styles.item}>친환경차 늘리는 렌터카... <br/>전기차 등록 3만대 ‘1년새 두배’</div>
                            <div className={styles.item}>전기차 공용 완속충전기 설치 ‘직접신청’... <br/>3개월만 1만기 돌파</div>
                        </div>
                    </div>

                    {/* 엔티즌 설명 */}
                    <div className={classNames(styles.wrapper, styles.content_wrapper_02)}>
                        <div className={styles.title}>엔티즌에서는</div>
                        {isMobile ? (
                            <div>
                                <Swiper 
                                    slidesPerView={2.3}
                                    // slidesPerView={'auto'}
                                    spaceBetween={isMobile ? 10 : 30}
                                    modules={[Autoplay, Pagination]} 
                                    autoplay={{
                                        delay: 2500,
                                        disableOnInteraction: false,
                                    }}
                                    loop={false}
                                    navigation={false}
                                    pagination={false}
                                    >
                                    <SwiperSlide>
                                        <div className={styles.info_img}><Image src={entizen_mb_01}/></div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className={styles.info_img}><Image src={entizen_mb_02}/></div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className={styles.info_img}><Image src={entizen_mb_03}/></div>
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                        ) : (
                            <div className={styles.item_wrapper}>
                                <div className={styles.item}>
                                    <Image className={styles.img} src={entizen_01}/>
                                    <div className={styles.text}>합리적인 가격을<br/>선택할 수 있어요</div>
                                </div>
                                <div className={styles.item}>
                                    <Image className={styles.img} src={entizen_02}/>
                                    <div className={styles.text}>시간을<br/>아낄 수 있어요</div>
                                </div>
                                <div className={styles.item}>
                                    <Image className={styles.img} src={entizen_03}/>
                                    <div className={styles.text}>유지보수<br/>걱정 없어요</div>
                                </div>
                            </div>
                        )}
                        
                    </div>

                    {/* 견적 비교 */}
                    <div className={classNames(styles.wrapper, styles.content_wrapper_03)}>
                        <div className={styles.title}>한번에! 손쉽게! 간편한 견적 비교</div>
                        <div className={styles.sub_title}>다양한 견적을 한 눈에 비교해보고, 나에게 딱 맞는 상품을 선택하세요.</div>
                        {isMobile ? (
                            <Swiper 
                                slidesPerView={1.3}
                                // slidesPerView={'auto'}
                                spaceBetween={isMobile ? 10 : 30}
                                modules={[Autoplay, Pagination]} 
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                                loop={false}
                                navigation={false}
                                pagination={false}
                                >
                                <SwiperSlide>
                                    <div className={styles.info_img}><Image src={phone_01}/></div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className={styles.info_img}><Image src={phone_02}/></div>
                                </SwiperSlide>
                            </Swiper>
                        ) : (
                            <div className={styles.item_wrapper}>
                                <div className={styles.item}><Image src={phone_01}/></div>
                                <div className={styles.item}><Image src={carbonNextArrow}/></div>
                                <div className={styles.item}><Image src={phone_02}/></div>
                            </div>
                        )}
                    </div> 

                    {/* 맞춤 컨설팅 */}
                    <div className={classNames(styles.wrapper, styles.content_wrapper_04)}>
                        <div className={styles.title}>1:1 맞춤 컨설팅</div>
                        <div className={styles.sub_title}>방문 손님만 충전할 수 있게 설계 해드릴게요.</div>
                        <div className={styles.item_wrapper}>
                            <div className={styles.item}><Image src={consulting_01}/></div>
                            <div className={styles.item}><Image src={consulting_02}/></div>
                        </div>
                    </div>

                    {/* A/S시스템 */}
                    <div className={classNames(styles.wrapper, styles.content_wrapper_05)}>
                        <div className={styles.title}>편리한 운영 및 A/S 시스템</div>
                        <div className={styles.sub_title}>세 개로 나뉘어 있던 A/S 시스템을 선택하신 파트너 업체에서 모두 케어합니다.</div>
                        <div className={styles.item_wrapper}>
                            <div className={styles.item}><Image src={as_01}/></div>
                            <div className={classNames(styles.item, styles.next_arrow)}><Image src={carbonNextArrow}/></div>
                            <div className={styles.item}><Image src={as_02}/></div>
                        </div>
                    </div>

                    {/* why */}
                    <div className={classNames(styles.wrapper, styles.content_wrapper_06)}>
                        <div className={styles.title}>Why 엔티즌?</div>
                        <div className={styles.item_wrapper}>
                            <div className={styles.item}>
                                <div className={styles.text_01}>Reason 1</div>
                                <div className={styles.text_02}>정보 입력 한 번이면 연결된 여러 업체의<br/>가격 및 서비스 정보를 한 번에 비교 가능</div>
                                <div className={styles.img}><Image src={why_01}/></div>
                            </div>
                            <div className={styles.item}>
                                <div className={styles.text_01}>Reason 2</div>
                                <div className={styles.text_02}>나에게 딱 맞는 충전기? 충전 요금?<br/>엔티즌이 다 알려드릴게요</div>
                                <div className={styles.img}><Image src={why_02}/></div>
                            </div>
                            <div className={styles.item}>
                                <div className={styles.text_01}>Reason 3</div>
                                <div className={styles.text_02}>설치부터 충전기로 인한 수익 설계까지<br/>무료 컨설팅 받으세요</div>
                                <div className={styles.img}><Image src={why_03}/></div>
                            </div>
                            <div className={styles.item}>
                                <div className={styles.text_01}>Reason 4</div>
                                <div className={styles.text_02}>운영 및 A/S 접수 모두<br/>엔티즌에서 처리 가능합니다</div>
                                <div className={styles.img}><Image src={why_04}/></div>
                            </div>
                            <div className={styles.button} onClick={clickGetMoreEstimate}>
                                <p>맞춤 비교견적 받고 시간 절약하기&nbsp;&nbsp;<Image src={step_arrow} alt="arrow"/></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
   );
};

export default Electric;