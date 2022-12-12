import styled from '@emotion/styled';
import Carousel from 'components/mypage/projects/Carousel';
import Image from 'next/image';
import CaretDown24 from 'public/images/CaretDown24.png';
import { ProjectCompletionFiles } from 'QueryComponents/CompanyQuery';
import React, { useState } from 'react';
import colors from 'styles/colors';

type Props = {
  title: string;
  firstText?: string;
  secondText?: string;
  thirdText?: string;
  presentProgress: boolean;
  page?: string;
  handleClick?: () => void;
  complete?: boolean;
  file?: ProjectCompletionFiles[];
};

const MessageBox = ({
  title,
  firstText,
  secondText,
  thirdText,
  presentProgress,
  handleClick,
  page,
  complete,
  file,
}: Props) => {
  const [idx, setIdx] = useState<number>(1);

  console.log(presentProgress);

  const handleNum = () => {
    if (idx === 1) {
      setIdx(2);
    } else {
      setIdx(1);
    }
  };

  return (
    <Wrapper onClick={handleClick} presentProgress={presentProgress}>
      <LeftSideBox presentProgress={presentProgress}>
        <BigText>{title}</BigText>
        <List>
          <li>{firstText}</li>
          <li>{secondText}</li>
          {thirdText && <li>{thirdText}</li>}
        </List>
        {complete ? (
          //여기 코드 reUsable 컴포넌트로
          <ImageBox>
            <Carousel file={file} />
          </ImageBox>
        ) : null}
      </LeftSideBox>
      {page ? null : (
        <IconBox>
          <ArrowIconBox>
            <Image src={CaretDown24} alt="RightArrow" />
          </ArrowIconBox>
        </IconBox>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ presentProgress: boolean }>`
  padding: 12.75pt 13.5pt 11.25pt 13.5pt;
  box-shadow: ${({ presentProgress }) =>
    !presentProgress && `0px 0px 10px rgba(137, 163, 201, 0.2)`};
  border: ${({ presentProgress }) => presentProgress && '1px solid #5221CB'};
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  position: relative;
  cursor: pointer;

  @media (min-width: 900pt) {
    padding: 21pt 27pt;
  }
`;

const LeftSideBox = styled.div<{ presentProgress: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 6pt;
  width: 100%;
  opacity: ${({ presentProgress }) => (!presentProgress ? '0.3' : null)};
`;

const BigText = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 10.5pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Spoqa Han Sans Neo;
  font-size: 9pt;
  font-weight: 400;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: left;
  & li {
    color: #747780;
  }
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ArrowIconBox = styled.div`
  width: 18pt;
  height: 18pt;
`;

const ImageBox = styled.div`
  width: 100%;
  /* height: 66pt; */
  height: auto;
  margin: 0 auto;
  border: 1px solid #e2e5ed;
  border-radius: 6pt;
  position: relative;
`;
const Index = styled.div`
  width: 12pt;
  padding: 1.5pt 4.5pt;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 7.5pt;
  color: white;
  position: absolute;
  bottom: 9pt;
  right: 6pt;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 500;
  font-size: 7.5pt;
  line-height: 9pt;
  letter-spacing: -0.02em;
`;

export default MessageBox;
