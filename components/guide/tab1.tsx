import styled from '@emotion/styled';
import Image from 'next/image';
import ChargeInfo from 'public/guide/charge-info-img.png';
import Icon from 'public/guide/img-icon.svg';
const Tab1 = () => {
  return (
    <Container>
      <Image src={ChargeInfo} alt="charging-img" />
      <Message>
        <p>표를 확대하시면 더 자세히 볼 수 있습니다.</p>
        <Image src={Icon} alt="icon" />
      </Message>
    </Container>
  );
};

export default Tab1;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 8.25pt;
`;
const Message = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  padding-top: 15pt;
  & p {
    font-weight: 500;
    font-size: 9pt;
    line-height: 9pt;
    text-align: center;
    letter-spacing: -0.18pt;
    color: #a6a9b0;
  }
`;
