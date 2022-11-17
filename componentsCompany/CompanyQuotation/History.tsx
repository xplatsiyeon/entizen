import styled from '@emotion/styled';
import Image from 'next/image';
import CommonBtn from 'components/mypage/as/CommonBtn';
import CaretDown24 from 'public/images/CaretDown24.png';
import React, { useEffect, useState } from 'react';
import colors from 'styles/colors';
import { HandleColor } from 'utils/changeValue';
import { useQuery } from 'react-query';
import Sort from './Sort';
import { filterType, filterTypeEn } from 'pages/company/quotation';
import Search from './Search';
import { isTokenGetApi } from 'api';
import useDebounce from 'hooks/useDebounce';
import { useRouter } from 'next/router';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader';
import WebSort from './WebSort';

type Props = {};

interface QuotationRequestChargers {
  kind: number;
}
interface Data {
  preQuotation: {
    preQuotationIdx: number;
  };
  quotationRequest: {
    quotationRequestIdx: number;
    installationAddress: string;
    createdAt: string;
    quotationStatus: string;
    quotationRequestChargers: QuotationRequestChargers[];
  };
  badge: string;
}
interface HistoryResponse {
  isSuccess: boolean;
  data: Data[];
}
const TAG = 'componentsCOmpany/CompanyQuotation/History';
const History = ({}: Props) => {
  const router = useRouter();
  const [searchWord, setSearchWord] = useState<string>('');
  const [checkedFilterIndex, setcheckedFilterIndex] = useState<number>(0);
  const [checkedFilter, setCheckedFilter] =
    useState<filterType>('마감일순 보기');
  const keyword = useDebounce(searchWord, 3000);
  // api 호출
  const { data, isLoading, isError, error, refetch } =
    useQuery<HistoryResponse>(
      'history',
      () =>
        isTokenGetApi(
          `/quotations/histories?keyword=${keyword}&sort=${filterTypeEn[checkedFilterIndex]}`,
        ),
      {
        enabled: false,
      },
    );

  useEffect(() => {
    refetch();
  }, [checkedFilterIndex, keyword]);

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

  return (
    <>
      <Sort
        checkedFilter={checkedFilter}
        setCheckedFilter={setCheckedFilter}
        checkedFilterIndex={checkedFilterIndex}
        setcheckedFilterIndex={setcheckedFilterIndex}
      />
      <TopContainer>
        <Search searchWord={searchWord} setSearchWord={setSearchWord} />
        <WebSort
          checkedFilter={checkedFilter}
          setCheckedFilter={setCheckedFilter}
          checkedFilterIndex={checkedFilterIndex}
          setcheckedFilterIndex={setcheckedFilterIndex}
        />
      </TopContainer>

      <ContentsContainer>
        {data?.data?.map((data, index) => (
          <div key={index}>
            <Contents
              key={index}
              onClick={() =>
                router.push({
                  pathname: '/company/sentProvisionalQuotation',
                  query: {
                    preQuotationIdx: data?.preQuotation?.preQuotationIdx,
                  },
                })
              }
            >
              <DdayNAddress>
                <DdayBox>
                  <CommonBtn
                    text={data?.badge}
                    backgroundColor={HandleColor(data?.badge)}
                    bottom={'12pt'}
                  />
                </DdayBox>
                <AddressBox>
                  {data?.quotationRequest.installationAddress}
                </AddressBox>
              </DdayNAddress>
              <IconBox>
                <ArrowIconBox>
                  <Image src={CaretDown24} alt="RightArrow" />
                </ArrowIconBox>
              </IconBox>
            </Contents>
          </div>
        ))}
      </ContentsContainer>
    </>
  );
};

const ContentsContainer = styled.div`
  margin-top: 18pt;
  @media (min-width: 900pt) {
    width: 580.5pt;
    margin: 0 auto;
  }
`;

const TopContainer = styled.div`
  @media (min-width: 900pt) {
    width: 580.5pt;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    margin-bottom: 30pt;
  }
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

export default History;
