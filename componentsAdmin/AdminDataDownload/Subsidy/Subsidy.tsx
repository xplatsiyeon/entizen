import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import AdminHeader from 'componentsAdmin/Header';
import { isTokenAdminGetApi } from 'api';
import { useQuery, useQueryClient } from 'react-query';
import colors from 'styles/colors';
import { NewCell } from 'componentsAdmin/AdminInformationNotify/AdminNotice/AdminNoticeList';
import { AdminBannerDetailResponse } from 'types/tableDataType';
import { useDispatch } from 'react-redux';
import { adminPageNumberAction } from 'storeAdmin/adminPageNumberSlice';

type Props = {
  setNowHeight?: React.Dispatch<React.SetStateAction<number | undefined>>;
  setNumber: React.Dispatch<React.SetStateAction<number>>;
};

const Subsidy = ({ setNowHeight, setNumber }: Props) => {
  const dispatch = useDispatch();

  // 등록, 추가, 삭제 했을때 리스트 페이지로 이동 할거임
  const [changeNumber, setChangeNumber] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [detatilId, setDetailId] = useState<string>('');

  const [sendUserType, setSendUserType] = useState<string>('');

  const { data, isLoading, isError, refetch, remove } =
    useQuery<AdminBannerDetailResponse>('bannerDetail', () =>
      isTokenAdminGetApi(`/admin/banners/${detatilId}`),
    );

  // 등록
  const handleCommon = () => {
    setIsDetail(true);
  };

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

  // 등록, 추가, 삭제 했을때 리스트 페이지로 넘길거임
  useEffect(() => {
    if (changeNumber) {
      // bannerListRefetch();
      dispatch(adminPageNumberAction.setIsAdminPage(16));
    }
  }, [changeNumber]);

  return (
    <Wrapper>
      <TitleWrapper>
        <TitleBox>
          <AdminHeader title="DATA 다운로드" type="main" />
          <SubText>보조금</SubText>
        </TitleBox>
        <ExelButton
          onClick={() => {
            handleCommon();
          }}
        >
          엑셀 업로드
        </ExelButton>
      </TitleWrapper>

      {/* <UnderLine /> */}
    </Wrapper>
  );
};

export default Subsidy;

const Wrapper = styled.div`
  width: 100%;
  margin: 0 18pt;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: baseline;
`;

const SubText = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 16px;
  color: #000000;
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

const ExelButton = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  text-align: center;
  background-color: #747780;
  color: white;
  padding: 3px 13px;
  border: 1px solid ${colors.gray2};
  border-radius: 2px;
  height: 28px;
  margin-top: 60pt;
`;
