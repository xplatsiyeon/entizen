import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import colors from 'styles/colors';
import AdminHeader from 'componentsAdmin/Header';
import AdimAccountListTable from './AdimAccountListTable';
import AdimDetail from './AdimDetail';

type Props = {
  setNowHeight?: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const AdminAccountList = ({ setNowHeight }: Props) => {
  const [isDetail, setIsDetail] = useState(false);
  const [detatilId, setDetailId] = useState<string>('');
  // 엑셀 다운로드 버튼
  const handleCommon = () => {
    alert('개발중입니다.');
  };

  useEffect(() => {
    if (setNowHeight) {
      setNowHeight(window.document.documentElement.scrollHeight);
    }
  }, []);

  useEffect(() => {
    console.log('detatilId==>>', detatilId);
  }, [detatilId]);

  return (
    <Wrapper>
      {isDetail && (
        <AdimDetail setIsDetail={setIsDetail} detatilId={detatilId} />
      )}
      <AdminHeader
        type="main"
        title="관리자 관리"
        subTitle="관리자 리스트 조회"
      />
      <AdimAccountListTable
        setDetailId={setDetailId}
        setIsDetail={setIsDetail}
        tableType={'adminAccountList'}
        hide={true}
        handleCommon={handleCommon}
      />
    </Wrapper>
  );
};

export default AdminAccountList;

const Wrapper = styled.div`
  padding-left: 18pt;
`;

const Line = styled.div`
  width: 946px;
  height: 2px;
`;

const Manager = styled.ul`
  border-top: 2px solid #464646;
  border-bottom: 2px solid #e7e7e7;
  padding: 20px 0;
  li {
    /* gap: 7.5pt; */
    display: flex;
    align-items: center;
    background: #ffffff;
    /* border: 1px solid ${colors.lightWhite3}; */
    height: 30pt;
    padding: 4pt 0 4pt 12pt;
    width: 100%;
  }
  .searchInput {
    border: 1px solid ${colors.lightWhite3};
    height: 100%;
    width: 274.5pt;
    padding-left: 10px;
  }
  .row {
    width: 946px;
  }
  .label {
    min-width: 94px;
    margin-right: 24px;
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    color: ${colors.main2};
  }
  .checkBoxContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    margin-right: 16px;
  }
  .checkBox {
    width: 16px;
    height: 16px;
  }
`;

const BtnBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;
const Btn = styled.button`
  padding: 5px 19px;
  background: #464646;
  border: none;
  color: ${colors.lightWhite};
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
`;
