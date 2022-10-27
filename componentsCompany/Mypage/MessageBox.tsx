import styled from '@emotion/styled';
import Image from 'next/image';
import CaretDown24 from 'public/images/CaretDown24.png';
import React from 'react';
import colors from 'styles/colors';

type Props = {
  title: string;
  firstText?: string;
  secondText?: string;
  thirdText?: string;
  presentProgress: boolean;
  handleClick: () => void;
};

const MessageBox = ({
  title,
  firstText,
  secondText,
  thirdText,
  presentProgress,
  handleClick,
}: Props) => {
  return (
    <Wrapper onClick={handleClick} presentProgress={presentProgress}>
      <LeftSideBox>
        <BigText>{title}</BigText>
        <List>
          <li>{firstText}</li>
          <li>{secondText}</li>
          {thirdText && <li>{thirdText}</li>}
        </List>
      </LeftSideBox>
      <IconBox>
        <ArrowIconBox>
          <Image src={CaretDown24} alt="RightArrow" />
        </ArrowIconBox>
      </IconBox>
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
`;

const LeftSideBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6pt;
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

export default MessageBox;
