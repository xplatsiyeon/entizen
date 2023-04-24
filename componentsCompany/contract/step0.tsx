import styled from '@emotion/styled';
import React, { useState } from 'react';
import colors from 'styles/colors';
import contract_pen_icon from 'public/companyContract/contract_pen_icon.svg';
import Image from 'next/image';
import TwoBtnModal from 'components/Modal/TwoBtnModal';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { contractAction } from 'storeCompany/contract';

type Props = {};

export default function Step0(props: Props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isModal, setIsModal] = useState(false);
  return (
    <Wrap>
      {isModal && (
        <TwoBtnModal
          leftBtnColor={colors.gray6}
          leftBtnText="그만하기"
          rightBtnColor={colors.main1}
          rightBtnText="계속 작성하기"
          leftBtnControl={() => router.push('/')}
          rightBtnControl={() => setIsModal(false)}
          text={
            '지금 나가시면\n작성하신 내용이 삭제됩니다.\n그래도 괜찮으시겠습니까?'
          }
          exit={() => {
            alert('나가기 클릭');
          }}
        />
      )}
      <Title>엔티즌 전자 계약서</Title>
      <Contents>
        전자 계약서 작성을 위해 <br />
        상세 내용을 추가로 입력해 주세요
      </Contents>
      <ImageBox>
        <Image src={contract_pen_icon} alt="contract_pen_icon" />
      </ImageBox>
      <Button onClick={() => dispatch(contractAction.addStep(1))}>
        시작하기
      </Button>
    </Wrap>
  );
}

const Wrap = styled.div`
  padding-top: 75pt;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding-left: 15pt;
  padding-right: 15pt;
`;

const Title = styled.h1`
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 500;
  font-size: 12pt;
  line-height: 18pt;
  letter-spacing: -0.02em;
  color: ${colors.main1};
`;

const Contents = styled.p`
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 500;
  font-size: 15pt;
  line-height: 22.5pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  padding-top: 9pt;
`;
const ImageBox = styled.div`
  margin-top: 48pt;
`;

const Button = styled.button`
  background: ${colors.main1};
  border-radius: 6pt;
  width: 100%;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: #ffffff;
  padding-top: 15pt;
  padding-bottom: 15pt;
  margin-top: 167px;
  cursor: pointer;
`;
