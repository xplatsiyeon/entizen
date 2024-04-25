import { useRouter } from 'next/navigation';
import Image from 'next/image';
import estimateByCompanyStyles from './estimateByCompany.module.scss';
import { COMPANY_LIST } from '../../../assets/company';
import TagManager from 'react-gtm-module';

interface EstimateCompanyProps {
  company: string;
}
export const EstimateByCompany = ({ company }: EstimateCompanyProps) => {
  const router = useRouter();

  const estimateByCompanyData = COMPANY_LIST[company];

  let company_name = '';
  if (company === 'ev') {
    company_name = '한국EV충전서비스센터';
  }
  if (company === 'castpro') {
    company_name = '캐스트프로';
  }
  if (company === 'starkoff') {
    company_name = '스타코프';
  }
  if (company === 'eco') {
    company_name = '에코플레이';
  }

  const chatBtnClick = () => {
    const tagManagerArgs = {
      dataLayer: {
        event: 'click_chat_btn',
        company_name: company_name,
      },
    };
    TagManager.dataLayer(tagManagerArgs);
  };

  const clickEstimateDetaileBtn = () => {
    const tagManagerArgs = {
      dataLayer: {
        event: 'click_detail_btn',
        company_name: company_name,
      },
    };
    TagManager.dataLayer(tagManagerArgs);
    location.href = `/new/myEstimate/estimate/${company}`;
  };
  type ObjType = {
    [index: string]: string;
    ev: string;
    eco: string;
    starkoff: string;
    castpro: string;
  };
  const kakaoLink: ObjType = {
    ev: 'http://pf.kakao.com/_xnxduxbG/chat',
    starkoff: 'https://open.kakao.com/o/stFSO2Uf',
    castpro: 'https://open.kakao.com/o/sQUjD5Rf',
    eco: 'https://open.kakao.com/o/s7PPFZVf',
  };

  return (
    <div className={estimateByCompanyStyles.estimateByCompanyWrap}>
      <div className={estimateByCompanyStyles.companyInfo}>
        <div className={estimateByCompanyStyles.companyLogo}>
          {/* <Image
            src={`/images/company/${company}.png`}
            alt={`${company} 로고`}
            width={80}
            height={80}
          /> */}
          <div className={estimateByCompanyStyles[company]}></div>
        </div>
        <p className={estimateByCompanyStyles.companyName}>
          {estimateByCompanyData.name}
        </p>
      </div>
      {/* <div className={estimateByCompanyStyles.infoWrap}>
        <div className={estimateByCompanyStyles.estimateInfo}>
          <p>
            <span className={estimateByCompanyStyles.title}>시공횟수</span>
            <span className={estimateByCompanyStyles.info}>
              {'1500기 이상 시공'}
            </span>
          </p>
          <div className={estimateByCompanyStyles.border}></div>
          <p>
            <span className={estimateByCompanyStyles.title}>A/S현황</span>
            <span className={estimateByCompanyStyles.info}>
              {'A/S지점 10곳, A/S직원 30명'}
            </span>
          </p>
          <div className={estimateByCompanyStyles.border}></div>
          <p>
            <span className={estimateByCompanyStyles.title}>추천 포인트</span>
            <span className={estimateByCompanyStyles.info}>
              {'저렴한 가격 + 엔티즌 제휴 할인'}
            </span>
          </p>
          <div className={estimateByCompanyStyles.border}></div>
        </div>
        <div className={estimateByCompanyStyles.priceInfo}>
          <p className={estimateByCompanyStyles.totalPrice}>
            {'총 1,050,000 원 부터 ~'}
          </p>
          <p className={estimateByCompanyStyles.etcInfo}>
            {'~12.31 까지 이벤트 가격'}
          </p>
        </div>
        
      </div> */}
      <div className={estimateByCompanyStyles.estimateInfo}>
        <p className={estimateByCompanyStyles.list}>
          <span className={estimateByCompanyStyles.title}>시공횟수</span>
          <span className={estimateByCompanyStyles.info}>
            {estimateByCompanyData.companyInfo.info1}
          </span>
        </p>
        <p className={estimateByCompanyStyles.list}>
          <span className={estimateByCompanyStyles.title}>A/S현황</span>
          <span className={estimateByCompanyStyles.info}>
            {estimateByCompanyData.companyInfo.info2}
          </span>
        </p>
        <p className={estimateByCompanyStyles.list}>
          <span className={estimateByCompanyStyles.title}>추천 포인트</span>
          <span className={estimateByCompanyStyles.info}>
            {estimateByCompanyData.companyInfo.info3}
          </span>
        </p>
      </div>
      <div className={estimateByCompanyStyles.priceInfo}>
        <p className={estimateByCompanyStyles.totalPrice}>
          총 {estimateByCompanyData.priceInfo.total} 원
        </p>
        {estimateByCompanyData.priceInfo.event && (
          <p className={estimateByCompanyStyles.etcInfo}>
            {estimateByCompanyData.priceInfo.event}
          </p>
        )}
      </div>
      <div className={estimateByCompanyStyles.buttonWrap}>
        <a
          className={estimateByCompanyStyles.kakaoChatBtn}
          onClick={chatBtnClick}
          href={kakaoLink[company]}
          target="_blank"
        >
          <span className={estimateByCompanyStyles.kakaoIcon}></span>
          채팅하기
        </a>
        <button
          className={estimateByCompanyStyles.estimateViewBtn}
          onClick={clickEstimateDetaileBtn}
        >
          견적서보기
        </button>
      </div>
    </div>
  );
};
