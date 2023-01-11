import styled from '@emotion/styled';
import React from 'react';
import colors from 'styles/colors';
import Toggle from 'rsuite/Toggle';

import { useMutation, useQuery, useQueryClient } from 'react-query';
import { api, getApi, isTokenPatchApi } from 'api';
import { AdminNoticeListResponse } from 'types/tableDataType';
import { adminDateFomat } from 'utils/calculatePackage';

type Props = {};

const AdminNoticeTable = (props: Props) => {
  const queryClient = useQueryClient();
  // 공지사항 리스트
  const { data: adminNoticeList, refetch: adminNoticeListRefetch } =
    useQuery<AdminNoticeListResponse>('adminNoticeList', () =>
      getApi(`/admin/notices`),
    );
  const { mutate: patchMutate } = useMutation(isTokenPatchApi, {
    onSuccess: () => {
      queryClient.invalidateQueries('adminNoticeList');
      // adminNoticeListRefetch();
    },
    onError: (error) => {
      console.log('토글 버튼 에러');
      console.log(error);
    },
  });

  const onClickToggle = (id: number) => {
    patchMutate({
      url: `/admin/notices/${id}/exposure`,
    });
  };
  return (
    <div>
      <Header>
        <span>결과 {adminNoticeList?.data?.notices?.length}건</span>
        <button>등록</button>
      </Header>
      <TableContatiner>
        <List className="title">
          <span className="num">번호</span>
          <span className="notice">공지사항</span>
          <span className="toggle">노출여부</span>
          <span className="date">등록일</span>
        </List>
        {adminNoticeList?.data?.notices?.map((item, index) => (
          <List key={index}>
            <span className="num">{index + 1}</span>
            <span className="notice">{item.content}</span>
            <span className="toggle">
              <Toggle
                checked={item.isVisible}
                onClick={() => onClickToggle(item.noticeIdx)}
              />
            </span>
            <span className="date">{adminDateFomat(item.createdAt)}</span>
          </List>
        ))}
      </TableContatiner>
    </div>
  );
};

export default AdminNoticeTable;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  & > span {
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    text-align: center;
    color: ${colors.main2};
  }
  & > button {
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    text-align: center;
    color: ${colors.gray2};
    padding: 3px 19px;
    border: 1px solid ${colors.gray2};
    border-radius: 2px;
  }
`;
const TableContatiner = styled.ul`
  margin-top: 8px;
`;
const List = styled.li`
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  color: ${colors.main2};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 40px;
  &.title {
    background-color: #e2e5ed;
    padding: 8px 40px;
  }
  .num {
    display: inline-block;
    width: 54px;
  }
  .notice {
    display: inline-block;
    width: 700px;
  }
  .toggle {
    display: inline-block;
    width: 84px;
  }
  .date {
    display: inline-block;
    width: 108px;
  }
`;
