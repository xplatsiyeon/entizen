import styled from '@emotion/styled';
import React, { useState } from 'react';
import colors from 'styles/colors';
import Toggle from 'rsuite/Toggle';

import { useMutation, useQuery, useQueryClient } from 'react-query';
import { isTokenAdminGetApi, isTokenAdminPatchApi } from 'api';
import { AdminBannerListResponse } from 'types/tableDataType';
import { adminDateFomat } from 'utils/calculatePackage';
import { Pagination } from 'rsuite';

type Props = {
  handleCommon: () => void;
};

const IncomeSimulTable = ({ handleCommon }: Props) => {
  const queryClient = useQueryClient();
  const limit = 10;
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const Row = [
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

  const UnderRow = [
    '도보급등률',
    '인당 개인소득',
    '평균연령',
    '인구이동량',
    '인구 및 인구밀도',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

  // 공지사항 리스트
  //   const { data: bannerList } = useQuery<AdminBannerListResponse>(
  //     'bannerList',
  //     () => isTokenAdminGetApi(`/admin/banners?targetMemberType=${userType}`),
  //   );
  //   const { mutate: patchMutate } = useMutation(isTokenAdminPatchApi, {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries('bannerList');
  //     },
  //     onError: (error) => {
  //       console.log('토글 버튼 에러');
  //       console.log(error);
  //     },
  //   });

  //   const onClickToggle = (id: number) => {
  //     patchMutate({
  //       url: `/admin/banners/${id}/exposure`,
  //     });
  //   };
  return (
    <Wrapper>
      <TableWrapper>
        <TableThead>
          <TableTR>
            <FirstTD />
            <TableLocationTD style={{ background: '#f3f4f7' }}>
              A
            </TableLocationTD>
            {Row.map((item, idx) => (
              <TableTopTD key={idx}>{item}</TableTopTD>
            ))}
          </TableTR>
        </TableThead>
        <TableTbody>
          <TableTR>
            <TableTH>왼쪽</TableTH>
            <TableLocationTD>1</TableLocationTD>
            <TableTD>2</TableTD>
            <TableTD>3</TableTD>
            <TableTD>4</TableTD>
          </TableTR>
          <TableTR>
            <TableTH>왼쪽</TableTH>
            <TableLocationTD>1</TableLocationTD>
            <TableTD>2</TableTD>
            <TableTD>3</TableTD>
            <TableTD>4</TableTD>
          </TableTR>
          <TableTR>
            <TableTH>왼쪽</TableTH>
            <TableLocationTD>1</TableLocationTD>
            <TableTD>2</TableTD>
            <TableTD>3</TableTD>
            <TableTD>4</TableTD>
          </TableTR>
          <TableTR>
            <TableTH>왼쪽</TableTH>
            <TableLocationTD>1</TableLocationTD>
            <TableTD>2</TableTD>
            <TableTD>3</TableTD>
            <TableTD>4</TableTD>
          </TableTR>
        </TableTbody>
        <TableThead>
          <TableTR>
            <FirstTD />
            <TableLocationTD
              style={{ background: '#f3f4f7' }}
            ></TableLocationTD>
            {UnderRow.map((item, idx) => (
              <TableUnderTD key={idx}>{item}</TableUnderTD>
            ))}
          </TableTR>
        </TableThead>
      </TableWrapper>
    </Wrapper>
  );
};

export default IncomeSimulTable;

const Wrapper = styled.div`
  width: 945px;
  height: 640px;
  overflow-x: scroll;
  overflow-y: scroll;
  padding-top: 16px;
  border: 1px solid red;

  ::-webkit-scrollbar {
    width: 10px;
    border: 1px solid red;
  }
  ::-webkit-scrollbar-track {
    background-color: darkgrey;
  }
  ::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
`;

const TableWrapper = styled.table`
  border: 1px solid #e2e5ed;
`;

const TableTbody = styled.tbody``;

const TableTH = styled.th`
  border: 1px solid #e2e5ed;
  width: 37px;
  text-align: center;
  background-color: #f3f4f7;
`;

const TableThead = styled.thead`
  /* width: 945px; */
  height: 32px;
  border: 1px solid #e2e5ed;
`;

const TableTR = styled.tr`
  background-color: #f3f4f7;
`;

const TableLocationTD = styled.td`
  width: 116px;
  text-align: center;
  border-right: 1px solid #e2e5ed;
  background-color: white;
  :first-child {
    border-left: 1px solid #e2e5ed;
  }
  :not(:last-child) {
    border-bottom: 1px solid #e2e5ed;
  }
`;

const TableTD = styled.td`
  width: 80px;
  text-align: center;
  padding-top: 8px;
  background-color: white;
  :first-child {
    border-left: 1px solid #e2e5ed;
  }
  border-bottom: 1px solid #e2e5ed;
  border-right: 1px solid #e2e5ed;
`;

const TableTopTD = styled.td`
  min-width: 80px;
  text-align: center;
  /* padding-top: 8px; */
  padding: 8px 10px 0 10px;
  background-color: #f3f4f7;
  :first-child {
    border-left: 1px solid #e2e5ed;
  }
  border-bottom: 1px solid #e2e5ed;
  border-right: 1px solid #e2e5ed;
`;

const TableUnderTD = styled.td`
  width: 80px;
  text-align: center;
  padding-top: 8px;
  background-color: #f3f4f7;
  :first-child {
    border-left: 1px solid #e2e5ed;
  }
  border-bottom: 1px solid #e2e5ed;
  border-right: 1px solid #e2e5ed;
`;

const FirstTD = styled.td`
  width: 65px;
  height: 37px;
  background-color: #e2e5ed;
`;

const TableHeadTD = styled.td`
  :not(:last-child) {
    border-right: 1px solid #e2e5ed;
  }
`;
