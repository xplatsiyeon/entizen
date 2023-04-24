import { useQuery } from '@apollo/client';
import { ReactJSXElementChildrenAttribute } from '@emotion/react/types/jsx-namespace';
import styled from '@emotion/styled';
import {
  M5_LIST,
  M5_LIST_EN,
  M6_LIST,
  M6_LIST_EN,
  M7_LIST,
  M7_LIST_EN,
  M8_LIST,
  M8_LIST_EN,
} from 'assets/selectList';
import { useRouter } from 'next/router';
import {
  GET_InProgressProjectsDetail,
  InProgressProjectsDetailResponse,
} from 'QueryComponents/CompanyQuery';
import React, { ReactNode } from 'react';
import colors from 'styles/colors';
import { convertKo } from 'utils/calculatePackage';

type Props = {
  children: ReactNode;
};

export default function Info({ children }: Props) {
  const router = useRouter();
  // -------------진행중인 프로젝트 상세 리스트 api-------------
  const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const { loading, error, data, refetch } =
    useQuery<InProgressProjectsDetailResponse>(GET_InProgressProjectsDetail, {
      variables: {
        projectIdx: router?.query?.projectIdx!,
      },
      context: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ContentType: 'application/json',
        },
      },
    });

  const finalQuotationChargers =
    data?.project.finalQuotation.finalQuotationChargers;

  console.log('🔥 data : ', data);
  console.log('🔥 finalQuotationChargers : ', finalQuotationChargers);
  return (
    <ul>
      {finalQuotationChargers?.map((charger, idx) => (
        <React.Fragment key={idx}>
          <li>
            <label>충전기 종류</label>
            <span>{convertKo(M5_LIST, M5_LIST_EN, charger.kind)}</span>
          </li>
          <li>
            <label>타입</label>
            <span>{convertKo(M6_LIST, M6_LIST_EN, charger.standType)}</span>
          </li>
          <li>
            <label>채널</label>
            <span>{convertKo(M7_LIST, M7_LIST_EN, charger.channel)}</span>
          </li>
          <li>
            <label>수량</label>
            <span>
              {convertKo(M8_LIST, M8_LIST_EN, charger.count.toString())}
            </span>
          </li>
        </React.Fragment>
      ))}

      <Line />
      {/* 변경되는 값들 */}
      {children}
    </ul>
  );
}

const Name = styled.span`
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;

const Line = styled.div`
  border: 1px solid #e2e5ed;
  margin-top: 18pt;
  margin-bottom: 18pt;
`;
