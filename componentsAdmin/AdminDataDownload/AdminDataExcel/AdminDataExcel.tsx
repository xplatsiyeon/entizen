import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import colors from 'styles/colors';
import AdminHeader from 'componentsAdmin/Header';
import { excelDownloadFile } from 'hooks/excelDown';

type Props = {
  setNowHeight?: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const AdminDataExcel = ({ setNowHeight }: Props) => {
  const [isDetail, setIsDetail] = useState(false);
  const [detatilId, setDetailId] = useState<string>('');
  const accessToken = JSON.parse(sessionStorage.getItem('ADMIN_ACCESS_TOKEN')!);
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
    // console.log('detatilId==>>', detatilId);
  }, [detatilId]);

  return (
    <Wrapper>
      <AdminHeader
        type="main"
        title="DATA 다운로드"
        // subTitle="관리자 리스트 조회"
      />
      <DownloadContainer>
        <List>
          <Label>엑셀 수익 예측 기록 다운로드</Label>
          <Btn
            onClick={() => {
              excelDownloadFile(
                '/admin/simulations/charge/histories/excel',
                accessToken,
              );
            }}
          >
            다운로드
          </Btn>
        </List>
        <List>
          <Label>엑셀 간편 견적 예상 기록 다운로드</Label>
          <Btn
            onClick={() => {
              excelDownloadFile(
                '/admin/simulations/quotation-prediction/histories/excel',
                accessToken,
              );
            }}
          >
            다운로드
          </Btn>
        </List>
      </DownloadContainer>
    </Wrapper>
  );
};

export default AdminDataExcel;

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
  border-radius: 6px;
  background: #464646;
  border: none;
  color: ${colors.lightWhite};
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  &:hover {
    background-color: #5221cb;
  }
`;

const DownloadContainer = styled.ul`
  /* border: 2px solid ${colors.lightGray5};
  border-radius: 4px; */
  padding: 26px 0px;
`;

const List = styled.li`
  display: flex;
  align-items: center;
  :not(:nth-last-of-type(1)) {
    margin-bottom: 14px;
  }
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  color: ${colors.main2};
  width: 220px;
  margin-right: 37px;
`;
const Contents = styled.span<{ approve?: boolean }>`
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  color: ${({ approve }) => (approve === true ? '#F75015' : `${colors.main2}`)};
  font-weight: ${({ approve }) => approve && '700'};
`;
