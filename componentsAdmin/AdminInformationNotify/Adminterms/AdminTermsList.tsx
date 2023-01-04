import React, { useState } from 'react';
import styled from '@emotion/styled';
import AdminHeader from 'componentsAdmin/Header';
import colors from 'styles/colors';
import { AdminBtn } from 'componentsAdmin/Layout';
import AdminTermsEditor from './AdminTermsEditor';
import AdminNotifyTable from '../AdminNotifyTable';

const AdminTermsList = () => {
  const [isDetail, setIsDetail] = useState(false);
  const [detatilId, setDetailId] = useState<string>('');

  // 등록 다운로드
  const handleCommon = () => {
    setIsDetail(true);
  };
  return (
    <Wrapper>
      {isDetail && (
        <AdminTermsEditor setIsDetail={setIsDetail} detatilId={detatilId} />
      )}
      <TitleWrapper>
        <AdminHeader title="정보 수정" type="main" />
        <SubText>약관</SubText>
      </TitleWrapper>
      <AdminNotifyTable
        setDetailId={setDetailId}
        setIsDetail={setIsDetail}
        tableType={'termsList'}
        commonBtn={'등록'}
        handleCommon={handleCommon}
      />
    </Wrapper>
  );
};

export default AdminTermsList;

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
