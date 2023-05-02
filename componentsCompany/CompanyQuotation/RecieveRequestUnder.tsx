import styled from '@emotion/styled';
import CommonBtn from 'components/mypage/as/CommonBtn';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import CaretDown24 from 'public/images/CaretDown24.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import colors from 'styles/colors';
import { HandleColor } from 'utils/changeValue';
import { useDispatch, useSelector } from 'react-redux';
import { myEstimateAction } from 'storeCompany/myQuotation';
import { RootState } from 'store/store';
import { ReceivedQuotationRequests } from 'pages/company/quotation';

type Props = {
  data?: ReceivedQuotationRequests[];
  setComponentId?: React.Dispatch<React.SetStateAction<number | undefined>>;
  componentId?: number;
  setTabNumber?: Dispatch<SetStateAction<number>>;
};

const RecieveRequestUnder = ({
  data,
  setComponentId,
  componentId,
  setTabNumber,
}: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  // 리덕스
  const {
    chargers,
    subscribeProductFeature,
    constructionPeriod,
    subscribePricePerMonth,
  } = useSelector((state: RootState) => state.companymyEstimateData);
  // console.log(chargers);

  // console.log(TAG + '🔥 ~ line 45 ~ data check');
  // dispatch(myEstimateAction.reset());

  const onClick = (el: ReceivedQuotationRequests) => {
    router.push({
      pathname: '/company/recievedRequest',
      query: {
        quotationRequestIdx: el?.quotationRequest?.quotationRequestIdx,
      },
    });
    dispatch(myEstimateAction.reset());
  };

  // useEffect(() => {
  //   router.events.on('routeChangeStart', onRouteChangeStart);
  //   return () => {
  //     router.events.on('routeChangeStart', onRouteChangeStart);
  //   };
  // }, [router.events]);

  return (
    <>
      <ContentsContainer>
        {data?.map((el, idx) => (
          <Contents
            key={el?.quotationRequest?.quotationRequestIdx}
            onClick={() => onClick(el)}
            select={Number(el?.quotationRequest?.quotationRequestIdx)}
            componentId={componentId}
          >
            <DdayNAddress>
              <DdayBox>
                <CommonBtn
                  text={el?.badge}
                  backgroundColor={HandleColor(el?.badge)}
                  bottom={'12pt'}
                />
              </DdayBox>
            </DdayNAddress>
            <DisplayBox>
              <AddressBox>
                {el?.quotationRequest?.maskingInstallationAddress}
              </AddressBox>
              <ArrowIconBox>
                <Image src={CaretDown24} alt="RightArrow" />
              </ArrowIconBox>
            </DisplayBox>
          </Contents>
        ))}
      </ContentsContainer>
    </>
  );
};

const ContentsContainer = styled.div`
  @media (min-width: 900pt) {
    /* width: 198pt; */
    height: 313pt;
    border-radius: 6pt;
    /* height: 66pt; */
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    padding: 5pt 28.5pt 0;
    /* padding: 6pt 7.5pt 0 7.5pt; */
  }
`;

const Contents = styled.div<{
  select: number | undefined;
  componentId: number | undefined;
}>`
  padding: 12pt 13.5pt;
  margin-bottom: 9pt;
  box-shadow: 0pt 0pt 7.5pt rgba(137, 163, 201, 0.2) !important;
  border-radius: 6pt;
  border: ${({ select, componentId }) =>
    select === componentId ? `0.75pt solid #5221CB` : ''};
  cursor: pointer;
`;

const DdayBox = styled.div`
  margin-bottom: 16.5pt;
  cursor: pointer;
`;
const DdayNAddress = styled.div`
  position: relative;
`;

const AddressBox = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  position: relative;
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
  /* margin-top: 12pt; */
  color: ${colors.main2};
  width: 140pt;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
`;

const ArrowIconBox = styled.div`
  width: 18pt;
  height: 18pt;
`;

const DisplayBox = styled.div`
  display: flex;
  align-items: center;
`;

export default RecieveRequestUnder;
