import styled from '@emotion/styled';
import React, { Dispatch, SetStateAction, useState } from 'react';
import Pagination from 'rsuite/Pagination';
import colors from 'styles/colors';
import right_pagnation_icon from 'public/images/right_pagnation_icon.svg';
import left_pagnation_icon from 'public/images/left_pagnation_icon.svg';
import Image from 'next/image';

type Props = {
  list: any[];
  limit: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  total: number;
};

export default function PaginationCompo({
  list,
  limit,
  page,
  setPage,
  total,
}: Props) {
  console.log(total);
  return (
    <Wrap>
      {/* 0~9, 10~19, 20~29 이런식으로 짤라줌 */}
      {/* {list.slice(offset, offset + limit).map((el, index) => (
        <div key={index}>{el}</div>
      ))} */}
      <PagenationStyle
        // first
        // last
        prev={
          <Arrow>
            <Image src={left_pagnation_icon} />
          </Arrow>
        }
        next={
          <Arrow>
            <Image src={right_pagnation_icon} />
          </Arrow>
        }
        size="lg"
        total={total / 2}
        limit={10}
        activePage={page}
        onChangePage={setPage}
      />
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PagenationStyle = styled(Pagination)`
  /* 화살표 */
  .rs-pagination-symbol {
    color: red;
  }
  /* 버튼 */
  .rs-pagination-btn {
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 700;
    font-size: 10.5pt;
    line-height: 12pt;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  /* 선택 */
  .rs-pagination-btn-active {
    color: ${colors.lightWhite};
    background: ${colors.main1};
    border: none;
    :focus {
      color: ${colors.lightWhite};
      background: ${colors.main1};
      border: none;
    }
  }
  /* rs-pagination-btn rs-pagination-btn-active" */
`;
const Arrow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 21pt;
  height: 21pt;
  /* Sub3 */

  background: #ffffff;
  /* Sub2 */

  border: 1px solid #e2e5ed;
  border-radius: 4px;
`;
