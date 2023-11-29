import styled from '@emotion/styled';
import { Box } from '@mui/system';
import Image from 'next/image';
import colors from 'styles/colors';
import arrow from 'public/new/images/right-arrow.svg';
import fee_icon from 'public/new/guide/fee-icon.svg';
import arrow_small from 'public/new/images/arrow.svg';
import { Drawer, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import BottomNavigation from 'components/BottomNavigation';
import WebHeader from 'componentsWeb/WebHeader';
import WebFooter from 'componentsWeb/WebFooter';
import React, { useEffect, useState } from 'react';
import Selection_1 from 'public/new/selection/selection_1.svg';
import Selection_2 from 'public/new/selection/selection_2.svg';
import Selection_3 from 'public/new/selection/selection_3.svg';
import Selection_4 from 'public/new/selection/selection_4.svg';
import { useMediaQuery } from 'react-responsive';
import styles from './index.module.css';
import TagManager from 'react-gtm-module'

const Selection = () => {
  const mobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });
  const router = useRouter();

  // 필요한 인자 값 받아와서 페이지 이동
  const pageHandler = (page: string) => {
    router.push(`${page}`);
  };

  const clickPrivate = () => {
    const tagManagerArgs = {
      dataLayer: {
        event: "click_selection_private",
      },
    };
    TagManager.dataLayer(tagManagerArgs);
  }
  const clickPublic = () => {
    const tagManagerArgs = {
      dataLayer: {
        event: "click_selection_public",
      },
    };
    TagManager.dataLayer(tagManagerArgs);
  }
  const clickCustomer = () => {
    const tagManagerArgs = {
      dataLayer: {
        event: "click_selection_customer",
      },
    };
    TagManager.dataLayer(tagManagerArgs);
  }
  const clickRevenue = () => {
    const tagManagerArgs = {
      dataLayer: {
        event: "click_selection_revenue",
      },
    };
    TagManager.dataLayer(tagManagerArgs);
  }

  return (
    <div id="selection" className={styles.selection}>
        <WebHeader />
        <section className={styles.sec_01}>
          <div className={styles.title}><h1>어떤 용도로 충전기를<br/>설치하시나요?</h1></div>
          <Box sx={{ width: '100%' }}>
            <Grid className={styles.menu_container} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 12, md: 24 }}>
                <Grid xs={6}>
                  <div id="usage_private" className={styles.menu_box} onClick={clickPrivate}>
                    <div className={styles.title}>개인용도</div>
                    <div className={styles.sub_title}>자택, 사업장</div>
                    <div className={styles.image_wrapper}>
                      <Image
                        src={Selection_1}
                        alt="selection_1"
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  </div>
                </Grid>
                <Grid xs={6}>
                  <div id="usage_public" className={styles.menu_box} onClick={clickPublic}>
                    <div className={styles.title}>입주민공용</div>
                    <div className={styles.sub_title}>아파트</div>
                    <div className={styles.image_wrapper}>
                      <Image
                        src={Selection_2}
                        alt="selection_2"
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  </div>
                </Grid>
                <Grid xs={6}>
                  <div id="usage_customer" className={styles.menu_box} onClick={clickCustomer}>
                    <div className={styles.title}>모객용도</div>
                    <div className={styles.sub_title}>카페, 숙박업</div>
                    <div className={styles.image_wrapper}>
                      <Image
                        src={Selection_3}
                        alt="selection_3"
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  </div>
                </Grid>
                <Grid xs={6}>
                  <div id="usage_revenue" className={styles.menu_box} onClick={clickRevenue}>
                    <div className={styles.title}>충전수익</div>
                    <div className={styles.sub_title}>전기차 충전 사업</div>
                    <div className={styles.image_wrapper}>
                      <Image
                        src={Selection_4}
                        alt="selection_4"
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  </div>
                </Grid>
            </Grid>
          </Box>
        </section>
        <section className={styles.sec_02}></section>
    </div>
  );
};

export default Selection;
