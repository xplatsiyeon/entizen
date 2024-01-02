import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import styles from './index.module.css';
import 'swiper/css';
import classNames from 'classnames';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';

import carbonNextArrow from 'public/new/personalUse/carbon_next_arrow.svg';
import waring from 'public/new/personalUse/icon_waring.svg';
import phone_01 from 'public/new/personalUse/phone_01.png';
import phone_02 from 'public/new/personalUse/phone_02.png';
import coupon from 'public/new/personalUse/coupon.png';
import WebHeader from 'components/NewHeader/BeforeHeaderA';
import Step_1 from 'public/new/personalUse/step_1.svg';
import Step_2 from 'public/new/personalUse/step_2.svg';
import Step_3 from 'public/new/personalUse/step_3.svg';
import Step_4 from 'public/new/personalUse/step_4.svg';
import Step_5 from 'public/new/personalUse/step_5.svg';
import Step_6 from 'public/new/personalUse/step_6.svg';
import Step_arrow_circle from 'public/new/estimate/step_arrow_circle.svg';
import Step_arrow from 'public/new/estimate/step_arrow.svg';

import { Drawer } from '@mui/material';
import styled from '@emotion/styled';
import Hamburger from 'public/images/list-bar.svg';
import HamburgerBar from 'componentsWeb/HamburgerBar';

import TagManager from 'react-gtm-module';

