import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import WebHeader from 'componentsWeb/WebHeader';
import styles from './funcSystemComparison.module.css'
import { Divider, Grid } from '@mui/material';
import BackgroundImage from './img/background_1.png';
import Image1 from './img/img_1.png';
import Image2 from './img/img_2.png';
import Image3 from './img/img_3.png';
import Icon1 from './img/icon_1.svg';
import Icon2 from './img/icon_2.svg';
import Icon3 from './img/icon_3.svg';
import Icon4 from './img/icon_4.svg';

import TagManager from 'react-gtm-module'
    
const FuncSystemComparison = () => {
  const isMobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });

  const sec_03_contents = [
    {
      text_1 : '전용 앱 컨트롤',
      text_2: (<div>카드 분실 우려 없이<br/>집안에서도 충전과 모니터링 가능</div>),
      icon: Icon1,
    },
    {
      text_1 : '스마트 차징',
      text_2: (<div>원하는 시간에 충전예약이 가능하여<br/>전기요금 절감 가능</div>),
      icon: Icon2,
    },
    {
      text_1 : '화재 감지 기능',
      text_2: (<div>화재가 감지되면 즉시 충전을 중단하고<br/>관리자에게 알림을 전송</div>),
      icon: Icon3,
    },
    {
      text_1 : '충전 정보 확인',
      text_2: (<div>일별 충전 정보 확인 가능하며<br/>이번 달 예상 전기 요금 확인 가능</div>),
      icon: Icon4,
    }
  ];
  
  const chartDownload = () => {
    const tagManagerArgs = {
      dataLayer: {
        event: "chart_download",
      },
    };
    TagManager.dataLayer(tagManagerArgs);
  }

  return (
    <div className={styles.func_system_comparison_page}>
      <WebHeader></WebHeader>
      <section className={styles.sec_01}>
        <Image layout="fill" src={BackgroundImage} />
        <p className={styles.backgroundIntro}>
          {isMobile ? (
            <>
              가격차이가 발생하는 다양한 기능과<br />시스템을 확인해보세요
            </>
          ) : (
            <>
              가격차이가 발생하는<br />다양한 기능과 시스템을 확인해보세요
            </>
          )}
        </p>
      </section>
      <section className={styles.sec_02}>
        <div className={styles.title}>부가 기능과 시스템 차이</div>
        <div className={styles.sub_title}>
          차별화된 기능과 시스템에 따라 가격이 다양합니다.
        </div>
        <article className={styles.info_wrap}>
          {isMobile ? (
             <div>
             <Swiper 
              slidesPerView={1.8}
              // slidesPerView={'auto'}
              spaceBetween={isMobile ? 10 : 30}
              modules={[Autoplay, Pagination]} 
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              loop={true}
              navigation={false}
              pagination={false}
            >
               <SwiperSlide>
                 <div className={styles.info_img}><Image src={Image1}/></div>
               </SwiperSlide>
               <SwiperSlide>
                <div className={styles.info_img}><Image src={Image2}/></div>
               </SwiperSlide>
               <SwiperSlide>
                <div className={styles.info_img}><Image src={Image3}/></div>
               </SwiperSlide>
             </Swiper>
           </div>
          ) : (
             <Grid 
             container 
             direction="row"
             justifyContent="space-between"
             alignItems="center"
             columns={{ xs: 4, md: 14 }}
           >
             <Grid item xs={4} className={styles.info_item}>
               <div className={styles.info_img}><Image src={Image1}/></div>
             </Grid>
             <Grid item xs={4} className={styles.info_item}>
               <div className={styles.info_img}><Image src={Image2}/></div>
             </Grid>
             <Grid item xs={4} className={styles.info_item}>
               <div className={styles.info_img}><Image src={Image3}/></div>
             </Grid>
           </Grid>
          )}
        </article>
      </section>
      <section className={styles.sec_03}>
        <div className={styles.title}>추가 기능별 장점</div>
        <div className={styles.sub_title}>편의, 안전 기능에 따라 가격이 다양합니다.</div> 
        <div className={styles.item_container}>
          {sec_03_contents.map(content => (
            <div className={styles.item_wrapper}>
              <div className={styles.item_01}>
                <p className={styles.item_text_01}>{content.text_1}</p>
                <p className={styles.item_text_02}>{content.text_2}</p>
              </div>
              <div className={styles.item_02}><Image src={content.icon}/></div>
            </div>
          ))}
        </div>
      </section>
      <section className={styles.sec_04}>
        <div className={styles.title}>업체별 주요기능 비교표</div>
        <div className={styles.table_container}>
        <table>
              <tr>
                <th
                  scope="col"
                  colSpan={2}
                  style={{ width: '60%' }}
                >
                  파트너명
                </th>
                {/* <th scope="col">파트너명</th> */}
                <th scope="col">한국EV충전서비스센터</th>
                <th scope="col">캐스트프로</th>
              </tr>
              <tr>
                <td colSpan={2}>충전소 설치비</td>
                <td>1,050,000 원</td>
                <td>2,200,000 원</td>
              </tr>
              <tr>
                <td colSpan={2}>운영관리비</td>
                <td>없음</td>
                <td>없음</td>
              </tr>
              <tr>
                <td rowSpan={7}>주요기능</td>
                <td>사용자 인증</td>
                <td>RFID</td>
                <td>비밀번호, RFID</td>
              </tr>
              <tr>
                <td>화재 감지</td>
                <td>X</td>
                <td>X</td>
              </tr>
              <tr>
                <td>보험 가입</td>
                <td>O</td>
                <td>O</td>
              </tr>
              <tr>
                <td>개방/비개방 전환</td>
                <td>O</td>
                <td>O</td>
              </tr>
              <tr>
                <td>전용 앱 서비스</td>
                <td>X</td>
                <td>X</td>
              </tr>
              <tr>
                <td>차량별 충전 정보</td>
                <td>X</td>
                <td>X</td>
              </tr>
              <tr>
                <td style={{ width: '13.125rem' }}>
                  전기요금 절감 기능 (설정에 따른 출력 제어)
                </td>
                <td>X</td>
                <td>X</td>
              </tr>
            </table>
        </div>
        <div className={styles.buttonWrap}>
          <a className={styles.downloadBtn} 
              onClick={chartDownload} 
              href="https://drive.google.com/file/d/1ykHsHcsIIY5gnhHUxDDb2g6R6dfQ5BeP/view?usp=sharing"
              target="_blank">
              <p>모든 업체 비교표 다운받기</p>
              <div className={styles.icon}></div>
            </a>
        </div>
      </section>
    </div>
  )
}

export default FuncSystemComparison; 