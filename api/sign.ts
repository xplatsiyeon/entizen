import { InProgressProjectsDetailResponse } from 'QueryComponents/CompanyQuery';
import { ModuSignResponse } from 'QueryComponents/ModuSignQuery';
import { convertKo } from 'utils/calculatePackage';
import {
  InstallationPurposeType,
  InstallationPurposeTypeEn,
  location,
  locationEn,
  M5_LIST,
  M5_LIST_EN,
  M6_LIST,
  M6_LIST_EN,
  M7_LIST,
  M7_LIST_EN,
  subscribeType,
  subscribeTypeEn,
} from 'assets/selectList';

export const modusign = (data: ModuSignResponse) => {
  const fetch = require('node-fetch');
  const url = 'https://api.modusign.co.kr/documents/request-with-template';
  // 오늘 날짜 가지고 오는 함수
  // dataLabel: contractPeriod 여기에 넣어주면 됨
  // 돈 들어가는건 3자리마다 ,찍어주기
  // 충전기 부분  나열하는거 주석 해놓은거 참고해서 , 찍어주고 나열
  //   <span className="text">
  //   {convertKo(M5_LIST, M5_LIST_EN, item.kind)}
  //   <br />
  //   {item.standType
  //     ? //  standType 있으면
  //       `: ${convertKo(
  //         M6_LIST,
  //         M6_LIST_EN,
  //         item.standType,
  //       )}, ${convertKo(
  //         M7_LIST,
  //         M7_LIST_EN,
  //         item.channel,
  //       )}, ${item.count} 대`
  //     : // standType 없으면
  //       `: ${convertKo(
  //         M7_LIST,
  //         M7_LIST_EN,
  //         item.channel,
  //       )}, ${item.count} 대`}
  // 설치 위치 및 구독 상품? 그거 영한 변한 주의
  // afterCharger는 일단 충전기 그냥 넣고 추후에 백엔드에서 만들어주면 그걸로 교체
  // </span>
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      // authorization: process.env.MODUSIGN_KEY,
      authorization:
        'Basic ZW50aXplbkBlbnRpemVuLmtyOk5XWXpPRGc0WldNdE1Ua3haQzAwWkRnMkxUaGpPR010T1dOaVpEWTROR0l6TlRZMA==',
    },
    body: JSON.stringify({
      document: {
        participantMappings: [
          // 유저
          {
            excluded: false,
            signingMethod: {
              type: 'KAKAO',
              // value: '01049988965',
              value: data?.data?.inProgressProjects[0]?.userMember?.phone,
            },
            signingDuration: 20160,
            locale: 'ko',
            role: '유저',
            // name: '문수정',
            name: data?.data?.inProgressProjects[0]?.userMember?.name,
          },
          // 기업
          {
            excluded: false,
            // signingMethod: { type: 'KAKAO', value: '01091163962' },
            signingMethod: {
              type: 'KAKAO',
              value: data?.data?.inProgressProjects[0]?.companyMember?.phone,
            },
            signingDuration: 20160,
            locale: 'ko',
            role: '기업',
            name: data?.data?.inProgressProjects[0]?.companyMember?.name,
          },
          // 엔티즌
          {
            excluded: false,
            signingMethod: { type: 'EMAIL', value: 'mznx0192@naver.com' },
            signingDuration: 20160,
            locale: 'ko',
            role: '관리자',
            name: '엔티즌',
          },
        ],
        requesterInputMappings: [
          {
            dataLabel: 'userName',
            value: data?.data?.inProgressProjects[0]?.userMember?.name,
          },
          {
            dataLabel: 'companyName',
            value: data?.data?.inProgressProjects[0]?.companyMember?.name,
          },
          // LS 카폐 신림점
          {
            dataLabel: 'projectName',
            value: data?.data?.inProgressProjects[0]?.projectName,
          },
          { dataLabel: 'subscribeProduct', value: '전체구독' },
          { dataLabel: 'subscribePeriod', value: '36' },
          { dataLabel: 'userInvestRate', value: '70' },
          {
            dataLabel: 'charger1',
            value: '7kw 충전기(공용), 벽걸이, 싱글, 2대',
          },
          { dataLabel: 'charger2', value: '50kw 충전기, 스탠드, 3모드, 1세대' },
          { dataLabel: 'charger3', value: '' },
          { dataLabel: 'charger4', value: '' },
          { dataLabel: 'charger5', value: '' },
          { dataLabel: 'installationLocation', value: '' },
          { dataLabel: 'etcRequest', value: '없음' },
          { dataLabel: 'period', value: '36' },
          // { dataLabel: 'constructionPeriod', value: '1,000,000,000' },
          { dataLabel: 'chargingStationInstallationPrice', value: '120,000' },
          {
            dataLabel: 'charger2_1',
            value: '7kw 충전기(공용), 벽걸이, 싱글, 2대',
          },
          {
            dataLabel: 'charger2_2',
            value: '50kw 충전기, 스탠드, 3모드, 1세대',
          },
          { dataLabel: 'charger2_3', value: '' },
          { dataLabel: 'charger2_4', value: '' },
          { dataLabel: 'charger2_5', value: '' },
          { dataLabel: 'chargePrice2_1', value: '110,000' },
          { dataLabel: 'chargePrice2_2', value: '820,000' },
          { dataLabel: 'chargePrice2_3', value: '' },
          { dataLabel: 'chargePrice2_4', value: '' },
          { dataLabel: 'chargePrice2_5', value: '' },
          { dataLabel: 'count2_1', value: '2대' },
          { dataLabel: 'count2_2', value: '1대' },
          { dataLabel: 'count2_3', value: '' },
          { dataLabel: 'count2_4', value: '2대' },
          { dataLabel: 'count2_5', value: '2대' },
          { dataLabel: 'subscribePeriod2_1', value: '36개월' },
          { dataLabel: 'subscribePeriod2_2', value: '36개월' },
          { dataLabel: 'subscribePeriod2_3', value: '' },
          { dataLabel: 'subscribePeriod2_4', value: '' },
          { dataLabel: 'subscribePeriod2_5', value: '' },
          { dataLabel: 'chargeSum2_1', value: '7,920,000' },
          { dataLabel: 'chargeSum2_2', value: '29,520,000' },
          { dataLabel: 'chargeSum2_3', value: '' },
          { dataLabel: 'chargeSum2_4', value: '' },
          { dataLabel: 'chargeSum2_5', value: '' },
          {
            dataLabel: 'afterCharger1',
            value: '7kw 충전기(공용), 벽걸이, 싱글, 2대',
          },
          {
            dataLabel: 'afterCharger2',
            value: '50kw 충전기, 스탠드, 3모드, 1세대',
          },
          { dataLabel: 'afterCharger3', value: '' },
          { dataLabel: 'afterChargePrice1', value: '53,000' },
          { dataLabel: 'afterChargePrice2', value: '125,000' },
          { dataLabel: 'afterChargePrice3', value: '' },
          { dataLabel: 'afterChargePrice4', value: '' },
          { dataLabel: 'afterChargePrice5', value: '' },
          { dataLabel: 'afterCount1', value: '2대' },
          { dataLabel: 'afterCount2', value: '1대' },
          { dataLabel: 'afterCount3', value: '' },
          { dataLabel: 'afterCount4', value: '' },
          { dataLabel: 'afterCount5', value: '' },
          { dataLabel: 'afterSubscribePeriod1', value: '24개월' },
          { dataLabel: 'afterSubscribePeriod2', value: '24개월' },
          { dataLabel: 'afterSubscribePeriod3', value: '' },
          { dataLabel: 'afterSubscribePeriod4', value: '' },
          { dataLabel: 'afterSubscribePeriod5', value: '' },
          { dataLabel: 'afterChargeSum1', value: '2,544,000' },
          { dataLabel: 'afterChargeSum2', value: '3,000,000' },
          { dataLabel: 'afterChargeSum3', value: '' },
          { dataLabel: 'afterChargeSum4', value: '' },
          { dataLabel: 'afterChargeSum5', value: '' },
          { dataLabel: 'userInvestRate2', value: '' },
          { dataLabel: 'chargingPointRate2', value: '70' },
          { dataLabel: 'subscribePeriod2', value: '30' },
          { dataLabel: 'userInvestRate3', value: '' },
          //날짜
          { dataLabel: 'contractPeriod', value: '' },
          // 서명
          {
            dataLabel: 'signUserName',
            value: data?.data?.inProgressProjects[0]?.userMember?.name,
          },
          {
            dataLabel: 'signUserAddress',
            value: data?.data?.inProgressProjects[0]?.projectName,
          },
          {
            dataLabel: 'signUserName2',
            value: data?.data?.inProgressProjects[0]?.userMember?.name,
          },
          {
            dataLabel: 'signCompanyName',
            value: data?.data?.inProgressProjects[0]?.companyMember?.name,
          },
          {
            dataLabel: 'signCompanyAddress',
            value:
              data?.data?.inProgressProjects[0]?.companyMember
                ?.companyMemberAdditionalInfo?.companyAddress,
          },
          {
            dataLabel: 'signCompanyName2',
            value: data?.data?.inProgressProjects[0]?.companyMember?.name,
          },
        ],
        title: '엔티즌계약서',
      },
      templateId: '767b58a0-66f1-11ed-92dc-eb196f6b079e',
    }),
  };

  return fetch(url, options).then((res: Response) => res.json());
};
