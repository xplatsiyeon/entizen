import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import colors from 'styles/colors';

type Props = {
  setTabNumber: React.Dispatch<React.SetStateAction<number>>;
  tabNumber?: number;
  componentId: number | undefined;
  successComponentId: number | undefined;
  linkState?: string;
  num?: number;
  now?: string;
  type?: string;
  openSubLink: boolean;
};

interface Components {
  [key: number]: JSX.Element;
}

const MyprojectLink = ({
  setTabNumber,
  tabNumber,
  componentId,
  linkState,
  type,
  num,
  now,
  openSubLink,
}: Props) => {
  let linkName: string[];
  let linkUrl: string[];
  let linkNum: number[];

  const router = useRouter();

  switch (type) {
    case 'myProject':
      linkName = ['진행 프로젝트', '완료 프로젝트'];
      linkUrl = [`/company/mypage`, `/company/mypage`];
      break;

    case 'as':
      linkName = ['신규 A/S', '히스토리'];
      linkUrl = [`/company/as`, `/company/as`];
      break;

    case 'communication':
      linkName = [' '];
      linkUrl = [`/company/mypage`];
      break;

    case 'estimate':
      linkName = ['받은 요청', '보낸 견적', '히스토리'];
      linkUrl = [
        `/company/quotation`,
        `/company/quotation`,
        '/company/quotation',
      ];
      break;

    default:
      linkName = ['진행 프로젝트', '완료 프로젝트'];
      linkUrl = [`/company/mypage`, `/company/mypage`];
  }

  // const handleLink = (idx: number) => {
  //   const user = localStorage.getItem('USER_ID');
  //   if (!user && type === 'project') {
  //     router.push('/signin');
  //   } else {
  //     if (linkUrl[idx] === '/mypage') {
  //       alert('2차 작업 범위입니다');
  //     } else {
  //       router.push(linkUrl[idx]);
  //     }
  //   }
  // };

  const handleLink = (idx: number) => {
    const user = localStorage.getItem('USER_ID');
    if (!user && type === 'project') {
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

  return (
    <Wrap openSubLink={openSubLink}>
      {linkName.map((i, idx) => {
        return (
          <StyledLink
            key={idx}
            className={num === idx && type === now ? 'on' : undefined}
            tab={tabNumber?.toString()!}
            index={idx.toString()}
            onClick={() => {
              // setTabNumber(idx);
              handleLink(idx);
            }}
          >
            {i}
          </StyledLink>
        );
      })}
    </Wrap>
  );
};

export default MyprojectLink;

const Wrap = styled.ul<{ openSubLink: boolean }>`
  width: 900pt;
  height: 44.5pt;
  margin: 0 auto;
  /* display: ${({ openSubLink }) =>
    openSubLink === false ? 'none' : 'block'}; */
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
  font-size: 12pt;
  line-height: 13.5pt;
  letter-spacing: -0.02em;
  color: ${({ tab, index }) =>
    tab === index ? colors.main : colors.lightGray};
  text-decoration: none;
  cursor: pointer;
  &:hover {
    border-bottom: 3pt solid #5a2dc9;
    box-sizing: border-box;
  }
  &.on {
    border-bottom: 3pt solid #5a2dc9;
    box-sizing: border-box;
  }
`;
