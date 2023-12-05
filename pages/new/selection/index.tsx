import { Box } from '@mui/system';
import Image from 'next/image';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import WebHeaderA from 'components/NewHeader/BeforeHeaderA';
import WebHeaderB from 'components/NewHeader/BeforeHeaderB';
import React, { useEffect, useState } from 'react';
import Selection_1 from './item_1.svg';
import Selection_2 from './item_2.svg';
import Selection_3 from './item_3.svg';
import Selection_4 from './item_4.svg';
import SelectionHover1 from './item_1_hover.svg';
import SelectionHover2 from './item_2_hover.svg';
import SelectionHover3 from './item_3_hover.svg';
import SelectionHover4 from './item_4_hover.svg';
import { useMediaQuery } from 'react-responsive';
import styles from './index.module.css';
import TagManager from 'react-gtm-module'

const Selection = () => {
  const isMobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });
  const router = useRouter();
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [hover3, setHover3] = useState(false);
  const [hover4, setHover4] = useState(false);

  const clickPrivate = () => {
    sessionStorage.setItem("selection","개인용도");
    const tagManagerArgs = {
      dataLayer: {
        event: "click_selection_private",
      },
    };
    TagManager.dataLayer(tagManagerArgs);
    router.push('/new/priceComparison');
  }
  const clickPublic = () => {
    sessionStorage.setItem("selection","입주민공용");
    const tagManagerArgs = {
      dataLayer: {
        event: "click_selection_public",
      },
    };
    TagManager.dataLayer(tagManagerArgs);
    router.push('/new/estimate');
  }
  const clickCustomer = () => {
    sessionStorage.setItem("selection","모객용도");
    const tagManagerArgs = {
      dataLayer: {
        event: "click_selection_customer",
      },
    };
    TagManager.dataLayer(tagManagerArgs);
    router.push('/new/electric');
  }
  const clickRevenue = () => {
    sessionStorage.setItem("selection","충전수익");
    const tagManagerArgs = {
      dataLayer: {
        event: "click_selection_revenue",
      },
    };
    TagManager.dataLayer(tagManagerArgs);
    router.push('/new/electric/start');
  }

  return (
    <div id="selection" className={styles.selection}>
        {isMobile ? <WebHeaderA /> : <WebHeaderB />}
        <section className={styles.sec_01}>
          <div className={styles.title}><p>어떤 용도로 충전기를<br/>설치하시나요?</p></div>
          <Box sx={{ width: '100%' }}>
            <Grid className={styles.menu_container} 
              container 
              rowSpacing={{ xs: 10, sm: 20, md: 10 }}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              columns={{ xs: 12, sm: 12, md: 24 }}
              sx={{ width: '100%' }}
            >
                <Grid xs={6}>
                  <div id="usage_private" className={styles.menu_box} onClick={clickPrivate}>
                    {/* <div className={styles.title}>개인용도</div>
                    <div className={styles.sub_title}>자택, 사업장</div>
                    <div className={styles.image_wrapper}><Image src={Selection_1} alt="selection_1" layout="fill" objectFit="contain"/></div> */}
                    <div className={styles.image_wrapper}>
                      <Image
                          onMouseEnter={() => setHover1(true)}
                          onMouseLeave={() => setHover1(false)}
                          src={hover1 ? SelectionHover1 : Selection_1}
                          alt="selection_1"
                          layout="intrinsic"
                          objectFit="contain"
                        />
                    </div>
                  </div>
                </Grid>
                <Grid xs={6}>
                  <div id="usage_public" className={styles.menu_box} onClick={clickPublic}>
                    {/* <div className={styles.title}>입주민공용</div>
                    <div className={styles.sub_title}>아파트</div>
                    <div className={styles.image_wrapper}><Image src={Selection_2} alt="selection_2" layout="fill" objectFit="contain"/></div> */}
                    <div className={styles.image_wrapper}>
                      <Image
                          onMouseEnter={() => setHover2(true)}
                          onMouseLeave={() => setHover2(false)}
                          src={hover2 ? SelectionHover2 : Selection_2}
                          alt="selection_2"
                          layout="intrinsic"
                          objectFit="contain"
                        />
                    </div>
                  </div>
                </Grid>
                <Grid xs={6}>
                  <div id="usage_customer" className={styles.menu_box} onClick={clickCustomer}>
                    {/* <div className={styles.title}>모객용도</div>
                    <div className={styles.sub_title}>카페, 숙박업</div>
                    <div className={styles.image_wrapper}><Image src={Selection_3} alt="selection_3" layout="fill" objectFit="contain"/></div> */}
                    <div className={styles.image_wrapper}>
                      <Image
                          onMouseEnter={() => setHover3(true)}
                          onMouseLeave={() => setHover3(false)}
                          src={hover3 ? SelectionHover3 : Selection_3}
                          alt="selection_3"
                          layout="intrinsic"
                          objectFit="contain"
                        />
                    </div>
                  </div>
                </Grid>
                <Grid xs={6}>
                  <div id="usage_revenue" className={styles.menu_box} onClick={clickRevenue}>
                    {/* <div className={styles.title}>충전수익</div>
                    <div className={styles.sub_title}>전기차 충전 사업</div>
                    <div className={styles.image_wrapper}><Image src={Selection_4} alt="selection_4" layout="fill" objectFit="contain"/></div> */}
                    <div className={styles.image_wrapper}>
                      <Image
                          onMouseEnter={() => setHover4(true)}
                          onMouseLeave={() => setHover4(false)}
                          src={hover4 ? SelectionHover4 : Selection_4}
                          alt="selection_4"
                          layout="intrinsic"
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
