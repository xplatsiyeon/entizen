import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import AdminHeader from 'componentsAdmin/Header';
import { getApi } from 'api';
import AdminFAQEditor, { FaqsUpdate } from './AdminFAQEditor';
import { isTokenGetApi, isTokenPatchApi } from 'api';
import { NewCell } from 'componentsAdmin/AdminInformationNotify/AdminNotice/AdminNoticeList';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AdminFAQListResponse } from 'types/tableDataType';
import AdminFAQTable from './AdminFAQTable';

export const ServiceKr: string[] = ['서비스 이용', '회원정보', '신고'];
export const ServiceEn: string[] = ['MEMBER', 'SERVICE', 'REPORT'];

type Props = {
  setNowHeight?: React.Dispatch<React.SetStateAction<number | undefined>>;
  setNumber: React.Dispatch<React.SetStateAction<number>>;
};

const AdminFAQList = ({ setNowHeight, setNumber }: Props) => {
  // FAQ 에디터 데이터 불러오는 api
  const { data, isLoading, isError, refetch, remove } = useQuery<FaqsUpdate>(
    'adminFaqsDetail',
    () => isTokenGetApi(`/admin/faqs/${detatilId}`),
  );

  // FAQ 리스트 불러오는 api
  const { data: adminFaqList, refetch: adminFaqListRefetch } =
    useQuery<AdminFAQListResponse>('adminFaqList', () => getApi(`/admin/faqs`));

  // 등록, 추가, 삭제 했을때 리스트 페이지로 이동 할거임
  const [changeNumber, setChangeNumber] = useState(false);
  const userTypeEn = ['USER', 'COMPANY'];
  const userType = ['일반회원', '기업회원 '];
  const [userNum, setUserNum] = useState(0);
  const queryClient = useQueryClient();
  const [isDetail, setIsDetail] = useState(false);
  const [detatilId, setDetailId] = useState<string>('');
  const [toggle, setToggle] = useState<NewCell>({
    isVisible: true,
    id: 0,
  });

  // /admin/faqs/:faqIdx/exposure 토글 버튼 수정
  const { mutate: patchMutate } = useMutation(isTokenPatchApi, {
    onSuccess: () => {
      queryClient.invalidateQueries('adminFaqList');
      adminFaqListRefetch();
    },
    onError: (error) => {
      console.log('토글 버튼 에러');
      console.log(error);
    },
  });

  useEffect(() => {
    if (toggle?.id) {
      patchMutate({
        url: `/admin/faqs/${toggle?.id}/exposure`,
      });
    }
  }, [toggle]);

  useEffect(() => {
    if (setNowHeight) {
      setNowHeight(window.document.documentElement.scrollHeight);
    }
  }, []);

  // 등록 (editor에 담겨 있던 값을 reset 해줌)
  const handleCommon = () => {
    setIsDetail(true);
    setDetailId('');
    remove();
  };

  // 등록, 추가, 삭제 했을때 리스트 페이지로 넘길거임
  useEffect(() => {
    if (changeNumber) {
      setNumber(17);
      sessionStorage.setItem('number', '17');
    }
  }, [changeNumber]);
  return (
    <Wrapper>
      {isDetail && (
        <AdminFAQEditor
          setIsDetail={setIsDetail}
          detatilId={detatilId}
          setChangeNumber={setChangeNumber}
        />
      )}
      <TitleWrapper>
        <AdminHeader title="정보 수정" type="main" />
        <SubText>FAQ</SubText>
      </TitleWrapper>
      <UserList>
        {userType.map((item, idx) => (
          <React.Fragment key={idx}>
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
          </React.Fragment>
        ))}
      </UserList>
      <UnderLine />
      {/* 일반회원 리스트 */}
      {userNum === 0 && (
        <AdminFAQTable
          setDetailId={setDetailId}
          setIsDetail={setIsDetail}
          handleCommon={handleCommon}
          userType={userTypeEn[userNum]}
        />
      )}
      {/* 기업회원 리스트 */}
      {userNum === 1 && (
        <AdminFAQTable
          setDetailId={setDetailId}
          setIsDetail={setIsDetail}
          handleCommon={handleCommon}
          userType={userTypeEn[userNum]}
        />
      )}
    </Wrapper>
  );
};

export default AdminFAQList;

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
