import styled from '@emotion/styled';
import Image from 'next/image';
import lightning from 'public/images/lightning.png';
import ClipboardText from 'public/images/ClipboardText.png';
import EmptyClipboardText from 'public/images/EmptyClipboardText.png';

import React, { useState } from 'react';
import colors from 'styles/colors';

type Props = {};

const QuotationCenter = (props: Props) => {
  const [requests, setReqeusts] = useState<number>(0);
  return (
    <Wrapper>
      <ImgBox>
        <Image src={lightning} alt="lightning" />
      </ImgBox>
      <TopImgBox>
        {requests !== 0 ? (
          <Image src={EmptyClipboardText} alt="ClipboardText" />
        ) : (
          <>
            <Image src={ClipboardText} alt="EmptyClipboardText" />
            <CountCircle></CountCircle>
          </>
        )}
      </TopImgBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  margin-top: 39pt;
  /* padding-left: 33pt;
  padding-right: 33pt; */
`;
const ImgBox = styled.div`
  position: absolute;
  z-index: -5;
  left: 54pt;
  right: 54pt;
  width: 143.25pt;
  height: 181.5pt;
`;

const TopImgBox = styled.div`
  width: 45pt;
  height: 45pt;
  margin: 0 auto;
`;

const CountCircle = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 10.5pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: 0em;
  text-align: center;
  width: 18pt;
  height: 18pt;
  background-color: ${colors.main};
`;

export default QuotationCenter;
