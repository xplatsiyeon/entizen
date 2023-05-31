import { ModuSignResponse } from 'QueryComponents/ModuSignQuery';
import { convertKo, PriceBasicCalculation } from 'utils/calculatePackage';
import {
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
import { ContractState } from 'storeCompany/contract';

type Props = {
  data: ModuSignResponse;
  newContractData: ContractState;
};

export const moduSign = ({
  data: data,
  newContractData: newContractData,
}: Props) => {
  console.log('data===>>');
  console.log(data);
  const fetch = require('node-fetch');
  const url = 'https://api.modusign.co.kr/documents/request-with-template';
  const projectInProgress = data?.project;
  const chargerString =
    projectInProgress?.finalQuotation?.finalQuotationChargers;

  // 계약하는 날짜 당일
  const today = new Date();

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Basic ${process.env.NEXT_PUBLIC_MODUSIGN_KEY}`,
    },

    body: JSON.stringify({
      document: {
        participantMappings: [
          // 유저
          {
            excluded: false,
            signingDuration: 20160,
            locale: 'ko',
            role: '유저',
            name: projectInProgress?.userMember?.name,
            signingMethod: {
              type: 'KAKAO',
              value: projectInProgress?.userMember?.phone,
              // type: 'EMAIL',
              // value: 'whljm1003@stevelabs.co',
            },
          },
          // 기업
          {
            excluded: false,
            signingDuration: 20160,
            locale: 'ko',
            role: '기업',
            name: projectInProgress?.companyMember?.companyMemberAdditionalInfo
              ?.companyName,
            signingMethod: {
              type: 'KAKAO',
              value: projectInProgress?.companyMember?.phone,
            },
          },
        ],
        requesterInputMappings: [
          // 유저 이름
          {
            dataLabel: 'userName',
            value: projectInProgress?.userMember?.name,
          },
          // 기업 이름
          {
            dataLabel: 'companyName',
            value: projectInProgress?.companyMember?.name,
          },
          // ============================ 제2조 [상품에 관한 사항] =================================
          // 충전기 설치 목적
          {
            dataLabel: 'projectName',
            value: projectInProgress?.projectName,
          },
          // 프로젝트 번호
          {
            dataLabel: 'projectNumber',
            value: projectInProgress?.projectNumber,
          },
          // 구독상품
          {
            dataLabel: 'subscribeProduct',
            value: convertKo(
              subscribeType,
              subscribeTypeEn,
              projectInProgress?.finalQuotation?.subscribeProduct,
            ),
          },
          // 구독 기간
          {
            dataLabel: 'subscribePeriod',
            value:
              projectInProgress?.finalQuotation?.constructionPeriod + '개월',
          },
          // 수익지분
          {
            dataLabel: 'userInvestRate',
            value:
              projectInProgress?.finalQuotation?.userInvestRate === '-'
                ? '-'
                : Math.floor(
                    Number(projectInProgress?.finalQuotation?.userInvestRate) *
                      100,
                  ) + '% (구매자)',
          },
          // 전기차 충전기 종류 및 수량
          {
            dataLabel: 'charger1',
            // value: '7kw 충전기(공용), 벽걸이, 싱글, 2대',
            value: chargerString[0]
              ? chargerString[0]?.standType
                ? `${convertKo(
                    M5_LIST,
                    M5_LIST_EN,
                    chargerString[0].kind,
                  )}, ${convertKo(
                    M6_LIST,
                    M6_LIST_EN,
                    chargerString[0]?.standType,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[0]?.channel,
                  )}, ${chargerString[0]?.count}대`
                : `${convertKo(
                    M5_LIST,
                    M5_LIST_EN,
                    chargerString[0].kind,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[0]?.channel,
                  )}, ${chargerString[0]?.count}대`
              : '',
          },
          {
            dataLabel: 'charger2',
            value: chargerString[1]
              ? chargerString[1].standType
                ? `${convertKo(
                    M5_LIST,
                    M5_LIST_EN,
                    chargerString[1].kind,
                  )}, ${convertKo(
                    M6_LIST,
                    M6_LIST_EN,
                    chargerString[1]?.standType,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[1]?.channel,
                  )}, ${chargerString[1]?.count}대`
                : `${convertKo(
                    M5_LIST,
                    M5_LIST_EN,
                    chargerString[1].kind,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[1]?.channel,
                  )}, ${chargerString[1]?.count}대`
              : '',
          },
          {
            dataLabel: 'charger3',
            value: chargerString[2]
              ? chargerString[2].standType
                ? `${convertKo(
                    M5_LIST,
                    M5_LIST_EN,
                    chargerString[2].kind,
                  )}, ${convertKo(
                    M6_LIST,
                    M6_LIST_EN,
                    chargerString[2]?.standType,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[2]?.channel,
                  )}, ${chargerString[2]?.count}대`
                : `${convertKo(
                    M5_LIST,
                    M5_LIST_EN,
                    chargerString[2].kind,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[2]?.channel,
                  )}, ${chargerString[2]?.count}대`
              : '',
          },
          {
            dataLabel: 'charger4',
            value: chargerString[3]
              ? chargerString[3].standType
                ? `${convertKo(
                    M5_LIST,
                    M5_LIST_EN,
                    chargerString[3].kind,
                  )}, ${convertKo(
                    M6_LIST,
                    M6_LIST_EN,
                    chargerString[3]?.standType,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[3]?.channel,
                  )}, ${chargerString[3]?.count}대`
                : `${convertKo(
                    M5_LIST,
                    M5_LIST_EN,
                    chargerString[3].kind,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[3]?.channel,
                  )}, ${chargerString[3]?.count}대`
              : '',
          },
          {
            dataLabel: 'charger5',
            value: chargerString[4]
              ? chargerString[4].standType
                ? `${convertKo(
                    M5_LIST,
                    M5_LIST_EN,
                    chargerString[4].kind,
                  )}, ${convertKo(
                    M6_LIST,
                    M6_LIST_EN,
                    chargerString[4]?.standType,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[4]?.channel,
                  )}, ${chargerString[4]?.count}대`
                : `${convertKo(
                    M5_LIST,
                    M5_LIST_EN,
                    chargerString[4].kind,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[4]?.channel,
                  )}, ${chargerString[4]?.count}대`
              : '',
          },
          // 충전기 설치 위치
          {
            dataLabel: 'installationLocation',
            value: convertKo(
              location,
              locationEn,
              chargerString[0]?.installationLocation,
            ),
          },
          // 기타 사항
          {
            dataLabel: 'etcRequest',
            value: newContractData.otherSpecifics
              ? newContractData.otherSpecifics
              : '-',
          },

          // ========================== 제 3조 [구독에 관한 사항] ==========================
          // 기간
          {
            dataLabel: 'period',
            value:
              projectInProgress?.finalQuotation?.quotationRequest
                ?.subscribePeriod,
          },
          // 구독 제품
          {
            dataLabel: 'product',
            value: convertKo(
              subscribeType,
              subscribeTypeEn,
              projectInProgress?.finalQuotation?.subscribeProduct,
            ),
          },
          // 구독 설명
          {
            dataLabel: 'productDescription',
            value: newContractData.productExplanation,
          },
          // 충전 인프라 설치비 - 항목
          {
            dataLabel: 'charger2_1',
            value: chargerString[0]
              ? chargerString[0]?.standType
                ? `${convertKo(
                    M5_LIST,
                    M5_LIST_EN,
                    chargerString[0].kind,
                  )}, ${convertKo(
                    M6_LIST,
                    M6_LIST_EN,
                    chargerString[0]?.standType,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[0]?.channel,
                  )}, ${chargerString[0]?.count}대`
                : `${convertKo(
                    M5_LIST,
                    M5_LIST_EN,
                    chargerString[0].kind,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[0]?.channel,
                  )}, ${chargerString[0]?.count}대`
              : '',
          },
          {
            dataLabel: 'charger2_2',
            value: chargerString[1]
              ? chargerString[1].standType
                ? `${convertKo(
                    M5_LIST,
                    M5_LIST_EN,
                    chargerString[1].kind,
                  )}, ${convertKo(
                    M6_LIST,
                    M6_LIST_EN,
                    chargerString[1]?.standType,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[1]?.channel,
                  )}, ${chargerString[1]?.count}대`
                : `${convertKo(
                    M5_LIST,
                    M5_LIST_EN,
                    chargerString[1].kind,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[1]?.channel,
                  )}, ${chargerString[1]?.count}대`
              : '',
          },
          {
            dataLabel: 'charger2_3',
            value: chargerString[2]
              ? chargerString[2].standType
                ? `${convertKo(
                    M5_LIST,
                    M5_LIST_EN,
                    chargerString[2].kind,
                  )}, ${convertKo(
                    M6_LIST,
                    M6_LIST_EN,
                    chargerString[2]?.standType,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[2]?.channel,
                  )}, ${chargerString[2]?.count}대`
                : `${convertKo(
                    M5_LIST,
                    M5_LIST_EN,
                    chargerString[2].kind,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[2]?.channel,
                  )}, ${chargerString[2]?.count}대`
              : '',
          },
          {
            dataLabel: 'charger2_4',
            value: chargerString[3]
              ? chargerString[3].standType
                ? `${convertKo(
                    M5_LIST,
                    M5_LIST_EN,
                    chargerString[3].kind,
                  )}, ${convertKo(
                    M6_LIST,
                    M6_LIST_EN,
                    chargerString[3]?.standType,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[3]?.channel,
                  )}, ${chargerString[3]?.count}대`
                : `${convertKo(
                    M5_LIST,
                    M5_LIST_EN,
                    chargerString[3].kind,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[3]?.channel,
                  )}, ${chargerString[3]?.count}대`
              : '',
          },
          {
            dataLabel: 'charger2_5',
            value: chargerString[4]
              ? chargerString[4].standType
                ? `${convertKo(
                    M5_LIST,
                    M5_LIST_EN,
                    chargerString[4].kind,
                  )}, ${convertKo(
                    M6_LIST,
                    M6_LIST_EN,
                    chargerString[4]?.standType,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[4]?.channel,
                  )}, ${chargerString[4]?.count}대`
                : `${convertKo(
                    M5_LIST,
                    M5_LIST_EN,
                    chargerString[4].kind,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[4]?.channel,
                  )}, ${chargerString[4]?.count}대`
              : '',
          },
          // 충전 인프라 설치비 - 충전기 구입
          {
            dataLabel: 'chargerPrice2_1',
            value: newContractData.productPrice[0]
              ? newContractData.productPrice[0]
              : '',
          },
          {
            dataLabel: 'chargerPrice2_2',
            value: newContractData.productPrice[1]
              ? newContractData.productPrice[1]
              : '',
          },
          {
            dataLabel: 'chargerPrice2_3',
            value: newContractData.productPrice[2]
              ? newContractData.productPrice[2]
              : '',
          },
          {
            dataLabel: 'chargerPrice2_4',
            value: newContractData.productPrice[3]
              ? newContractData.productPrice[3]
              : '',
          },
          {
            dataLabel: 'chargerPrice2_5',
            value: newContractData.productPrice[4]
              ? newContractData.productPrice[4]
              : '',
          },
          // 충전 인프라 설치비 - 설치 공사
          {
            dataLabel: 'chargerInstall2_1',
            value: newContractData.installationCost[0]
              ? newContractData.installationCost[0]
              : '',
          },
          {
            dataLabel: 'chargerInstall2_2',
            value: newContractData.installationCost[1]
              ? newContractData.installationCost[1]
              : '',
          },
          {
            dataLabel: 'chargerInstall2_3',
            value: newContractData.installationCost[2]
              ? newContractData.installationCost[2]
              : '',
          },
          {
            dataLabel: 'chargerInstall2_4',
            value: newContractData.installationCost[3]
              ? newContractData.installationCost[3]
              : '',
          },
          {
            dataLabel: 'chargerInstall2_5',
            value: newContractData.installationCost[4]
              ? newContractData.installationCost[4]
              : '',
          },
          // 구독 지급 시간 이전
          {
            dataLabel: 'beforeFeeMonth',
            value: newContractData.invoiceDeliveryDate,
          },
          // 구독 지급 시간 이후
          {
            dataLabel: 'afterFeeMonth',
            value: newContractData.subscriptionPaymentDate,
          },

          // 구독 설치 - 항목
          {
            dataLabel: 'charger3_1',
            value: chargerString[0]
              ? chargerString[0]?.standType
                ? `${convertKo(
                    M5_LIST,
                    M5_LIST_EN,
                    chargerString[0].kind,
                  )}, ${convertKo(
                    M6_LIST,
                    M6_LIST_EN,
                    chargerString[0]?.standType,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[0]?.channel,
                  )}, ${chargerString[0]?.count}대`
                : `${convertKo(
                    M5_LIST,
                    M5_LIST_EN,
                    chargerString[0].kind,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[0]?.channel,
                  )}, ${chargerString[0]?.count}대`
              : '',
          },
          {
            dataLabel: 'charger3_2',
            value: chargerString[1]
              ? chargerString[1].standType
                ? `${convertKo(
                    M5_LIST,
                    M5_LIST_EN,
                    chargerString[1].kind,
                  )}, ${convertKo(
                    M6_LIST,
                    M6_LIST_EN,
                    chargerString[1]?.standType,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[1]?.channel,
                  )}, ${chargerString[1]?.count}대`
                : `${convertKo(
                    M5_LIST,
                    M5_LIST_EN,
                    chargerString[1].kind,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[1]?.channel,
                  )}, ${chargerString[1]?.count}대`
              : '',
          },
          {
            dataLabel: 'charger3_3',
            value: chargerString[2]
              ? chargerString[2].standType
                ? `${convertKo(
                    M5_LIST,
                    M5_LIST_EN,
                    chargerString[2].kind,
                  )}, ${convertKo(
                    M6_LIST,
                    M6_LIST_EN,
                    chargerString[2]?.standType,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[2]?.channel,
                  )}, ${chargerString[2]?.count}대`
                : `${convertKo(
                    M5_LIST,
                    M5_LIST_EN,
                    chargerString[2].kind,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[2]?.channel,
                  )}, ${chargerString[2]?.count}대`
              : '',
          },
          {
            dataLabel: 'charger3_4',
            value: chargerString[3]
              ? chargerString[3].standType
                ? `${convertKo(
                    M5_LIST,
                    M5_LIST_EN,
                    chargerString[3].kind,
                  )}, ${convertKo(
                    M6_LIST,
                    M6_LIST_EN,
                    chargerString[3]?.standType,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[3]?.channel,
                  )}, ${chargerString[3]?.count}대`
                : `${convertKo(
                    M5_LIST,
                    M5_LIST_EN,
                    chargerString[3].kind,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[3]?.channel,
                  )}, ${chargerString[3]?.count}대`
              : '',
          },
          {
            dataLabel: 'charger3_5',
            value: chargerString[4]
              ? chargerString[4].standType
                ? `${convertKo(
                    M5_LIST,
                    M5_LIST_EN,
                    chargerString[4].kind,
                  )}, ${convertKo(
                    M6_LIST,
                    M6_LIST_EN,
                    chargerString[4]?.standType,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[4]?.channel,
                  )}, ${chargerString[4]?.count}대`
                : `${convertKo(
                    M5_LIST,
                    M5_LIST_EN,
                    chargerString[4].kind,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[4]?.channel,
                  )}, ${chargerString[4]?.count}대`
              : '',
          },
          // 구독 설치 - 구독료
          {
            dataLabel: 'chargerPrice3_1',
            value: newContractData.subscriptionFee[0]
              ? PriceBasicCalculation(
                  Number(
                    newContractData.subscriptionFee[0].replaceAll(',', ''),
                  ),
                )
              : '',
          },
          {
            dataLabel: 'chargerPrice3_2',
            value: newContractData.subscriptionFee[1]
              ? PriceBasicCalculation(
                  Number(
                    newContractData.subscriptionFee[1].replaceAll(',', ''),
                  ),
                )
              : '',
          },
          {
            dataLabel: 'chargerPrice3_3',
            value: newContractData.subscriptionFee[2]
              ? PriceBasicCalculation(
                  Number(
                    newContractData.subscriptionFee[2].replaceAll(',', ''),
                  ),
                )
              : '',
          },
          {
            dataLabel: 'chargerPrice3_4',
            value: newContractData.subscriptionFee[3]
              ? PriceBasicCalculation(
                  Number(
                    newContractData.subscriptionFee[3].replaceAll(',', ''),
                  ),
                )
              : '',
          },
          {
            dataLabel: 'chargerPrice3_5',
            value: newContractData.subscriptionFee[4]
              ? PriceBasicCalculation(
                  Number(
                    newContractData.subscriptionFee[4].replaceAll(',', ''),
                  ),
                )
              : '',
          },
          // 구독 설치 - 수량
          {
            dataLabel: 'chargerCount3_1',
            value: `${chargerString[0] ? `${chargerString[0]?.count}` : ''}`,
          },
          {
            dataLabel: 'chargerCount3_2',
            value: `${chargerString[1] ? `${chargerString[1]?.count}` : ''}`,
          },
          {
            dataLabel: 'chargerCount3_3',
            value: `${chargerString[2] ? `${chargerString[2]?.count}` : ''}`,
          },
          {
            dataLabel: 'chargerCount3_4',
            value: `${chargerString[3] ? `${chargerString[3]?.count}` : ''}`,
          },
          {
            dataLabel: 'chargerCount3_5',
            value: `${chargerString[4] ? `${chargerString[4]?.count}` : ''}`,
          },
          // 구독 설치 - 구독 기간
          {
            dataLabel: 'chargerPeriod3_1',
            value: chargerString[0]
              ? `${projectInProgress?.finalQuotation?.constructionPeriod}`
              : '',
          },
          {
            dataLabel: 'chargerPeriod3_2',
            value: chargerString[1]
              ? `${projectInProgress?.finalQuotation?.constructionPeriod}`
              : '',
          },
          {
            dataLabel: 'chargerPeriod3_3',
            value: chargerString[2]
              ? `${projectInProgress?.finalQuotation?.constructionPeriod}`
              : '',
          },
          {
            dataLabel: 'chargerPeriod3_4',
            value: chargerString[3]
              ? `${projectInProgress?.finalQuotation?.constructionPeriod}`
              : '',
          },
          {
            dataLabel: 'chargerPeriod3_5',
            value: chargerString[4]
              ? `${projectInProgress?.finalQuotation?.constructionPeriod}`
              : '',
          },
          // 구독 설치 - 충 구독금액
          {
            dataLabel: 'chargerSum3_1',
            value: chargerString[0]
              ? PriceBasicCalculation(
                  Number(
                    newContractData.subscriptionFee[0].replaceAll(',', ''),
                  ) *
                    Number(chargerString[0]?.count) *
                    Number(
                      projectInProgress?.finalQuotation?.constructionPeriod,
                    ),
                )
              : '',
          },
          {
            dataLabel: 'chargerSum3_2',
            value: chargerString[1]
              ? PriceBasicCalculation(
                  Number(
                    newContractData.subscriptionFee[1].replaceAll(',', ''),
                  ) *
                    Number(chargerString[1]?.count) *
                    Number(
                      projectInProgress?.finalQuotation?.constructionPeriod,
                    ),
                )
              : '',
          },
          {
            dataLabel: 'chargerSum3_3',
            value: chargerString[2]
              ? PriceBasicCalculation(
                  Number(
                    newContractData.subscriptionFee[2].replaceAll(',', ''),
                  ) *
                    Number(chargerString[2]?.count) *
                    Number(
                      projectInProgress?.finalQuotation?.constructionPeriod,
                    ),
                )
              : '',
          },
          {
            dataLabel: 'chargerSum3_4',
            value: chargerString[3]
              ? PriceBasicCalculation(
                  Number(
                    newContractData.subscriptionFee[3].replaceAll(',', ''),
                  ) *
                    Number(chargerString[3]?.count) *
                    Number(
                      projectInProgress?.finalQuotation?.constructionPeriod,
                    ),
                )
              : '',
          },
          {
            dataLabel: 'chargerSum3_5',
            value: chargerString[4]
              ? PriceBasicCalculation(
                  Number(
                    newContractData.subscriptionFee[4].replaceAll(',', ''),
                  ) *
                    Number(chargerString[4]?.count) *
                    Number(
                      projectInProgress?.finalQuotation?.constructionPeriod,
                    ),
                )
              : '',
          },
          // 구매자 투자 비율
          {
            dataLabel: 'userInvestRate2',
            value:
              projectInProgress?.finalQuotation?.userInvestRate === '-'
                ? '-'
                : Math.floor(
                    Number(projectInProgress?.finalQuotation?.userInvestRate) *
                      100,
                  ) + '',
          },
          // 판매자 투자 비율
          {
            dataLabel: 'chargingPointRate',
            value:
              projectInProgress?.finalQuotation?.chargingPointRate === '-'
                ? '-'
                : Math.floor(
                    Number(
                      projectInProgress?.finalQuotation?.chargingPointRate,
                    ) * 100,
                  ) + '',
          },
          // 마감일
          {
            dataLabel: 'deadlineDate',
            value: newContractData.deadlineDate,
          },
          // 정산일
          {
            dataLabel: 'paymentDeadlineDate',
            value: newContractData.paymentDeadlineDate,
          },
          // 취급 수수료
          {
            dataLabel: 'handlingFee',
            value: newContractData.handlingFee,
          },
          // 구독 기간 자동 연장 - 항목
          {
            dataLabel: 'afterCharger1',
            value: chargerString[0]
              ? chargerString[0]?.standType
                ? `${convertKo(
                    M5_LIST,
                    M5_LIST_EN,
                    chargerString[0].kind,
                  )}, ${convertKo(
                    M6_LIST,
                    M6_LIST_EN,
                    chargerString[0]?.standType,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[0]?.channel,
                  )}, ${chargerString[0]?.count}대`
                : `${convertKo(
                    M5_LIST,
                    M5_LIST_EN,
                    chargerString[0].kind,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[0]?.channel,
                  )}, ${chargerString[0]?.count}대`
              : '',
          },
          {
            dataLabel: 'afterCharger2',
            value: chargerString[1]
              ? chargerString[1].standType
                ? `${convertKo(
                    M5_LIST,
                    M5_LIST_EN,
                    chargerString[1].kind,
                  )}, ${convertKo(
                    M6_LIST,
                    M6_LIST_EN,
                    chargerString[1]?.standType,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[1]?.channel,
                  )}, ${chargerString[1]?.count}대`
                : `${convertKo(
                    M5_LIST,
                    M5_LIST_EN,
                    chargerString[1].kind,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[1]?.channel,
                  )}, ${chargerString[1]?.count}대`
              : '',
          },
          {
            dataLabel: 'afterCharger3',
            value: chargerString[2]
              ? chargerString[2].standType
                ? `${convertKo(
                    M5_LIST,
                    M5_LIST_EN,
                    chargerString[2].kind,
                  )}, ${convertKo(
                    M6_LIST,
                    M6_LIST_EN,
                    chargerString[2]?.standType,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[2]?.channel,
                  )}, ${chargerString[2]?.count}대`
                : `${convertKo(
                    M5_LIST,
                    M5_LIST_EN,
                    chargerString[2].kind,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[2]?.channel,
                  )}, ${chargerString[2]?.count}대`
              : '',
          },
          {
            dataLabel: 'afterCharger4',
            value: chargerString[3]
              ? chargerString[3].standType
                ? `${convertKo(
                    M5_LIST,
                    M5_LIST_EN,
                    chargerString[3].kind,
                  )}, ${convertKo(
                    M6_LIST,
                    M6_LIST_EN,
                    chargerString[3]?.standType,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[3]?.channel,
                  )}, ${chargerString[3]?.count}대`
                : `${convertKo(
                    M5_LIST,
                    M5_LIST_EN,
                    chargerString[3].kind,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[3]?.channel,
                  )}, ${chargerString[3]?.count}대`
              : '',
          },
          {
            dataLabel: 'afterCharger5',
            value: chargerString[4]
              ? chargerString[4].standType
                ? `${convertKo(
                    M5_LIST,
                    M5_LIST_EN,
                    chargerString[4].kind,
                  )}, ${convertKo(
                    M6_LIST,
                    M6_LIST_EN,
                    chargerString[4]?.standType,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[4]?.channel,
                  )}, ${chargerString[4]?.count}대`
                : `${convertKo(
                    M5_LIST,
                    M5_LIST_EN,
                    chargerString[4].kind,
                  )}, ${convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    chargerString[4]?.channel,
                  )}, ${chargerString[4]?.count}대`
              : '',
          },
          // 구독 기간 자동 연장 - 구독료
          {
            dataLabel: 'afterChargePrice1',
            value: newContractData.extensionSubscriptionFee[0]
              ? PriceBasicCalculation(
                  Number(
                    newContractData.extensionSubscriptionFee[0].replaceAll(
                      ',',
                      '',
                    ),
                  ),
                )
              : '',
          },
          {
            dataLabel: 'afterChargePrice2',
            value: newContractData.extensionSubscriptionFee[1]
              ? PriceBasicCalculation(
                  Number(
                    newContractData.extensionSubscriptionFee[1].replaceAll(
                      ',',
                      '',
                    ),
                  ),
                )
              : '',
          },
          {
            dataLabel: 'afterChargePrice3',
            value: newContractData.extensionSubscriptionFee[2]
              ? PriceBasicCalculation(
                  Number(
                    newContractData.extensionSubscriptionFee[2].replaceAll(
                      ',',
                      '',
                    ),
                  ),
                )
              : '',
          },
          {
            dataLabel: 'afterChargePrice4',
            value: newContractData.extensionSubscriptionFee[3]
              ? PriceBasicCalculation(
                  Number(
                    newContractData.extensionSubscriptionFee[3].replaceAll(
                      ',',
                      '',
                    ),
                  ),
                )
              : '',
          },
          {
            dataLabel: 'afterChargePrice5',
            value: newContractData.extensionSubscriptionFee[4]
              ? PriceBasicCalculation(
                  Number(
                    newContractData.extensionSubscriptionFee[4].replaceAll(
                      ',',
                      '',
                    ),
                  ),
                )
              : '',
          },
          // 구독 기간 자동 연장 - 수량
          {
            dataLabel: 'afterCount1',
            value: `${chargerString[0] ? `${chargerString[0]?.count}` : ''}`,
          },
          {
            dataLabel: 'afterCount2',
            value: `${chargerString[1] ? `${chargerString[1]?.count}` : ''}`,
          },
          {
            dataLabel: 'afterCount3',
            value: `${chargerString[2] ? `${chargerString[2]?.count}` : ''}`,
          },
          {
            dataLabel: 'afterCount4',
            value: `${chargerString[3] ? `${chargerString[3]?.count}` : ''}`,
          },
          {
            dataLabel: 'afterCount5',
            value: `${chargerString[4] ? `${chargerString[4]?.count}` : ''}`,
          },
          {
            dataLabel: 'afterSubscribePeriod1',
            value: chargerString[0]
              ? `${projectInProgress?.finalQuotation?.constructionPeriod}`
              : '',
          },
          // 구독 기간 자동 연장 - 구독기간
          {
            dataLabel: 'afterSubscribePeriod2',
            value: chargerString[1]
              ? `${projectInProgress?.finalQuotation?.constructionPeriod}`
              : '',
          },
          {
            dataLabel: 'afterSubscribePeriod3',
            value: chargerString[2]
              ? `${projectInProgress?.finalQuotation?.constructionPeriod}`
              : '',
          },
          {
            dataLabel: 'afterSubscribePeriod4',
            value: chargerString[3]
              ? `${projectInProgress?.finalQuotation?.constructionPeriod}`
              : '',
          },
          {
            dataLabel: 'afterSubscribePeriod5',
            value: chargerString[4]
              ? `${projectInProgress?.finalQuotation?.constructionPeriod}`
              : '',
          },
          // 구독 기간 자동 연장 - 총 구독금액
          {
            dataLabel: 'afterChargeSum1',
            value: chargerString[0]
              ? PriceBasicCalculation(
                  Number(
                    newContractData.extensionSubscriptionFee[0].replaceAll(
                      ',',
                      '',
                    ),
                  ) *
                    Number(chargerString[0]?.count) *
                    Number(
                      projectInProgress?.finalQuotation?.constructionPeriod,
                    ),
                )
              : '',
          },
          {
            dataLabel: 'afterChargeSum2',
            value: chargerString[1]
              ? PriceBasicCalculation(
                  Number(
                    newContractData.extensionSubscriptionFee[1].replaceAll(
                      ',',
                      '',
                    ),
                  ) *
                    Number(chargerString[1]?.count) *
                    Number(
                      projectInProgress?.finalQuotation?.constructionPeriod,
                    ),
                )
              : '',
          },
          {
            dataLabel: 'afterChargeSum3',
            value: chargerString[2]
              ? PriceBasicCalculation(
                  Number(
                    newContractData.extensionSubscriptionFee[2].replaceAll(
                      ',',
                      '',
                    ),
                  ) *
                    Number(chargerString[2]?.count) *
                    Number(
                      projectInProgress?.finalQuotation?.constructionPeriod,
                    ),
                )
              : '',
          },
          {
            dataLabel: 'afterChargeSum4',
            value: chargerString[3]
              ? PriceBasicCalculation(
                  Number(
                    newContractData.extensionSubscriptionFee[3].replaceAll(
                      ',',
                      '',
                    ),
                  ) *
                    Number(chargerString[3]?.count) *
                    Number(
                      projectInProgress?.finalQuotation?.constructionPeriod,
                    ),
                )
              : '',
          },
          {
            dataLabel: 'afterChargeSum5',
            value: chargerString[4]
              ? PriceBasicCalculation(
                  Number(
                    newContractData.extensionSubscriptionFee[4].replaceAll(
                      ',',
                      '',
                    ),
                  ) *
                    Number(chargerString[4]?.count) *
                    Number(
                      projectInProgress?.finalQuotation?.constructionPeriod,
                    ),
                )
              : '',
          },
          // 구독 상품
          {
            dataLabel: 'subscriptionType',
            value: convertKo(
              subscribeType,
              subscribeTypeEn,
              projectInProgress?.finalQuotation?.subscribeProduct,
            ),
          },
          // 구독 상품 설명
          {
            dataLabel: 'subscriptionContents',
            value: newContractData.penalty,
          },
          //날짜 - 년
          {
            dataLabel: 'contractYear',
            value: `${today.getFullYear().toString()}`,
          },
          //날짜 - 월
          {
            dataLabel: 'contractMonth',
            value: `${today.getMonth().toString()}`,
          },
          //날짜 - 일
          {
            dataLabel: 'contractDay',
            value: `${today.getDate().toString()}`,
          },
          // 구매자 - 서명
          {
            dataLabel: 'signUserName',
            value: projectInProgress?.userMember?.name,
          },
          // 판매자 - 상호명
          {
            dataLabel: 'signCompanyName',
            value:
              projectInProgress?.companyMember?.companyMemberAdditionalInfo
                .companyName,
          },
          // 판매자 - 사업자등록번호
          {
            dataLabel: 'signBusinessLicense',
            value: newContractData.companyRegistrationNumber,
          },
          // 판매자 - 주소
          {
            dataLabel: 'signCompanyAddress',
            value:
              projectInProgress?.companyMember?.companyMemberAdditionalInfo
                ?.companyAddress,
          },
          // 판매자 - 대표이사 이름
          {
            dataLabel: 'signCEO',
            value: newContractData.representativeName,
          },
        ],
        title: '엔티즌계약서',
      },

      // templateId: 'f63edf40-e314-11ed-9853-33cb678807c6',
      // templateId: '06595ba0-eeee-11ed-936c-a9796946f580',
      templateId: '06595ba0-eeee-11ed-936c-a9796946f580',
    }),
  };

  return fetch(url, options).then((res: Response) => res.json());
};
