import React, { useState } from 'react';
import styled from '@emotion/styled';
import { isTokenAdminGetApi, isTokenAdminPatchApi } from 'api';
import AdminHeader from 'componentsAdmin/Header';
import AdminNoticeEditor, { NoticeDetail } from './AdminNoticeEditor';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import AdminNoticeTable from './AdminNoticeTable';

type Props = {
  setNowHeight?: React.Dispatch<React.SetStateAction<number | undefined>>;
  setNumber: React.Dispatch<React.SetStateAction<number>>;
};

export type NewCell = {
  isVisible: boolean;
  id: number;
};

const AdminNoticeList = ({ setNowHeight, setNumber }: Props) => {
  // 공지사항 에디터 데이터 api
  const { data, isLoading, isError, refetch, remove } = useQuery<NoticeDetail>(
    'adminNoticeDetail',
    () => isTokenAdminGetApi(`/admin/notices/${detatilId}`),
  );

  // 등록, 추가, 삭제 했을때 리스트 페이지로 이동 할거임
  const [changeNumber, setChangeNumber] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [detatilId, setDetailId] = useState<string>('');
  const queryClient = useQueryClient();

  // /admin/notices/:noticeIdx/exposure 토글 버튼 수정
  const { mutate: patchMutate } = useMutation(isTokenAdminPatchApi, {
    onSuccess: () => {
      queryClient.invalidateQueries('adminNoticeList');
    },
    onError: (error) => {},
  });

  // 등록
  const handleCommon = () => {
    setIsDetail(true);
    setDetailId('');
    remove();
  };

  return (
    <Wrapper>
      {isDetail && (
        <AdminNoticeEditor
          setIsDetail={setIsDetail}
          detatilId={detatilId}
          setChangeNumber={setChangeNumber}
        />
      )}
      <TitleWrapper>
        <AdminHeader title="정보 수정" type="main" />
        <SubText>공지사항</SubText>
      </TitleWrapper>
      <AdminNoticeTable
        handleCommon={handleCommon}
        setDetailId={setDetailId}
        setIsDetail={setIsDetail}
      />
    </Wrapper>
  );
};

export default React.memo(AdminNoticeList);

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
