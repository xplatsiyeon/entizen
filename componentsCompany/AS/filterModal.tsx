import styled from '@emotion/styled';
import FileSelectModal from 'components/Modal/FileSelectModal';
import { Dispatch, MouseEvent, SetStateAction, useRef } from 'react';

type Props = {
  setModal: Dispatch<SetStateAction<boolean>>;
  setSelected: Dispatch<SetStateAction<string>>;
  setFilterTypeEn: Dispatch<SetStateAction<string>>;

  type: string;
};

const FilterModal = ({
  setModal,
  setSelected,
  setFilterTypeEn,
  type,
}: Props) => {
  const wrapper = useRef<HTMLDivElement>(null);
  const modal = useRef<HTMLDivElement>(null);

  // 신규 A/S sort
  const receivedText = ['등록일순 보기', '현장별 보기', '상태순 보기'];
  const receivedEnText = ['date', 'site', 'status'];
  // 히스토리 sort
  const historyText = ['현장별 보기', '낮은 평점순 보기', '높은 평점순 보기'];
  const historyEnText = ['site', 'lowRate', 'highRate'];
  {
    /* 모달창 높이가 0일때만, 모달창 위로 올리기  */
  }
  const heightAni = () => {
    const target = modal.current;
    if (target) {
      if (target.style.height === '') {
        target.style.height = '216pt';
      }
    }
  };

  {
    /* 모달창 내려서 끄기  */
  }
  const handleModal = () => {
    const target = modal.current;
    if (target && wrapper.current) {
      wrapper.current.style.background = 'none';
      target.style.height = '0pt';
    }
    setTimeout(() => setModal(false), 200);
  };

  setTimeout(heightAni, 50);

  const handleSelect = (idx: number) => {
    console.log(historyText[idx]);
    if (type === 'historyAS') {
      setSelected(historyText[idx]);
      setFilterTypeEn(historyEnText[idx]);
    } else if (type === 'receivedAS') {
      setSelected(receivedText[idx]);
      setFilterTypeEn(receivedEnText[idx]);
    }
    // 선택된 옵션에 맞게 정렬 api 호출.
  };

  return (
    <Wrapper ref={wrapper} onClick={handleModal}>
      <ModalBody ref={modal}>
        <P>정렬</P>
        {/* 신규 A/S */}
        {type === 'receivedAS' && (
          <>
            {receivedText.map((t, idx) => {
              return (
                <div key={idx} onClick={() => handleSelect(idx)}>
                  <p>{t}</p>
                </div>
              );
            })}
          </>
        )}
        {/* 히스토리 */}
        {type === 'historyAS' && (
          <>
            {historyText.map((t, idx) => {
              return (
                <div key={idx} onClick={() => handleSelect(idx)}>
                  <p>{t}</p>
                </div>
              );
            })}
          </>
        )}
      </ModalBody>
    </Wrapper>
  );
};

export default FilterModal;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: 0.2s;
  background-color: #00000056;
  z-index: 5;
  @media (min-width: 900pt) {
    display: none;
  }
`;

const ModalBody = styled.div`
  width: 100%;
  height: 0pt;
  background: white;
  position: absolute;
  bottom: 33pt;
  left: -0.75pt;
  transition: 0.2s;
  overflow: hidden;
  padding: 21pt 0;
  box-shadow: 3pt 0px 7.5pt rgba(137, 163, 201, 0.2);
  border-radius: 15pt 15pt 0 0;

  div {
    margin: 0pt 28.5pt;
    padding: 10pt 0pt 10pt 9pt;
    border-bottom: 1px solid #e2e5ed;
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 400;
    font-size: 12pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: #222222;
    &:hover {
      > p {
        background: #f3f3f4;
      }
    }
    &:nth-last-of-type(1) {
      border-bottom: none;
    }
    > p {
      padding: 5pt 0;
    }
  }
`;
const P = styled.p`
  text-align: center;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 15pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: #222222;
  margin-bottom: 25.5pt;
`;
