import React, { useState } from 'react';
import styled from '@emotion/styled';
import AdminHeader from 'componentsAdmin/Header';
import Table from 'componentsAdmin/table';
import colors from 'styles/colors';
import { AdminBtn } from 'componentsAdmin/Layout';
import AdminNoticeEditor from './AdminNoticeEditor';
import {
  isTokenGetApi,
  multerApi,
  isTokenPostApi,
  isTokenPutApi,
  isTokenPatchApi,
  isTokenDeleteApi,
} from 'api';
import {
  QueryObserverResult,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';

const AdminNoticeList = () => {
  const [isDetail, setIsDetail] = useState(false);
  const [detatilId, setDetailId] = useState<string>('');
  const [toggle, setToggle] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const clickedToggle = () => {
    setToggle((prev) => !prev);
  };
  // /admin/notices/:noticeIdx/exposure 토글 버튼 수정
  const { mutate: patchMutate } = useMutation(isTokenPatchApi, {
    onSuccess: () => {
      queryClient.invalidateQueries('adminNoticeList');
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

  // 등록 다운로드
  const handleCommon = () => {
    setIsDetail(true);
  };
  return (
    <Wrapper>
      {isDetail && (
        <AdminNoticeEditor setIsDetail={setIsDetail} detatilId={detatilId} />
      )}
      <TitleWrapper>
        <AdminHeader title="정보 수정" type="main" />
        <SubText>공지사항</SubText>
      </TitleWrapper>
      <Table
        setDetailId={setDetailId}
        setIsDetail={setIsDetail}
        tableType={'adminNoticeList'}
        commonBtn={'등록'}
        handleCommon={handleCommon}
        onClickToggle={onClickToggle}
      />
    </Wrapper>
  );
};

export default AdminNoticeList;

const Wrapper = styled.div`
  width: 100%;
  margin: 0 18pt;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: baseline;
`;

const SubText = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 16px;
  color: #000000;
  margin-top: 60pt;
  margin-bottom: 12pt;
  font-weight: 500;
`;

const Manager = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  label {
    padding-right: 39.75pt;
  }
  li {
    gap: 7.5pt;
    display: flex;
    align-items: center;
    background: #ffffff;
    border: 1px solid ${colors.lightWhite3};
    height: 30pt;
    padding: 4pt 0 4pt 12pt;
    width: 100%;
  }
  .searchInput {
    border: 1px solid ${colors.lightWhite3};
    height: 100%;
    width: 274.5pt;
  }
  .search {
    width: 946px;
  }
`;
