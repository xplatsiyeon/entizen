import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import colors from 'styles/colors';
import { useMutation, useQuery } from 'react-query';
import { Alerts, AlertsResponse } from 'types/alerts';
import { AxiosError } from 'axios';
import { isTokenGetApi, isTokenPatchApi } from 'api';
import {
  companyQuotationAlertsEn,
  companyProjectAlertsEn,
  companyAsAlertsEn,
} from 'assets/alerts';
import { useDispatch } from 'react-redux';
import { headerAction } from 'storeCompany/headerSlice';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

type Props = {
  num: number;
  now: string;
  type: string;
  openSubLink: boolean;
};

const CompanySubMenuBar = ({ type, num, now, openSubLink }: Props) => {
  let linkName: string[];
  let linkNameEn: string[];

  const router = useRouter();
  const dispatch = useDispatch();
  const { tabIdx } = useSelector((state: RootState) => state.headerSlice);
  // 마우스 오버
  const [hoverIdx, setHoverIdx] = useState(-1);
  const [show, setShow] = useState(false);

  // 알림 읽은 여부 확인
  const userID = sessionStorage?.getItem('USER_ID')!;
  const { data: alertData } = useQuery<AlertsResponse, AxiosError, Alerts>(
    'alerts',
    () => isTokenGetApi('/v1/alerts/unread-points'),
    {
      enabled: userID !== null ? true : false,
      select(res) {
        return res.data;
      },
    },
  );
  // 알림 읽음 여부 변경
  const { mutate: updateAlertMutate } = useMutation(isTokenPatchApi, {
    onSuccess: () => {},
    onError: () => {},
  });

  switch (type) {
    case 'myProject':
      linkName = ['진행 프로젝트', '완료 프로젝트'];
      linkNameEn = companyProjectAlertsEn;
      break;

    case 'as':
      linkName = ['신규 A/S', '히스토리'];
      linkNameEn = companyAsAlertsEn;
      break;

    case 'communication':
      linkName = [' '];
      linkNameEn = [' '];

      break;

    case 'estimate':
      linkName = ['받은 요청', '보낸 견적', '히스토리'];
      linkNameEn = companyQuotationAlertsEn;
      break;

    default:
      linkName = ['진행 프로젝트', '완료 프로젝트'];
      linkNameEn = companyProjectAlertsEn;
  }

  const handleLink = (idx: number) => {
    const userId = sessionStorage.getItem('USER_ID');

    if (!userId && type === 'project') {
      router.push('/signin');
    } else {
      if (type === 'myProject') {
        router.push({
          pathname: '/company/mypage',
          query: { id: idx },
        });
      } else if (type === 'myProject' && idx === 0) {
        router.push('/company/mypage');
      } else if (type === 'estimate' && idx === 0) {
        router.push('/company/quotation');
      } else if (type === 'estimate') {
        router.push({
          pathname: '/company/quotation',
          query: { id: idx },
        });
      } else if (type === 'communication') {
        router.push({
          pathname: '/company/quotation',
        });
      } else if (type === 'as') {
        router.push({
          pathname: '/company/as',
          query: { id: idx },
        });
      } else if (type === 'as' && idx === 0) {
        router.push('/company/as');
      }
    }
  };

  // 읽음 표시
  const onClickLink = (idx: number) => {
    handleLink(idx);
    dispatch(headerAction.setTabIdx(idx));

    const key = linkNameEn[idx];
    if (key) {
      updateAlertMutate({
        url: '/v1/alerts/unread-points',
        data: {
          [key]: true,
        },
      });
    }
  };

  // 불 들어오는 확인
  const getBell = (idx: number) => {
    let result = false;
    const target = linkNameEn[idx];

    if (alertData?.hasOwnProperty(target)) {
      result = alertData[target] as boolean;
    }
    return result;
  };

  return (
    <Wrap openSubLink={openSubLink}>
      {linkName.map((i, idx) => {
        return (
          <StyledLink
            key={idx}
            className={num === idx && type === now ? 'on' : undefined}
            tab={tabIdx?.toString()!}
            index={idx.toString()}
            onClick={() => onClickLink(idx)}
            onMouseOver={() => {
              setShow(true);
              setHoverIdx(idx);
            }}
            onMouseOut={() => {
              setShow(false);
              setHoverIdx(-1);
            }}
          >
            <Text>
              {i}
              {/* 읽음 표시 */}
              {type === 'estimate' && !getBell(idx) && <BellOnText />}
              {type === 'myProject' && !getBell(idx) && <BellOnText />}
              {type === 'as' && !getBell(idx) && <BellOnText />}
            </Text>

            {idx === tabIdx && <UnderLine />}
            {hoverIdx === idx && show && idx !== tabIdx && <UnderLine />}
          </StyledLink>
        );
      })}
    </Wrap>
  );
};

export default CompanySubMenuBar;

const Wrap = styled.ul<{ openSubLink: boolean | undefined }>`
  width: 900pt;
  height: 44.5pt;
  margin: 0 auto;
  display: ${({ openSubLink }) => (openSubLink === false ? 'none' : 'block')};
  :hover {
    width: 900pt;
    height: 44.5pt;
    margin: 0 auto;
  }
`;

const StyledLink = styled.li<{ tab: string; index: string }>`
  margin-right: 24pt;
  padding: 15pt 0;
  display: inline-block;
  text-align: center;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 500;
  font-weight: ${({ tab, index }) => (tab === index ? 700 : 500)};
  font-size: 12pt;
  line-height: 13.5pt;
  letter-spacing: -0.02em;
  color: ${({ tab, index }) => (tab === index ? colors.main : colors.main2)};
  text-decoration: none;
  cursor: pointer;
`;
const UnderLine = styled.div`
  width: 100%;
  height: 3pt;
  border-radius: 5pt;
  background-color: #5a2dc9;
  margin-top: 14pt;
`;
const Text = styled.span`
  position: relative;
`;

const BellOnText = styled.div`
  background-color: #5221cb;
  width: 4.5pt;
  height: 4.5pt;
  border-radius: 50%;
  position: absolute;
  top: -4.5pt;
  right: -4.5pt;
`;
