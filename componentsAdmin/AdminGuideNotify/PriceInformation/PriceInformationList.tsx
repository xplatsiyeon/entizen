import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import AdminHeader from 'componentsAdmin/Header';
import colors from 'styles/colors';
import { AdminBtn } from 'componentsAdmin/Layout';
// import AdminTermsEditor, { TermsUpdate } from './AdminTermsEditor';
// import AdminNotifyTable from '../AdminNotifyTable';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { isTokenAdminGetApi } from 'api';
import { useDispatch } from 'react-redux';
import { adminPageNumberAction } from 'storeAdmin/adminPageNumberSlice';
import AdminGuideNotifyTable from '../AdminGuideNotifyTable';
import PlatformInformationEditor, {
  GuideUpdate,
} from './PriceInformationEditor';

type Props = {
  setNowHeight?: React.Dispatch<React.SetStateAction<number | undefined>>;
  setNumber: React.Dispatch<React.SetStateAction<number>>;
};

const PriceInformationList = ({ setNowHeight, setNumber }: Props) => {
  const dispatch = useDispatch();
  const { data, isLoading, isError, refetch, remove } = useQuery<GuideUpdate>(
    'adminGuideDetail',
    () => isTokenAdminGetApi(`/admin/guides/${detatilId}`),
  );

  const [isDetail, setIsDetail] = useState(false);
  const [detatilId, setDetailId] = useState<string>('');

  // 등록, 추가, 삭제 했을때 리스트 페이지로 이동 할거임
  const [changeNumber, setChangeNumber] = useState(false);

  // 등록 다운로드
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
      dispatch(adminPageNumberAction.setIsAdminPage(34));
    }
  }, [changeNumber]);

  return (
    <Wrapper>
      {isDetail && (
        <PlatformInformationEditor
          setIsDetail={setIsDetail}
          detatilId={detatilId}
          setChangeNumber={setChangeNumber}
        />
      )}
      <TitleWrapper>
        <AdminHeader title="가이드 수정" type="main" />
        <SubText>요금 정보</SubText>
      </TitleWrapper>
      <AdminGuideNotifyTable
        setDetailId={setDetailId}
        setIsDetail={setIsDetail}
        tableType={'guideList'}
        commonBtn={'등록'}
        handleCommon={handleCommon}
        guideKind={'FEE'}
        dataLength={4}
      />
    </Wrapper>
  );
};

export default PriceInformationList;

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
