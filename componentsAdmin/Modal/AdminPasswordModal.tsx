import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { DarkAdminBtn } from '../Layout';

type Props = {
  setModal: Dispatch<SetStateAction<boolean>>;
};

const AdminPasswordModal = ({ setModal }: Props) => {
  return (
    <Wrap onClick={() => setModal(false)}>
      {/* <BackGround onClick={() => setModal(false)} /> */}
      <Body>
        <Message>
          <img src="/images/Attention.png" alt="alert" />
          <P>
            <p>일치하는 정보가 없습니다.</p>
            <p>
              아이디, 이름 또는 이메일 주소를 <br /> 다시 한 번 확인
              부탁드립니다.
            </p>
          </P>
        </Message>
        <BtnBox>
          <DarkAdminBtn margin="0" onClick={() => setModal(false)}>
            확인
          </DarkAdminBtn>
        </BtnBox>
      </Body>
    </Wrap>
  );
};

export default AdminPasswordModal;

const Wrap = styled.div`
  position: fixed;
  /* min-width: 946px;
  height: 100%; */
  z-index: 50;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;

const BackGround = styled.div`
  position: absolute;
  min-width: 946px;
  height: 100%;
`;

const Body = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  background: white;

  img {
    width: 26px;
    height: 21px;
    margin-right: 12px;
  }
`;
const Message = styled.div`
  display: flex;
  width: 400px;
  padding: 36px 0 24px 24px;
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const P = styled.div`
  display: flex;
  flex-direction: column;
  p {
    font-style: normal;
    font-size: 16px;
    line-height: 150%;
    &:nth-of-type(1) {
      font-weight: 500;
    }
    &:nth-of-type(2) {
      font-weight: 400;
    }
  }
`;
const BtnBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  gap: 8px;
  padding: 10px 16px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const BtnBack = styled.div`
  background-color: white;
`;
