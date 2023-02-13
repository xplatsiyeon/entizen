import styled from '@emotion/styled';
import { isTokenPostApi } from 'api';
import Modal from 'components/Modal/Modal';
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import colors from 'styles/colors';

interface UserInfo {
  data: {
    isSuccess: boolean;
    data: {
      member: {
        memberIdx: number;
        memberType: string;
      } | null;
    };
  };
}

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
};

const PassowrdStep1 = ({ setStep }: Props) => {
  const router = useRouter();
  let key = localStorage.getItem('key');
  let data = JSON.parse(key!);

  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [ModalMsg, setModalMsg] = useState('');

  const { mutate, isLoading } = useMutation(isTokenPostApi, {
    onSuccess: (data: UserInfo) => {
      if (data.data.data.member !== null) {
        setStep(1);
      } else {
        setIsModal(true);
        setModalMsg(
          '아이디와 회원정보가 일치하지 않습니다.\n다시 입력해주세요.',
        );
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const colseModal = () => setIsModal(false);

  // 버튼 클릭
  const onSubmitBtn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValid) {
      if (data.name !== name || data.id !== id) {
        setIsModal(true);
        setModalMsg(
          '아이디와 회원정보가 일치하지 않습니다.\n다시 입력해주세요.',
        );
      } else {
        mutate({
          url: '/members/verification/identity',
          data: {
            name,
            id,
          },
        });
      }
    }
  };

  useEffect(() => {
    if (name.length > 0 && id.length > 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [name, id]);

  return (
    <div className="container">
      {isModal && <Modal click={colseModal} text={ModalMsg} size={'auto'} />}
      <HeadWrapper>
        <Header>
          <HeaderText
            onClick={() => router.push('/signin')}
          >{`${'<'}`}</HeaderText>
          <HeaderText style={{ margin: '0 auto' }}>비밀번호 찾기</HeaderText>
        </Header>
        <Form onSubmit={onSubmitBtn}>
          <label>이름</label>
          <input
            placeholder="이름을 입력해주세요."
            type={'text'}
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <label>아이디</label>
          <input
            placeholder="아이디 입력"
            type={'text'}
            value={id}
            onChange={(e) => setId(e.currentTarget.value)}
          />
          <BtnBox>
            <Btn isValid={isValid} type={'submit'}>
              비밀번호 찾기
            </Btn>
          </BtnBox>
        </Form>
      </HeadWrapper>
    </div>
  );
};

export default PassowrdStep1;

const HeadWrapper = styled.div`
  /* display: flex; */
  /* flex-direction: column; */
  @media (max-width: 899.25pt) {
    display: none;
  }
`;
const Header = styled.div`
  display: flex;
  margin-bottom: 45.75pt;
`;
const HeaderText = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 18pt;
  font-weight: 700;
  line-height: 21pt;
  letter-spacing: -0.02em;
  text-align: center;
  color: #222222;
  cursor: pointer;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: start;
  & > label {
    font-weight: 500;
    font-size: 12pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    margin-bottom: 9pt;
  }
  & > label:nth-of-type(2) {
    margin-top: 30pt;
  }
  & > input {
    border: 0.75pt solid ${colors.gray};
    border-radius: 6pt;
    font-weight: 500;
    font-size: 12pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    padding: 13.5pt 0 13.5pt 12pt;
  }
  & > input::placeholder {
    color: ${colors.lightGray3};
  }
`;

const BtnBox = styled.div`
  box-sizing: border-box;
  position: fixed;
  left: 0;
  bottom: 35pt;
  width: 100%;
  padding: 0 15pt;

  @media (min-width: 900pt) {
    position: static;
    padding: 30pt 0 0 0;
  }
`;
const Btn = styled.button<{ isValid: boolean }>`
  background-color: ${({ isValid }) =>
    isValid ? colors.main : colors.lightWhite3};
  border-radius: 6pt;
  width: 100%;
  padding: 15pt 0;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.lightWhite};
  cursor: ${({ isValid }) => (isValid ? 'pointer' : 'auto')};
`;
