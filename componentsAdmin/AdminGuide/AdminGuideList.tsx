import React, { useState } from 'react';
import styled from '@emotion/styled';
import AdminHeader from 'componentsAdmin/Header';
import Table from 'componentsAdmin/table';
import colors from 'styles/colors';
import { AdminBtn } from 'componentsAdmin/Layout';
import { isTokenPatchApi } from 'api';
import {
  QueryObserverResult,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import AdminGuideEditor from './AdminGuideEditor';

const AdminGuideList = () => {
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

  // 등록
  const handleCommon = () => {
    setIsDetail(true);
  };
  return (
    <Wrapper>
      {isDetail && (
        <AdminGuideEditor setIsDetail={setIsDetail} detatilId={detatilId} />
      )}
      <TitleWrapper>
        <AdminHeader title="정보 수정" type="main" />
        <SubText>가이드</SubText>
      </TitleWrapper>
      <Table
        setDetailId={setDetailId}
        setIsDetail={setIsDetail}
        tableType={''}
        commonBtn={'등록'}
        handleCommon={handleCommon}
        onClickToggle={onClickToggle}
      />
    </Wrapper>
  );
};

export default AdminGuideList;

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
