import { useRouter } from 'next/router';
import estimateByCompanyStyles from './estimateByCompany.module.scss';
import { COMPANY_LIST } from 'assets/company';

interface EstimateCompanyProps {
  company: string;
}
export const EstimateByCompany = ({ company }: EstimateCompanyProps) => {
  const router = useRouter();

  const estimateByCompanyData = COMPANY_LIST[company];
  return (
    <div className={estimateByCompanyStyles.estimateByCompanyWrap}>
      <div className={estimateByCompanyStyles.companyInfo}>
        <div className={estimateByCompanyStyles.companyLogo}>
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
          총 {estimateByCompanyData.priceInfo.total} 원 부터 ~
        </p>
        {estimateByCompanyData.priceInfo.event && (
          <p className={estimateByCompanyStyles.etcInfo}>
            {estimateByCompanyData.priceInfo.event}
          </p>
        )}
      </div>
      <div className={estimateByCompanyStyles.buttonWrap}>
        <button className={estimateByCompanyStyles.kakaoChatBtn}>
          <span className={estimateByCompanyStyles.kakaoIcon}></span>
          채팅하기
        </button>
        <button
          className={estimateByCompanyStyles.estimateViewBtn}
          onClick={() => {
            location.href = `/new/myEstimate/estimate/${company}`;
          }}
        >
          견적서보기
        </button>
      </div>
    </div>
  );
};
