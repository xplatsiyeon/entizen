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
import IncomeSimulTable from './IncomeSimulTable';

type Props = {
  setNowHeight?: React.Dispatch<React.SetStateAction<number | undefined>>;
  setNumber: React.Dispatch<React.SetStateAction<number>>;
};

type Income = {
  chargeQuantityCalcSiGunGuElementIdx: number;
  year: number;
  name: string;
  siDo: string;
  siGunGu?: string;
  value: string;
};
// ACCUMULATED_ELECTRIC_VEHICLE_REGISTRATION
// AVERAGE_AGE
// CULTURAL_INFRASTRUCTURE_RATE
// ELDERLY_POPULATION_RATE
// GRDP
// PARKING_LOT_RATE
// PERSONAL_INCOME
// POPULATION_DENSITY
// POPULATION_MOVEMENT
// ROAD_PAVEMENT_RATE
// ROAD_SUPPLY_RATE
// TRAFFIC_CULTURE_INDEX
// URBAN_AREA
// VEHICLE_REGISTRATION
type IncomeSimulResponse = {
  isSuccess: true;
  data: {
    accumulatedElectricVehicleRegistration: Income[];
    averageAge: Income[];
    culturalInfrastructureRate: Income[];
    elderlyPopulationRate: Income[];
    grdp: Income[];
    parkingLotRate: Income[];
    personalIncome: Income[];
    populationDensity: Income[];
    populationMovement: Income[];
    roadPavementRate: Income[];
    roadSupplyRate: Income[];
    trafficCultureIndex: Income[];
    urbanArea: Income[];
    vehicleRegistration: Income[];
  };
};

const IncomeSimul = ({ setNowHeight, setNumber }: Props) => {
  const dispatch = useDispatch();

  // 등록, 추가, 삭제 했을때 리스트 페이지로 이동 할거임
  const [changeNumber, setChangeNumber] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [detatilId, setDetailId] = useState<string>('');
  const [sendUserType, setSendUserType] = useState<string>('');

  // admin/simulations/charge
  const { data, isLoading, isError, refetch, remove } =
    useQuery<IncomeSimulResponse>('incomeSimul', () =>
      isTokenAdminGetApi(`/admin/simulations/charge`),
    );

  console.log(data, 'data');

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
          <SubText>수익 SIMUL</SubText>
        </TitleBox>
        <ExelButton
          onClick={() => {
            handleCommon();
          }}
        >
          엑셀 업로드
        </ExelButton>
      </TitleWrapper>
      <IncomeSimulTable handleCommon={handleCommon} />
      {/* <UnderLine /> */}
    </Wrapper>
  );
};

export default IncomeSimul;

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
