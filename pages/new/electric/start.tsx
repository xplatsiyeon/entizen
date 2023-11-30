import Image from 'next/image';
import { useRouter } from 'next/router';
import { Grid, Divider, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import styles from './start.module.css';
import classNames from 'classnames';

import WebHeader from 'components/NewHeader/BeforeHeaderA';
import bannerImage from 'public/new/electric/start_banner.png';
import carbonNextArrow from 'public/new/electric/carbon_next_arrow.png';
import startElectricCar from 'public/new/electric/start_electric_car.png';
import startIcons_01 from 'public/new/electric/start_icons_01.png';
import startIcons_02 from 'public/new/electric/start_icons_02.png';
import startIcons_03 from 'public/new/electric/start_icons_03.png';
import subBanner from 'public/new/electric/start_sub_banner.png';
import chartImage from 'public/new/electric/chart.png';
import stepEllipse from 'public/new/estimate/step_ellipse.svg';
import stepArrow from 'public/new/estimate/step_arrow.svg';
import TagManager from 'react-gtm-module'

const ElectricStart = () => {
    const clickGetMoreEstimate = () => {
        const tagManagerArgs = {
            dataLayer: {
                event: "click_get_more_estimate",
            },
        };
        TagManager.dataLayer(tagManagerArgs);
    }
   return (
    <div id="electric">
        <WebHeader/>
        {/* banner */}
        <section className={styles.sec_01}>
            <div className={classNames(styles.banner_container)}>
                <div className={styles.banner_image}>
                    <Image 
                        src={bannerImage} 
                        // layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                    />
                </div>
                <div className={styles.banner_title}>전기차 충전기 사업<br/>엔티즌으로 쉽고 빠르게 시작하세요</div>
            </div>
        </section>

        {/* sub banner */}
        <section className={styles.sec_02}>
            <div className={classNames(styles.container, styles.sub_banner_container)}>
                <div className={styles.text_01}>N잡시대!</div>
                <div className={styles.text_02}>너도 나도 뛰어드는 창업시장, 남들이 다 알고 있는 시장이라면 이미 늦었습니다.</div>
                <div className={styles.item_wrapper}>
                    <div className={styles.item}>“출근걱정 없어요”...직장 다니며 차린 카페, 월 1000만원 매출</div>
                    <div className={styles.item}>요즘 아파트에 무인 아이스크림 가게 생겨나는 이유는?</div>
                    <div className={styles.item}>무인점포, 지금 창업해도 될까?</div>
                    <div className={styles.item}>경기불황에도 셀프빨래방 창업 증가</div>
                </div>
                <div className={styles.business_wrapper}>
                    <div className={styles.text_wrapper}>
                        <div className={styles.text_01}>전기차 충전기 사업</div>
                        <div className={styles.text_02}>새로운 기회를 잡아보세요!</div>
                    </div>
                    <div className={styles.img}><Image src={startElectricCar}/></div>
                </div>
            </div>
        </section>

        {/* section chart */}
        <section className={styles.sec_03}>
            <div className={styles.container}>
                <div className={styles.chart_container}>
                    <div className={styles.title_01}>전기차 충전기 사업, 왜 지금일까요?<br/>바로 전기차 시장의 가능성 때문입니다.</div>
                    <div className={styles.chart_wrapper}><Image src={chartImage}/></div>
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
                    <div className={styles.title}>이런 변화에 맞춰 렌터카 시장도<br/>발빠르게 움직이고 있죠</div>
                    <div className={styles.item_wrapper}>
                        <div className={styles.item}>친환경차 늘리는 렌터카... <br/>전기차 등록 3만대 ‘1년새 두배’</div>
                        <div className={styles.item}>전기차 공용 완속충전기 설치 ‘직접신청’... <br/>3개월만 1만기 돌파</div>
                    </div>
                </div>
            </div>
        </section>

        {/* section content */}
        <section className={styles.sec_05}>
            <div className={styles.item_wrapper}>
                <div className={styles.img}><Image src={subBanner}/></div>
                <div className={styles.text_wrapper}>
                    <div className={styles.text_01}>대기업이 보증합니다</div>
                    <div className={styles.text_02}>LS ELECTRIC의 전기차 충전기 플랫폼 ‘엔티즌’은<br/>개인과 전기차 충전기 설치 업체를 연결시켜주는 플랫폼입니다.</div>
                </div>
            </div>
        </section>

        {/* section content */}
        <section className={styles.sec_06}>
            <div className={classNames(styles.container, styles.how_start_container)}>
                <div className={styles.title}>전기차 충전기 사업 어떻게 시작하나요?</div>
                <div className={styles.item_wrapper}>
                    <div className={styles.item}>
                        <div className={styles.text_01}>Step 1</div>
                        <div className={styles.img}><Image src={startIcons_01}/></div>
                        <div className={styles.text_02}>충전기 종류 선택</div>
                    </div>
                    <div className={styles.step_item}>
                        <div className={styles.step_arrow}>
                            <Image src={stepEllipse} alt="step_ellipse" layout="fill" objectFit="contain" />
                            <Image src={stepArrow} alt="step_arrow" layout="fill" objectFit="contain" />
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.text_01}>Step 2</div>
                        <div className={styles.img}><Image src={startIcons_02}/></div>
                        <div className={styles.text_02}>수익율 설정</div>
                    </div>
                    <div className={styles.step_item}>
                        <div className={styles.step_arrow}>
                            <Image src={stepEllipse} alt="step_ellipse" layout="fill" objectFit="contain" />
                            <Image src={stepArrow} alt="step_arrow" layout="fill" objectFit="contain" />
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.text_01}>Step 3</div>
                        <div className={styles.img}><Image src={startIcons_03}/></div>
                        <div className={styles.text_02}>계약 진행</div>
                    </div>
                </div>
                <div className={styles.button} onClick={clickGetMoreEstimate}>
                    <p>맞춤 비교견적 받고 시간 절약하기&nbsp;&nbsp;<Image src={stepArrow} alt="arrow"/></p>
                </div>
            </div>
        </section>
    </div>
   );
};

export default ElectricStart;