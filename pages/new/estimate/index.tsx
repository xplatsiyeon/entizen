import { Box } from '@mui/system';
import Image from 'next/image';
import { useRouter } from 'next/router';
import WebHeader from 'components/NewHeader/BeforeHeaderA';
import WebFooter from 'componentsWeb/WebFooter';
import { Grid, Divider, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Banner from 'public/new/estimate/banner.png';
import Step_1 from 'public/new/estimate/step_1.svg';
import Step_2 from 'public/new/estimate/step_2.svg';
import Step_3 from 'public/new/estimate/step_3.svg';
import Step_4 from 'public/new/estimate/step_4.svg';
import Step_5 from 'public/new/estimate/step_5.svg';
import Step_6 from 'public/new/estimate/step_6.svg';
import Step_arrow from 'public/new/estimate/step_arrow.svg';
import Step_ellipse from 'public/new/estimate/step_ellipse.svg';
import styles from './index.module.css'; 
import TagManager from 'react-gtm-module'
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
    description: '선택된 업체가 현장을 방문하여 설치가 가능한지 확인하고 계약합니다.',
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
    const mobile = useMediaQuery({
      query: '(max-width:899.25pt)',
    });
    const router = useRouter();
  
    // 필요한 인자 값 받아와서 페이지 이동
    const pageHandler = (page: string) => {
      router.push(`${page}`);
    };

    const clickGetMoreEstimate = () => {
      const tagManagerArgs = {
          dataLayer: {
              event: "click_get_more_estimate",
          },
      };
      TagManager.dataLayer(tagManagerArgs);
    }
  
    return (
      <div id="estimate" className={styles.estimate}>
          <WebHeader />
          <div className={classNames(styles.container, styles.banner_container)}>
              <div className={styles.banner_image} style={{ height: '17.5rem' }}>
                  <Image 
                      src={Banner}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                  />
              </div>
              <div className={styles.banner_title}>
                설치비용, 충전요금<br/>상황에 딱 맞게 제안해 드릴게요
              </div>
          </div>
          {/* <div className={styles.banner}>
            <div className={styles.banner_img}>
              <div className={styles.banner_img_filter}></div>
              <Image
                src={Banner}
                alt="banner"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className={styles.banner_title}>
              설치비용, 충전요금<br/>상황에 딱 맞게 제안해 드릴게요
            </div>
          </div> */}
          <section className={styles.sec_01}>
            <div className={styles.sec_wrapper}>
              <div className={styles.title_01}>
                <p>입대위 의사결정을 위한 비교 견적</p>
              </div>
              {/* 견적서 */}
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
                                <p className={styles.label}>설치비</p><p className={styles.content}>무료</p>
                              </div>
                              <div className={styles.descriptions}>
                                <p className={styles.label}>충전요금</p><p className={styles.content}>220원/kW</p>
                              </div>
                            </div>
                          </div>
                        </Grid>
                        <Divider orientation="vertical" flexItem className={styles.vs}>
                          VS
                        </Divider>
                        <Grid item xs>
                          <div className={styles.item_wrap}>
                            <p className={styles.item_01}>B사</p>
                            <div className={styles.item_02}>
                              <div className={styles.descriptions}>
                                <p className={styles.label}>설치비</p><p className={styles.content}>무료</p>
                              </div>
                              <div className={styles.descriptions}>
                                <p className={styles.label}>충전요금</p><p className={styles.content}>229원/kW</p>
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
                      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="center" colSpan={3}><p>옵션</p></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell align="center">O</TableCell>
                            <TableCell align="center" className={styles.option}>보험 가입</TableCell>
                            <TableCell align="center">O</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="center">O</TableCell>
                            <TableCell align="center" className={styles.option}>화재 감지</TableCell>
                            <TableCell align="center">X</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="center">X</TableCell>
                            <TableCell align="center" className={styles.option}>터치 LCD</TableCell>
                            <TableCell align="center">O</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="center">X</TableCell>
                            <TableCell align="center" className={styles.option}>신용카드 리더기</TableCell>
                            <TableCell align="center">X</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="center">O</TableCell>
                            <TableCell align="center" className={styles.option}>간편결제 기능</TableCell>
                            <TableCell align="center">O</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="center">O</TableCell>
                            <TableCell align="center" className={styles.option}>전용 앱 서비스</TableCell>
                            <TableCell align="center">O</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="center">O</TableCell>
                            <TableCell align="center" className={styles.option}>로밍</TableCell>
                            <TableCell align="center">O</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="center">O</TableCell>
                            <TableCell align="center" className={styles.option}>출력 제어 기능</TableCell>
                            <TableCell align="center">O</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>

                  <p className={styles.text_01}>
                    엔티즌 파트너 업체들의 충전 요금은 <span className={styles.text_02}>119원~250원</span>으로 다양합니다.
                  </p>
                </div>
              </div> 
              <div className={styles.title_02}>
                <p>설치환경에 따라 제시되는 엔티즌 파트너들의<br/>비교 견적서를 받아보세요.</p>
              </div>
            </div>
          </section>
          <section className={styles.sec_02}>
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
                                  src={Step_ellipse}
                                  alt="step_ellipse"
                                  layout="fill"
                                  objectFit="contain"
                                />
                                <Image
                                  src={Step_arrow}
                                  alt="step_arrow"
                                  layout="fill"
                                  objectFit="contain"
                                />
                              </div>
                            </div>
                          )
                        } else {
                          return (
                            <div className={styles.step_item}>
                              <div className={styles.step_title}>Step {index + 4}</div>
                              <div className={styles.step_img}>
                                <Image
                                  src={item.image}
                                  alt={`step_${index + 4}`}
                                  layout="fill"
                                  objectFit="contain"
                                />
                              </div>
                              <div className={styles.step_description}>{item.title}</div>
                            </div>
                          )
                        }
                    })}
                  </div>
                  <div><hr/></div>
                  <div className={styles.step_wrapper}>
                    {progress_02.map((item, index) => {
                      if (item.isArrow) {
                        return (
                          <div className={styles.step_item}>
                            <div className={styles.step_arrow}>
                              <Image
                                src={Step_ellipse}
                                alt="step_ellipse"
                                layout="fill"
                                objectFit="contain"
                              />
                              <Image
                                src={Step_arrow}
                                alt="step_arrow"
                                layout="fill"
                                objectFit="contain"
                              />
                            </div>
                          </div>
                        )
                      } else {
                        return (
                          <div className={styles.step_item}>
                            <div className={styles.step_title}>Step {index + 4}</div>
                            <div className={styles.step_img}>
                              <Image
                                src={item.image}
                                alt={`step_${index + 4}`}
                                layout="fill"
                                objectFit="contain"
                              />
                            </div>
                            <div className={styles.step_description}>{item.title}</div>
                          </div>
                        )
                      }
                    })}
                  </div>
                </div>
              </Box>
            </div>
          </section>
          <section className={styles.sec_03}>
            <div className={styles.sec_wrapper}>
              <div className={styles.title}>이런 분들께 추천드려요</div>
              <div className={styles.item_container}>
                <div className={styles.item}>
                  <div className={styles.item_01}>알아보는 시간을 줄이고 싶은 분</div>
                  <div className={styles.item_02}>설득부터 설치까지 저희가 다 알려드릴게요!</div>
                </div>
                <div className={styles.item}>
                  <div className={styles.item_01}>가장 저렴한 충전 요금으로 설치하고 싶은 분</div>
                  <div className={styles.item_02}>한 눈에 비교할 수 있는 견적서를 통해 합리적인 선택을 도와드릴게요!</div>
                </div>
                <div className={styles.item}>
                  <div className={styles.item_01}>안정적인 업체를 선택하고 싶은 분</div>
                  <div className={styles.item_02}>경험 많고 우수한 업체만 추려드릴게요!</div>
                </div>
              </div>
              <div className={styles.button} onClick={clickGetMoreEstimate}>
                <p>맞춤 비교견적 받고 시간 절약하기&nbsp;&nbsp;<Image src={Step_arrow} alt="arrow"/></p>
              </div>
            </div>
          </section>
      </div>
    )
}

export default Estimate;