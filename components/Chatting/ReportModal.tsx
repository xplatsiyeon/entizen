import React from 'react';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  deleteId?: number;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ReportModal = ({ setModal }: Props) => {
  return (
    <Body>
      <Wrapper onClick={() => setModal(false)} />
      <Modal>
        <P>신고가 완료 됐습니다.</P>
        <Box>
          <Btn className="quit" onClick={() => setModal(false)}>
            <span>확인</span>
          </Btn>
          {/* onClick에 대화 나가기 api(del) 달기. */}
          {/* <Btn className="quit">
            <span>나가기</span>
          </Btn> */}
        </Box>
      </Modal>
    </Body>
  );
};

export default ReportModal;

const Body = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 5;

  @media (min-width: 900pt) {
    position: absolute;
    background-color: #6b6b6b2e;
  }
`;
const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #22222261;

  @media (min-width: 900pt) {
    width: 100%;
    height: 100%;
    background-color: transparent;
  }
`;
const Modal = styled.div`
  background: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 6pt;
  width: 80%;
  height: 20%;
  @media (min-width: 900pt) {
    top: 40%;
    left: 28%;
    width: 22%;
    height: 40%;
  }
`;
const P = styled.p`
  white-space: pre-wrap;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 500;
  font-size: 12pt;
  line-height: 18pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: #222222;
  padding: 25pt 15pt;

  @media (min-width: 900pt) {
    width: 250.5pt;
    padding: 80pt 30pt 33pt;
    font-weight: 700;
    font-size: 21pt;
    line-height: 33pt;
    color: #222222;
  }
`;

const Box = styled.div`
  display: flex;
`;
const Btn = styled.button`
  flex: 1;
  text-align: center;
  padding: 15pt 0;
  background: white;
  border-bottom-left-radius: 6pt;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: #222222;
  &.quit {
    color: #f75015;
    border-bottom-left-radius: 0pt;
    border-bottom-right-radius: 6pt;
  }

  @media (min-width: 900pt) {
    margin: 0pt 30pt 30pt 0;
    border-radius: 6pt;
    &:nth-of-type(1) {
      margin: 0pt 12pt 30pt 30pt;
    }
    &.quit {
      border-radius: 6pt;
    }
  }
`;
