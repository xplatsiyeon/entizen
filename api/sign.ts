import { InProgressProjectsDetailResponse } from 'QueryComponents/CompanyQuery';
import { ModuSignResponse } from 'QueryComponents/ModuSignQuery';
import { convertKo, moduSignDate } from 'utils/calculatePackage';
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
  console.log('=================data=====================');
  console.log(data);

  console.log(
    '======================모두싸인 POST API 호출===========================',
  );

  const fetch = require('node-fetch');
  const url = 'https://api.modusign.co.kr/documents/request-with-template';
  const projectInProgress = data?.project;
  const chargerString =
    projectInProgress?.finalQuotation?.finalQuotationChargers;

  console.log('chargerString');
  console.log(chargerString);
  // 계약하는 날짜 당일
  const today = new Date();

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
  // </span>
  // afterCharger는 아예 데이터 x, 그래서 나중에 백엔드 만들어지면 마찬가지로 grapql, 타입스크립트, value 수정해야함!
  // chargePrice는 월구독료임 아직 백엔드에 추가 안돼서 추가되면 grapql 및 타입스크립트 수정해야함, value 값도!

  console.log('================= 라인 62 =======================');
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
              value: projectInProgress?.userMember?.phone,
            },
            signingDuration: 20160,
            locale: 'ko',
            role: '유저',
            // name: '문수정',
            name: projectInProgress?.userMember?.name,
          },
          // 기업
          {
            excluded: false,
            // signingMethod: { type: 'KAKAO', value: '01091163962' },
            signingMethod: {
              type: 'KAKAO',
              value: projectInProgress?.companyMember?.phone,
            },
            signingDuration: 20160,
            locale: 'ko',
            role: '기업',
            name: projectInProgress?.companyMember?.name,
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
            value: projectInProgress?.userMember?.name,
          },
          {
            dataLabel: 'companyName',
            value: projectInProgress?.companyMember?.name,
          },
          // LS 카폐 신림점
          {
            dataLabel: 'projectName',
            value: projectInProgress?.projectName,
          },
          // 전체구독
          {
            dataLabel: 'subscribeProduct',
            value: convertKo(
              subscribeType,
              subscribeTypeEn,
              projectInProgress?.finalQuotation?.subscribeProduct,
            ),
          },
          {
            dataLabel: 'subscribePeriod',
            value: projectInProgress?.finalQuotation?.constructionPeriod,
          },
          {
            dataLabel: 'userInvestRate',
            value: projectInProgress?.finalQuotation?.userInvestRate,
          },
          {
            dataLabel: 'charger1',
            // value: '7kw 충전기(공용), 벽걸이, 싱글, 2대',
            value: chargerString[0]
              ? chargerString[0]?.standType
                ? ` ${convertKo(
                    M6_LIST,
                    M6_LIST_EN,
                    chargerString[0]?.standType,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[0]?.channel,
                  )}, ${chargerString[0]?.count} 대`
                : `: ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[0]?.channel,
                  )}, ${chargerString[0]?.count} 대`
              : '',
          },
          {
            dataLabel: 'charger2',
            value: chargerString[1]
              ? chargerString[1].standType
                ? ` ${convertKo(
                    M6_LIST,
                    M6_LIST_EN,
                    chargerString[1]?.standType,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[1]?.channel,
                  )}, ${chargerString[1]?.count} 대`
                : `: ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[1]?.channel,
                  )}, ${chargerString[1]?.count} 대`
              : '',
          },
          {
            dataLabel: 'charger3',
            value: chargerString[2]
              ? chargerString[2].standType
                ? ` ${convertKo(
                    M6_LIST,
                    M6_LIST_EN,
                    chargerString[2]?.standType,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[2]?.channel,
                  )}, ${chargerString[2]?.count} 대`
                : `: ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[2]?.channel,
                  )}, ${chargerString[2]?.count} 대`
              : '',
          },
          {
            dataLabel: 'charger4',
            value: chargerString[3]
              ? chargerString[3].standType
                ? ` ${convertKo(
                    M6_LIST,
                    M6_LIST_EN,
                    chargerString[3]?.standType,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[3]?.channel,
                  )}, ${chargerString[3]?.count} 대`
                : `: ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[3]?.channel,
                  )}, ${chargerString[3]?.count} 대`
              : '',
          },
          {
            dataLabel: 'charger5',
            value: chargerString[4]
              ? chargerString[4].standType
                ? ` ${convertKo(
                    M6_LIST,
                    M6_LIST_EN,
                    chargerString[4]?.standType,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[4]?.channel,
                  )}, ${chargerString[4]?.count} 대`
                : `: ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[4]?.channel,
                  )}, ${chargerString[4]?.count} 대`
              : '',
          },
          {
            dataLabel: 'installationLocation',
            value: chargerString[0]?.installationLocation,
          },
          {
            dataLabel: 'etcRequest',
            value: projectInProgress?.finalQuotation?.quotationRequest
              ?.etcRequest
              ? projectInProgress?.finalQuotation?.quotationRequest?.etcRequest
              : '없음',
          },
          {
            dataLabel: 'period',
            value: projectInProgress?.finalQuotation?.constructionPeriod,
          },
          // { dataLabel: 'constructionPeriod', value: '1,000,000,000' },
          {
            dataLabel: 'chargingStationInstallationPrice',
            value: projectInProgress?.finalQuotation
              ?.chargingStationInstallationPrice
              ? `${projectInProgress?.finalQuotation?.chargingStationInstallationPrice.toLocaleString()}`
              : '',
          },
          {
            dataLabel: 'charger2_1',
            value: chargerString[0]
              ? chargerString[0]?.standType
                ? ` ${convertKo(
                    M6_LIST,
                    M6_LIST_EN,
                    chargerString[0]?.standType,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[0]?.channel,
                  )}, ${chargerString[0]?.count} 대`
                : `: ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[0]?.channel,
                  )}, ${chargerString[0]?.count} 대`
              : '',
          },
          {
            dataLabel: 'charger2_2',
            value: chargerString[1]
              ? chargerString[1].standType
                ? ` ${convertKo(
                    M6_LIST,
                    M6_LIST_EN,
                    chargerString[1]?.standType,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[1]?.channel,
                  )}, ${chargerString[1]?.count} 대`
                : `: ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[1]?.channel,
                  )}, ${chargerString[1]?.count} 대`
              : '',
          },
          {
            dataLabel: 'charger2_3',
            value: chargerString[2]
              ? chargerString[2].standType
                ? ` ${convertKo(
                    M6_LIST,
                    M6_LIST_EN,
                    chargerString[2]?.standType,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[2]?.channel,
                  )}, ${chargerString[2]?.count} 대`
                : `: ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[2]?.channel,
                  )}, ${chargerString[2]?.count} 대`
              : '',
          },
          {
            dataLabel: 'charger2_4',
            value: chargerString[3]
              ? chargerString[3].standType
                ? ` ${convertKo(
                    M6_LIST,
                    M6_LIST_EN,
                    chargerString[3]?.standType,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[3]?.channel,
                  )}, ${chargerString[3]?.count} 대`
                : `: ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[3]?.channel,
                  )}, ${chargerString[3]?.count} 대`
              : '',
          },
          {
            dataLabel: 'charger2_5',
            value: chargerString[4]
              ? chargerString[4].standType
                ? ` ${convertKo(
                    M6_LIST,
                    M6_LIST_EN,
                    chargerString[4]?.standType,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[4]?.channel,
                  )}, ${chargerString[4]?.count} 대`
                : `: ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[4]?.channel,
                  )}, ${chargerString[4]?.count} 대`
              : '',
          },
          // chargePrice는 월구독료임 아직 백엔드에 추가 안돼서 추가되면 grapql 및 타입스크립트 수정해야함, value 값도!
          {
            dataLabel: 'chargePrice2_1',
            value: `${
              chargerString[0]?.chargePrice
                ? `${chargerString[0]?.chargePrice.toLocaleString()} 원`
                : ''
            }`,
          },
          {
            dataLabel: 'chargePrice2_2',
            value: `${
              chargerString[1]?.chargePrice
                ? `${chargerString[1]?.chargePrice.toLocaleString()} 원`
                : ''
            }`,
          },
          {
            dataLabel: 'chargePrice2_3',
            value: `${
              chargerString[2]?.chargePrice
                ? `${chargerString[2]?.chargePrice.toLocaleString()} 원`
                : ''
            }`,
          },
          {
            dataLabel: 'chargePrice2_4',
            value: `${
              chargerString[3]?.chargePrice
                ? `${chargerString[3]?.chargePrice.toLocaleString()} 원`
                : ''
            }`,
          },
          {
            dataLabel: 'chargePrice2_5',
            value: `${
              chargerString[4]?.chargePrice
                ? `${chargerString[4]?.chargePrice.toLocaleString()} 원`
                : ''
            }`,
          },
          {
            dataLabel: 'count2_1',
            value: `${
              chargerString[0]?.chargePrice
                ? `${chargerString[0]?.count} 대`
                : ''
            }`,
          },
          {
            dataLabel: 'count2_2',
            value: `${
              chargerString[1]?.chargePrice
                ? `${chargerString[1]?.count} 대`
                : ''
            }`,
          },
          {
            dataLabel: 'count2_3',
            value: `${
              chargerString[2]?.chargePrice
                ? `${chargerString[2]?.count} 대`
                : ''
            }`,
          },
          {
            dataLabel: 'count2_4',
            value: `${
              chargerString[3]?.chargePrice
                ? `${chargerString[3]?.count} 대`
                : ''
            }`,
          },
          {
            dataLabel: 'count2_5',
            value: `${
              chargerString[4]?.chargePrice
                ? `${chargerString[4]?.count} 대`
                : ''
            }`,
          },
          {
            dataLabel: 'subscribePeriod2_1',
            value: `${projectInProgress?.finalQuotation?.constructionPeriod} 개월`,
          },
          {
            dataLabel: 'subscribePeriod2_2',
            value: `${projectInProgress?.finalQuotation?.constructionPeriod} 개월`,
          },
          {
            dataLabel: 'subscribePeriod2_3',
            value: `${projectInProgress?.finalQuotation?.constructionPeriod} 개월`,
          },
          {
            dataLabel: 'subscribePeriod2_4',
            value: `${projectInProgress?.finalQuotation?.constructionPeriod} 개월`,
          },
          {
            dataLabel: 'subscribePeriod2_5',
            value: `${projectInProgress?.finalQuotation?.constructionPeriod} 개월`,
          },
          {
            dataLabel: 'chargeSum2_1',
            value: `${
              chargerString[0]?.chargePrice
                ? `${chargerString[0]?.chargePrice.toLocaleString()} 원`
                : ''
            }`,
          },
          {
            dataLabel: 'chargeSum2_2',
            value: `${
              chargerString[1]?.chargePrice
                ? `${chargerString[1]?.chargePrice.toLocaleString()} 원`
                : ''
            }`,
          },
          {
            dataLabel: 'chargeSum2_3',
            value: `${
              chargerString[2]?.chargePrice
                ? `${chargerString[2]?.chargePrice.toLocaleString()} 원`
                : ''
            }`,
          },
          {
            dataLabel: 'chargeSum2_4',
            value: `${
              chargerString[3]?.chargePrice
                ? `${chargerString[3]?.chargePrice.toLocaleString()} 원`
                : ''
            }`,
          },
          {
            dataLabel: 'chargeSum2_5',
            value: `${
              chargerString[4]?.chargePrice
                ? `${chargerString[4]?.chargePrice.toLocaleString()} 원`
                : ''
            }`,
          },
          // afterCharger는 아예 데이터 x, 그래서 나중에 백엔드 만들어지면 마찬가지로 grapql, 타입스크립트, value 수정해야함!
          {
            dataLabel: 'afterCharger1',
            value: chargerString[0]
              ? chargerString[0]?.standType
                ? ` ${convertKo(
                    M6_LIST,
                    M6_LIST_EN,
                    chargerString[0]?.standType,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[0]?.channel,
                  )}, ${chargerString[0]?.count} 대`
                : `: ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[0]?.channel,
                  )}, ${chargerString[0]?.count} 대`
              : '',
          },
          {
            dataLabel: 'afterCharger2',
            value: chargerString[1]
              ? chargerString[1].standType
                ? ` ${convertKo(
                    M6_LIST,
                    M6_LIST_EN,
                    chargerString[1]?.standType,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[1]?.channel,
                  )}, ${chargerString[1]?.count} 대`
                : `: ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[1]?.channel,
                  )}, ${chargerString[1]?.count} 대`
              : '',
          },
          {
            dataLabel: 'afterCharger3',
            value: chargerString[2]
              ? chargerString[2].standType
                ? ` ${convertKo(
                    M6_LIST,
                    M6_LIST_EN,
                    chargerString[2]?.standType,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[2]?.channel,
                  )}, ${chargerString[2]?.count} 대`
                : `: ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[2]?.channel,
                  )}, ${chargerString[2]?.count} 대`
              : '',
          },
          {
            dataLabel: 'afterCharger4',
            value: chargerString[3]
              ? chargerString[3].standType
                ? ` ${convertKo(
                    M6_LIST,
                    M6_LIST_EN,
                    chargerString[3]?.standType,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[3]?.channel,
                  )}, ${chargerString[3]?.count} 대`
                : `: ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[3]?.channel,
                  )}, ${chargerString[3]?.count} 대`
              : '',
          },
          {
            dataLabel: 'afterCharger5',
            value: chargerString[4]
              ? chargerString[4].standType
                ? ` ${convertKo(
                    M6_LIST,
                    M6_LIST_EN,
                    chargerString[4]?.standType,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[4]?.channel,
                  )}, ${chargerString[4]?.count} 대`
                : `: ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[4]?.channel,
                  )}, ${chargerString[4]?.count} 대`
              : '',
          },
          {
            dataLabel: 'afterChargePrice1',
            value: `${
              chargerString[0]?.chargePrice
                ? `${chargerString[0]?.chargePrice.toLocaleString()} 원`
                : ''
            }`,
          },
          {
            dataLabel: 'afterChargePrice2',
            value: `${
              chargerString[1]?.chargePrice
                ? `${chargerString[1]?.chargePrice.toLocaleString()} 원`
                : ''
            }`,
          },
          {
            dataLabel: 'afterChargePrice3',
            value: `${
              chargerString[2]?.chargePrice
                ? `${chargerString[2]?.chargePrice.toLocaleString()} 원`
                : ''
            }`,
          },
          {
            dataLabel: 'afterChargePrice4',
            value: `${
              chargerString[3]?.chargePrice
                ? `${chargerString[3]?.chargePrice.toLocaleString()} 원`
                : ''
            }`,
          },
          {
            dataLabel: 'afterChargePrice5',
            value: `${
              chargerString[4]?.chargePrice
                ? `${chargerString[4]?.chargePrice.toLocaleString()} 원`
                : ''
            }`,
          },
          {
            dataLabel: 'afterCount1',
            value: `${
              chargerString[0]?.chargePrice
                ? `${chargerString[0]?.count} 대`
                : ''
            }`,
          },
          {
            dataLabel: 'afterCount2',
            value: `${
              chargerString[1]?.chargePrice
                ? `${chargerString[1]?.count} 대`
                : ''
            }`,
          },
          {
            dataLabel: 'afterCount3',
            value: `${
              chargerString[2]?.chargePrice
                ? `${chargerString[2]?.count} 대`
                : ''
            }`,
          },
          {
            dataLabel: 'afterCount4',
            value: `${
              chargerString[3]?.chargePrice
                ? `${chargerString[3]?.count} 대`
                : ''
            }`,
          },
          {
            dataLabel: 'afterCount5',
            value: `${
              chargerString[4]?.chargePrice
                ? `${chargerString[4]?.count} 대`
                : ''
            }`,
          },
          {
            dataLabel: 'afterSubscribePeriod1',
            value: `${projectInProgress?.finalQuotation?.constructionPeriod} 개월`,
          },
          {
            dataLabel: 'afterSubscribePeriod2',
            value: `${projectInProgress?.finalQuotation?.constructionPeriod} 개월`,
          },
          {
            dataLabel: 'afterSubscribePeriod3',
            value: `${projectInProgress?.finalQuotation?.constructionPeriod} 개월`,
          },
          {
            dataLabel: 'afterSubscribePeriod4',
            value: `${projectInProgress?.finalQuotation?.constructionPeriod} 개월`,
          },
          {
            dataLabel: 'afterSubscribePeriod5',
            value: `${projectInProgress?.finalQuotation?.constructionPeriod} 개월`,
          },
          {
            dataLabel: 'afterChargeSum1',
            value: `${
              chargerString[0]?.chargePrice
                ? `${chargerString[0]?.chargePrice.toLocaleString()} 원`
                : ''
            }`,
          },
          {
            dataLabel: 'afterChargeSum2',
            value: `${
              chargerString[0]?.chargePrice
                ? `${chargerString[0]?.chargePrice.toLocaleString()} 원`
                : ''
            }`,
          },
          {
            dataLabel: 'afterChargeSum3',
            value: `${
              chargerString[0]?.chargePrice
                ? `${chargerString[0]?.chargePrice.toLocaleString()} 원`
                : ''
            }`,
          },
          {
            dataLabel: 'afterChargeSum4',
            value: `${
              chargerString[0]?.chargePrice
                ? `${chargerString[0]?.chargePrice.toLocaleString()} 원`
                : ''
            }`,
          },
          {
            dataLabel: 'afterChargeSum5',
            value: `${
              chargerString[0]?.chargePrice
                ? `${chargerString[0]?.chargePrice.toLocaleString()} 원`
                : ''
            }`,
          },
          {
            dataLabel: 'userInvestRate2',
            value: projectInProgress?.finalQuotation?.userInvestRate,
          },
          {
            dataLabel: 'chargingPointRate2',
            value: projectInProgress?.finalQuotation?.chargingPointRate,
          },
          {
            dataLabel: 'subscribePeriod2',
            value: projectInProgress?.finalQuotation?.constructionPeriod,
          },
          {
            dataLabel: 'userInvestRate3',
            value: projectInProgress?.finalQuotation?.userInvestRate,
          },
          //날짜
          {
            dataLabel: 'contractPeriod',
            value: `${moduSignDate(String(today))}`,
          },
          // 서명
          {
            dataLabel: 'signUserName',
            value: projectInProgress?.userMember?.name,
          },
          {
            dataLabel: 'signUserAddress',
            value: projectInProgress?.projectName,
          },
          {
            dataLabel: 'signUserName2',
            value: projectInProgress?.userMember?.name,
          },
          {
            dataLabel: 'signCompanyName',
            value: projectInProgress?.companyMember?.name,
          },
          {
            dataLabel: 'signCompanyAddress',
            value:
              projectInProgress?.companyMember?.companyMemberAdditionalInfo
                ?.companyAddress,
          },
          {
            dataLabel: 'signCompanyName2',
            value: projectInProgress?.companyMember?.name,
          },
        ],
        title: '엔티즌계약서',
      },
      // templateId: '767b58a0-66f1-11ed-92dc-eb196f6b079e',
      templateId: '280ebbc0-9e06-11ed-bc2e-a93d3faece59',
    }),
  };

  return fetch(url, options).then((res: Response) => res.json());
};
