import SlideItemStyles from "./slideItem.module.scss";

interface SlideItemProps {
  companyName: string;
  info1: string;
  info2: string;
  info3: string;
  totalPrice: string;
}
export const SlideItem = ({
  companyName,
  info1,
  info2,
  info3,
  totalPrice,
}: SlideItemProps) => {
  return (
    <div className={SlideItemStyles.slideItem}>
      <div>
        {/* eslint-disable-next-line */}
        <img
          className={SlideItemStyles.emptyImg}
          src="/components/suggestion/emptyImg.png"
          alt="emptyImg"
        ></img>

        <div className={SlideItemStyles.slideInfo}>
          <p className={SlideItemStyles.companyName}>{companyName}</p>
          <div className={SlideItemStyles.estimateInfo}>
            <p className={SlideItemStyles.list}>
              <span className={SlideItemStyles.title}>시공횟수</span>
              <span className={SlideItemStyles.info}>{info1}</span>
            </p>
            {/* <div className={SlideItemStyles.border}></div> */}
            <p className={SlideItemStyles.list}>
              <span className={SlideItemStyles.title}>A/S현황</span>
              <span className={SlideItemStyles.info}>{info2}</span>
            </p>
            {/* <div className={SlideItemStyles.border}></div> */}

            <p className={SlideItemStyles.list}>
              <span className={SlideItemStyles.title}>추천 포인트</span>
              <span className={SlideItemStyles.info}>{info3}</span>
            </p>
            {/* <div className={SlideItemStyles.border}></div> */}
          </div>
          {/* <p className={SlideItemStyles.totalPrice}>{totalPrice}</p>
          <button className={SlideItemStyles.kakaoChatBtn}>채팅하기</button>
          <button className={SlideItemStyles.estimateViewBtn}>
            견적서보기
          </button> */}
          <div className={SlideItemStyles.priceInfo}>
            <p className={SlideItemStyles.totalPrice}>{totalPrice}</p>
          </div>
          <div className={SlideItemStyles.buttonWrap}>
            <button className={SlideItemStyles.kakaoChatBtn}>
              <span className={SlideItemStyles.kakaoIcon}></span>
              채팅하기
            </button>
            <button className={SlideItemStyles.estimateViewBtn}>
              견적서보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
