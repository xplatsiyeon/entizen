import styled from '@emotion/styled';
import AsRequest from 'components/mypage/as/AsRequest';
import AsRequestFooter from 'components/mypage/as/AsRequestFooter';
import AsRequestPartner from 'components/mypage/as/AsRequestPartner';
import RequestMain from 'components/mypage/request/requestMain';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

const arr = [0, 1, 2, 3];

const asNumber = () => {
  const router = useRouter();
  const id = router?.query?.id;
  // const btnRef = useRef();
  let btnTag = <></>;

  const [index, setIndex] = useState<number>();

  useEffect(() => {
    if (id !== undefined) {
      // 0은 false로 취급되므로 if(id){ ... }로 조건문을 쓰면 id:0 은 값을 얻을 수 없다.
      // alert(id);
      setIndex(Number(id));
    }
  }, [id]);

  const handleClick = (st: string) => {
    router.push(`/mypage/as/${st}`);
  };

  const makeBtn = (text: string, query: string, className?: string) => {
    // alert('index!!' + index);
    return (
      <Btn
        className={className ? className : undefined}
        onClick={() => handleClick(query)}
      >
        <span>{text}</span>
      </Btn>
    );
  };

  useEffect(() => {}, []);
  switch (index) {
    case 0:
      // alert('index!!' + index);
      // setBtnTag(['수정하기', 'requestAS']);

      btnTag = makeBtn('수정하기', 'requestAS');
      break;
    case 2:
      // alert('index!!' + index);
      btnTag = makeBtn('A/S 완료하기', 'writeReview', 'as');
      break;
    case 3:
      // alert('index!!' + index);
      btnTag = makeBtn('리뷰보기', 'myReview', 'as');
      break;
    default:
      // alert('index!!' + index);
      btnTag = <></>;
  }

  return (
    <Body>
      {/* 피그마 마이페이지/A/S/4. 마이페이지 링크바 A/S 부분을 표시하기 위해서 num={2}를 넘긴다. (내 견적서는 0).
          const components: Components = {
          0: <WebEstimate/>,  
          2: <AsIndex />,
          }; num, page는 이 부분의 인덱스 넘버.
        */}
      <WebHeader num={2} now={'mypage'} />
      <Inner>
        <FlexBox>
          <Wrap1>
            {/* 회원 메뉴에 A/S 카테고리를 펼치기 위해 page={2}를 넘긴다. (내 견적서는 0).
                [id].tsx에서 리스트 호출하고 그 리스트를 RequestMain 컴포넌트에 넘겨줘야함,
              */}
            <RequestMain page={2} />
          </Wrap1>
          <Wrap2>
            {typeof index === 'number' && <AsRequest id={arr[index]} />}
            <AsRequestPartner />
            <Wrap3>
              <AsRequestFooter />
              {btnTag}
            </Wrap3>
          </Wrap2>
        </FlexBox>
      </Inner>
      <WebFooter />
    </Body>
  );
};

export default asNumber;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  //height: 810pt;
  background: #fcfcfc;

  @media (max-height: 809pt) {
    display: block;
    height: 100%;
  }
`;

const Inner = styled.div`
  display: block;
  position: relative;
  width: 900pt;
  margin: 45.75pt auto;

  @media (max-width: 899pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    margin: 0 auto;
  }
`;

const FlexBox = styled.div`
  display: flex;
  position: relative;
`;

const Wrap1 = styled.div`
  width: 255pt;
  border: 1px solid #e9eaee;
  border-radius: 6pt;
  height: 100%;

  @media (max-width: 899pt) {
    display: none;
  }
`;
const Wrap2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 60pt;

  @media (max-width: 899pt) {
    padding-left: 0pt;
  }
`;

const Wrap3 = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;

  @media (max-width: 899pt) {
    flex-direction: column;
    height: auto;
  }
`;

const Btn = styled.button`
  position: relative;
  padding: 15pt 0;
  margin-top: 40pt;
  margin-bottom: 15pt;
  margin-left: 15pt;
  margin-right: 15pt;
  color: #a6a9b0;
  border-radius: 6pt;
  border: 1px solid #e2e5ed;
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: center;
  background: none;

  &.as {
    color: white;
    background-color: #5221cb;
    border: none;
  }

  @media (max-width: 899pt) {
    margin-top: 45pt;
    margin-bottom: 36pt;
  }
`;
