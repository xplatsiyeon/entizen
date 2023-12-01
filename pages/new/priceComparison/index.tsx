import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Button, Divider, Icon, List, ListItem, ListItemText, Stack } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Image from 'next/image';
import { MyEstimateHeader } from 'components/myEstimate/header';
import Banner from 'public/new/priceComparison/banner.svg';
import Price from 'public/new/priceComparison/price.svg';
import Kakao from 'public/new/priceComparison/kakao.svg';
import KakaoMb from 'public/new/priceComparison/kakao_mb.svg';
import styles from './index.module.css';
import { useRouter } from 'next/router';

const PriceComparison = () => {
  const isMobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });
  const router = useRouter();

  const clickGetMoreEstimate = () => {
    router.push('/new/estimateForm/form4');
  }

  return (
    <div className={styles.price_comparison_page}>
        <MyEstimateHeader/>
        <div className={styles.sec_01}>
            <div className={styles.banner_container}>
                <Image
                    src={Banner}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                />
            </div>
            <div className={styles.container}>
                <div className={styles.title_container}>
                    <div className={styles.text_01}>비용이 제일 궁금하시죠?</div>
                    <div className={styles.text_02}>
                        저희 파트너 업체들의 충전기 구매 + 설치 비용은{' '}<span>110만원~258만원</span>(비공용 충전기 7kW 1대 기준) 입니다.<br/>
                        가성비 업체부터 충전 시스템이 뛰어난 업체까지 다양한 파트너와 함께 합니다.<br/>
                        <br/>
                        맞춤 견적을 받으시면 가격뿐만 아니라 A/S현황, 시공횟수 등 다양한 비교 요소를 확인하실 수 있습니다.
                    </div>
                </div>
                <div className={styles.comparison_container}>
                    <div className={styles.text_01}>다양한 가격대의 충전기</div>
                    <div className={styles.text_02}>
                        제조사 37곳 운영사 112곳 직접 비교하시면 너무 복잡해요!<br/>
                        엔티즌이 우수한 업체들만 모아, 한눈에 비교하실 수 있게 정리해드려요!
                    </div>
                    <Stack className={styles.comparison_box} direction="row" spacing={2}>
                        <div className={styles.price_container}>
                            <div className={styles.company_img}><Image src={Price}/></div>
                            <div className={styles.company_name}>A사</div>
                            <List className={styles.company_info}>
                                <ListItem divider className={styles.item_wrapper}>
                                    <div className={styles.item_01}>시공횟수</div>
                                    <div className={styles.item_02}>8000기 이상 시공</div>
                                </ListItem>
                                <ListItem divider className={styles.item_wrapper}>
                                    <div className={styles.item_01}>A/S현황</div>
                                    <div className={styles.item_02}>A/S지점 11곳, A/S직원 500명</div>
                                </ListItem>
                                <ListItem divider className={styles.item_wrapper}>
                                    <div className={styles.item_01}>추천 포인트</div>
                                    <div className={styles.item_02}>생산물배상책임보험 5억 가입</div>
                                </ListItem>
                            </List>
                            <div className={styles.min_price}>총 1,100,000원 부터 ~</div>
                            <Button className={styles.chat_btn} variant="contained" disabled>
                                <Image src={isMobile ? KakaoMb : Kakao} className={styles.kakaoIcon} />
                                <p>채팅하기</p>
                            </Button>
                            <Button className={styles.show_estimate_btn} variant="contained" disabled>견적서 보기</Button>
                        </div>
                        <div className={styles.price_container}>
                            <div className={styles.company_img}><Image src={Price}/></div>
                            <div className={styles.company_name}>B사</div>
                            <List className={styles.company_info}>
                                <ListItem divider className={styles.item_wrapper}>
                                    <div className={styles.item_01}>시공횟수</div>
                                    <div className={styles.item_02}>7600기 이상 시공</div>
                                </ListItem>
                                <ListItem divider className={styles.item_wrapper}>
                                    <div className={styles.item_01}>A/S현황</div>
                                    <div className={styles.item_02}>A/S지점 11곳, A/S직원 300명</div>
                                </ListItem>
                                <ListItem divider className={styles.item_wrapper}>
                                    <div className={styles.item_01}>추천 포인트</div>
                                    <div className={styles.item_02}>생산물배상책임보험 5억 가입</div>
                                </ListItem>
                            </List>
                            <div className={styles.min_price}>총 1,125,000원 부터 ~</div>
                            <Button className={styles.chat_btn} variant="contained" disabled><Image src={Kakao} className={styles.kakaoIcon} /><p>채팅하기</p></Button>
                            <Button className={styles.show_estimate_btn} variant="contained" disabled>견적서 보기</Button>
                        </div>
                    </Stack>
                    <div className={styles.text_03}>모든 <span>견적비교</span>가 궁금하시다면?</div>
                </div>
                <Button className={styles.more_btn} variant="contained" onClick={clickGetMoreEstimate}>더 많은 업체 견적 받기 <NavigateNextIcon /></Button>
            </div> 
        </div>
        <div className={styles.sec_02}></div>
    </div>
  );
};

export default PriceComparison;
