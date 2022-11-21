import { InProgressProjectsDetailResponse } from 'QueryComponents/CompanyQuery';

export const modusign = (data: InProgressProjectsDetailResponse) => {
  const fetch = require('node-fetch');
  const url = 'https://api.modusign.co.kr/documents/request-with-template';

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
          {
            excluded: false,
            signingMethod: {
              type: 'KAKAO',
              value: '01033920580',
            },
            signingDuration: 20160,
            locale: 'ko',
            role: '유저',
            name: '윤경연',
          },
          {
            excluded: false,
            signingMethod: { type: 'KAKAO', value: '01049988965' },
            signingDuration: 20160,
            locale: 'ko',
            role: '기업',
            name: data?.project?.companyMember?.companyMemberAdditionalInfo
              ?.companyName,
          },
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
          { dataLabel: 'userName', value: data?.project?.userMember?.name },
          {
            dataLabel: 'companyName',
            value: data?.project?.companyMember?.name,
          },
          { dataLabel: 'chargerName', value: 'LS 카폐 신림점' },
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
          { dataLabel: 'feature', value: '없음' },
          { dataLabel: 'period', value: '36' },
          { dataLabel: 'constructionPeriod', value: '1,000,000,000' },
          {
            dataLabel: 'charger2_1',
            value: '7kw 충전기(공용), 벽걸이, 싱글, 2대',
          },
          {
            dataLabel: 'charger2_2',
            value: '50kw 충전기, 스탠드, 3모드, 1세대',
          },
          { dataLabel: 'charger2_3', value: '' },
          { dataLabel: 'chargePrice2_1', value: '110,000' },
          { dataLabel: 'chargePrice2_2', value: '820,000' },
          { dataLabel: 'chargePrice2_3', value: '' },
          { dataLabel: 'count2_1', value: '2대' },
          { dataLabel: 'count2_2', value: '1대' },
          { dataLabel: 'count2_3', value: '' },
          { dataLabel: 'subscribePeriod2_1', value: '36개월' },
          { dataLabel: 'subscribePeriod2_2', value: '36개월' },
          { dataLabel: 'subscribePeriod2_3', value: '' },
          { dataLabel: 'chargeSum2_1', value: '7,920,000' },
          { dataLabel: 'chargeSum2_2', value: '29,520,000' },
          { dataLabel: 'chargeSum2_3', value: '' },
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
          { dataLabel: 'afterCount1', value: '2대' },
          { dataLabel: 'afterCount2', value: '1대' },
          { dataLabel: 'afterCount3', value: '' },
          { dataLabel: 'afterSubscribePeriod1', value: '24개월' },
          { dataLabel: 'afterSubscribePeriod2', value: '24개월' },
          { dataLabel: 'afterSubscribePeriod3', value: '' },
          { dataLabel: 'afterChargeSum1', value: '2,544,000' },
          { dataLabel: 'afterChargeSum2', value: '3,000,000' },
          { dataLabel: 'afterChargeSum3', value: '' },
          { dataLabel: 'userInvestRate2', value: '' },
          { dataLabel: 'chargingPointRate2', value: '70' },
          { dataLabel: 'subscribePeriod2', value: '30' },
          // 서명
          { dataLabel: 'signUserName', value: data?.project?.userMember?.name },
          {
            dataLabel: 'signUserAddress',
            value: data?.project?.userMember?.phone,
          },
          {
            dataLabel: 'signUserName2',
            value: data?.project?.userMember?.name,
          },
          {
            dataLabel: 'signCompanyName',
            value:
              data?.project?.companyMember?.companyMemberAdditionalInfo
                ?.companyName,
          },
          {
            dataLabel: 'signCompanyAddress',
            value:
              data?.project?.companyMember?.companyMemberAdditionalInfo
                ?.companyName,
          },
          {
            dataLabel: 'signCompanyName2',
            value: data?.project?.companyMember?.name,
          },
        ],
        title: '엔티즌계약서',
      },
      templateId: '767b58a0-66f1-11ed-92dc-eb196f6b079e',
    }),
  };

  return fetch(url, options).then((res: Response) => res.json());
};
