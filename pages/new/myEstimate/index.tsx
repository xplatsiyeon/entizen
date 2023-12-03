import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  Button,
  TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { MyEstimateHeader } from 'components/myEstimate/header';
import myEstimateStyles from './myEstimate.module.scss';
import { EstimateByCompany } from 'components/myEstimate/estimateByCompany';
import TagManager from 'react-gtm-module';
import { useEffect, useState } from 'react';
import CommonConfirmModal from '../commonConfirmModal';
import { useMediaQuery } from 'react-responsive';
import Image from 'next/image';
import ProcessMb from 'public/images/myEstimate/process_mb.svg';
import PhoneModal from '../phoneModal';

const MyEstimate = () => {
  const isMobile = useMediaQuery({ query: '(max-width:899.25pt)' });
  const [modalOpen, setModalOpen] = useState(false);
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);
  sessionStorage.setItem('USER_ID', JSON.stringify({ id: 'test' }));
  const chartDownload = () => {
    const tagManagerArgs = {
      dataLayer: {
        event: 'chart_download',
      },
    };
    TagManager.dataLayer(tagManagerArgs);
  };
  const kakaoBtnClick = () => {
    const tagManagerArgs = {
      dataLayer: {
        event: 'kakao_btn_click',
      },
    };
    TagManager.dataLayer(tagManagerArgs);
  };
  const telBtnClick = () => {
    const tagManagerArgs = {
      dataLayer: {
        event: 'tel_btn_click',
      },
    };
    TagManager.dataLayer(tagManagerArgs);
  };
  const onClickSendBtn = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    const phone = sessionStorage.getItem('phone_number');
    // sessionStorage.removeItem('phone_number')
    console.log('phone : ', phone);
    if (!phone) {
      setPhoneModalOpen(true);
    }
  }, []);

  return (
    <div className={myEstimateStyles.myEstimateContainer}>
      {/* 헤더제외 */}
      <MyEstimateHeader></MyEstimateHeader>
      {/* <div className={myEstimateStyles.fakeHeader}></div> */}
      <section className={myEstimateStyles.backgroundWrap}>
        <p className={myEstimateStyles.backgroundIntro}>
          견적 비교 후 궁금한 부분을
          <br /> 업체와 소통해 보세요
        </p>
      </section>
      <section className={myEstimateStyles.mainSectionWrap}>
        <div className={myEstimateStyles.title}>내 견적서</div>
        <article className={myEstimateStyles.infoWrap}>
          <div className={myEstimateStyles.averagePriceWrap}>
            <div className={myEstimateStyles.naverShopTitle}>
              네이버 쇼핑 기준
            </div>
            <div className={myEstimateStyles.naverShopInfo}>
              <p className={myEstimateStyles.naverShopInfoEtc}>
                7kW 완속 충전기 설치 포함 <span>224개 가격 평균</span>
              </p>
              <p className={myEstimateStyles.naverShopInfoPrice}>1,364,130원</p>
            </div>
          </div>
        </article>
        <article className={myEstimateStyles.estimateCompanyWrap}>
          <EstimateByCompany company="ev"></EstimateByCompany>
          <EstimateByCompany company="castpro"></EstimateByCompany>
          <EstimateByCompany company="starkoff"></EstimateByCompany>
        </article>
      </section>
      <div className={myEstimateStyles.estimateInfomation}>
        <div className={myEstimateStyles.hiddenWrap}>
          <div className={myEstimateStyles.infoWrap}>
            <p className={myEstimateStyles.infoTitle}>벽걸이 7kW 비공용 1대</p>
            <div className={myEstimateStyles.infoList}>
              <ul>
                <li>
                  해당 가격은 충전기 구매 비용과 설치비용이 포함된
                  가격입니다.(벽걸이 설치 기준 금액)
                </li>
                <li>해당 가격에는 부가세(vat)가 포함된 가격 입니다.</li>
                <li>해당 가격에는 한전 불입금이 포함되지 않은 가격입니다.</li>
                <li>
                  공용 충전기는 <strong>help@entizen.kr</strong>이나{' '}
                  <strong>1544-6811</strong>로 문의주시기 바랍니다.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <section className={myEstimateStyles.compareEstimateWrap}>
        <div className={myEstimateStyles.title}>업체별 주요기능 비교표</div>
        <div style={{ width: '-webkit-fill-available' }}>
          <div className={myEstimateStyles.tableWrap}>
            <table>
              <tr>
                <th
                  scope="col"
                  colSpan={2}
                  className={myEstimateStyles.companyTh}
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
          <div className={myEstimateStyles.buttonWrap}>
            <a
              className={myEstimateStyles.downloadBtn}
              onClick={chartDownload}
              href="https://drive.google.com/file/d/1ykHsHcsIIY5gnhHUxDDb2g6R6dfQ5BeP/view?usp=sharing"
              target="_blank"
            >
              <p>모든 업체 비교표 다운받기</p>
              <div className={myEstimateStyles.icon}></div>
            </a>
          </div>
        </div>
      </section>
      <section className={myEstimateStyles.compareEstimateWrap}>
        <div className={myEstimateStyles.title}>진행 프로세스</div>
        {isMobile ? (
          <Image src={ProcessMb} alt="process1" objectFit="contain" />
        ) : (
          <div className={myEstimateStyles.processWrap}>
            <div className={myEstimateStyles.badge}>현재 진행 단계</div>
            <div className={myEstimateStyles.processImgWrap}>
              <div className={myEstimateStyles.processImg}>
                <div className={myEstimateStyles.process1}></div>
                {/* <p className={myEstimateStyles.processTitle}>견적요청</p> */}
              </div>
              <div className={myEstimateStyles.processImg}>
                <div className={myEstimateStyles.arrow}></div>
              </div>
              <div className={myEstimateStyles.processImg}>
                <div className={myEstimateStyles.process2}></div>
                {/* <p className={myEstimateStyles.processTitle}>견적요청</p> */}
              </div>
              <div className={myEstimateStyles.processImg}>
                <div className={myEstimateStyles.arrow}></div>
              </div>
              <div className={myEstimateStyles.processImg}>
                <div className={myEstimateStyles.process3}></div>
                {/* <p className={myEstimateStyles.processTitle}>견적요청</p> */}
              </div>
            </div>
          </div>
        )}
      </section>

      <section className={myEstimateStyles.myEstimateFooter}>
        <p className={myEstimateStyles.title}>
          견적서를 보고 엔티즌 플랫폼에<br></br>궁금하신 게 있으신가요?
        </p>
        <div className={myEstimateStyles.buttonWrap}>
          <a
            className={`${myEstimateStyles.button} ${myEstimateStyles.kakaoChatBtn}`}
            onClick={kakaoBtnClick}
            href="http://pf.kakao.com/_xjxeVYxj/chat"
            target="_blank"
          >
            <span className={myEstimateStyles.kakaoIcon}></span>엔티즌에게
            카카오톡으로 질문하기
          </a>
          <a
            href="tel:1544-6811"
            className={`${myEstimateStyles.button} ${myEstimateStyles.recommCallBtn}`}
            onClick={telBtnClick}
          >
            <span className={myEstimateStyles.callIcon}></span>전화 상담으로
            업체 추천 받기
          </a>
        </div>
        <div className={myEstimateStyles.mailBoxWrap}>
          <div className={myEstimateStyles.infoWrap}>
            <p className={myEstimateStyles.title}>
              혹시 기대했던 업체가 없나요?
            </p>
            <div className={myEstimateStyles.inputWrap}>
              <input
                type="text"
                className={myEstimateStyles.inputMail}
                placeholder="원하시는 업체명을 알려주세요"
                name="mail"
                autoComplete="off"
              />
              <button
                className={myEstimateStyles.sendBtn}
                onClick={onClickSendBtn}
              >
                전송
              </button>
            </div>
          </div>
          <div className={myEstimateStyles.chargeCarImg}></div>
        </div>
      </section>
      <CommonConfirmModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        onConfirm={() => {
          setModalOpen(false);
        }}
        useCancelBtn={false}
        title="전송"
        content={<p>전송이 완료되었습니다.</p>}
      />
      <PhoneModal open={phoneModalOpen} setOpen={setPhoneModalOpen} />
    </div>
  );
};

export default MyEstimate;
