import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import AdminHeader from 'componentsAdmin/Header';
import colors from 'styles/colors';
import { AdminBtn } from 'componentsAdmin/Layout';
import AdminNoticeEditor from './AdminNoticeEditor';
import { isTokenPatchApi } from 'api';
import {
  QueryObserverResult,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import AdminNotifyTable from '../AdminNotifyTable';

export type NewCell = {
  isVisible: boolean;
  id: number;
};

const AdminNoticeList = () => {
  const [isDetail, setIsDetail] = useState(false);
  const [detatilId, setDetailId] = useState<string>('');
  const [toggle, setToggle] = useState<NewCell>({
    isVisible: true,
    id: 0,
  });
  const queryClient = useQueryClient();

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

  useEffect(() => {
    if (toggle?.id) {
      patchMutate({
        url: `/admin/notices/${toggle?.id}/exposure`,
      });
    }
  }, [toggle]);

  // 등록
  const handleCommon = () => {
    setIsDetail(true);
  };

  console.log('🎀toggle.isVisible🎀', toggle.isVisible);
  return (
    <Wrapper>
      {isDetail && (
        <AdminNoticeEditor setIsDetail={setIsDetail} detatilId={detatilId} />
      )}
      <TitleWrapper>
        <AdminHeader title="정보 수정" type="main" />
        <SubText>공지사항</SubText>
      </TitleWrapper>
      <AdminNotifyTable
        setDetailId={setDetailId}
        setIsDetail={setIsDetail}
        tableType={'adminNoticeList'}
        commonBtn={'등록'}
        handleCommon={handleCommon}
        setToggle={setToggle}
        toggle={toggle}
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
