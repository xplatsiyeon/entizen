import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import colors from 'styles/colors';
import { Grid, _ } from 'gridjs-react';
import { dateFomat, hyphenFn } from 'utils/calculatePackage';

type Fake = {
  isSuccess: boolean;
  number: number;
  companyName: string;
  id: string;
  name: string;
  phone: string;
  managerEmail: string;
  createdAt: string;
  deletedAt: string | null;
  signUp: boolean;
  contract: string;
  memberIdx: number;
};

const fake: Fake[] = [
  {
    isSuccess: true,
    number: 1,
    companyName: 'LS용산주유소',
    id: 'entizen1',
    name: '홍길동',
    phone: '01011111111',
    managerEmail: 'entizen@naver.com',
    createdAt: '2022-10-18T10:18:40.365Z',
    deletedAt: null,
    signUp: true,
    contract: '계약완료',
    memberIdx: 36,
  },
  {
    isSuccess: true,
    number: 2,
    companyName: 'LS마곡주유소',
    id: 'helloH',
    name: '홍흥부',
    phone: '01022222222',
    managerEmail: 'stevelabs@naver.com',
    createdAt: '2022-11-18T10:18:40.365Z',
    deletedAt: null,
    signUp: true,
    contract: '',
    memberIdx: 37,
  },
  {
    isSuccess: true,
    number: 3,
    companyName: 'LS마포주유소',
    id: 'Good1234',
    name: '홍놀부',
    phone: '01033333333',
    managerEmail: 'entizen@naver.com',
    createdAt: '2022-10-18T10:18:40.365Z',
    deletedAt: null,
    signUp: true,
    contract: '',
    memberIdx: 38,
  },
  {
    isSuccess: true,
    number: 4,
    companyName: 'LS발산주유소',
    id: 'Bad1234',
    name: '홍놀부',
    phone: '01044444444',
    managerEmail: 'entizen@naver.com',
    createdAt: '2022-10-18T10:18:40.365Z',
    deletedAt: null,
    signUp: true,
    contract: '',
    memberIdx: 39,
  },
  {
    isSuccess: true,
    number: 5,
    companyName: 'LS용산주유소',
    id: 'soso1234',
    name: '홍홍홍',
    phone: '01055555555',
    managerEmail: 'entizen@naver.com',
    createdAt: '2022-11-12T10:18:40.365Z',
    deletedAt: null,
    signUp: true,
    contract: '',
    memberIdx: 40,
  },
];

const CompanyPreQuotation = () => {
  const [dataArr, setDataArr] = useState<[]>([]);

  useEffect(() => {
    const temp: any = [];
    fake.forEach((ele, idx) => {
      const arrEle = [
        ele.number,
        ele.companyName,
        ele.id,
        ele.name,
        hyphenFn(ele.phone),
        ele.managerEmail,
        dateFomat(ele.createdAt),
        ele.contract,
        `${ele.deletedAt ? ele.deletedAt : `-`}`,
      ];
      temp.push(arrEle);
    });

    setDataArr(temp);

    // 의존성 배열에 api.get()dml data넣기.
  }, []);
  return (
    <StyledBody>
      <QuotationTitle>기업회원 견적서 항목</QuotationTitle>
      {dataArr.length > 0 ? (
        <Grid
          data={dataArr}
          columns={[
            '번호',
            '기업명',
            '아이디',
            '담당자',
            '전화번호',
            '이메일',
            '신청일자',
            '채택여부',
            {
              name: '',
              formatter: () =>
                _(
                  <div>
                    <button className="button">삭제</button>
                    <button className="button">보기</button>
                  </div>,
                ),
            },
          ]}
        />
      ) : (
        <div></div>
      )}
    </StyledBody>
  );
};

export default CompanyPreQuotation;

const StyledBody = styled.div`
  margin-top: 32px 0 0;
  min-width: 964px;
  .hidden {
    visibility: hidden;
  }

  .button {
    &:first-child {
      margin-right: 10px;
    }
    font-family: 'Spoqa Han Sans Neo';
    color: #747780;
    line-height: 150%;
    font-size: 14px;
    font-style: normal;
    text-align: center;
    border: 1px solid #747780;
    background-color: #e2e5ed;
    border-radius: 4px;
    width: 64px;
    height: 26px;
    padding-top: 2px;
    cursor: pointer;
  }
  table {
    width: 100%;
    text-align: center;
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-size: 16px;
    line-height: 150%;
    color: #000000;

    thead {
      font-weight: 500;
      background: #e2e5ed;
      .gridjs-th-content {
        padding: 8px 0;
      }
    }
    tbody {
      font-weight: 400;
      td {
        padding: 8px 0;
      }
      .wide {
      }
    }
  }
`;

const QuotationTitle = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  color: ${colors.dark2};
  text-align: left;
  padding-bottom: 15px;
  margin-top: 35px;
`;
