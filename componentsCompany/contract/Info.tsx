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
import { FinalQuotationChargers } from 'QueryComponents/CompanyQuery';
import React from 'react';
import { convertKo } from 'utils/calculatePackage';

type Props = {
  charger: FinalQuotationChargers;
};

export default function Info({ charger }: Props) {
  return (
    <React.Fragment>
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
        <span>{convertKo(M8_LIST, M8_LIST_EN, charger.count.toString())}</span>
      </li>
    </React.Fragment>
  );
}
