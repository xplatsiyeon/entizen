import styled from '@emotion/styled';
import { Box } from '@mui/material';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import colors from 'styles/colors';
import BackImg from 'public/images/back-btn.svg';
import Nut from 'public/images/Nut.svg';
import Bell from 'public/images/bell.svg';
import Loader from 'components/Loader';
import { useRouter } from 'next/router';
const arr = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 1, 2,
  3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];
const Alam = () => {
  const router = useRouter();
  const tabList: string[] = ['전체 알림', '공지사항'];
  const [tab, setTab] = useState<number>(0);
  const [list, setList] = useState(arr.slice(0, 5));
  const [isLoading, setIsLoading] = useState(false);
  const [isScroll, setIsScroll] = useState(false);

  const loadRef = useRef(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const tabHandler = (num: number) => setTab(num);
  const onClicklist = () => {
    router.push('/alarm/1-2');
  };
  // 무한 스크롤
  const onIntersect = useCallback(
    async (entry: any, observer: any) => {
      if (entry[0].isIntersecting) {
        observer.unobserve(entry[0].target);
        await new Promise((resolve) => setTimeout(resolve, 500));
        setList((list) => list.concat(arr.slice(list.length, list.length + 5)));
        observer.observe(entry[0].target);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [arr],
  );
  // 무한 스크롤
  useEffect(() => {
    if (loadRef.current && !isLoading && list.length !== arr.length) {
      setIsScroll(true);
      observerRef.current = new IntersectionObserver(onIntersect, {
        threshold: 0.4,
      });
      if (isScroll) {
        observerRef.current.observe(loadRef.current);
      }
    }
    return () => {
      setIsScroll(false);
      observerRef.current && observerRef.current.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list, arr, isScroll, isLoading, onIntersect]);

  return (
    <Wrapper>
      <Header>
        <div className="back-img" onClick={() => router.back()}>
          <Image
            style={{
              cursor: 'pointer',
              width: '18pt',
              height: '18pt',
            }}
            src={BackImg}
            alt="btn"
          />
        </div>
        <span className="text">알림함</span>
        <div className="setting-img" onClick={() => router.push('/alarm/1-1')}>
          <Image
            style={{
              cursor: 'pointer',
              width: '18pt',
              height: '18pt',
            }}
            src={Nut}
            alt="nut"
          />
        </div>
      </Header>
      <Tab>
        {tabList.map((text, index) => (
          <Text
            tab={tab.toString()}
            idx={index.toString()}
            className="tab-item"
            key={index}
            onClick={() => tabHandler(index)}
          >
            {text}
            {tab === index && <Line />}
          </Text>
        ))}
      </Tab>
      {list.length === 0 && (
        <Body>
          <Image src={Bell} alt="bell" />
          <p className="text">새로운 알림이 없습니다</p>
        </Body>
      )}
      {tab === 0 && (
        <Main>
          {list.map((_, index) => (
            <ContensBox key={index} onClick={onClicklist}>
              <label className="label">[견적마감]</label>
              <p className="contents">서비스 이용 약관 개정 안내드립니다.</p>
              <div className="period">1주 전</div>
              <div className="line"></div>
            </ContensBox>
          ))}
        </Main>
      )}
      {tab === 1 && (
        <Main>
          {list.map((_, index) => (
            <ContensBox key={index} onClick={onClicklist}>
              <p className="contents">서비스 이용 약관 개정 안내드립니다.</p>
              <div className="period">1주 전</div>
              <div className="line"></div>
            </ContensBox>
          ))}
        </Main>
      )}

      <div ref={loadRef}>{isScroll && !isLoading && <Loader />}</div>
    </Wrapper>
  );
};

export default Alam;

const Wrapper = styled.div`
  padding-bottom: 20pt;
`;
const Header = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36pt;
  padding: 9pt 0;
  padding: 0 15pt;
  .back-img {
    position: absolute;
    left: 7pt;
    padding: 5px;
  }
  .text {
    font-weight: 700;
    font-size: 12pt;
    line-height: 18pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .setting-img {
    position: absolute;
    right: 7pt;
    padding: 5px;
  }
`;
const Tab = styled(Box)`
  display: flex;
  border-bottom: 1px solid #f3f4f7;
`;
const Text = styled.div<{ tab: string; idx: string }>`
  width: 50%;
  text-align: center;
  font-weight: 700;
  font-size: 12pt;
  line-height: 15pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${({ tab, idx }) => (tab === idx ? colors.main : '#caccd1')};
  padding: 12pt 0;
  position: relative;
`;
const Line = styled.div`
  position: absolute;
  left: 15pt;
  right: 15pt;
  bottom: 0;
  border-bottom: 3pt solid ${colors.main};
  border-radius: 3.75pt;
`;
const Body = styled.div`
  padding-top: 176px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .text {
    padding-top: 12pt;
    font-weight: 500;
    font-size: 12pt;
    line-height: 12pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.lightGray2};
  }
`;
const Main = styled.div`
  padding-top: 30pt;
`;
const ContensBox = styled(Box)`
  position: relative;
  padding-left: 15pt;
  margin-top: 16px;
  .label {
    font-weight: 400;
    font-size: 10.5pt;
    line-height: 15pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .contents {
    padding-top: 3pt;
    font-weight: 500;
    font-size: 12pt;
    line-height: 15pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .period {
    font-weight: 400;
    font-size: 9pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: #caccd1;
    padding-bottom: 16px;
    padding-top: 6pt;
  }
  .line {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;

    border-bottom: 1px solid ${colors.gray};
  }
`;
