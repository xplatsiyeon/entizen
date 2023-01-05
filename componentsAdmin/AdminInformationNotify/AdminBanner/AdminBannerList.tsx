import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import AdminHeader from 'componentsAdmin/Header';
import colors from 'styles/colors';
import { AdminBtn } from 'componentsAdmin/Layout';
import { isTokenPatchApi, isTokenGetApi } from 'api';
import {
  QueryObserverResult,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import AdminBannerEditor from './AdminBannerEditor';
import { NewCell } from 'componentsAdmin/AdminInformationNotify/AdminNotice/AdminNoticeList';
import AdminNotifyTable from '../AdminNotifyTable';
import { AdminBannerDetailResponse } from 'types/tableDataType';

type Props = {
  setNowHeight?: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const AdminBannerLIst = ({ setNowHeight }: Props) => {
  const queryClient = useQueryClient();
  const [isDetail, setIsDetail] = useState(false);
  const [detatilId, setDetailId] = useState<string>('');
  const userTypeEn = ['USER', 'COMPANY'];
  const userType = ['일반회원', '기업회원 '];
  const [userNum, setUserNum] = useState(0);
  const [toggle, setToggle] = useState<NewCell>({
    isVisible: true,
    id: 0,
  });

  const { data, isLoading, isError, refetch, remove } =
    useQuery<AdminBannerDetailResponse>('bannerDetail', () =>
      isTokenGetApi(`/admin/banners/${detatilId}`),
    );

  // 등록
  const handleCommon = () => {
    setIsDetail(true);
  };

  // 토글 버튼 백엔드에 보내는 함수(User)
  const { mutate: patchUserMutate } = useMutation(isTokenPatchApi, {
    onSuccess: () => {
      queryClient.invalidateQueries('bannerList');
    },
    onError: (error) => {
      console.log('토글 버튼 에러');
      console.log(error);
    },
  });

  useEffect(() => {
    if (toggle?.id) {
      patchUserMutate({
        url: `/admin/banners/${toggle.id}/exposure`,
      });
    }
  }, [toggle]);

  useEffect(() => {
    if (isDetail === false) {
      setDetailId('');
      remove();
    }
  }, [isDetail]);

  useEffect(() => {
    if (setNowHeight) {
      setNowHeight(window.document.documentElement.scrollHeight);
    }
  }, []);

  return (
    <Wrapper>
      {isDetail && (
        <AdminBannerEditor setIsDetail={setIsDetail} detatilId={detatilId} />
      )}
      <TitleWrapper>
        <AdminHeader title="정보 수정" type="main" />
        <SubText>배너</SubText>
      </TitleWrapper>
      <UserList>
        {userType.map((item, idx) => (
          <>
            <UserText
              key={idx}
              onClick={() => {
                setUserNum(idx);
              }}
              userNum={userNum}
              idx={idx}
            >
              {item}
            </UserText>
            <TextUnderLine userNum={userNum} isDetail={isDetail} />
          </>
        ))}
      </UserList>
      <UnderLine />
      {userNum === 0 && (
        <AdminNotifyTable
          setDetailId={setDetailId}
          setIsDetail={setIsDetail}
          tableType={'bannerList'}
          commonBtn={'등록'}
          handleCommon={handleCommon}
          setToggle={setToggle}
          toggle={toggle}
          userType={userTypeEn[userNum]}
        />
      )}
      {userNum === 1 && (
        <AdminNotifyTable
          setDetailId={setDetailId}
          setIsDetail={setIsDetail}
          tableType={'bannerList'}
          commonBtn={'등록'}
          handleCommon={handleCommon}
          setToggle={setToggle}
          toggle={toggle}
          userType={userTypeEn[userNum]}
        />
      )}
    </Wrapper>
  );
};

export default AdminBannerLIst;

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

const UserList = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  padding-left: 8px;
`;

const UserText = styled.div<{ userNum: number; idx: number }>`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 16px;
  font-weight: 500;
  line-height: 150%;
  color: ${({ userNum, idx }) => (userNum === idx ? '#222222' : '#747780')};
  cursor: pointer;
`;

const UnderLine = styled.div`
  width: 100%;
  height: 4px;
  background-color: #e2e5ed;
`;

const TextUnderLine = styled.div<{ userNum: number; isDetail: boolean }>`
  position: absolute;
  z-index: 10;
  width: 76px;
  height: 4px;
  background-color: #464646;
  margin-top: 27px;
  left: ${({ userNum }) => (userNum === 0 ? '0' : '80px')};
  display: ${({ isDetail }) => (isDetail ? 'none' : '')};
`;
