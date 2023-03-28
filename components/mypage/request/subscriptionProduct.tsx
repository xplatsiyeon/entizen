import styled from '@emotion/styled';
import colors from 'styles/colors';
import arrow from 'public/images/right-arrow.svg';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { PreQuotations } from 'pages/mypage/request';
import {
  PriceBasicCalculation,
  PriceCalculation,
} from 'utils/calculatePackage';
import { useQuery } from 'react-query';
import { UserInfo } from 'pages/mypage';
import { isTokenGetApi } from 'api';
import { Dispatch, SetStateAction } from 'react';
type Props = {
  data: PreQuotations[];
  setIsFinalItmeIndex: Dispatch<SetStateAction<number>>;
};
const SubscriptionProduct = ({ data, setIsFinalItmeIndex }: Props) => {
  const route = useRouter();
  // const UserId = JSON.parse(localStorage.getItem('USER_ID')!);
  const {
    data: userData,
    isError: userError,
    isLoading: userLoading,
  } = useQuery<UserInfo>('user-info', () => isTokenGetApi('/members/info'));

  const onClickCompany = (company: PreQuotations, index: number) => {
    // 다른 파트너 선택하면 원래 선택한 화면 흐려지기만 함

    if (company?.finalQuotation) {
      // console.log('최종견적 있다');
      setIsFinalItmeIndex(index);
    } else {
      route.push({
        pathname: '/mypage/request/detail',
        query: {
          preQuotationIdx: company.preQuotationIdx,
        },
      });
    }
  };

  if (userLoading) {
    // console.log('유저 정보 받아오는 중');
  }
  if (userError) {
    // console.log('유저 정보 에러');
  }

  return (
    <Wrapper>
      <H1>
        {userData?.name}님, <br /> 총{' '}
        <span className="accent">{data ? data?.length : 0}개</span>의 구독상품이
        도착했습니다.
      </H1>
      <Notice>상세 내용을 비교해보고, 나에게 맞는 상품을 선택해보세요!</Notice>
      <GridContainer>
        {data?.map((company, index) => (
          <GridItem
            isFailed={company?.finalQuotation ? true : false}
            key={index}
            onClick={() => onClickCompany(company, index)}
          >
            {company?.member?.companyMemberAdditionalInfo
              ?.companyLogoImageUrl !== '' ? (
              <div className="img-box">
                <Image
                  src={
                    company?.member?.companyMemberAdditionalInfo
                      ?.companyLogoImageUrl
                  }
                  alt={
                    company?.member?.companyMemberAdditionalInfo?.companyName
                  }
                  priority={true}
                  unoptimized={true}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ) : (
              <NoImage />
            )}

            <h2>{company?.member?.companyMemberAdditionalInfo?.companyName}</h2>
            <p>구독료</p>
            <PriceBox>
              <h1>
                {PriceBasicCalculation(company.subscribePricePerMonth)
                  ? `${PriceBasicCalculation(company.subscribePricePerMonth)}원`
                  : '무료'}
              </h1>
              <div>
                <Image src={arrow} alt="arrow" layout="fill" />
              </div>
            </PriceBox>
          </GridItem>
        ))}
      </GridContainer>
    </Wrapper>
  );
};

export default SubscriptionProduct;

const Wrapper = styled.div`
  padding: 0 15pt 30pt 15pt;

  @media (max-width: 899.25pt) {
    padding-top: 0pt;
  }
`;

const H1 = styled.h1`
  font-weight: 700;
  font-size: 19.5pt;
  line-height: 28.5pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  font-family: 'Spoqa Han Sans Neo';
  .accent {
    font-weight: 700;
    font-size: 19.5pt;
    line-height: 28.5pt;
    letter-spacing: -0.02em;
    color: ${colors.main};
    font-family: 'Spoqa Han Sans Neo';
    @media (max-width: 899.25pt) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 12pt;
      font-weight: 700;
      line-height: 18pt;
      letter-spacing: -0.02em;
      text-align: left;
    }
  }

  @media (max-width: 899.25pt) {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 12pt;
    font-weight: 700;
    line-height: 18pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;
const Notice = styled.p`
  padding-top: 9pt;
  font-weight: 400;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.lightGray2};
  font-family: 'Spoqa Han Sans Neo';

  @media (max-width: 899.25pt) {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 9pt;
    font-weight: 400;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;
const GridContainer = styled.div`
  //display: grid;
  //grid-template-columns: repeat(2, 1fr);
  display: flex;
  flex-wrap: wrap;
  padding-top: 30pt;
  gap: 22.5pt;
  @media (max-width: 899.25pt) {
    gap: 11.25pt;
  }
`;
const GridItem = styled.div<{ isFailed: boolean }>`
  background: ${colors.lightWhite};
  box-shadow: 0px 0px 7.5pt rgba(137, 163, 201, 0.2);
  opacity: ${({ isFailed }) => (isFailed ? '0.5' : null)};
  border-radius: 6pt;
  padding-top: 12pt;
  padding-bottom: 15pt;
  padding-left: 9pt;
  width: 128.25pt;
  height: 138pt;
  cursor: pointer;
  & > h2 {
    font-family: 'Spoqa Han Sans Neo';
    padding-top: 15pt;
    font-weight: 400;
    font-size: 9pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.gray2};
  }
  & > p {
    font-family: 'Spoqa Han Sans Neo';
    padding-top: 12pt;
    font-weight: 400;
    font-size: 9pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.lightGray3};
  }
  .img-box {
    position: relative;
    width: 48pt;
    height: 48pt;
    border-radius: 6pt;
    overflow: hidden;
  }
  @media (max-width: 899.25pt) {
    width: 120pt;
    height: 138pt;
    & > h2 {
      padding-top: 0pt;
    }
    & > p {
      padding-top: 6pt;
    }
  }
`;
const PriceBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 6pt;
  & h1 {
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 700;
    font-size: 12pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  & div {
    position: relative;
    width: 12pt;
    height: 12pt;
    right: 9pt;
  }
`;

const NoImage = styled.div`
  position: relative;
  width: 48pt;
  height: 48pt;
  border-radius: 6pt;
  background: #caccd1;
  @media (max-width: 899.25pt) {
    margin-bottom: 15pt;
  }
`;
