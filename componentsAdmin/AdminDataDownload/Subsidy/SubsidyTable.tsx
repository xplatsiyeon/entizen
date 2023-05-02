import styled from '@emotion/styled';
import React from 'react';
import { css } from '@emotion/react';
import { SubsidyDataResponse } from './Subsidy';

type Props = {
  handleCommon: () => void;
  subsidyData: SubsidyDataResponse;
  setTabNumber: React.Dispatch<React.SetStateAction<number>>;
  tabNumber: number;
};

const SubsidyTable = ({
  setTabNumber,
  tabNumber,
  handleCommon,
  subsidyData,
}: Props) => {
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
    'AA',
    'AB',
    'AC',
    'AD',
    'AE',
    'AF',
    'AG',
    'AH',
    'AI',
    'AJ',
    'AK',
    'AL',
    'AM',
    'AN',
    'AO',
    'AP',
    'AQ',
    'AR',
    'AS',
    'AT',
    'AU',
    'AV',
    'AW',
    'AX',
    'AY',
    'AZ',
    'BA',
    'BB',
    'BC',
    'BD',
    'BE',
    'BF',
    'BG',
    'BH',
  ];

  const ChargeType = [
    ['7 kW', '비공용', '벽걸이', '싱글'], //1
    ['7 kW', '비공용', '스탠드', '싱글'], //2
    ['7 kW', '공용, 경제형', '벽걸이', '싱글'], //3
    ['7 kW', '공용, 경제형', '스탠드', '싱글'], // 4
    ['7 kW', '공용, 경제형', '키오스크', '싱글'], // 5
    ['7 kW', '공용,', '벽걸이', '싱글'], // 6
    ['7 kW', '공용,', '스탠드', '싱글'], // 7
    ['7 kW', '공용,', '키오스크', '싱글'], // 8
    ['11 kW', '공용,', '벽걸이', '싱글'], // 9
    ['11 kW', '공용,', '스탠드', '싱글'], // 10
    ['11 kW', '공용,', '벽걸이', '듀얼'], // 11
    ['11 kW', '공용,', '스탠드', '듀얼'], // 12
    ['14 kW', '공용,', '벽걸이', '듀얼'], // 13
    ['14 kW', '공용,', '스탠드', '듀얼'], // 14
    ['17.6 kW', '공용,', '벽걸이', '싱글'], // 15
    ['17.6 kW', '공용,', '스탠드', '싱글'], // 16
    ['20 kW', '공용,', '벽걸이', '싱글'], // 17
    ['20 kW', '공용,', '스탠드', '싱글'], // 18
    ['30 kW', '공용,', '벽걸이', '싱글'], // 19
    ['30 kW', '공용,', '스탠드', '싱글'], // 20
    ['30 kW', '공용,', '벽걸이', '듀얼'], // 21
    ['30 kW', '공용,', '스탠드', '듀얼'], // 22
    ['50 kW', '공용,', '스탠드', '싱글'], //23
    ['50 kW', '공용,', '스탠드', '듀얼'], // 24
    ['50 kW', '공용,', '스탠드', '3mode'], // 25
    ['100 kW', '공용,', '스탠드', '싱글'], // 26
    ['100 kW', '공용,', '스탠드', '듀얼'], // 27
    ['200 kW', '공용,', '스탠드', '싱글'], // 28
    ['200 kW', '공용,', '스탠드', '듀얼'], // 29
    ['200 kW', '공용,', '파워뱅크 분리형', '싱글'], // 30
    ['200 kW', '공용,', '파워뱅크 분리형', '듀얼'], // 31
    ['300 kW', '공용,', '스탠드', '싱글'], // 32
    ['300 kW', '공용,', '스탠드', '듀얼'], // 33
    ['300 kW', '공용,', '파워뱅크 분리형', '싱글'], // 34
    ['300 kW', '공용,', '파워뱅크 분리형', '듀얼'], // 35
    ['300 kW 버스', '공용,', '스탠드', '듀얼'], // 36
    ['300 kW 버스', '공용,', '파워뱅크 분리형', '듀얼'], // 37
    ['350 kW', '공용,', '스탠드', '싱글'], // 38
    ['350 kW', '공용,', '스탠드', '듀얼'], // 39
    ['350 kW', '공용,', '파워뱅크 분리형', '싱글'], // 40
    ['350 kW', '공용,', '파워뱅크 분리형', '듀얼'], // 41
    ['350 kW 버스', '공용,', '스탠드', '듀얼'], // 42
    ['350 kW 버스', '공용,', '파워뱅크 분리형', '듀얼'], // 43
    ['400 kW', '공용,', '스탠드', '싱글'], // 44
    ['400 kW', '공용,', '스탠드', '듀얼'], // 45
    ['400 kW', '공용,', '파워뱅크 분리형', '싱글'], // 46
    ['400 kW', '공용,', '파워뱅크 분리형', '듀얼'], // 47
    ['400 kW 버스', '공용,', '스탠드', '듀얼'], // 48
    ['400 kW 버스', '공용,', '파워뱅크 분리형', '듀얼'], // 49
  ];

  const StandComponent = (rowNumber: number) => {
    console.log('🔥 subsidyData : ', subsidyData);
    return (
      <StandWrapper>
        {ChargeType[rowNumber].map((item, id) => (
          <StandBox>{item}</StandBox>
        ))}
      </StandWrapper>
    );
  };
  // 과금형 11번
  const RowName0 = [
    '신청기관',
    '설치지역',
    '지원',
    '신청기간 시작일',
    '신청기간 종료일',
    '중복지원',
    '총 지원수량',
    '현장별 최대지원수량',
    '최소설치수량(기준)',
    '최대설치수량(기준)',
    '과금형 콘센트',
    StandComponent(0),
    StandComponent(1),
    StandComponent(2),
    StandComponent(3),
    StandComponent(4),
    StandComponent(5),
    StandComponent(6),
    StandComponent(7),
    StandComponent(8),
    StandComponent(9),
    StandComponent(10),
    StandComponent(11),
    StandComponent(12),
    StandComponent(13),
    StandComponent(14),
    StandComponent(15),
    StandComponent(16),
    StandComponent(17),
    StandComponent(18),
    StandComponent(19),
    StandComponent(20),
    StandComponent(21),
    StandComponent(22),
    StandComponent(23),
    StandComponent(24),
    StandComponent(25),
    StandComponent(26),
    StandComponent(27),
    StandComponent(28),
    StandComponent(29),
    StandComponent(30),
    StandComponent(31),
    StandComponent(32),
    StandComponent(33),
    StandComponent(34),
    StandComponent(35),
    StandComponent(36),
    StandComponent(37),
    StandComponent(38),
    StandComponent(39),
    StandComponent(39),
    StandComponent(40),
    StandComponent(41),
    StandComponent(42),
    StandComponent(43),
    StandComponent(44),
    StandComponent(45),
    StandComponent(46),
    StandComponent(47),
  ];

  const UnderRow = ['보조금_n', '보조금_n-1'];

  const selectYear = (tabNumber: number) => {
    if (tabNumber === 0) {
      return subsidyData?.data?.simulation[0]?.year;
    } else if (tabNumber === 1) {
      return subsidyData?.data?.simulation[0]?.year - 1;
    }
  };

  const Empty = Array.from({ length: 55 });
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
          <TableTR style={{ height: '80px' }}>
            <FirstTD />
            {RowName0.map((item, idx) => (
              <TableTopTDCharge key={idx}>{item}</TableTopTDCharge>
            ))}
          </TableTR>
        </TableThead>

        <TableThead>
          <TableTR>
            <FirstTD />
            <TableTopTDCharge style={{ background: 'white' }}>
              연도
            </TableTopTDCharge>
            {tabNumber === 0 ? (
              <TableTopTDCharge style={{ background: '#FFFF00' }}>
                {subsidyData?.data?.simulation[0]?.year}
              </TableTopTDCharge>
            ) : (
              <TableTopTDCharge style={{ background: '#FFFF00' }}>
                {subsidyData?.data?.simulation[200]?.year}
              </TableTopTDCharge>
            )}

            {Empty.map((item, idx) => (
              <TableTopTDCharge style={{ background: 'white' }} />
            ))}
          </TableTR>
        </TableThead>
        {subsidyData?.data?.simulation
          ?.filter((ele) => ele?.year === selectYear(tabNumber))
          ?.map((item, idx) => (
            <TableTR key={idx}>
              <TableTH>{`${idx + 1}`}</TableTH>
              {/* 1 */}
              <TableTD siGunGuBoolean={false}>
                {item?.applicationAgency === null
                  ? '-'
                  : item?.applicationAgency}
              </TableTD>
              {/* 2 */}
              <TableTD siGunGuBoolean={false}>
                {item?.installationLocationSiGunGu === null
                  ? '-'
                  : item?.installationLocationSiGunGu}
              </TableTD>
              {/* 3 */}
              <TableTD siGunGuBoolean={false}>
                {item?.canApply === true ? 'O' : 'X'}
              </TableTD>
              {/* 4 */}
              <TableTD siGunGuBoolean={false}>
                {item?.applyStartDate === null ? '-' : item?.applyStartDate}
              </TableTD>
              {/* 5 */}
              <TableTD siGunGuBoolean={false}>
                {item?.applyEndDate === null ? '-' : item?.applyEndDate}
              </TableTD>
              {/* 6 */}
              <TableTD siGunGuBoolean={false}>
                {item?.duplicateApplyGroup === null
                  ? '-'
                  : item?.duplicateApplyGroup}
              </TableTD>
              {/* 7 */}
              <TableTD siGunGuBoolean={false}>
                {item?.totalApplyCount === null
                  ? '-'
                  : item?.totalApplyCount
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 8 */}
              <TableTD siGunGuBoolean={false}>
                {item?.siteApplyCount === null
                  ? '-'
                  : item?.siteApplyCount
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 9 */}
              <TableTD siGunGuBoolean={false}>
                {item?.minInstallationCount === null
                  ? '-'
                  : item?.minInstallationCount
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 10 */}
              <TableTD siGunGuBoolean={false}>
                {item?.maxInstallationCount === null
                  ? '-'
                  : item?.maxInstallationCount
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 11 */}
              {/* // 과금형 콘센트 추가되면 여기에 키 추가 해용 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_charging_consent === null
                  ? '-'
                  : item?.price_charging_consent
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* ------------------------------ */}
              {/* 12 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_7_home_wall_single === null
                  ? '-'
                  : item?.price_7_home_wall_single
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 13 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_7_home_stand_single === null
                  ? '-'
                  : item?.price_7_home_stand_single
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 14 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_7_common_economy_wall_single === null
                  ? '-'
                  : item?.price_7_common_economy_wall_single
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 15 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_7_common_economy_stand_single === null
                  ? '-'
                  : item?.price_7_common_economy_stand_single
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 16 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_7_common_economy_kiosk_single === null
                  ? '-'
                  : item?.price_7_common_economy_kiosk_single
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 17 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_7_common_wall_single === null
                  ? '-'
                  : item?.price_7_common_wall_single
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 18 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_7_common_stand_single === null
                  ? '-'
                  : item?.price_7_common_stand_single
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/*  */}
              {/* 19 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_30_common_wall_single === null
                  ? '-'
                  : item?.price_30_common_wall_single
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 20 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_30_common_stand_dual === null
                  ? '-'
                  : item?.price_30_common_stand_dual
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 21 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_30_common_wall_dual === null
                  ? '-'
                  : item?.price_30_common_wall_dual
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 22 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_30_common_stand_dual === null
                  ? '-'
                  : item?.price_30_common_stand_dual
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/*  */}
              {/* 23 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_7_common_economy_kiosk_single === null
                  ? '-'
                  : item?.price_7_common_economy_kiosk_single
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 24 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_11_common_wall_single === null
                  ? '-'
                  : item?.price_11_common_wall_single
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 25 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_11_common_stand_single === null
                  ? '-'
                  : item?.price_11_common_stand_single
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 26 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_11_common_wall_dual === null
                  ? '-'
                  : item?.price_11_common_wall_dual
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 27 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_11_common_stand_dual === null
                  ? '-'
                  : item?.price_11_common_stand_dual
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 28 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_14_common_wall_dual === null
                  ? '-'
                  : item?.price_14_common_wall_dual
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 29 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_14_common_stand_dual === null
                  ? '-'
                  : item?.price_14_common_stand_dual
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 30 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_17_6_common_wall_single === null
                  ? '-'
                  : item?.price_17_6_common_wall_single
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 31 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_17_6_common_stand_single === null
                  ? '-'
                  : item?.price_17_6_common_stand_single
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 32 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_20_common_wall_single === null
                  ? '-'
                  : item?.price_20_common_wall_single
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 33 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_20_common_stand_single === null
                  ? '-'
                  : item?.price_20_common_stand_single
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 34 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_50_common_stand_single === null
                  ? '-'
                  : item?.price_50_common_stand_single
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 35 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_50_common_stand_dual === null
                  ? '-'
                  : item?.price_50_common_stand_dual
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 36 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_50_common_stand_3_mode === null
                  ? '-'
                  : item?.price_50_common_stand_3_mode
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 37 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_100_common_stand_single === null
                  ? '-'
                  : item?.price_100_common_stand_single
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 38 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_100_common_stand_dual === null
                  ? '-'
                  : item?.price_100_common_stand_dual
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 39 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_200_common_stand_single === null
                  ? '-'
                  : item?.price_200_common_stand_single
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 40 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_200_common_stand_dual === null
                  ? '-'
                  : item?.price_200_common_stand_dual
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 41 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_200_common_detachable_power_bank_single === null
                  ? '-'
                  : item?.price_200_common_detachable_power_bank_single
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 42 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_200_common_detachable_power_bank_dual === null
                  ? '-'
                  : item?.price_200_common_detachable_power_bank_dual
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 43 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_300_common_stand_single === null
                  ? '-'
                  : item?.price_300_common_stand_single
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 44 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_300_common_stand_dual === null
                  ? '-'
                  : item?.price_300_common_stand_dual
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 45 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_300_common_detachable_power_bank_single === null
                  ? '-'
                  : item?.price_300_common_detachable_power_bank_single
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 46 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_300_common_detachable_power_bank_dual === null
                  ? '-'
                  : item?.price_300_common_detachable_power_bank_dual
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 47 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_300_common_bus_stand_dual === null
                  ? '-'
                  : item?.price_300_common_bus_stand_dual
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 48 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_300_common_bus_detachable_power_bank_dual === null
                  ? '-'
                  : item?.price_300_common_bus_detachable_power_bank_dual
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 49 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_350_common_stand_single === null
                  ? '-'
                  : item?.price_350_common_stand_single
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 50 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_350_common_stand_dual === null
                  ? '-'
                  : item?.price_350_common_stand_dual
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 51 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_350_common_detachable_power_bank_single === null
                  ? '-'
                  : item?.price_350_common_detachable_power_bank_single
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 52 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_350_common_detachable_power_bank_dual === null
                  ? '-'
                  : item?.price_350_common_detachable_power_bank_dual
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 53 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_350_common_bus_stand_dual === null
                  ? '-'
                  : item?.price_350_common_bus_stand_dual
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 54 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_350_common_bus_detachable_power_bank_dual === null
                  ? '-'
                  : item?.price_350_common_bus_detachable_power_bank_dual
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 55 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_400_common_stand_single === null
                  ? '-'
                  : item?.price_400_common_stand_single
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 56 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_400_common_stand_dual === null
                  ? '-'
                  : item?.price_400_common_stand_dual
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 57 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_400_common_detachable_power_bank_single === null
                  ? '-'
                  : item?.price_400_common_detachable_power_bank_single
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 58 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_400_common_detachable_power_bank_dual === null
                  ? '-'
                  : item?.price_400_common_detachable_power_bank_dual
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 59 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_400_common_bus_stand_dual === null
                  ? '-'
                  : item?.price_400_common_bus_stand_dual
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
              {/* 60 */}
              <TableTD siGunGuBoolean={false}>
                {item?.price_400_common_bus_detachable_power_bank_dual === null
                  ? '-'
                  : item?.price_400_common_bus_detachable_power_bank_dual
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </TableTD>
            </TableTR>
          ))}

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

export default SubsidyTable;

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

const TableTopTDCharge = styled.td`
  min-width: 100px;
  min-height: 80px;
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

const StandWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StandBox = styled.div`
  text-align: center;

  :not(:last-child) {
    border-bottom: 1px solid #e2e5ed;
  }
`;
