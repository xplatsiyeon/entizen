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
  setIsDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setDetailId: React.Dispatch<React.SetStateAction<string>>;
  handleCommon: () => void;
  userType?: string;
};

const AdminBannerTable = ({
  setIsDetail,
  setDetailId,
  handleCommon,
  userType,
}: Props) => {
  const queryClient = useQueryClient();
  const limit = 10;
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  // 공지사항 리스트
  const { data: bannerList } = useQuery<AdminBannerListResponse>(
    'bannerList',
    () => isTokenAdminGetApi(`/admin/banners?targetMemberType=${userType}`),
  );
  const { mutate: patchMutate } = useMutation(isTokenAdminPatchApi, {
    onSuccess: () => {
      queryClient.invalidateQueries('bannerList');
    },
    onError: (error) => {
      // console.log('토글 버튼 에러');
      // console.log(error);
    },
  });

  const onClickToggle = (id: number) => {
    patchMutate({
      url: `/admin/banners/${id}/exposure`,
    });
  };
  return (
    <Wrapper>
      <Header>
        <span>결과 {bannerList?.data?.banners?.length}건</span>
        <button
          onClick={() => {
            handleCommon();
          }}
        >
          등록
        </button>
      </Header>
      <TableContatiner>
        <List className="title">
          <span className="num">번호</span>
          <span className="banner">배너명</span>
          <span className="toggle">노출여부</span>
          <span className="date">등록일</span>
          <button className="detailBtn">보기</button>
        </List>

        {bannerList?.data?.banners
          ?.slice(offset, offset + limit)
          .map((item, index) => (
            <List key={index}>
              <span className="num">{page * 10 - 10 + (index + 1)}</span>
              <span className="banner">{item.title}</span>
              <span className="toggle">
                <Toggle
                  checked={item.isVisible}
                  onClick={() => onClickToggle(item.bannerIdx)}
                />
              </span>
              <span className="date">{adminDateFomat(item.createdAt)}</span>
              <button
                className="detailBtn"
                onClick={() => {
                  setDetailId(item.bannerIdx.toString());
                  setIsDetail(true);
                }}
              >
                보기
              </button>
            </List>
          ))}
      </TableContatiner>
      <WrapPage>
        <Pagination
          prev
          next
          size="md"
          total={bannerList ? bannerList?.data?.banners?.length : 0}
          limit={10}
          maxButtons={5}
          activePage={page}
          onChangePage={setPage}
        />
      </WrapPage>
    </Wrapper>
  );
};

export default AdminBannerTable;

const Wrapper = styled.div`
  padding-top: 16px;
`;

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
  min-height: 490px;
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
    background-color: lightgray;
    padding: 8px 40px;
  }
  &.title > .detailBtn {
    visibility: hidden;
  }
  .num {
    display: inline-block;
    width: 54px;
  }
  .banner {
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
  .detailBtn {
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    text-align: center;
    color: ${colors.gray2};
    padding: 3px 19px;
    background: #e2e5ed;
    border: 1px solid ${colors.gray2};
    border-radius: 2px;
  }
`;
const WrapPage = styled.div`
  margin: 50px auto;

  .rs-pagination-group {
    justify-content: center;
  }

  .rs-pagination-btn {
    color: lightgrey;
    border: none;
    &.rs-pagination-btn-active {
      color: black;
      &:focus {
        color: black;
      }
    }
  }
`;
