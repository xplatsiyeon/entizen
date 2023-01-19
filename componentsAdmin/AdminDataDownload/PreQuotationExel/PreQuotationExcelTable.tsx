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
import { PreQuotationExcelResponse } from './PreQuotationExel';

type Props = {
  handleCommon: () => void;
  preQuotationExcelData: PreQuotationExcelResponse;
};

const PreQuotationExcelTable = ({
  handleCommon,
  preQuotationExcelData,
}: Props) => {
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

  const RowName0 = [
    '프레임1',
    '프레임2',
    '프레임3',
    '프레임4',
    '프레임5',
    '프레임6',
    '제품가격',
    '설치가격',
    '신용카드 단말기',
    '볼라드',
    '패드',
    '스토퍼',
    '통신선',
    '전기공사 및 한전',
    '캐노피',
    '키오스크',
    '위탁운영비',
    'LTE',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ];

  const RowName1 = [
    '저압',
    '고압',
    '할인율',
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

  const UnderRow = [
    '단가표',
    '전기_기본요금',
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

  const Empty = ['', '', '', '', '', '', '', ''];

  const SpeedChange = (item: string) => {
    if (item === 'SLOW') {
      return '완속';
    } else if (item === 'NORMAL') {
      return '중속';
    } else if (item === 'FAST') {
      return '급속';
    } else if (item === 'SUPER_FAST') {
      return '초급속';
    }
  };

  const chargerTypeChange = (item: string) => {
    if (item === 'COMMON') {
      return '공용';
    } else if (item === 'COMMON_ECONOMY') {
      return '공용, 경제형';
    } else if (item === 'CHARGING_CONSENT') {
      return '과금형 콘센트';
    } else if (item === 'HOME') {
      return '가정용';
    }
  };

  const standTypeChange = (item: string) => {
    if (item === 'WALL') {
      return '벽걸이';
    } else if (item === 'STAND') {
      return '스탠드';
    } else if (item === 'KIOSK') {
      return '키오스크';
    } else if (item === 'DETACHABLE_POWER_BANK') {
      return '파워뱅크';
    }
  };

  const channelChange = (item: string) => {
    if (item === 'SINGLE') {
      return '싱글';
    } else if (item === 'DUAL') {
      return '듀얼';
    }
  };

  //   const PreQuotationExcelList = [
  //     preQuotationExcelData?.data?.chargerPriceTables,
  //     preQuotationExcelData?.data?.electricBasicRateTables,
  //   ];

  //   const [siGunGuBoolean, setSiGunGuBoolean] = React.useState<boolean[]>(
  //     Array.from(
  //       { length: PreQuotationExcelList[tabNumber].length },
  //       () => false,
  //     ),
  //   );

  //   const handleSiGunGu = (id: number) => {
  //     let temp = [...siGunGuBoolean];
  //     temp[id] = !temp[id];
  //     setSiGunGuBoolean(temp);
  //   };

  //   const [valueBoolean, setValueBoolean] = React.useState<boolean[]>(
  //     Array.from(
  //       { length: PreQuotationExcelList[tabNumber].length },
  //       () => false,
  //     ),
  //   );

  //   const handleValue = (id: number) => {
  //     let temp = [...valueBoolean];
  //     temp[id] = !temp[id];
  //     setValueBoolean(temp);
  //   };

  return (
    <Wrapper>
      <TableWrapper>
        <TableThead>
          <TableTR>
            <FirstTD />
            {Row.map((item, idx) => (
              <TableTopTD key={idx} style={{ background: '#E2E5ED' }}>
                {item}
              </TableTopTD>
            ))}
          </TableTR>
        </TableThead>
        <TableThead>
          {tabNumber === 0 && (
            <TableTR>
              <FirstTD />
              {RowName0.map((item, idx) => (
                <TableTopTD key={idx}>{item}</TableTopTD>
              ))}
            </TableTR>
          )}
          {tabNumber === 1 && (
            <TableTR>
              <FirstTD />
              {RowName1.map((item, idx) => (
                <TableTopTD key={idx}>{item}</TableTopTD>
              ))}
            </TableTR>
          )}
        </TableThead>
        {tabNumber === 0 &&
          preQuotationExcelData?.data?.chargerPriceTables?.map((item, idx) => (
            <TableTR key={idx}>
              <TableTH>{`${idx + 1}`}</TableTH>
              <TableTD siGunGuBoolean={false}>
                {item?.watt === null ? '-' : `${item?.watt + ' kW'}`}
              </TableTD>
              <TableTD siGunGuBoolean={false}>
                {item?.method === null ? '-' : item?.method}
              </TableTD>
              <TableTD siGunGuBoolean={false}>
                {item?.speed === null ? '-' : SpeedChange(item?.speed)}
              </TableTD>
              <TableTD siGunGuBoolean={false}>
                {item?.chargerType === null
                  ? '-'
                  : chargerTypeChange(item?.chargerType)}
              </TableTD>
              <TableTD siGunGuBoolean={false}>
                {item?.standType === null
                  ? '-'
                  : standTypeChange(item?.standType)}
              </TableTD>
              <TableTD siGunGuBoolean={false}>
                {item?.channel === null ? '-' : channelChange(item?.channel)}
              </TableTD>
              <TableTD siGunGuBoolean={false}>
                {item?.productPrice === null
                  ? '-'
                  : item?.productPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              <TableTD siGunGuBoolean={false}>
                {item?.installationPrice === null
                  ? '-'
                  : item?.installationPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              <TableTD siGunGuBoolean={false}>
                {item?.cardDevice === null
                  ? '-'
                  : item?.cardDevice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              <TableTD siGunGuBoolean={false}>
                {item?.bollard === null
                  ? '-'
                  : item?.bollard
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              <TableTD siGunGuBoolean={false}>
                {item?.pad === null
                  ? '-'
                  : item?.pad.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              <TableTD siGunGuBoolean={false}>
                {item?.stopper === null
                  ? '-'
                  : item?.stopper
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              <TableTD siGunGuBoolean={false}>
                {item?.communicationLine === null
                  ? '-'
                  : item?.communicationLine
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              <TableTD siGunGuBoolean={false}>
                {item?.electricalWork === null
                  ? '-'
                  : item?.electricalWork
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              <TableTD siGunGuBoolean={false}>
                {item?.canopy === null
                  ? '-'
                  : item?.canopy
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              <TableTD siGunGuBoolean={false}>
                {item?.kiosk === null
                  ? '-'
                  : item?.kiosk
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              <TableTD siGunGuBoolean={false}>
                {item?.consignmentCost === null
                  ? '-'
                  : item?.consignmentCost
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              <TableTD siGunGuBoolean={false}>
                {item?.lte === null
                  ? '-'
                  : item?.lte.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {Empty?.map((item, idx) => (
                <TableTD key={idx} siGunGuBoolean={false}>
                  {item}
                </TableTD>
              ))}
            </TableTR>
          ))}
        {tabNumber === 1 &&
          preQuotationExcelData?.data?.electricBasicRateTables?.map(
            (item, idx) => (
              <TableTR key={idx}>
                <TableTH>{`${idx + 1}`}</TableTH>
                <TableTD siGunGuBoolean={false}>
                  {item?.lowVolt === null
                    ? '-'
                    : item?.lowVolt
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </TableTD>
                <TableTD siGunGuBoolean={false}>
                  {item?.highVolt === null
                    ? '-'
                    : item?.highVolt
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </TableTD>
                <TableTD siGunGuBoolean={false}>
                  {item?.discountRate === null
                    ? '-'
                    : `${item?.discountRate} %`}
                </TableTD>
              </TableTR>
            ),
          )}
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

export default PreQuotationExcelTable;

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
  border: 1px solid #e2e5ed;
`;

const TableHeadTD = styled.td`
  :not(:last-child) {
    border-right: 1px solid #e2e5ed;
  }
`;

const HeadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
