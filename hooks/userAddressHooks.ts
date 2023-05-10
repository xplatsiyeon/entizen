import axios from 'axios';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addressSliceAction } from 'store/addressSlice';
import { RootState } from 'store/store';
import useDebounce from './useDebounce';

export interface addressType {
  admCd: string;
  jibunAddr: string;
  roadAddr: string;
  roadAddrPart1: string;
  bdKdcd?: string;
  bdMgtSn?: string;
  bdNm?: string;
  buldMnnm?: string;
  buldSlno?: string;
  detBdNmList?: string;
  emdNm?: string;
  emdNo?: string;
  engAddr?: string;
  liNm?: string;
  lnbrMnnm?: string;
  lnbrSlno?: string;
  mtYn?: string;
  rn?: string;
  rnMgtSn?: string;
  roadAddrPart2?: string;
  sggNm?: string;
  siNm?: string;
  udrtYn?: string;
  zipNo?: string;
}

export type Response = [
  string,
  (keyword: string) => {
    payload: string;
    type: string;
  },
  addressType[],
  Dispatch<SetStateAction<addressType[]>>,
];
/**
 *
 * @param [state, setState, results];
 * @returns results: 최종 주소값;
 */
export default function userAddressHooks(): Response {
  // const [keyword, setKeyword] = useState<string>('');
  const dispatch = useDispatch();
  const { keyword } = useSelector((state: RootState) => state.addressSlice);
  const setKeyword = (keyword: string) => {
    return dispatch(addressSliceAction.setAddressSlice(keyword));
  };

  const [results, setResults] = useState<addressType[]>([]); // 주소에 저장할 최종 결과값
  let searchValue = useDebounce(keyword, 300); //디바운스 처리로 검색 최적화

  // 주소 API 호출
  async function getAddress() {
    let answer: any = [];
    await axios
      .get(
        `https://business.juso.go.kr/addrlink/addrLinkApiJsonp.do?currentPage=1&countPerPage=50&keyword=${searchValue}&confmKey=${process.env.NEXT_PUBLIC_ADDRESS_FIND_KEY}&resultType=json`,
      )
      .then((data) => {
        const match = data.data.match(/\((.*)\)/);
        let jsonResult = JSON.parse(match[1].toString()).results.juso;
        jsonResult?.map((el: any, index: number) => {
          answer.push(el);
        });
        setResults(answer);
      });
  }

  useEffect(() => {
    if (searchValue.length > 0) {
      getAddress();
    }
  }, [searchValue]);

  return [keyword, setKeyword, results, setResults];
}
