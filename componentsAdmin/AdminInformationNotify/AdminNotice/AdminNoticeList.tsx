import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { getApi } from 'api';
import AdminHeader from 'componentsAdmin/Header';
import colors from 'styles/colors';
import { AdminBtn } from 'componentsAdmin/Layout';
import AdminNoticeEditor, { NoticeDetail } from './AdminNoticeEditor';
import { isTokenPatchApi, isTokenGetApi } from 'api';
import {
  QueryObserverResult,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import AdminNotifyTable from '../AdminNotifyTable';
import { AdminNoticeListResponse } from 'types/tableDataType';

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
    () => isTokenGetApi(`/admin/notices/${detatilId}`),
  );

  // 공지사항 리스트 api
  const { data: adminNoticeList, refetch: adminNoticeListRefetch } =
    useQuery<AdminNoticeListResponse>('adminNoticeList', () =>
      getApi(`/admin/notices`),
    );

  // 등록, 추가, 삭제 했을때 리스트 페이지로 이동 할거임
  const [changeNumber, setChangeNumber] = useState(false);
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
      adminNoticeListRefetch();
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
    setDetailId('');
    remove();
  };

  useEffect(() => {
    if (setNowHeight) {
      setNowHeight(window.document.documentElement.scrollHeight);
    }
  }, []);

  // 등록, 추가, 삭제 했을때 리스트 페이지로 넘길거임
  useEffect(() => {
    if (changeNumber) {
      setNumber(15);
      sessionStorage.setItem('number', '15');
    }
  }, [changeNumber]);

  // console.log('🎀toggle.isVisible🎀', toggle.isVisible);
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
