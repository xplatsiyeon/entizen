import styled from '@emotion/styled';
import CommonBtn from 'components/mypage/as/CommonBtn';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import CaretDown24 from 'public/images/CaretDown24.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import colors from 'styles/colors';
import { HandleColor } from 'utils/changeValue';
import {
  filterType,
  filterTypeEn,
  ReceivedQuotationRequests,
  ReceivedRequest,
} from 'pages/company/quotation';
import { isTokenGetApi } from 'api';
import { useQuery } from 'react-query';
import useDebounce from 'hooks/useDebounce';
import Loader from 'components/Loader';
import Sort from './Sort';
import Search from './Search';
import Modal from 'components/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { myEstimateAction } from 'storeCompany/myQuotation';
import { RootState } from 'store/store';

type Props = {
  data?: ReceivedRequest;
  setComponentId?: React.Dispatch<React.SetStateAction<number | undefined>>;
  componentId?: number;
  setTabNumber?: Dispatch<SetStateAction<number>>;
};

const TAG = '👀 ~RecieveRequest ~line 20 queryData';
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
  console.log(chargers);

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
        {data?.receivedQuotationRequests?.map((el, idx) => (
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
              <AddressBox>
                {el?.quotationRequest?.installationAddress}
              </AddressBox>
            </DdayNAddress>
            <IconBox>
              <ArrowIconBox>
                <Image src={CaretDown24} alt="RightArrow" />
              </ArrowIconBox>
            </IconBox>
          </Contents>
        ))}
      </ContentsContainer>
    </>
  );
};

const ContentsContainer = styled.div`
  @media (min-width: 900pt) {
    width: 200pt;
    margin: 0 auto;
    border-radius: 6pt;
    height: 313pt;
    overflow-y: scroll;
    padding: 6pt 7.5pt 0 7.5pt;
  }
`;

const Contents = styled.div<{
  select: number | undefined;
  componentId: number | undefined;
}>`
  padding: 12pt 13.5pt;
  display: flex;
  margin-bottom: 9pt;
  justify-content: space-between;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
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
  margin-top: 12pt;
  color: ${colors.main2};
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ArrowIconBox = styled.div`
  width: 18pt;
  height: 18pt;
`;

export default RecieveRequestUnder;
