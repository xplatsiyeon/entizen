import styled from '@emotion/styled';

import Image from 'next/image';
import CaretDown24 from 'public/images/CaretDown24.png';
import { useRouter } from 'next/router';
import React from 'react';
import colors from 'styles/colors';
import CommonBtn from 'components/mypage/as/CommonBtn';
import { useQuery } from 'react-query';
import { isTokenGetApi } from 'api';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader';

type Props = {
  checkedFilterIndex: number;
};
interface QuotationRequest {
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
}
interface SendQuotationRequests {
  createdAt: string;
  preQuotationIdx: number;
  subscribePricePerMonth: number;
  constructionPeriod: number;
  subscribeProductFeature: string;
  preQuotationStatus: string;
  changedDate: string;
  quotationRequestIdx: number;
  memberIdx: number;
  badge: string;
  quotationRequest: QuotationRequest;
}

interface SentrequestResponse {
  isSuccess: boolean;
  sendQuotationRequests: SendQuotationRequests[];
}
const TAG = 'components/Company/CompanyQuotation/SentRequest.tsx';
const SentRequest = ({ checkedFilterIndex }: Props) => {
  const router = useRouter();
  const { data, isError, isLoading, error } = useQuery<SentrequestResponse>(
    'sent-request',
    () => isTokenGetApi('/quotations/sent-request'),
  );

  // 뱃지 변경
  const HandleColor = (badge: string): string => {
    if (badge.includes('마감')) {
      return colors.sub4;
    } else if (badge.includes('현장실사') || badge.includes('최종견적')) {
      return colors.main;
    } else if (badge.includes('대기')) {
      return colors.yellow;
    } else if (badge.includes('낙찰대기')) {
      return colors.main2;
    } else if (badge.includes('견적취소') || badge.includes('낙찰실패')) {
      return colors.lightGray3;
    } else return colors.main;
  };

  // // 상태 필터에 따른 데이터 변경
  // useEffect(() => {
  //   switch (checkedFilterIndex) {
  //     case 1: // 상태순
  //       console.log('1이다');
  //       setData(tempProceeding.sort((a, b) => b.id - a.id));
  //       break;
  //     case 2: // 날짜순
  //       console.log('2이다');
  //       break;
  //     default: // 마감일순
  //       0;
  //       setData(tempProceeding.sort((a, b) => a.id - b.id));
  //       break;
  //   }
  // }, [data, checkedFilterIndex]);

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
    <ContentsContainer>
      {data?.sendQuotationRequests.map((el, index) => (
        <Contents
          key={index}
          onClick={() =>
            router.push(
              `/company/sentProvisionalQuotation/${el.preQuotationIdx}`,
            )
          }
        >
          <DdayNAddress>
            <DdayBox>
              <CommonBtn
                text={el.badge}
                backgroundColor={HandleColor(el.badge)}
                bottom={'12pt'}
              />
            </DdayBox>
            <AddressBox>{el.quotationRequest.installationAddress}</AddressBox>
          </DdayNAddress>
          <IconBox>
            <ArrowIconBox>
              <Image src={CaretDown24} alt="RightArrow" />
            </ArrowIconBox>
          </IconBox>
        </Contents>
      ))}
    </ContentsContainer>
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

export default SentRequest;
