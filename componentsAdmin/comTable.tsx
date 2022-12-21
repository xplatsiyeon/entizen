import styled from '@emotion/styled';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Grid, _ } from 'gridjs-react';
import { dateFormat, hyphenFn } from 'utils/calculatePackage';

type Fake = {
  isSuccess: boolean;
  number: number;
  id: string;
  name: string;
  phone: string;
  profileImageUrl: null | string;
  createdAt: string;
  deletedAt: string | null;
  signUp: boolean;
  companyMemberAdditionalInfoIdx: number;
  companyLogoImageUrl: string;
  companyName: string;
  companyAddress: string;
  companyDetailAddress: string;
  companyZipCode: string;
  managerEmail: string;
  memberIdx: number;
};

type Props = {
  setIsDetail: React.Dispatch<React.SetStateAction<boolean>>;
};

const ComTable = ({ setIsDetail }: Props) => {
  const fake: Fake[] = [
    {
      isSuccess: true,
      number: 1,
      id: 'test12345',
      name: '홍길동',
      phone: '01012341234',
      profileImageUrl: null,
      createdAt: '2022-10-18T10:18:40.365Z',
      deletedAt: null,
      signUp: true,
      companyMemberAdditionalInfoIdx: 8,
      companyLogoImageUrl: 'https://test.test.com',
      companyName: '네이버',
      companyAddress: '서울 강서구 공항대로 185',
      companyDetailAddress: '292호',
      companyZipCode: '45233',
      managerEmail: 'test@test.com',
      memberIdx: 36,
    },
    {
      isSuccess: true,
      number: 1,
      id: 'test12345',
      name: '홍길동',
      phone: '01012341234',
      profileImageUrl: null,
      createdAt: '2022-10-18T10:18:40.365Z',
      deletedAt: null,
      signUp: false,
      companyMemberAdditionalInfoIdx: 8,
      companyLogoImageUrl: 'https://test.test.com',
      companyName: '네이버',
      companyAddress: '서울 강서구 공항대로 185',
      companyDetailAddress: '292호',
      companyZipCode: '45233',
      managerEmail: 'test@test.com',
      memberIdx: 36,
    },
  ];

  const [dataArr, setDataArr] = useState<[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    console.log(page);

    const temp: any = [];
    fake.forEach((ele, idx) => {
      const arrEle = [
        ele.number,
        ele.companyName,
        ele.id,
        ele.name,
        ele.managerEmail,
        hyphenFn(ele.phone),
        ele.signUp,
        dateFormat(ele.createdAt),
        `${ele.deletedAt ? ele.deletedAt : `-`}`,
      ];
      temp.push(arrEle);
    });

    setDataArr(temp);

    // 의존성 배열에 api.get()dml data넣기.
  }, [page]);

  return (
    <StyledBody className="user-table">
      <FlexBox>
        {' '}
        <P>결과</P> <Button>엑셀 다운로드</Button>{' '}
      </FlexBox>
      {dataArr.length > 0 ? (
        <Grid
          data={dataArr}
          columns={[
            '번호',
            '기업명',
            '아이디',
            '담당자',
            '이메일',
            '전화번호',
            {
              name: '승인',
              formatter: (cell) =>
                _(
                  <select defaultValue={`${cell}`}>
                    <option value="true">승인</option>
                    <option value="false">미숭인</option>
                  </select>,
                ),
            },
            {
              name: '가입날짜',
              formatter: (cell) => _(<div className="wide">{`${cell}`}</div>),
            },
            {
              name: '탈퇴날짜',
              formatter: (cell) => _(<div className="wide">{`${cell}`}</div>),
            },
            {
              name: '',
              formatter: () =>
                _(
                  <button className="down" onClick={() => setIsDetail(true)}>
                    보기
                  </button>,
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

export default ComTable;

const StyledBody = styled.div`
  margin-top: 32px;
  min-width: 946px;
  /* width: 100%; */
  .hidden {
    visibility: hidden;
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
      background: lightgray;
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

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;
const P = styled.p``;

const Button = styled.button``;
