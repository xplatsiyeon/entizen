import styled from '@emotion/styled';
import CallManager from 'components/Modal/CallManager';
import { useState } from 'react';
import colors from 'styles/colors';

type Prop = {
  name: string;
  phone: string;
  email: string;
};

const ManagerInfo = ({ name, phone, email }: Prop) => {
  const [isModal, setIsModal] = useState(false);
  const HandleModal = () => setIsModal((prev) => !prev);
  return (
    <Wrapper>
      {isModal && <CallManager HandleModal={HandleModal} />}
      <Subtitle>담당자 정보</Subtitle>
      <List>
        <Item>
          <span className="name">담당자</span>
          <span className="contents">{name}</span>
        </Item>
        <Item>
          <span className="name">이메일</span>
          <span className="contents">{email}</span>
        </Item>
        <Item>
          <span className="name">전화번호</span>
          <span className="phone" onClick={HandleModal}>
            {phone}
          </span>
        </Item>
      </List>
    </Wrapper>
  );
};

export default ManagerInfo;

const Wrapper = styled.div`
  padding: 0;
  @media (max-width: 899pt) {
    padding: 0 15pt;
  }
`;
const Subtitle = styled.h3`
  padding-top: 18pt;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  color: ${colors.main2};
`;
const List = styled.ul`
  padding-top: 24pt;
  display: flex;
  flex-direction: column;
  gap: 12pt;
`;
const Item = styled.li`
  display: flex;
  justify-content: space-between;

  .name {
    font-weight: 400;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.gray2};
  }
  .contests {
    font-weight: 500;
    font-size: 12pt;
    line-height: 12pt;
    text-align: right;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .phone {
    font-weight: 400;
    font-size: 10.5pt;
    line-height: 12pt;
    text-align: right;
    letter-spacing: -0.02em;
    text-decoration-line: underline;
    color: ${colors.blue};
  }
`;
