import styled from '@emotion/styled';
import CommonBtn from 'components/mypage/as/CommonBtn';
import React, { useEffect, useState } from 'react';
import CaretDown24 from 'public/images/CaretDown24.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import colors from 'styles/colors';
import { HandleColor } from 'utils/changeValue';
import { ReceivedQuotationRequests } from 'pages/company/quotation';

type Props = {
  queryData: ReceivedQuotationRequests[];
};
const TAG = '👀 ~RecieveRequest ~line 20 queryData';
const RecieveRequest = ({ queryData }: Props) => {
  const router = useRouter();

  console.log(TAG);
  console.log(queryData);
  return (
    <ContentsContainer>
      {queryData?.map((el) => (
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
            <AddressBox>{el?.quotationRequest?.installationAddress}</AddressBox>
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

export default RecieveRequest;
