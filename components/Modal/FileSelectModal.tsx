import styled from '@emotion/styled';
import Image from 'next/image';
import Phone from 'public/mypage/Phone.svg';
import { useRef } from 'react';
import colors from 'styles/colors';

interface Props {
  fileText?: string;
  onClickFile: () => void;
  photoText?: string;
  onClickPhoto: () => void;
  cencleBtn: () => void;
}

const FileSelectModal = ({
  fileText,
  onClickFile,
  photoText,
  onClickPhoto,
  cencleBtn,
}: Props) => {
  const outside = useRef<HTMLDivElement | null>(null);

  const handleModalClose = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (outside) {
      if (outside.current === e.target) {
        cencleBtn();
      }
    }
  };

  return (
    <Wrapper ref={outside} onClick={(e) => handleModalClose(e)}>
      <Box>
        <div className="list fisrt" onClick={onClickPhoto}>
          {fileText ? fileText : '사진'}
        </div>
        <div className="list" onClick={onClickFile}>
          {photoText ? photoText : '파일'}
        </div>
      </Box>
      <BottomBtn onClick={cencleBtn}>취소</BottomBtn>
    </Wrapper>
  );
};

export default FileSelectModal;

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
  display: flex;
  justify-content: end;
  align-items: center;
  flex-direction: column;
  gap: 6.75pt;
  z-index: 999999;
`;
const Box = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  border-radius: 9pt;
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
  @media (min-width: 900pt) {
    width: 300pt;
  }
`;
const BottomBtn = styled.div`
  width: 100%;
  background: ${colors.lightWhite};
  font-weight: 400;
  font-size: 12pt;
  line-height: 12pt;
  padding: 15pt 0;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.gray2};
  border-radius: 9pt;
  cursor: pointer;
  @media (min-width: 900pt) {
    width: 300pt;
  }
`;
