import styled from '@emotion/styled';
import { isTokenPatchApi } from 'api';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import colors from 'styles/colors';

interface Props {
    setFileModal: Dispatch<SetStateAction<boolean>>;
    imgClick : () => void;
    fileClick : ()=> void;
}

const WebFileModal = ({ setFileModal, imgClick, fileClick }: Props) => {
  const router = useRouter();
  const routerId = router?.query?.chattingRoomIdx!;
  const queryClinet = useQueryClient();
  
  return (
    <>
      <Box>
        <div className="list fisrt" onClick={imgClick}>
          사진
        </div>
        <div
          className="list"
          onClick={fileClick}
        >
          파일
        </div>
      </Box>
      <Wrapper onClick={() => setFileModal(false)} />
    </>
  );
};

export default WebFileModal;

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: none;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  gap: 6.75pt;
  @media (max-width: 899.25pt) {
    display: none;
  }

`;
const Box = styled.div`
  position: absolute;
  left: 9pt;
  overflow: hidden;
  border-radius: 9pt;
  background: white;
  width: 100pt;
  bottom: 55pt;
  //border: 1px solid;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  padding: 3pt 21pt;
  z-index: 5;
  .list {
    width: 100%;
    background: ${colors.lightWhite};
    font-weight: 400;
    font-size: 12pt;
    line-height: 12pt;
    padding: 15pt 0;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.blue4};
    cursor: pointer;
  }
  .fisrt {
    border-bottom: 1px solid #f3f4f7;
  }
`;
