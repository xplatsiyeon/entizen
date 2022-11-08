import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import colors from 'styles/colors';
import ProjectInProgress from 'componentsCompany/Mypage/ProjectInProgress';
import FinishedProjects from 'componentsCompany/Mypage/FinishedProjects';
import NoProject from 'componentsCompany/Mypage/NoProject';

type Props = {
  type: string;
  num?: number;
  now?: string;
};

interface Components {
  [key: number]: JSX.Element;
}

const myprojectLink = () => {
  const router = useRouter();
  const [tabNumber, setTabNumber] = useState<number>(0);
  let linkName: string[];
  const TabType: string[] = ['진행 프로젝트', '완료 프로젝트'];
  const components: Components = {
    0: <ProjectInProgress tabNumber={tabNumber} />,
    1: <FinishedProjects tabNumber={tabNumber} />,
    2: <NoProject />,
  };

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

  return (
    <Wrap>
      {TabType.map((tab, index) => {
        return (
          <StyledLink
            key={index}
            tab={tabNumber.toString()}
            index={index.toString()}
            onClick={() => setTabNumber(index)}
          >
            {tab}
          </StyledLink>
        );
      })}
      {/* 탭 */}
      {/* {components[tabNumber]} */}
      <NoProject />
    </Wrap>
  );
};

export default myprojectLink;

const Wrap = styled.ul`
  width: 900pt;
  height: 44.5pt;
  margin: 0 auto;
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
