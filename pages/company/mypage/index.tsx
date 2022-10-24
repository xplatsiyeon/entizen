import styled from '@emotion/styled';
import ProjectInProgress from 'componentsCompany/Mypage/ProjectInProgress';
import Image from 'next/image';
import React, { useState } from 'react';
import Nut from 'public/images/Nut.svg';
import colors from 'styles/colors';
import { useRouter } from 'next/router';

type Props = {};
interface Components {
  [key: number]: JSX.Element;
}

const Mypage = (props: Props) => {
  const route = useRouter();
  const [tabNumber, setTabNumber] = useState<number>(0);
  const [userName, setUserName] = useState<string>('윤세아');
  const TabType: string[] = ['진행 프로젝트', '완료 프로젝트'];

  const components: Components = {
    0: <ProjectInProgress />,
    // 1: <
  };

  return (
    <Wrapper>
      <Header>
        <span>
          <h1>{`${userName}님,`}</h1>
          <h2>안녕하세요!</h2>
        </span>
        <div className="img" onClick={() => route.push('/setting')}>
          <Image src={Nut} alt="nut-icon" />
        </div>
      </Header>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;

  @media (max-width: 899pt) {
    padding-bottom: 60pt;
  }
`;
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 21pt 15pt 0 15pt;
  & h1 {
    font-weight: 700;
    font-size: 21pt;
    line-height: 27pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  & h2 {
    font-weight: 500;
    font-size: 21pt;
    line-height: 27pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .img {
    /* 이미지 주변 클릭 범위 5px정도 늘려줌 */
    width: 22.5pt;
    height: 22.5pt;
    text-align: end;
  }
`;

export default Mypage;
