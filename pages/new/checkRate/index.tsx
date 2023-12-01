import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import WebHeader from 'componentsWeb/WebHeader';
import styles from './checkRate.module.css'
import { Divider, Grid } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import BackgroundImage from './img/background_1.png';
import Image1 from './img/img_1.png';
import Image2 from './img/img_2.png';
import Image3 from './img/img_3.png';
import Image4 from './img/img_4.png';
import Image5 from './img/img_5.png';
import Icon from './img/icon.svg';

const CheckRate = () => {
  sessionStorage.setItem('USER_ID', 'test');
  const isMobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });
  
  return (
    <div className={styles.check_rate_page}>
      <WebHeader></WebHeader>
      <section className={styles.sec_01}>
        <Image 
          layout='fill'
          src={BackgroundImage}
        />
        <p className={styles.backgroundIntro}>
          한전불입금과 충전요금을
          <br/>확인해보세요
        </p>
      </section>
      <section className={styles.sec_02}>
        <div className={styles.title}>한전불입금이란?</div>
        <div className={styles.sub_title}>
          신축이나 증설을 할 때, 전기인입 비용을 말합니다. 일반적인 가정집 계약 전력은 3~5kW로, 7kW 완속 충전기를 사용하려면 추가로 증설을 해야합니다. 
          이때, 전기차 충전용 전기를 분리해서 설치하기 때문에 <span>누진세</span> 걱정은 안하셔도 됩니다!
        </div>
        <article className={styles.info_wrap}>
          <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 16 }}>
            <Grid item xs={8} className={styles.info_item}>
              <Image src={Image1} className={styles.info_img}/>
            </Grid>
            <Grid item xs={8} className={styles.info_item}>
              <Image src={Image2} className={styles.info_img}/>
            </Grid>
          </Grid>
        </article>
      </section>
      <section className={styles.sec_03}>
        <div className={styles.title}>한전불입금은 얼마?</div>
        <div className={styles.sub_title}>2023년 7월 1일 이후 신청분</div>
        <div className={styles.table_container}>
          {isMobile && <div className={styles.table_caption}>부가세 불포함</div>}
          <table>
            <tr>
              <th scope="col" colSpan={2} rowSpan={2}>구분</th>
              <th scope="col" colSpan={2} style={{ width: '30%' }}>금액</th>
            </tr>
            <tr>
              <th scope="col">공중공급</th>
              <th scope="col">지중공급</th>
            </tr>
            <tr>
              <td rowSpan={2}>저압</td>
              <td>매 1계약에 대하여 계약전력 5kW까지</td>
              <td>306,000원</td>
              <td>588,000원</td>
            </tr>
            <tr>
              <td>계약전력 5kW 초과분의 매 1kW에 대하여</td>
              <td>121,000원</td>
              <td>141,000원</td>
            </tr>
            <tr>
              <td>고압 또는 특별고압</td>
              <td>신증설 계약전력 매 1kW에 대하여</td>
              <td>24,000원</td>
              <td>50,000원</td>
            </tr>
          </table>
          {!isMobile && <div className={styles.table_caption}>부가세 불포함</div>}
        </div>
      </section>
      <section className={styles.sec_04}>
        <div className={styles.container_01}>
          <p className={styles.text_01}>7kW 공중공급 기준으로</p>
          <p className={styles.text_02}>602,800 <span>원 (부가세 포함)</span></p>
        </div>
        <div className={styles.container_02}>
          <p className={styles.text_01}>한전불입금 7kW 변화</p>
          <div className={styles.img}><Image src={Image3} layout='intrinsic'/></div>
          <p className={styles.text_02}>한전불입금이 꾸준히 증가하고 있기 때문에 빠르게 설치하시는 걸 추천드립니다!</p>
        </div>
      </section>
      <section className={styles.sec_05}>
        <div className={styles.title}>전기 충전 요금</div>
        <div className={styles.sub_title}>
          비공용 충전기를 설치하시면 설치해준 업체와 상관없이 한전에서 책정한 전기요금원가 그대로를 지불하게 됩니다.
        </div>
        <article className={styles.info_wrap}>
          <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 16 }}>
            <Grid item xs={8} className={styles.info_item}>
              <Image src={Image4} className={styles.info_img}/>
            </Grid>
            <Grid item xs={8} className={styles.info_item}>
              <Image src={Image5} className={styles.info_img}/>
            </Grid>
          </Grid>
          <div className={styles.info_text}>
            <div className={styles.info_icon}><Image src={Icon} /></div>
            <span>아파트 혹은 정부지원금으로 무료 설치 시 충전 요금을 업체에서 선정합니다.</span>
          </div>
        </article>
      </section>
      <section className={styles.sec_06}>
      <div className={styles.title}>전기 요금 원가 (전기차 충전 전용)</div>
        <div className={styles.sub_title}>적용일자: 2023년 5월 16일</div>
        <div className={styles.table_container}>
          <table>
              <tr>
                <th scope="col" colSpan={2} rowSpan={2}>구분</th>
                <th scope="col" colSpan={1} rowSpan={2}>기본요금 (원/kW)</th>
                <th scope="col" colSpan={4} style={{ width: '60%' }}>전력량 요금 (원/kWh)</th>
              </tr>
              <tr>
                <th scope="col">시간대</th>
                <th scope="col">여름철</th>
                <th scope="col">봄가을철</th>
                <th scope="col">겨울철</th>
              </tr>
              <tr>
                <td rowSpan={6}>자가소비</td>
                <td rowSpan={3}>저압</td>
                <td rowSpan={3}>2,390</td>
                <td>경부하</td>
                <td>84.3</td>
                <td>85.4</td>
                <td>107.4</td>
              </tr>
              <tr>
                <td>중간부하</td>
                <td>172.0</td>
                <td>97.2</td>
                <td>154.9</td>
              </tr>
              <tr>
                <td>최대부하</td>
                <td>259.2</td>
                <td>102.1</td>
                <td>217.5</td>
              </tr>
              <tr>
                <td rowSpan={3}>고압</td>
                <td rowSpan={3}>2,580</td>
                <td>경부하</td>
                <td>79.2</td>
                <td>80.2</td>
                <td>96.6</td>
              </tr>
              <tr>
                <td>중간부하</td>
                <td>137.4</td>
                <td>91.0</td>
                <td>127.7</td>
              </tr>
              <tr>
                <td>최대부하</td>
                <td>190.4</td>
                <td>94.9</td>
                <td>165.5</td>
              </tr>
            </table>
        </div>
      </section>
      <section className={styles.sec_07}>
        <div className={styles.title}>간단 계산법</div>
        <div className={styles.sub_title}>
          <span>연비 5km/kWh, 7kW 충전기</span>
          <hr/>
          <span>평균 전력량  요금: 100원 기준</span>
        </div>
        <article className={styles.info_wrap}>
          <div className={styles.info_example}>
            <div className={styles.text_01}>예를 들어, 한달에 1,000km 타시면</div>
            <div className={styles.calculation_container}>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 24 }}
                sx={{ flexGrow: 1 }}
              >
                <Grid>
                  <div className={styles.info_calculation}>1,000</div>
                  <div className={styles.info_calculation_text}>주행거리</div>
                </Grid>
                <Grid><div className={styles.info_calculation}>÷</div></Grid>
                <Grid>
                  <div className={styles.info_calculation}>5</div>
                  <div className={styles.info_calculation_text}>연비</div>
                </Grid>
                <Grid><div className={styles.info_calculation}>x</div></Grid>
                <Grid>
                  <div className={styles.info_calculation}>100</div>
                  <div className={styles.info_calculation_text}>전력량 요금</div>
                </Grid>
                <Grid><div className={styles.info_calculation}>+</div></Grid>
                <Grid>
                <div className={styles.info_calculation}>16,730</div>
                  <div className={styles.info_calculation_text}>기본요금</div>
                </Grid>
                <Grid><div className={styles.info_calculation}>=</div></Grid>
              </Grid>
            </div>
          </div>
          <div className={styles.info_avg_monthly}>
            <div className={styles.text_01}>한달 충전요금</div>
            <div className={styles.text_wrapper}>
              <div className={styles.text_02}>36,730원</div>
              <div className={styles.text_03}>VAT 제외</div>
            </div>
          </div>
          <div className={styles.info_text}>
            <div className={styles.info_icon}><Image src={Icon} /></div>
            <span>쉬운 이해를 위해 비중이 적은 기후환경 요금과 연료비 조정요금은 계산에서 제외하였습니다.</span>
          </div>
        </article>
      </section>
    </div>
  )
}

export default CheckRate; 