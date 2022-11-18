export const modusign = (data: any) => {
  const fetch = require('node-fetch');

  const url = 'https://api.modusign.co.kr/documents/request-with-template';
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization:
        'Basic ZW50aXplbkBlbnRpemVuLmtyOk5XWXpPRGc0WldNdE1Ua3haQzAwWkRnMkxUaGpPR010T1dOaVpEWTROR0l6TlRZMA==',
    },
    body: JSON.stringify({
      document: {
        participantMappings: [
          {
            excluded: false,
            signingMethod: { type: 'KAKAO', value: '01049988965' },
            signingDuration: 20160,
            locale: 'ko',
            role: '유저',
            name: '김정민',
          },
          {
            excluded: false,
            signingMethod: { type: 'KAKAO', value: '01091163962' },
            signingDuration: 20160,
            locale: 'ko',
            role: '기업',
            name: 'LS산저',
          },
          {
            excluded: false,
            signingMethod: { type: 'KAKAO', value: '01045648381' },
            signingDuration: 20160,
            locale: 'ko',
            role: '관리자',
            name: '엔티즌',
          },
        ],
        requesterInputMappings: [
          { dataLabel: 'userName', value: '1' },
          { dataLabel: 'companyName', value: '1' },
          { dataLabel: 'chargerName', value: '1' },
          { dataLabel: 'subscribeProduct', value: '1' },
          { dataLabel: 'subscribePeriod', value: '1' },
          { dataLabel: 'userInvestRate', value: '1' },
          { dataLabel: 'charger1', value: '1' },
          { dataLabel: 'charger2', value: '1' },
          { dataLabel: 'charger3', value: '1' },
          { dataLabel: 'charger4', value: '1' },
          { dataLabel: 'charger5', value: '1' },
          { dataLabel: 'feature', value: '1' },
          { dataLabel: 'period', value: '1' },
          { dataLabel: 'constructionPeriod', value: '1' },
          { dataLabel: 'charger2_1', value: '2' },
          { dataLabel: 'charger2_2', value: '3' },
          { dataLabel: 'charger2_3', value: '4' },
          { dataLabel: 'chargePrice2_1', value: '5' },
          { dataLabel: 'chargePrice2_2', value: '6' },
          { dataLabel: 'chargePrice2_3', value: '7' },
          { dataLabel: 'count2_1', value: '8' },
          { dataLabel: 'count2_2', value: '9' },
          { dataLabel: 'count2_3', value: '10' },
          { dataLabel: 'subscribePeriod2_1', value: '1' },
          { dataLabel: 'subscribePeriod2_2', value: '2' },
          { dataLabel: 'subscribePeriod2_3', value: '3' },
          { dataLabel: 'chargeSum2_1', value: '4' },
          { dataLabel: 'chargeSum2_2', value: '5' },
          { dataLabel: 'chargeSum2_3', value: '6' },
          { dataLabel: 'afterCharger1', value: '8' },
          { dataLabel: 'afterCharger2', value: '9' },
          { dataLabel: 'afterCharger3', value: '9' },
          { dataLabel: 'afterChargePrice1', value: '1' },
          { dataLabel: 'afterChargePrice2', value: '1' },
          { dataLabel: 'afterChargePrice3', value: '1' },
          { dataLabel: 'afterCount1', value: '1' },
          { dataLabel: 'afterCount2', value: '1' },
          { dataLabel: 'afterCount3', value: '1' },
          { dataLabel: 'afterSubscribePeriod1', value: '1' },
          { dataLabel: 'afterSubscribePeriod2', value: '2' },
          { dataLabel: 'afterSubscribePeriod3', value: '2' },
          { dataLabel: 'afterChargeSum1', value: '3' },
          { dataLabel: 'afterChargeSum2', value: '4' },
          { dataLabel: 'afterChargeSum3', value: '4' },
          { dataLabel: 'userInvestRate2', value: '5' },
          { dataLabel: 'chargingPointRate2', value: '6' },
          { dataLabel: 'subscribePeriod2', value: '7' },
          { dataLabel: 'signUserName', value: '1' },
          { dataLabel: 'signUserAddress', value: '2' },
          { dataLabel: 'signUserName2', value: '3' },
          { dataLabel: 'signCompanyName', value: '4' },
          { dataLabel: 'signCompanyAddress', value: '5' },
          { dataLabel: 'signCompanyName2', value: '6' },
        ],
        title: '엔티즌계약서',
      },
      templateId: '767b58a0-66f1-11ed-92dc-eb196f6b079e',
    }),
  };

  fetch(url, options)
    .then((res: any) => res.json())
    .then((json: any) => console.log(json))
    .catch((err: any) => console.error('error:' + err));
};
