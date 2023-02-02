import styled from '@emotion/styled';
import React, { Fragment, useState } from 'react';
import colors from 'styles/colors';
import Toggle from 'rsuite/Toggle';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { isTokenAdminGetApi, isTokenAdminPatchApi } from 'api';
import { AdminBannerListResponse } from 'types/tableDataType';
import { adminDateFomat } from 'utils/calculatePackage';
import { Pagination } from 'rsuite';
import { css } from '@emotion/react';
import { IncomeSimulResponse } from './IncomeSimul';

type Props = {
  handleCommon: () => void;
  simulData: IncomeSimulResponse;
};

const IncomeSimulTable = ({ handleCommon, simulData }: Props) => {
  const queryClient = useQueryClient();
  const limit = 10;
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const [tabNumber, setTabNumber] = useState<number>(0);
  const [siDoNumber, setSidoNumber] = useState<number | undefined>();
  const [siGunGuNumber, setSiGunGuNumber] = useState<number | undefined>();
  // const [siGunGuBoolean, setSiGunGuBoolean] = useState<boolean>(false);
  const [valueNumber, setValueNumber] = useState<number | undefined>();
  // const [valueBoolean, setValueBoolean] = useState<boolean>(false);

  console.log('🐳 simulData 테이블에서🐳', simulData);

  const Row = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

  const UnderRow = [
    '도보급등률',
    '인당 개인소득',
    '평균연령',
    '인구이동량',
    '인구 및 인구밀도',
    '전기차 누적등록',
    '도로포장률',
    '교통문화지수',
    '인당 도시지역면적',
    '인당 자동차 등록대수',
    '주차장확보율',
    '문화기반시설률',
    'GRDP',
    '고령인구비율',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ];

  const Empty = [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ];

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

  const SimulDataList = [
    simulData?.data?.accumulatedElectricVehicleRegistration,
    simulData?.data?.averageAge,
    simulData?.data?.culturalInfrastructureRate,
    simulData?.data?.elderlyPopulationRate,
    simulData?.data?.grdp,
    simulData?.data?.parkingLotRate,
    simulData?.data?.personalIncome,
    simulData?.data?.populationDensity,
    simulData?.data?.populationMovement,
    simulData?.data?.roadPavementRate,
    simulData?.data?.roadSupplyRate,
    simulData?.data?.trafficCultureIndex,
    simulData?.data?.urbanArea,
    simulData?.data?.vehicleRegistration,
  ];

  const [siGunGuBoolean, setSiGunGuBoolean] = React.useState<boolean[]>(
    Array.from({ length: SimulDataList[tabNumber]?.length }, () => false),
  );

  const handleSiGunGu = (id: number) => {
    let temp = [...siGunGuBoolean];
    temp[id] = !temp[id];
    setSiGunGuBoolean(temp);
  };

  const [valueBoolean, setValueBoolean] = React.useState<boolean[]>(
    Array.from({ length: SimulDataList[tabNumber]?.length }, () => false),
  );

  const handleValue = (id: number) => {
    let temp = [...valueBoolean];
    temp[id] = !temp[id];
    setValueBoolean(temp);
  };

  return (
    <Wrapper>
      <TableWrapper>
        <TableThead>
          <TableTR>
            <FirstTD />
            {Row.map((item, idx) => (
              <TableTopTD key={idx}>{item}</TableTopTD>
            ))}
          </TableTR>
          <TableTR style={{ background: 'white' }}>
            <FirstTD />
            {SimulDataList[tabNumber]?.slice(0, 1).map((item, idx) => (
              <TableTopTD key={idx} style={{ background: '#FFFF00' }}>
                {item?.year}
              </TableTopTD>
            ))}
          </TableTR>
        </TableThead>
        <TableTbody>
          {SimulDataList[tabNumber]?.map((item, idx) => (
            <TableTR key={idx}>
              <TableTH>{item?.siDo}</TableTH>
              {item?.siGunGu !== undefined && (
                <TableTD
                  onClick={() => handleSiGunGu(idx)}
                  siGunGuBoolean={siGunGuBoolean[idx] ? true : false}
                >
                  {item?.siGunGu}
                </TableTD>
              )}
              <TableValueTD
                onClick={() => handleValue(idx)}
                valueBoolean={valueBoolean[idx] ? true : false}
              >
                {item?.value.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
              </TableValueTD>
              {item?.siGunGu !== undefined
                ? Empty.slice(0, 24).map((item, idx) => (
                    <TableTD key={idx} siGunGuBoolean={false}>
                      {item}
                    </TableTD>
                  ))
                : Empty.map((item, idx) => (
                    <TableTD key={idx} siGunGuBoolean={false}>
                      {item}
                    </TableTD>
                  ))}
            </TableTR>
          ))}
        </TableTbody>
        <TableThead>
          <TableTR>
            <FirstTD />
            {UnderRow.map((item, idx) => (
              <TableUnderTD
                key={idx}
                onClick={() => {
                  setTabNumber(idx);
                }}
                idx={idx}
                tabNumber={tabNumber}
              >
                {idx !== tabNumber && item}
                <ClickTab idx={idx} tabNumber={tabNumber}>
                  {idx === tabNumber && item}
                </ClickTab>
              </TableUnderTD>
            ))}
          </TableTR>
        </TableThead>
      </TableWrapper>
    </Wrapper>
  );
};

export default IncomeSimulTable;

const Wrapper = styled.div`
  width: 945px;
  height: 640px;
  overflow: scroll;
  border: 1px solid #e2e5ed;
  margin-bottom: 20px;

  ::-webkit-scrollbar {
    display: initial;
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    // 뒷배경
    background: rgba(33, 122, 244, 0.1);
  }
  ::-webkit-scrollbar-thumb {
    // 막대
    background: #217af4;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
`;

const TableWrapper = styled.table`
  border: 1px solid #e2e5ed;
`;

const TableTbody = styled.tbody``;

const TableTH = styled.th`
  border: 1px solid #e2e5ed;
  min-width: 120px;
  padding-bottom: 10px;
  text-align: center;
  background-color: #f3f4f7;
`;

const TableThead = styled.thead`
  /* width: 945px; */
  height: 32px;
  border: 1px solid #e2e5ed;
`;

const TableTheadUnder = styled.thead`
  position: static;
  top: 667px;
  left: 230px;
  height: 32px;
  border: 1px solid #e2e5ed;
`;

const TableTR = styled.tr`
  background-color: #f3f4f7;
`;

const TableTRUner = styled.tr`
  position: fixed;
  left: 230px;
  top: 720px;
  background-color: #f3f4f7;
`;

const TableLocationTD = styled.td`
  width: 150px;
  padding: 0 20px;
  text-align: center;
  border-right: 1px solid #e2e5ed;
  background-color: white;
  :first-of-type {
    border-left: 1px solid #e2e5ed;
  }
  :not(:last-child) {
    border-bottom: 1px solid #e2e5ed;
  }
`;

const TableTD = styled.td<{
  siGunGuBoolean: boolean;
}>`
  min-width: 200px;
  padding: 8px 5px 0 5px;
  text-align: center;
  background-color: white;
  :first-of-type {
    border-left: 1px solid #e2e5ed;
  }
  border-bottom: 1px solid #e2e5ed;
  border-right: 1px solid #e2e5ed;
  cursor: pointer;
  ${({ siGunGuBoolean }) =>
    siGunGuBoolean === true &&
    css`
      background-color: #ffff00;
    `}
`;

const TableValueTD = styled.td<{
  valueBoolean: boolean;
}>`
  min-width: 200px;

  padding: 8px 5px 0 5px;
  text-align: center;
  background-color: white;

  :first-of-type {
    border-left: 1px solid #e2e5ed;
  }
  cursor: pointer;
  border-bottom: 1px solid #e2e5ed;
  border-right: 1px solid #e2e5ed;
  ${({ valueBoolean }) =>
    valueBoolean === true &&
    css`
      background-color: #ffff00;
    `}
`;

const TableTopTD = styled.td`
  min-width: 100px;
  min-height: 20px;
  text-align: center;
  /* padding-top: 8px; */
  padding: 8px 10px 0 10px;
  background-color: #f3f4f7;
  :first-of-type {
    border-left: 1px solid #e2e5ed;
  }
  border-bottom: 1px solid #e2e5ed;
  border-right: 1px solid #e2e5ed;
`;

const TableUnderTD = styled.td<{ idx: number; tabNumber: number }>`
  min-width: 150px;
  text-align: center;
  padding-top: 8px;
  background-color: #f3f4f7;
  position: relative;
  cursor: pointer;
  :first-of-type {
    border-left: 1px solid #e2e5ed;
  }
  border-bottom: 1px solid #e2e5ed;
  border-right: 1px solid #e2e5ed;

  :not(:last-child) {
  }
`;

const ClickTab = styled.div<{ idx: number; tabNumber: number }>`
  ${({ idx, tabNumber }) =>
    idx === tabNumber &&
    css`
      position: absolute;
      width: 130px;
      height: 35px;
      z-index: 10;
      bottom: 4px;
      left: 35px;
      padding-top: 5px;
      border-left: 1px solid #e2e5ed;
      border-right: 1px solid #e2e5ed;
      border-bottom: 1px solid #e2e5ed;
      border-bottom-right-radius: 10px;
      border-bottom-left-radius: 10px;
      background-color: white;
    `};
`;

const FirstTD = styled.td`
  /* width: 100px; */
  height: 40px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  background-color: #e2e5ed;
`;

const TableHeadTD = styled.td`
  :not(:last-child) {
    border-right: 1px solid #e2e5ed;
  }
`;
