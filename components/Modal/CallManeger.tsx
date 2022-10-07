import styled from '@emotion/styled';
import Image from 'next/image';
import Phone from 'public/mypage/Phone.svg';
import colors from 'styles/colors';

interface Props {
  HandleModal: () => void;
}

const CallManeger = ({ HandleModal }: Props) => {
  return (
    <Wrapper>
      <Box>
        <div className="img-box">
          <Image src={Phone} alt="phone-icon" />
        </div>
        <div>통화 010-1544-2080</div>
      </Box>
      <Box onClick={HandleModal}>
        <div>취소</div>
      </Box>
    </Wrapper>
  );
};

export default CallManeger;

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 6.75pt;
  z-index: 100;
`;
const Box = styled.div`
  width: 359px;
  height: 56px;
  background: ${colors.lightWhite};
  border-radius: 9pt;
  position: relative;
  display: flex;
  justify-content: end;
  align-items: center;
  font-weight: 400;
  font-size: 13.5pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.blue2};
  .img-box {
    position: absolute;
    left: 15pt;
    top: 9pt;
  }
`;
