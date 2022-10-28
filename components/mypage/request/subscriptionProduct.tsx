import styled from '@emotion/styled';
import colors from 'styles/colors';
import temp from 'public/mypage/temp-img.svg';
import arrow from 'public/images/right-arrow.svg';
import DoubleArrow from 'public/mypage/CaretDoubleDown.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { QuotationRequestsResponse } from 'pages/mypage/request/[id]';
type Props = {
  data: QuotationRequestsResponse;
};
const SubscriptionProduct = ({ data }: Props) => {
  const route = useRouter();
  const UserId = JSON.parse(localStorage.getItem('USER_ID')!);
  return (
    <Wrapper>
      <DownArrowBox>
        <Image src={DoubleArrow} alt="double-arrow" />
      </DownArrowBox>
      <H1>
        {UserId}님, <br /> 총{' '}
        <span className="accent">
          {/* {data?.quotationRequests
            ? data?.quotationRequests?.totalPreQuotationCount
            : 0} */}
          개
        </span>
        의 구독상품이 도착했습니다.
      </H1>
      <Notice>상세 내용을 비교해보고, 나에게 맞는 상품을 선택해보세요!</Notice>
      <GridContainer>
        {/* {data?.quotationRequests?.preQuotations?.map((company, index) => (
          <GridItem
            key={index}
            onClick={() =>
              route.push(
                `/mypage/request/preQuotations/${company.preQuotationIdx}`,
              )
            }
          >
            <div className="img-box">
              <Image
                src={company.companyLogoImageUrl}
                alt={company.companyName}
                priority={true}
                unoptimized={true}
                layout="fill"
              />
            </div>
            <h2>{company.companyName}</h2>
            <p>구독료</p>
            <PriceBox>
              <h1>${company.subscribePricePerMonth} 원</h1>
              <div>
                <Image src={arrow} alt="arrow" layout="fill" />
              </div>
            </PriceBox>
          </GridItem>
        ))} */}
      </GridContainer>
    </Wrapper>
  );
};

export default SubscriptionProduct;

const Wrapper = styled.div`
  padding: 6pt 15pt 69pt 15pt;
  padding-top: 75pt;

  @media (max-width: 899pt) {
    padding-top: 0pt;
  }
`;
const DownArrowBox = styled.div`
  padding-top: 21pt;
  padding-bottom: 30pt;
  text-align: center;
`;

const H1 = styled.h1`
  font-weight: 700;
  font-size: 12pt;
  line-height: 18pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  .accent {
    color: ${colors.main};
  }
`;
const Notice = styled.p`
  padding-top: 9pt;
  font-weight: 400;
  font-size: 9pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.lightGray2};
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding-top: 30pt;
  gap: 11.25pt;
`;
const GridItem = styled.div`
  background: ${colors.lightWhite};
  box-shadow: 0px 0px 7.5pt rgba(137, 163, 201, 0.2);
  border-radius: 6pt;
  padding-top: 12pt;
  padding-bottom: 15pt;
  padding-left: 9pt;
  cursor: pointer;
  & > h2 {
    padding-top: 15pt;
    font-weight: 400;
    font-size: 9pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.gray2};
  }
  & > p {
    padding-top: 6pt;
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
  }
`;
const PriceBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 6pt;
  & h1 {
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
