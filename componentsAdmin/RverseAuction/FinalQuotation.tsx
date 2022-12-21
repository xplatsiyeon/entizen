import styled from '@emotion/styled';
import Image from 'next/image';
import React, { useState } from 'react';
import colors from 'styles/colors';
import ExitBtn from 'public/adminImages/Group.png';
import { useQuery } from 'react-query';
import { isTokenGetApi } from 'api';
import Loader from 'components/Loader';

type Props = {
  finalQuotationIdx: number;
};

const TAG = 'components/Admin/RverseAuction/FinalQuotation.tsx';
const FinalQuotation = ({ finalQuotationIdx }: Props) => {
  const { data, isLoading, isError } = useQuery('preQuotaion', () =>
    isTokenGetApi(`/admin/quotations/final-quotations/${finalQuotationIdx}`),
  );

  console.log('🔥 최종견적 데이트 확인 -> ' + TAG);
  console.log(data);
  return (
    <>
      {isLoading ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        <Contatiner>
          <MainList>
            <Item>
              <label className="label">item</label>
              <span>LS용산주유소</span>
            </Item>
            <Item>
              <label className="label">기업주소</label>
              <span>서울특별시 강남구 123-45</span>
            </Item>
            <Item>
              <label className="label">담당자 이름</label>
              <span>홍길동</span>
            </Item>
            <Item>
              <label className="label">전화번호</label>
              <span>010-2222-3333</span>
            </Item>
            <Item>
              <label className="label">이메일 주소</label>
              <span>entizen@co.kr</span>
            </Item>
            <Item>
              <label className="label">신청일자</label>
              <span>2022.11.12</span>
            </Item>
            <Item>
              <label className="label">구독상품</label>
              <span>2022.11.12</span>
            </Item>
            <Item>
              <label className="label">구독기간</label>
              <span>2022.11.12</span>
            </Item>
            <Item>
              <label className="label">월 구독료</label>
              <span>195,000 원</span>
            </Item>
            <Item>
              <label className="label">수익지분</label>
              <span>70%</span>
            </Item>
            <Item>
              <label className="label">충전기 종류 및 수량</label>
              <span>7KW 충전기 (공용) : 벽걸이,싱글,2대</span>
            </Item>
            <Item>
              <label className="label">공사기간</label>
              <input className="input" defaultValue={'21일'} />
            </Item>
            <Item>
              <label className="label">충전요금</label>
              <span>7 kw 충전기 (공용) 250 원 / KW</span>
            </Item>
            <Item>
              <label className="label">충전기 제조사</label>
              <span>LS ELECTRIC</span>
            </Item>
            <Item>
              <label className="label">충전기 설치 위치</label>
              <span>LS ELECTRIC</span>
            </Item>
            <Item>
              <label className="label">특장점</label>
              <span>메모</span>
            </Item>
          </MainList>
          <Line />
          <ImgList>
            <label className="label">충전기 이미지</label>

            <div className="imgBox">
              <Image src={''} alt="charge-img" />
              <div className="imgExit">
                <Image src={ExitBtn} alt="exit" layout="fill" />
              </div>
            </div>
          </ImgList>
          <Line />
          <BusinessList>
            <label className="label">첨부파일</label>
            <div className="fileBox">
              <p className="businessName">Charge Porint 카탈로그_7KW.pdf</p>
              <button className="businessBtn">삭제</button>
            </div>
          </BusinessList>
        </Contatiner>
      )}
    </>
  );
};

export default FinalQuotation;

const LoaderContainer = styled.div`
  width: 946px;
  height: 836px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Contatiner = styled.div`
  width: 946px;
  border: 2px solid ${colors.lightGray5};
  border-radius: 4px;
`;
const MainList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-top: 24px;
  padding-left: 16px;
`;
const Item = styled.li`
  display: flex;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: ${colors.dark2};
  .label {
    width: 129px;
    margin-right: 45px;
  }
  .text {
  }
  .input {
    border: 1px solid #e2e5ed;
    border-radius: 2px;
    padding-top: 2px;
    padding-left: 8px;
  }
`;

const Line = styled.div`
  margin: 0 15px;
  height: 2px;
  background: ${colors.lightGray6};
`;
const ImgList = styled.div`
  padding-top: 14px;
  padding-left: 16px;
  padding-bottom: 14px;
  .label {
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    color: ${colors.dark2};
  }
  .imgBox {
    position: relative;
    width: 173px;
    height: 130px;
    background-color: gray;
    margin-top: 10px;
    border-radius: 4px;
    :not(:nth-last-child()) {
      margin-right: 10px;
    }
  }
  .imgExit {
    position: absolute;
    top: 4px;
    right: 4px;
    border: 50%;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;

const BusinessList = styled.div`
  padding-top: 14px;
  padding-left: 16px;
  padding-bottom: 24px;
  .label {
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    color: ${colors.dark2};
  }
  .fileBox {
    display: flex;
    align-items: center;
  }
  .businessName {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    /* identical to box height, or 24px */
    color: #747780;
    border: 1px solid #a6a9b0;
    border-radius: 2px;
    padding: 4px 14px 4px 10px;
    gap: 8px;
    margin-right: 10px;
  }
  .businessBtn {
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    /* identical to box height, or 21px */
    background: none;
    text-decoration-line: underline;

    color: #747780;
  }
`;
