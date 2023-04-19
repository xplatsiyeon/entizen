import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import companyImg from 'public/images/company.svg';
import companyOnImg from 'public/images/company_on.svg';
import userImg from 'public/images/user.svg';
import userOnImg from 'public/images/user_on.svg';
import colors from 'styles/colors';
import Btn from './button';
import { useDispatch } from 'react-redux';
import { selectAction } from 'store/loginTypeSlice';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

type Props = {
  userType: number;
  setUserType: Dispatch<SetStateAction<number>>;
};

const ChooseUserType = ({ userType, setUserType }: Props) => {
  const dispatch = useDispatch();
  const mobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });
  const UserTypeList: string[] = ['일반 회원', '파트너 회원'];
  const { signUpLevel } = useSelector((state: RootState) => state.LoginType);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(selectAction.setSignUpLevel(signUpLevel + 1));

    if (userType === 0) dispatch(selectAction.select('USER'));
    if (userType === 1) dispatch(selectAction.select('COMPANY'));
  };

  useEffect(() => {
    dispatch(
      selectAction.setTerm({
        fullTerms: false,
        requiredTerms: false,
        selectTerms: [false],
        requiredCheck: [false, false, false],
      }),
    );
  }, []);

  return (
    <>
      {mobile && <Notice variant="h3">어떤 용무로 오셨나요?</Notice>}
      <SelectWrapper>
        {UserTypeList.map((type, index) => (
          <div key={index}>
            {type === '일반 회원' && (
              <WebRapper>
                <SubTitle>다양한 충전기를 비교해보고 싶다면?</SubTitle>
                <Select
                  type={userType.toString()}
                  idx={index.toString()}
                  onClick={() => {
                    setUserType(index);
                  }}
                >
                  <Image
                    src={userType === index ? userOnImg : userImg}
                    alt="user"
                  />
                  <div>{type}</div>
                </Select>
              </WebRapper>
            )}
            {type === '파트너 회원' && (
              <div>
                <SubTitle>고객과 손쉬운 거래를 진행하려면?</SubTitle>
                <Select
                  type={userType.toString()}
                  idx={index.toString()}
                  onClick={() => {
                    setUserType(index);
                  }}
                >
                  <Image
                    src={userType === index ? companyOnImg : companyImg}
                    alt="company"
                  />
                  <div>{type}</div>
                </Select>
              </div>
            )}
          </div>
        ))}
      </SelectWrapper>
      <Btn
        isClick={userType !== -1 ? true : false}
        text={'다음'}
        marginTop={42.75}
        handleClick={handleClick}
      />
    </>
  );
};

const WebRapper = styled.div`
  @media (min-width: 900pt) {
    margin-bottom: 60pt;
  }
  margin-bottom: 15pt;
`;
const SubTitle = styled.div`
  padding-bottom: 18pt;
  font-weight: 500;
  font-size: 15pt;
  line-height: 15pt;
  text-align: center;
  letter-spacing: -0.02em;
  font-family: 'Spoqa Han Sans Neo';
  color: #747780;
  @media (max-width: 899.25pt) {
    display: none;
  }
`;

const Notice = styled(Typography)`
  margin-top: 28.5pt;
  font-weight: 700;
  font-size: 21pt;
  line-height: 33pt;
  text-align: center;
  letter-spacing: -0.02em;
  font-family: 'Spoqa Han Sans Neo';
  color: ${colors.main2};
`;
const SelectWrapper = styled(Box)`
  margin-top: 30pt;
`;
const Select = styled(Box)<{ type: string; idx: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  gap: 18pt;
  padding: 21pt 0;
  border: 0.75pt solid
    ${({ type, idx }) => (type === idx ? colors.main : colors.lightGray)};
  box-shadow: 0pt 0pt 7.5pt rgba(137, 163, 201, 0.2);
  border-radius: 8px;
  color: ${({ type, idx }) => type === idx && colors.main};
  background-color: ${({ type, idx }) => type === idx && '#f8f6ff'};
  :nth-of-type(1) {
    margin-bottom: 15pt;
  }
  & > div {
    font-weight: 400;
    font-size: 18pt;
    line-height: 18pt;
    font-family: 'Spoqa Han Sans Neo';
  }
`;

export default ChooseUserType;