const personalUse = () => {
  const isMobile = useMediaQuery({
    query: '(max-width:480px)',
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
        event: 'click_get_more_estimate',
      },
    };
    TagManager.dataLayer(tagManagerArgs);
    router.push('/new/estimateForm/form4');
  };

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
    <div id="personaluse">
      <WebHeader />
      {isMobile && (
        <>
          {(['right'] as const).map((anchor) => (
            <React.Fragment key={anchor}>
              {/* <div onClick={toggleDrawer(anchor, true)}>
                <IconBox>
                  <Image src={Hamburger} alt="listIcon" />
                </IconBox>
              </div> */}
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

      {/* section 01 */}
      <section className={styles.sec_01}>
        <div className={styles.container}>
          <div className={styles.text_01}>
            원하는 정보 입력 한 번으로 <br /> 여러 업체를 한눈에
            <br className={styles.mobile} />
            비교할 수 있다면?
          </div>
          <div className={styles.text_03}>
            <span>
              제조사<span className={styles.color}> 37곳</span>
            </span>
            <span>
              운영사<span className={styles.color}> 112곳</span>
            </span>
          </div>
          <div className={styles.text_02}>
            언제 다 비교해 보고 선택하실 건가요? <br /> 그렇다고 대충 선택하실
            건가요?
          </div>
        </div>
      </section>

      {/* section 02 */}
      <section className={styles.sec_02}>
        <div className={styles.container}>
          <div className={styles.text_title}>
            <div className={styles.item}>
              <span className={styles.color}>충전기 설치</span>,
              <br className={styles.mobile} />
              혼자 알아보기에는 <br />
              복잡하고 생소한 시장이에요
            </div>
            <div className={styles.item}>혼자 알아보면 생길 수 있는 문제들</div>
          </div>

          <div className={styles.contents_container}>
            <div className={styles.content}>
              <div className={styles.item_01}>시간이 너무 많이들어요</div>
              <div className={styles.item_02}>
                뭐부터 알아봐야할지... 과정이 비효율적이에요
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.item_01}>
                남들보다 비싸게 설치 할 수 있어요
              </div>
              <div className={styles.item_02}>
                비싸게 설치한 걸 안 순간 이미 늦었어요...ㅠ
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.item_01}>
                설치한 업체에서 A/S문의가 전혀 안될 수 있어요
              </div>
              <div className={styles.item_02}>
                설치 할 때는 연락이 잘 됐는데, 이후 문의는 신경을 안써요
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* section 03 */}
      <section className={styles.sec_03}>
        <div className={styles.container}>
          <div className={styles.text}>
            <div className={styles.title}>
              이 모든 문제를 <br />
              엔티즌이 한번에 해결합니다.
            </div>
            <div className={`${styles.item} ${styles.pc}`}>
              설치에 필요한 정보를 한 번만 입력하면,
              <br />
              엔티즌에서 선별한 우수한 업체들에게 견적을 요청합니다.
              <br />
              업체들의 견적을 한눈에 비교하고 선택하면 끝!
            </div>
          </div>

          {/* 견적 비교 */}
          <div className={styles.container02}>
            {isMobile ? (
              <>
                <div className={styles.txt_item}>
                  설치에 필요한 정보를 한 번만 입력하면,
                </div>
                <div className={styles.item_wrapper}>
                  <Image src={phone_01} alt="phone_img" />
                  <div className={styles.txt_item}>
                    엔티즌에서 선별한 우수한 업체들에게
                    <br className={styles.mobile} />
                    견적을 요청합니다.
                  </div>
                  <Image src={phone_02} alt="phone_img" />
                  <div className={styles.txt_item}>
                    업체들의 견적을 한눈에
                    <br className={styles.mobile} />
                    비교하고 선택하면 끝!
                  </div>
                </div>
                <div className={styles.sub_text}>
                  <Image
                    src={waring}
                    alt="icon_waring"
                    style={{ width: '20px' }}
                  />
                  <span>
                    이 후 설치에 필요한 모든 작업은 선택한
                    <br className={styles.mobile} />
                    업체에서 진행합니다.
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className={styles.item_wrapper}>
                  <div className={styles.item}>
                    <Image src={phone_01} alt="phone_img" />
                  </div>
                  <div
                    className={`${styles.item} ${styles.item_arrow}`}
                    style={{ width: '33%' }}
                  >
                    <Image src={carbonNextArrow} alt="phone_arrow" />
                  </div>
                  <div className={styles.item}>
                    <Image src={phone_02} alt="phone_img" />
                  </div>
                </div>
                <div className={styles.sub_text}>
                  <Image src={waring} alt="icon_waring" />
                  <span>
                    이 후 설치에 필요한 모든 작업은 선택한 업체에서 진행합니다.
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section className={styles.sec_04}>
        <div className={styles.sec_wrapper}>
          <div className={styles.title}>설치과정 한 눈에 보기</div>
          <div className={styles.step_container}>
            {isMobile ? (
              <div className={styles.step_wrap}>
                <div className={styles.step_wrapper}>
                  <div className={`${styles.step01} ${styles.step}`}>
                    <span className={styles.txt_top}>Setp 1</span>
                    <Image
                      src={Step_1}
                      height={43}
                      alt="setp1_img"
                      className={styles.step_icon}
                    />
                    <span className={styles.txt_bottom}>견적 요청</span>
                  </div>
                  <Image
                    src={Step_arrow_circle}
                    alt="step_next_arrow"
                    height={20}
                  />
                  <div className={`${styles.step02} ${styles.step}`}>
                    <span className={styles.txt_top}>Setp 2</span>
                    <Image
                      src={Step_2}
                      height={43}
                      alt="setp2_img"
                      className={styles.step_icon}
                    />
                    <span className={styles.txt_bottom}>비교/선택</span>
                  </div>
                  <Image
                    src={Step_arrow_circle}
                    alt="step_next_arrow"
                    height={20}
                  />
                  <div className={`${styles.step03} ${styles.step}`}>
                    <span className={styles.txt_top}>Setp 3</span>
                    <Image
                      src={Step_3}
                      height={43}
                      alt="setp3_img"
                      className={styles.step_icon}
                    />
                    <span className={styles.txt_bottom}>현장실사</span>
                  </div>
                </div>
                <div>
                  <hr />
                </div>
                <div className={styles.step_wrapper}>
                  <div className={`${styles.step04} ${styles.step}`}>
                    <span className={styles.txt_top}>Setp 4</span>
                    <Image
                      src={Step_4}
                      height={43}
                      alt="setp4_img"
                      className={styles.step_icon}
                    />
                    <span className={styles.txt_bottom}>계약진행</span>
                  </div>
                  <Image
                    src={Step_arrow_circle}
                    alt="step_next_arrow"
                    height={20}
                  />
                  <div className={`${styles.step05} ${styles.step}`}>
                    <span className={styles.txt_top}>Setp 5</span>
                    <Image
                      src={Step_5}
                      height={43}
                      alt="setp5_img"
                      className={styles.step_icon}
                    />
                    <span className={styles.txt_bottom}>공사시작</span>
                  </div>
                  <Image
                    src={Step_arrow_circle}
                    alt="step_next_arrow"
                    height={20}
                  />
                  <div className={`${styles.step06} ${styles.step}`}>
                    <span className={styles.txt_top}>Setp 6</span>
                    <Image
                      src={Step_6}
                      height={43}
                      alt="setp6_img"
                      className={styles.step_icon}
                    />
                    <span className={styles.txt_bottom}>설치완료</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.step_wrap}>
                <div className={styles.step_wrapper}>
                  <div className={`${styles.step01} ${styles.step}`}>
                    <span className={styles.txt_top}>Setp 1</span>
                    <Image
                      src={Step_1}
                      height={68}
                      alt="setp1_img"
                      className={styles.step_icon}
                    />
                    <span className={styles.txt_bottom}>견적 요청</span>
                  </div>
                  <Image src={Step_arrow_circle} alt="step_next_arrow" />
                  <div className={`${styles.step02} ${styles.step}`}>
                    <span className={styles.txt_top}>Setp 2</span>
                    <Image
                      src={Step_2}
                      height={68}
                      alt="setp2_img"
                      className={styles.step_icon}
                    />
                    <span className={styles.txt_bottom}>비교/선택</span>
                  </div>
                  <Image src={Step_arrow_circle} alt="step_next_arrow" />
                  <div className={`${styles.step03} ${styles.step}`}>
                    <span className={styles.txt_top}>Setp 3</span>
                    <Image
                      src={Step_3}
                      height={68}
                      alt="setp3_img"
                      className={styles.step_icon}
                    />
                    <span className={styles.txt_bottom}>현장실사</span>
                  </div>
                </div>
                <div>
                  <hr />
                </div>
                <div className={styles.step_wrapper}>
                  <div className={`${styles.step04} ${styles.step}`}>
                    <span className={styles.txt_top}>Setp 4</span>
                    <Image
                      src={Step_4}
                      height={68}
                      alt="setp4_img"
                      className={styles.step_icon}
                    />
                    <span className={styles.txt_bottom}>계약진행</span>
                  </div>
                  <Image src={Step_arrow_circle} alt="step_next_arrow" />
                  <div className={`${styles.step05} ${styles.step}`}>
                    <span className={styles.txt_top}>Setp 5</span>
                    <Image
                      src={Step_5}
                      height={68}
                      alt="setp5_img"
                      className={styles.step_icon}
                    />
                    <span className={styles.txt_bottom}>공사시작</span>
                  </div>
                  <Image src={Step_arrow_circle} alt="step_next_arrow" />
                  <div className={`${styles.step06} ${styles.step}`}>
                    <span className={styles.txt_top}>Setp 6</span>
                    <Image
                      src={Step_6}
                      height={68}
                      alt="setp6_img"
                      className={styles.step_icon}
                    />
                    <span className={styles.txt_bottom}>설치완료</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className={styles.sec_05}>
        <div className={styles.sec_wrapper}>
          <div className={styles.title}>이런 분들께 추천드려요</div>
          <div className={styles.item_container}>
            <div className={styles.item}>
              <div className={styles.item_01}>시간이 곧 돈인 분</div>
              <div className={styles.item_02}>
                그 시간! 저희가 아껴드릴게요!
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.item_01}>
                금액을 최대한 세이브하고 싶은 분
              </div>
              <div className={styles.item_02}>
                한 눈에 비교할 수 있는 견적서를 통해 합리적인 선택을
                도와드릴게요!
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.item_01}>
                안정적인 업체를 선택하고 싶은 분
              </div>
              <div className={styles.item_02}>
                경험 많고 우수한 업체만 추려드릴게요!
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sec_06}>
        <div className={styles.container}>
          <div className={styles.text_title}>
            마지막으로, <br />
            <span className={styles.color}>
              엔티즌에서만
              <br className={styles.mobile} />
              제공할 수 있는 혜택
            </span>
          </div>

          <div className={styles.contents_container}>
            <div className={styles.content}>
              {isMobile ? (
                <div className={styles.coupon}>
                  <Image
                    src={coupon}
                    alt="coupon_img"
                    style={{ width: '100%' }}
                  />
                </div>
              ) : (
                <div className={styles.coupon}>
                  <Image src={coupon} alt="coupon_img" />
                </div>
              )}
              <div className={styles.item_text}>
                <span>어떻게 이런 혜택이 가능할까?</span>
                <span>
                  엔티즌에서 고객 유치를 시켜줌으로써 업체에서 SAVE 되는
                  <br className={styles.pc} />
                  마케팅 비용을 고객 여러분께 혜택으로 돌려드립니다.
                </span>
              </div>
              <div className={styles.sub_text}>
                <Image src={waring} alt="icon_waring" />
                <span>해당 할인은 비공용 충전기 설치에 한해 적용됩니다.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.button_container}>
        <div className={styles.button} onClick={clickGetMoreEstimate}>
          <p>
            1분 안에 최고의 견적 찾기&nbsp;&nbsp;
            <Image src={Step_arrow} alt="arrow" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default personalUse;
