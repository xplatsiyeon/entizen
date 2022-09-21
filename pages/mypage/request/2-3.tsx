import styled from '@emotion/styled';
import MypageHeader from 'components/mypage/request/header';
import { useRouter } from 'next/router';
import { useState } from 'react';
import colors from 'styles/colors';

const Mypage2_3 = () => {
  const route = useRouter();
  const [tabNumber, setTabNumber] = useState<number>(-1);

  const acceptModal = () => {
    console.log('수락하기 모달? ');
  };
  const HandleDateChange = () => route.push('mypage/request/2-4');
  return (
    <Wrapper>
      <MypageHeader exitBtn={true} />
      <H1>
        일정 변경 요청을 <br />
        수락하시겠습니까?
      </H1>
      <Notice>변경하실 날짜를 선택해주세요.</Notice>
      <List>
        {[1, 1, 1].map((_, index) => (
          <Item
            check={tabNumber.toString()}
            idx={index.toString()}
            key={index}
            onClick={() => setTabNumber(index)}
          >
            <div className="date">2022.01.21</div>
            <div className="day">토요일</div>
          </Item>
        ))}
      </List>
      <Btn>
        <button className="left" onClick={HandleDateChange}>
          다른 날짜 제안
        </button>
        <button className="right" onClick={acceptModal}>
          수락하기
        </button>
      </Btn>
    </Wrapper>
  );
};

export default Mypage2_3;

const Wrapper = styled.div``;
const H1 = styled.h1`
  padding-left: 15pt;
  font-weight: 500;
  font-size: 18pt;
  line-height: 24pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;
const Notice = styled.h3`
  padding-left: 15pt;
  padding-top: 45pt;
  font-weight: 700;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;
const List = styled.ul`
  padding: 0 15pt;
`;
const Item = styled.li<{ idx: string; check: string }>`
  padding: 18.75pt 0;
  margin-top: 9pt;
  background: ${colors.lightWhite};
  border-style: solid;
  border-width: 0.75pt;
  border-color: ${({ check, idx }) =>
    check === idx ? colors.main : colors.gray};
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4.5pt;
  .date {
    font-weight: 600;
    font-size: 15pt;
    line-height: 18pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${({ check, idx }) =>
      check === idx ? colors.main : colors.lightGray2};
  }
  .day {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 18pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.lightGray2};
  }
`;
const Btn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  & button {
    font-weight: 700;
    font-size: 12pt;
    line-height: 12pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.lightWhite};
    width: 100%;
    padding-top: 15pt;
    padding-bottom: 39pt;
  }
  .left {
    background: rgba(90, 45, 201, 0.5);
  }
  .right {
    background: #5a2dc9;
  }
`;
