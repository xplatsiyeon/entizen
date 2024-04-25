"use client"
import { Box } from '@mui/system';
import Image from 'next/image';
import { Grid } from '@mui/material';
import { useRouter } from 'next/navigation';

import WebHeaderA from '../../../../components/brought/newHeader/BeforeHeaderA';
import WebHeaderB from '../../../../components/brought/newHeader/BeforeHeaderB';
import React, { useEffect, useState } from 'react';
import Selection_1 from '/public/pages/selection/selection_1.svg';
import Selection_2 from '/public/pages/selection/selection_2.svg';
import Selection_3 from '/public/pages/selection/selection_3.svg';
import Selection_4 from '/public/pages/selection/selection_4.svg';
import { useMediaQuery } from 'react-responsive';
import styles from '../index.module.css';

const Selection = () => {
  const isMobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });
  const router = useRouter();

  // 필요한 인자 값 받아와서 페이지 이동
  const pageHandler = (page: string) => {
    router.push(`${page}`);
  };

  return (
    <div id="selection" className={styles.selection}>
        {isMobile ? <WebHeaderA /> : <WebHeaderB />}
        <section className={styles.sec_01}>
          <div className={styles.title}><p>어떤 용도로 충전기를<br/>설치하시나요?</p></div>
          <Box sx={{ width: '100%' }}>
            <Grid className={styles.menu_container} 
              container 
              spacing={{ xs: 1, sm: 2, md: 3 }}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              columns={{ xs: 12, sm: 12, md: 24 }}
              sx={{ width: '100%' }}
            >
                <Grid xs={6}>
                  <div className={styles.menu_box}>
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
                  <div className={styles.menu_box}>
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
                  <div className={styles.menu_box}>
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
                  <div className={styles.menu_box}>
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
