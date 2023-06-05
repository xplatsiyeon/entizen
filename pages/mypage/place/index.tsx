import { testArr } from 'components/mypage/place/Charging';
import PlaceTopBox from 'components/mypage/place/PlaceTopBox';
import MypageHeader from 'components/mypage/request/header';
import { useRouter } from 'next/router';
import { useState } from 'react';
import PlaceInfo from 'components/mypage/place/PlaceInfo';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import { useQuery } from '@apollo/client';
import {
  chargingStations,
  ChargingStationsResponse,
} from 'QueryComponents/UserQuery';
import Loader from 'components/Loader';
import PlaceNoReview from 'components/mypage/place/PlaceNoReview';
import PlaceGetReview from 'components/mypage/place/PlaceGetReview';
import WebHeader from 'componentsWeb/WebHeader';
import WebFooter from 'componentsWeb/WebFooter';
import RequestMain from 'components/mypage/request/requestMain';
import UserRightMenu from 'components/UserRightMenu';
import CommunicationBox from 'components/CommunicationBox';

export interface testArr2 extends testArr {
  address: string;
  review: boolean;
  score: number[];
}

const ChargingPlace = () => {
  const router = useRouter();
  const routerId = router?.query?.id;
  const [open, setOpen] = useState<boolean>(true); //리뷰 쓰기/보기 버튼 클릭 시.
  const [hideTopBox, setHideTopBox] = useState<boolean>(true);
  const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const {
    data: chargingData,
    loading: chargingLoading,
    error: chargingError,
    refetch: chargingRefetch,
  } = useQuery<ChargingStationsResponse>(chargingStations, {
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ContentType: 'application/json',
      },
    },
    variables: {
      page: 1,
      limit: 100000000,
    },
  });

  if (chargingLoading) {
    return <Loader />;
  }
  if (chargingError) {
  }

  const target = chargingData?.chargingStations?.projects?.filter(
    (e) => e.projectIdx === routerId,
  );

  console.log('target![0].projectReview : ', target![0].projectReview);

  return (
    <>
      <Body bgColor={open}>
        <WebHeader num={3} now={'mypage'} sub={'mypage'} />
        <UserRightMenu />
        <Inner>
          <FlexBox>
            {hideTopBox === true && (
              <Wrap1>
                <RequestMain page={3} />
              </Wrap1>
            )}
            {typeof routerId !== 'undefined' ? (
              <Wrap2>
                <MypageHeader
                  back={open ? true : undefined}
                  title={
                    open
                      ? '내 충전소'
                      : target![0].projectReview
                      ? '내 충전소 리뷰 보기'
                      : '내 충전소 리뷰하기'
                  }
                  exitBtn={open ? undefined : true}
                  handleOnClick={() => setOpen(!open)}
                />
                <RightBox>
                  {/* 상단 상세 내용 */}
                  {hideTopBox ? <PlaceTopBox data={target![0]} /> : null}
                  {open ? (
                    <Wrap>
                      {/* 계약 관련 정보가 적힌 컴포넌트 */}
                      <PlaceInfo data={target![0]} />

                      {/*웹과 모바일일때, 리뷰 컴포넌트가 보여질 모습이 달라서 버튼 2개 생성.
                        웹용 버튼은 모바일 사이즈에선 display : None, 모바일 버튼은 웹 사이지에서 display : None
                      */}
                      <BtnWeb
                        onClick={() => {
                          setOpen(!open);
                          setHideTopBox(false);
                        }}
                      >
                        <span>
                          {/* 작성된 리뷰 여부 */}
                          {target![0]?.projectReview ? '리뷰보기' : '리뷰쓰기'}
                        </span>
                      </BtnWeb>
                      <BtnMob
                        onClick={() => {
                          window.scrollTo(0, 0);
                          setOpen(!open);
                        }}
                      >
                        <span>
                          {/* 작성된 리뷰 여부 */}
                          {target![0]?.projectReview ? '리뷰보기' : '리뷰쓰기'}
                        </span>
                      </BtnMob>
                    </Wrap>
                  ) : (
                    <>
                      {/* 리뷰 여부와 리뷰 점수 전달. */}
                      {target![0].projectReview ? (
                        <PlaceGetReview
                          review={true}
                          data={target![0].projectReview}
                          setOpen={setOpen}
                        />
                      ) : (
                        <PlaceNoReview
                          chargingRefetch={chargingRefetch}
                          close={setOpen}
                        />
                      )}
                    </>
                  )}
                  <CommuWrap>
                    <CommunicationBox
                      text="파트너와 소통하기"
                      id={
                        chargingData?.chargingStations?.projects[0]
                          ?.companyMember?.memberIdx
                      }
                    />
                  </CommuWrap>
                </RightBox>
              </Wrap2>
            ) : null}
          </FlexBox>
        </Inner>
        <WebFooter />
      </Body>
    </>
  );
};

export default ChargingPlace;

const Body = styled.div<{ bgColor: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
  background: ${({ bgColor }) => (bgColor ? `white` : `#fcfcfc`)};

  @media (max-height: 809pt) {
    display: block;
    height: 100%;
    background: #ffffff;
  }
`;

const Inner = styled.div`
  display: block;
  position: relative;
  width: 900pt;
  height: 100%;

  margin: 60pt auto;
  margin-bottom: 90pt;
  @media (max-width: 899.25pt) {
    width: 100%;
    position: relative;
    margin: 0 auto;
  }
`;
const FlexBox = styled.div`
  display: flex;
  position: relative;
  gap: 60pt;

  @media (max-width: 899.25pt) {
    display: block;
  }

  @media (min-width: 900pt) {
    display: flex;
    justify-content: space-between;
  }
`;

const RightBox = styled.div`
  @media (min-width: 900pt) {
    width: 580.5pt;
  }
`;

const Wrap = styled.div`
  margin: 0 15pt;
  position: relative;
  @media (min-width: 900pt) {
    width: 580.5pt;
    margin: 0;
  }
`;

const Wrap2 = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 900pt) {
    margin: 0 auto;
  }
`;

const Wrap1 = styled.div`
  //width: 255pt;
  border: 1px solid #e9eaee;
  border-radius: 12pt;
  height: 100%;
  @media (max-width: 899.25pt) {
    display: none;
  }
`;

const HeaderWrap = styled.div`
  margin-left: -15pt;
`;

const BtnMob = styled.button`
  width: 100%;
  /* background-color: ${colors.main}; */
  background-color: white;
  border: 0.75pt solid #e2e5ed;
  padding: 15pt 0;
  border-radius: 6pt;
  position: absolute;
  bottom: 30pt;
  span {
    /* color: white; */
    color: #a6a9b0;
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 700;
    font-size: 12pt;
    line-height: 12pt;
    text-align: center;
    letter-spacing: -0.02em;
  }
  display: none;
  @media (max-width: 899.25pt) {
    display: block;
  }

  @media (min-width: 900pt) {
    position: relative;
  }
`;

const BtnWeb = styled(BtnMob)`
  display: block;
  cursor: pointer;
  margin-top: 110px;
  @media (max-width: 899.25pt) {
    display: none;
  }
`;

const CommuWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40pt;
  @media (max-width: 899.25pt) {
    display: none;
  }
`;
