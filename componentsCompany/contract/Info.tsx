import { ReactJSXElementChildrenAttribute } from '@emotion/react/types/jsx-namespace';
import styled from '@emotion/styled';
import React, { ReactNode } from 'react';
import colors from 'styles/colors';

type Props = {
  children: ReactNode;
};

export default function Info({ children }: Props) {
  return (
    <ul>
      <li>
        <label>충전기 종류</label>
        <span>7kw</span>
      </li>
      <li>
        <label>타입</label>
        <span>벽걸이</span>
      </li>
      <li>
        <label>채널</label>
        <span>싱글</span>
      </li>
      <li>
        <label>수량</label>
        <span>2대</span>
      </li>
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
