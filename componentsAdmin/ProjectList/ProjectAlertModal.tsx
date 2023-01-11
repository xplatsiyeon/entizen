import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { DarkAdminBtn } from '../Layout';

type Props = {
  setProjectModal: Dispatch<SetStateAction<boolean>>;
  rightBtn: () => void;
  finalApprove: boolean;
};

const ProjectAlertModal = ({
  setProjectModal,
  rightBtn,
  finalApprove,
}: Props) => {
  return (
    <Wrap>
      <BackGround onClick={() => setProjectModal(false)} />
      <Body>
        <Message>
          <img src="/images/Attention.png" alt="alert" />
          {finalApprove === false ? (
            <P>
              <p>아직 승인 완료 단계가 아닙니다.</p>
              <p>승인 완료 단계 시 활성화되면 눌러주세요.</p>
            </P>
          ) : (
            <P>
              <p>프로젝트를 완료 하시겠습니까?</p>
              <p>승인 완료 시 수정이 불가능합니다.</p>
            </P>
          )}
        </Message>
        <BtnBox>
          {finalApprove === false ? (
            <>
              <DarkAdminBtn margin="0" onClick={() => setProjectModal(false)}>
                완료
              </DarkAdminBtn>
            </>
          ) : (
            <>
              <DarkAdminBtn margin="0" onClick={() => setProjectModal(false)}>
                취소
              </DarkAdminBtn>
              <DarkAdminBtn
                margin="0"
                onClick={() => {
                  rightBtn;
                  setProjectModal(false);
                }}
              >
                완료
              </DarkAdminBtn>
            </>
          )}
        </BtnBox>
      </Body>
    </Wrap>
  );
};

export default ProjectAlertModal;

const Wrap = styled.div`
  position: fixed;
  min-width: 946px;
  height: 100%;
  z-index: 50;
`;
const BackGround = styled.div`
  position: absolute;
  min-width: 946px;
  height: 100%;
`;

const Body = styled.div`
  position: absolute;
  top: 274px;
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
