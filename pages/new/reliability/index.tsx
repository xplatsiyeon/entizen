import Image from 'next/image';
import { MyEstimateHeader } from 'components/myEstimate/header';
import { useMediaQuery, useTheme } from '@mui/material';
import styles from './reliability.module.scss';
import Image1 from './img/item1.png';
import Image2 from './img/item2.png';
import Image3 from './img/bottom.png';
import Image4 from './img/bottom_mb.png';
import { Grid } from '@mui/material';

const Reliability = () => {
  sessionStorage.setItem('USER_ID', JSON.stringify({id: 'test'}));
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={styles.reliabilityContainer}>
      {/* 헤더제외 */}
      <MyEstimateHeader/>
      <section className={styles.backgroundWrap}>
        <p className={styles.backgroundIntro}>
          전력산업 국내 1위 LS의 전문성과 
          <br /> 인프라를 활용하여 파트너 선정
        </p>
      </section>
      <section className={styles.mainSectionWrap}>
        <div className={styles.title}>믿을 수 있는 충전파트너</div>
        <div className={styles.sub_title}>전력산업 국내 1위, 10년 연속 글로벌 100대 혁신기업에 선정된 LS ELECTRIC의 기업 인프라를 활용하여 전력 전문가와 빅데이터 전문가의 분석을 바탕으로 엔티즌의 파트너를 선정했습니다.</div>
        <article className={styles.infoWrap}>
          <Grid container spacing={2}  columns={{ xs: 4, sm: 8, md: 16 }}>
            <Grid item xs={8}>
              <Image src={Image1} className={styles.info_img}/>
            </Grid>
            <Grid item xs={8}>
              <Image src={Image2} className={styles.info_img}/>
            </Grid>
          </Grid>
        </article>
      </section>
      <section className={styles.bottomWrap}>
        <Image 
          className={styles.img} 
          src={isMobile ? Image4 : Image3}
          layout="responsive"
        />
      </section>
    </div>
  );
};

export default Reliability;
