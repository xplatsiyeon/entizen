import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import AdminHeader from 'componentsAdmin/Header';
import Table from 'componentsAdmin/table';
import colors from 'styles/colors';
import { AdminBtn } from 'componentsAdmin/Layout';
import AdminFAQEditor from './AdminFAQEditor';
import { isTokenPatchApi } from 'api';
import { NewCell } from 'componentsAdmin/AdminNotice/AdminNoticeList';
import {
  QueryObserverResult,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';

export const ServiceKr: string[] = ['서비스 이용', '회원정보', '신고'];
export const ServiceEn: string[] = ['MEMBER', 'SERVICE', 'REPORT'];

const AdminFAQList = () => {
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
    },
    onError: (error) => {
      console.log('토글 버튼 에러');
      console.log(error);
    },
  });

  useEffect(() => {
    patchMutate({
      url: `/admin/faqs/${toggle?.id}/exposure`,
    });
  }, [toggle]);

  // 등록
  const handleCommon = () => {
    setIsDetail(true);
  };
  return (
    <Wrapper>
      {isDetail && (
        <AdminFAQEditor setIsDetail={setIsDetail} detatilId={detatilId} />
      )}
      <TitleWrapper>
        <AdminHeader title="정보 수정" type="main" />
        <SubText>FAQ</SubText>
      </TitleWrapper>
      <Table
        setDetailId={setDetailId}
        setIsDetail={setIsDetail}
        tableType={'adminFaqList'}
        commonBtn={'등록'}
        handleCommon={handleCommon}
        setToggle={setToggle}
        toggle={toggle}
      />
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
