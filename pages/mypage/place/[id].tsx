import { testArr } from "components/mypage/place/Charging";
import PlaceTopBox from "components/mypage/place/PlaceTopBox";
import MypageHeader from "components/mypage/request/header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import PlaceInfo from "components/mypage/place/PlaceInfo";
import styled from "@emotion/styled";
import colors from "styles/colors";
import PlaceReview from "components/mypage/place/PlaceReview";

export interface testArr2 extends testArr {
  address: string;
  review: boolean;
  score: number[];
}


const tempProceeding: testArr2[] = [
  {
    id: 0, badge: 1, storeName: 'LS 카페 신림점', date: 'D-67', address: '', review: true, score: [2, 4, 5, 3]
  },
  {
    id: 1, badge: 0, storeName: 'LS 용산 주유소', date: 'D-177', address: '', review: false, score: []
  },
  {
    id: 2, badge: 2, storeName: 'LS 25시 난곡점', date: 'D-5', address: '', review: true, score: [4, 4, 5, 4]
  }, {
    id: 3, badge: 3, storeName: 'LS 05시 곡점', date: '', address: '', review: false, score: []
  }, {
    id: 4, badge: 4, storeName: 'LS 2시 난점', date: 'D-100', address: '', review: true, score: [5, 4, 5, 5]
  }
]

const ChargingPlace = () => {

  const router = useRouter();

  const [index, setIndex] = useState<number>();

  const [open, setOpen] = useState<boolean>(true); //리뷰 쓰기/보기 버튼 클릭 시.

  useEffect(() => {
    if (router.query.id) {
      setIndex(Number(router.query.id))
    }
  }, [router.query.id])

  return (
    <>
      {typeof (index) !== 'undefined' ?
        <Wrap>
          <HeaderWrap>
            <MypageHeader back={true} title={!open ? '내 충전소' : '내 충전소 리뷰보기'} />
          </HeaderWrap>
          <PlaceTopBox data = {tempProceeding[index]}/>

          {open ?
            <> {/* 계약 관련 정보가 적힌 컴포넌트 */}
              <PlaceInfo />
              <Btn onClick={() => setOpen(!open)}>
                <span>
                  {/* 작성된 리뷰 여부 */}
                  {tempProceeding[index].review ? '리뷰보기' : '리뷰쓰기'}
                </span>
              </Btn>
            </>
            : <>
            {/* 리뷰 여부와 리뷰 점수 전달. */}
              <PlaceReview review={tempProceeding[index].review} score={tempProceeding[index].score} />
            </>}
        </Wrap>
        : null
      }
    </>
  )
}

export default ChargingPlace;

const Wrap = styled.div`
    margin: 0 15pt;
    position: relative;
`
const HeaderWrap =styled.div`
  margin-left: -15pt;
`

const Btn = styled.button`
  width: 100%;
  background-color: ${colors.main};
  padding: 15pt 0;
  border-radius: 6pt;
  position: absolute;
  bottom: 30pt;
  span{
    color:white;
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 700;
    font-size: 12pt;
    line-height: 12pt;
    text-align: center;
    letter-spacing: -0.02em;
  }
`