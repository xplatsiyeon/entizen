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
  ReceivedRequest,
} from 'pages/company/quotation';
import { isTokenGetApi } from 'api';
import { useQuery } from 'react-query';
import useDebounce from 'hooks/useDebounce';
import Loader from 'components/Loader';
import Sort from './Sort';
import Search from './Search';
import Modal from 'components/Modal/Modal';
import WebSort from './WebSort';

type Props = {
  data?: ReceivedRequest;
};

const TAG = '👀 ~RecieveRequest ~line 20 queryData';
const RecieveRequestUnder = ({ data }: Props) => {
  const router = useRouter();
  const [select, setSelect] = useState<number>();
  console.log(TAG + '🔥 ~ line 45 ~ data check');
  console.log(data, '받은 요청이라네');
  useEffect(() => {
    if (router.query.id) {
      const num = Number(router.query.id);
      setSelect(num);
    }
  }, [router]);

  // const [searchWord, setSearchWord] = useState<string>('');
  // const [checkedFilterIndex, setcheckedFilterIndex] = useState<number>(0);
  // const [checkedFilter, setCheckedFilter] =
  //   useState<filterType>('마감일순 보기');

  // const keyword = useDebounce(searchWord, 3000);
  // api 호출
  // const { data, isLoading, isError, error, refetch } =
  //   useQuery<ReceivedResponse>('received-Request', () =>
  //     isTokenGetApi(
  //       `/quotations/received-request?keyword=${keyword}&sort=${filterTypeEn[checkedFilterIndex]}`,
  //     ),
  //   );

  // if (isError) {
  //   console.log(TAG + '🔥 ~line  68 ~ error 콘솔');
  //   console.log(error);
  //   return (
  //     <Modal
  //       text="다시 시도해주세요"
  //       click={() => {
  //         router.push('/');
  //       }}
  //     />
  //   );
  // }

  // if (isLoading) {
  //   return <Loader />;
  // }

  // useEffect(() => {
  //   console.log(TAG + '🔥 ~line 54 ~ data 확인');
  //   console.log(data);
  // }, []);

  // // 필터링 기능
  // useEffect(() => {
  //   refetch();
  // }, [checkedFilterIndex, keyword]);

  return (
    <>
      <ContentsContainer>
        {/* {data?.receivedQuotationRequests?.map((el, idx) => ( */}
        {[1, 1, 1, 1].map((el, idx) => (
          <Contents
            // key={el?.quotationRequest?.quotationRequestIdx}
            // onClick={() =>
            //   router.push(
            //     `/company/recievedRequest/${el?.quotationRequest?.quotationRequestIdx}`,
            //   )
            // }
            select={select!}
            idx={idx}
          >
            <DdayNAddress>
              <DdayBox>
                <CommonBtn
                  backgroundColor="red"
                  text="12321"
                  // text={el?.badge}
                  // backgroundColor={HandleColor(el?.badge)}
                  bottom={'12pt'}
                />
              </DdayBox>
              <AddressBox>
                테스트
                {/* {el?.quotationRequest?.installationAddress} */}
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
  @media (min-width: 899pt) {
    width: 198pt;
    height: 66pt;
    margin: 0 auto;
    border-radius: 6pt;
  }
`;

const Contents = styled.div<{ select: number; idx: number }>`
  padding: 12pt 13.5pt;
  display: flex;
  margin-bottom: 9pt;
  justify-content: space-between;
  box-shadow: 0px 0px 7.5pt 0px #89a3c933;
  border-radius: 6pt;
  border: ${({ select, idx }) =>
    select === idx ? `0.75pt solid #5221CB` : ''};
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
  font-family: Spoqa Han Sans Neo;
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
