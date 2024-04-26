"use client"

import { Box } from '@mui/system';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import WebHeader from '../../components/brought/newHeader/BeforeHeaderA';
import {
  Grid,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import Step_1 from '/public/pages/estimate/step_1.svg';
import Step_2 from '/public/pages/estimate/step_2.svg';
import Step_3 from '/public/pages/estimate/step_3.svg';
import Step_4 from '/public/pages/estimate/step_4.svg';
import Step_5 from '/public/pages/estimate/step_5.svg';
import Step_6 from '/public/pages/estimate/step_6.svg';
import Step_arrow_circle from '/public/pages/estimate/step_arrow_circle.svg';
import Sec02Img from '/public/pages/estimate/sec_02.png';
import Step_arrow from '/public/pages/estimate/step_arrow.svg';
import styles from './index.module.css';
import TagManager from 'react-gtm-module';
import classNames from 'classnames';

const progress_01 = [
  {
    title: '견적 요청',
    description: '입주민들의 충전기 설치 요청을 받습니다.',
    image: Step_1,
  },
  { isArrow: true },
  {
    title: '입주민 회의',
    description: '입주민들이 원하는 충전기 설치 업체를 선정합니다.',
    image: Step_2,
  },
  { isArrow: true },
  {
    title: '사진 비교/선택',
    description: '선정된 업체들의 설치 사진을 비교하고 선택합니다.',
    image: Step_3,
  },
];
const progress_02 = [
  {
    title: '현장실사 및 계약',
    description:
      '선택된 업체가 현장을 방문하여 설치가 가능한지 확인하고 계약합니다.',
    image: Step_4,
  },
  { isArrow: true },
  {
    title: '공사시작',
    description: '설치가 시작됩니다.',
    image: Step_5,
  },
  { isArrow: true },
  {
    title: '설치완료',
    description: '설치가 완료되고 충전기를 사용할 수 있습니다.',
    image: Step_6,
  },
];

const Estimate = () => {
  const isMobile = useMediaQuery({
    query: '(max-width:480px)',
  });
  const router = useRouter();

  // 필요한 인자 값 받아와서 페이지 이동
  const pageHandler = (page: string) => {
    router.push(`${page}`);
  };

  const clickGetMoreEstimate = () => {
    const tagManagerArgs = {
      dataLayer: {
        event: 'click_get_more_estimate',
      },
    };
    TagManager.dataLayer(tagManagerArgs);
    router.push('/estimateForm/form1');
  };

  return (
    <div id="estimate" className={styles.estimate}>
      <WebHeader />
      <div className={classNames(styles.container, styles.banner_container)}>
        <div className={styles.banner_title}>
          설치비용, 충전요금
          <br />
          상황에 딱 맞게 제안해 드릴게요
        </div>
      </div>
      <section className={styles.sec_01}>
        <div className={styles.sec_wrapper}>
          <div className={styles.title_01}>
            <p>입대위 의사결정을 위한 비교 견적</p>
          </div>
          {/* 견적서 */}
          {isMobile ? (
            <>
              <div className={styles.mobile_sec_01}>
                <div className={styles.sheet}>
                  {/* 비교 컨테이너 */}
                  <div className={styles.sheet_comparison}>
                    <div>
                      <Grid container>
                        <Grid item xs>
                          <div className={styles.item_wrap}>
                            <p className={styles.item_01}>A사</p>
                            <div className={styles.item_02}>
                              <div className={styles.descriptions}>
                                <p className={styles.label}>설치비</p>
                                <p className={styles.content}>무료</p>
                              </div>
                              <div className={styles.descriptions}>
                                <p className={styles.label}>충전요금</p>
                                <p className={styles.content}>220원/kW</p>
                              </div>
                            </div>
                          </div>
                        </Grid>
                        <span className={styles.versus}>VS</span>
                        <Grid item xs>
                          <div className={styles.item_wrap}>
                            <p className={styles.item_01}>B사</p>
                            <div className={styles.item_02}>
                              <div className={styles.descriptions}>
                                <p className={styles.label}>설치비</p>
                                <p className={styles.content}>무료</p>
                              </div>
                              <div className={styles.descriptions}>
                                <p className={styles.label}>충전요금</p>
                                <p className={styles.content}>229원/kW</p>
                              </div>
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                  <hr />
                  {/* 프로모션 */}
                  <div className={styles.sheet_promotion}>
                    <div className={styles.promotion_title}>프로모션</div>
                    <div className={styles.promotion_container}>
                      <div className={styles.promotion_wrapper}>
                        <div>• 1년 139원/kW</div>
                        <div>• 6개월 119원/kW</div>
                      </div>
                      <div className={styles.promotion_wrapper}>
                        <div className={styles.text_right}>
                          • 6개월 165원/kW
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 표 */}
                  <div className={styles.sheet_table}>
                    <TableContainer component={Paper}>
                      <Table
                        sx={{ minWidth: 100 }}
                        size="small"
                        aria-label="a dense table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell align="center" colSpan={3}>
                              <p>옵션</p>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell align="center">O</TableCell>
                            <TableCell align="center" className={styles.option}>
                              보험 가입
                            </TableCell>
                            <TableCell align="center">O</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="center">O</TableCell>
                            <TableCell align="center" className={styles.option}>
                              화재 감지
                            </TableCell>
                            <TableCell align="center">X</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="center">X</TableCell>
                            <TableCell align="center" className={styles.option}>
                              터치 LCD
                            </TableCell>
                            <TableCell align="center">O</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="center">X</TableCell>
                            <TableCell align="center" className={styles.option}>
                              신용카드 리더기
                            </TableCell>
                            <TableCell align="center">X</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="center">O</TableCell>
                            <TableCell align="center" className={styles.option}>
                              간편결제 기능
                            </TableCell>
                            <TableCell align="center">O</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="center">O</TableCell>
                            <TableCell align="center" className={styles.option}>
                              전용 앱 서비스
                            </TableCell>
                            <TableCell align="center">O</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="center">O</TableCell>
                            <TableCell align="center" className={styles.option}>
                              로밍
                            </TableCell>
                            <TableCell align="center">O</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="center">O</TableCell>
                            <TableCell align="center" className={styles.option}>
                              출력 제어 기능
                            </TableCell>
                            <TableCell align="center">O</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>

                  <p className={styles.text_01}>
                    엔티즌 파트너 업체들의 충전 요금은 <br />
                    <span className={styles.text_02}>119원~250원</span>으로
                    다양합니다.
                  </p>
                </div>
              </div>

              <div className={styles.mobile_title_02}>
                <p>
                  설치환경에 따라 제시되는
                  <br />
                  엔티즌 파트너들의 비교 견적서를
                  <br />
                  받아보세요.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className={styles.sheet_container}>
                <div className={styles.sheet}>
                  {/* 비교 컨테이너 */}
                  <div className={styles.sheet_comparison}>
                    <div>
                      <Grid container>
                        <Grid item xs>
                          <div className={styles.item_wrap}>
                            <p className={styles.item_01}>A사</p>
                            <div className={styles.item_02}>
                              <div className={styles.descriptions}>
                                <p className={styles.label}>설치비</p>
                                <p className={styles.content}>무료</p>
                              </div>
                              <div className={styles.descriptions}>
                                <p className={styles.label}>충전요금</p>
                                <p className={styles.content}>220원/kW</p>
                              </div>
                            </div>
                          </div>
                        </Grid>
                        <Divider
                          orientation="vertical"
                          flexItem
                          className={styles.vs}
                        >
                          VS
                        </Divider>
                        <Grid item xs>
                          <div className={styles.item_wrap}>
                            <p className={styles.item_01}>B사</p>
                            <div className={styles.item_02}>
                              <div className={styles.descriptions}>
                                <p className={styles.label}>설치비</p>
                                <p className={styles.content}>무료</p>
                              </div>
                              <div className={styles.descriptions}>
                                <p className={styles.label}>충전요금</p>
                                <p className={styles.content}>229원/kW</p>
                              </div>
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                  <hr />
                  {/* 프로모션 */}
                  <div className={styles.sheet_promotion}>
                    <div className={styles.promotion_title}>프로모션</div>
                    <div className={styles.promotion_container}>
                      <div className={styles.promotion_wrapper}>
                        <div>• 1년 139원/kW</div>
                        <div>• 6개월 119원/kW</div>
                      </div>
                      <div className={styles.promotion_wrapper}>
                        <div>• 6개월 165원/kW</div>
                      </div>
                    </div>
                  </div>

                  {/* 표 */}
                  <div className={styles.sheet_table}>
                    <TableContainer component={Paper}>
                      <Table
                        sx={{ minWidth: 650 }}
                        size="small"
                        aria-label="a dense table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell align="center" colSpan={3}>
                              <p>옵션</p>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell align="center">O</TableCell>
                            <TableCell align="center" className={styles.option}>
                              보험 가입
                            </TableCell>
                            <TableCell align="center">O</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="center">O</TableCell>
                            <TableCell align="center" className={styles.option}>
                              화재 감지
                            </TableCell>
                            <TableCell align="center">X</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="center">X</TableCell>
                            <TableCell align="center" className={styles.option}>
                              터치 LCD
                            </TableCell>
                            <TableCell align="center">O</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="center">X</TableCell>
                            <TableCell align="center" className={styles.option}>
                              신용카드 리더기
                            </TableCell>
                            <TableCell align="center">X</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="center">O</TableCell>
                            <TableCell align="center" className={styles.option}>
                              간편결제 기능
                            </TableCell>
                            <TableCell align="center">O</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="center">O</TableCell>
                            <TableCell align="center" className={styles.option}>
                              전용 앱 서비스
                            </TableCell>
                            <TableCell align="center">O</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="center">O</TableCell>
                            <TableCell align="center" className={styles.option}>
                              로밍
                            </TableCell>
                            <TableCell align="center">O</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="center">O</TableCell>
                            <TableCell align="center" className={styles.option}>
                              출력 제어 기능
                            </TableCell>
                            <TableCell align="center">O</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>

                  <p className={styles.text_01}>
                    엔티즌 파트너 업체들의 충전 요금은{' '}
                    <span className={styles.text_02}>119원~250원</span>으로
                    다양합니다.
                  </p>
                </div>
              </div>

              <div className={styles.title_02}>
                <p>
                  설치환경에 따라 제시되는 엔티즌 파트너들의
                  <br />
                  비교 견적서를 받아보세요.
                </p>
              </div>
            </>
          )}
          {/* <div className={styles.mobile_sec_01}>
            <Image
              src={Sec01Img}
              alt="Sec01Img"
              layout="intrinsic"
              objectFit="cover"
            />
          </div> */}
        </div>
      </section>
      {/* <section className={styles.sec_02}>
        <div className={styles.sec_wrapper}>
          <div className={styles.title}>설치과정 한 눈에 보기</div>
          <Box className={styles.step_container}>
            <div className={styles.step_wrap}>
              <div className={styles.step_wrapper}>
                {progress_01.map((item, index) => {
                  if (item.isArrow) {
                    return (
                      <div className={styles.step_item}>
                        <div className={styles.step_arrow}>
                          <Image
                            src={Step_arrow_circle}
                            alt="step_ellipse"
                            layout="fill"
                            objectFit="contain"
                          />
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div className={styles.step_item}>
                        <div className={styles.step_title}>
                          Step {index + 1}
                        </div>
                        <div className={styles.step_img}>
                          <Image
                            src={item.image}
                            alt={`step_${index}`}
                            layout="fill"
                            objectFit="contain"
                          />
                        </div>
                        <div className={styles.step_description}>
                          {item.title}
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
              <div>
                <hr />
              </div>
              <div className={styles.step_wrapper}>
                {progress_02.map((item, index) => {
                  if (item.isArrow) {
                    return (
                      <div className={styles.step_item}>
                        <div className={styles.step_arrow}>
                          <Image
                            src={Step_arrow_circle}
                            alt="step_ellipse"
                            layout="fill"
                            objectFit="contain"
                          />
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div className={styles.step_item}>
                        <div className={styles.step_title}>
                          Step {index + 4}
                        </div>
                        <div className={styles.step_img}>
                          <Image
                            src={item.image}
                            alt={`step_${index + 4}`}
                            layout="fill"
                            objectFit="contain"
                          />
                        </div>
                        <div className={styles.step_description}>
                          {item.title}
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </Box>
          <div className={styles.mobile_sec_02}>
            <Image
              src={Sec02Img}
              alt="Sec02Img"
              layout="intrinsic"
              objectFit="contain"
            />
          </div>
        </div>
      </section> */}

      <section className={styles.sec_02}>
        <div className={styles.sec_wrapper}>
          <div className={styles.title}>설치과정 한 눈에 보기</div>
          <Box className={styles.step_container}>
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
                  <span className={styles.txt_bottom}>입주민 회의</span>
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
                  <span className={styles.txt_bottom}>비교/선택</span>
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
                  <span className={styles.txt_bottom}>현장실사 및 계약</span>
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
          </Box>
          <div className={styles.mobile_sec_02}>
            <Image
              src={Sec02Img}
              alt="Sec02Img"
              layout="intrinsic"
              objectFit="contain"
            />
          </div>
        </div>
      </section>
      <section className={styles.sec_03}>
        <div className={styles.sec_wrapper}>
          <div className={styles.title}>이런 분들께 추천드려요</div>
          <div className={styles.item_container}>
            <div className={styles.item}>
              <div className={styles.item_01}>
                알아보는 시간을 줄이고 싶은 분
              </div>
              <div className={styles.item_02}>
                설득부터 설치까지 저희가 다 알려드릴게요!
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.item_01}>
                가장 저렴한 충전 요금으로 설치하고 싶은 분
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
          <div className={styles.button} onClick={clickGetMoreEstimate}>
            <p>
              견적서 받고 전문가와 상의하기&nbsp;&nbsp;
              <Image src={Step_arrow} alt="arrow" />
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Estimate;
