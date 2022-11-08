import styled from '@emotion/styled';
import CommonBtn from 'components/mypage/as/CommonBtn';
import React, { useEffect, useState } from 'react';
import CaretDown24 from 'public/images/CaretDown24.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import colors from 'styles/colors';
import { HandleColor } from 'utils/changeValue';
import { filterType, filterTypeEn } from 'pages/company/quotation';
import { isTokenGetApi } from 'api';
import { useQuery } from 'react-query';
import useDebounce from 'hooks/useDebounce';
import Loader from 'components/Loader';
import Sort from './Sort';
import Search from './Search';
import Modal from 'components/Modal/Modal';

type Props = {};

export interface ReceivedQuotationRequests {
  quotationRequest: {
    createdAt: string;
    quotationRequestIdx: number;
    quotationStatus: string;
    changedDate: string;
    subscribeProduct: string;
    investRate: string;
    subscribePeriod: number;
    installationAddress: string;
    installationLocation: string;
    installationPurpose: string;
    expiredAt: string;
    etcRequest: string;
    memberIdx: number;
    preQuotations: [];
    quotationRequestChargers: [
      {
        createdAt: string;
        quotationRequestChargerIdx: number;
        kind: string;
        standType: string;
        channel: string;
        count: number;
        quotationRequestIdx: number;
      },
    ];
  };
  companyMemberAdditionalInfo: [];
  badge: '견적마감 D-0';
}
export interface ReceivedResponse {
  isSuccess: boolean;
  receivedQuotationRequests: ReceivedQuotationRequests[];
}

const TAG = '👀 ~RecieveRequest ~line 20 queryData';
const RecieveRequest = ({}: Props) => {
  const router = useRouter();
  const [searchWord, setSearchWord] = useState<string>('');
  const [checkedFilterIndex, setcheckedFilterIndex] = useState<number>(0);
  const [checkedFilter, setCheckedFilter] =
    useState<filterType>('마감일순 보기');

  const keyword = useDebounce(searchWord, 3000);
  // api 호출
  const { data, isLoading, isError, error, refetch } =
    useQuery<ReceivedResponse>('receivedRequest', () =>
      isTokenGetApi(
        `/quotations/received-request?keyword=&sort=${filterTypeEn[checkedFilterIndex]}`,
      ),
    );

  if (isError) {
    console.log(TAG + '🔥 ~line  68 ~ error 콘솔');
    console.log(error);
    return (
      <Modal
        text="다시 시도해주세요"
        click={() => {
          router.push('/');
        }}
      />
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  useEffect(() => {
    console.log(TAG + '🔥 ~line 54 ~ data 확인');
    console.log(data);
  }, []);

  // // 필터링 기능
  // useEffect(() => {
  //   refetch();
  // }, [checkedFilterIndex, keyword]);
  return (
    <>
      <Sort
        checkedFilter={checkedFilter}
        setCheckedFilter={setCheckedFilter}
        checkedFilterIndex={checkedFilterIndex}
      />
      <Search searchWord={searchWord} setSearchWord={setSearchWord} />
      {/* <ContentsContainer>
        {data?.receivedQuotationRequests?.map((el, idx) => (
          <Contents
            key={el?.quotationRequest?.quotationRequestIdx}
            onClick={() =>
              router.push(
                `/company/recievedRequest/${el?.quotationRequest?.quotationRequestIdx}`,
              )
            }
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
      </ContentsContainer> */}
    </>
  );
};

const ContentsContainer = styled.div`
  margin-top: 18pt;
`;

const Contents = styled.div`
  padding: 12pt 13.5pt;
  display: flex;
  margin-bottom: 9pt;
  justify-content: space-between;
  box-shadow: 0px 0px 7.5pt 0px #89a3c933;
  border-radius: 6pt;
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

export default RecieveRequest;
