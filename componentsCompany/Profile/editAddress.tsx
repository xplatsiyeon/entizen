import styled from '@emotion/styled';
import { isTokenPatchApi } from 'api';
import CompanyAddress from 'components/SignUp/CompanyAddress';
import useProfile from 'hooks/useProfile';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import Header from 'components/mypage/request/header';
import colors from 'styles/colors';

type Props = {
  setComponent: React.Dispatch<React.SetStateAction<number>>;
};

const EditAddress = ({ setComponent }: Props) => {
  // 원버튼 모달 온클릭
  //setComponent(4)
  //   const handleModalYes = () => {
  //     sessionStorage.removeItem('key');

  //     if () setComponent!(1);
  //     /*router.push('/signin'); */
  //   };

  //주소

  const [addressOn, setAddressOn] = useState<boolean>(false);
  const [postNumber, setPostNumber] = useState<string>('');
  const [companyAddress, setCompanyAddress] = useState<string>('');
  const [companyDetailAddress, setCompanyDetailAddress] = useState<string>('');

  const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const { profile, invalidate, isLoading } = useProfile(accessToken);

  const { mutate: addressMutate } = useMutation(isTokenPatchApi, {
    onSuccess: (res) => {
      // console.log('주소 변경 성공 ', res);
      setComponent(0);
    },
    onError: (error) => {
      // console.log('주소 변경 실패 ', error);
    },
  });

  const handleEditAddress = () => {
    // console.log('companyAddress==>>', companyAddress);
    // console.log('companyDetailAddress==>>', companyDetailAddress);
    // console.log('postNumber==>>', postNumber);
    //주소 수정할 경우
    addressMutate({
      url: '/members/address',
      data: {
        address: companyAddress,
        detailAddress: companyDetailAddress,
        zipCode: postNumber,
      },
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (profile?.companyMemberAdditionalInfo) {
      setPostNumber(profile?.companyMemberAdditionalInfo?.companyZipCode);
      setCompanyAddress(profile?.companyMemberAdditionalInfo?.companyAddress!);
      setCompanyDetailAddress(
        profile?.companyMemberAdditionalInfo?.companyDetailAddress!,
      );
    }
  }, []);

  // console.log('addressOn', addressOn);

  if (addressOn) {
    return (
      <CompanyAddress
        setPostNumber={setPostNumber}
        setCompanyAddress={setCompanyAddress}
        setAddressOn={setAddressOn}
        setCompanyDetailAddress={setCompanyDetailAddress}
      />
    );
  }

  return (
    <>
      <Header
        handle={true}
        back={true}
        title="주소 변경"
        handleBackClick={() => setComponent(0)}
      />
      <Wrapper>
        <Address>
          <SubTitle style={{ marginTop: '22.5pt' }}>기업 주소</SubTitle>
          <InputWrap>
            <InputBox
              placeholder="회사 우편번호 입력"
              value={
                postNumber
                // ? postNumber
                // : profile?.companyMemberAdditionalInfo?.companyZipCode
              }
              name="id"
              readOnly={true}
              // onClick={() => setAddressOn(true)}
            />
            {/* <InputBtn onClick={() => setAddressOn(true)}> */}
            <InputBtn onClick={() => setAddressOn(true)}>
              <span>주소찾기</span>
            </InputBtn>
          </InputWrap>
          <InputBox
            placeholder="회사 주소 입력"
            value={companyAddress}
            // name="checkPw"
            readOnly={true}
            // onClick={() => setAddressOn(true)}
          />
          <InputBox
            placeholder="회사 상세주소 입력"
            value={companyDetailAddress}
            onChange={(e) => setCompanyDetailAddress(e.target.value)}
            // name="checkPw"
          />
        </Address>
      </Wrapper>
      <ButtonBox>
        <EditAdressBtn onClick={handleEditAddress}>수정완료</EditAdressBtn>
      </ButtonBox>
    </>
  );
};

export default EditAddress;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  height: 92%;
  margin: 0 15pt;
  @media (max-width: 899.25pt) {
    height: auto;
    /* padding: 0 15pt; */
  }
`;

const InputBox = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 13.5pt 12pt;
  margin-top: 9pt;
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  border-radius: 6pt;
  letter-spacing: -0.02em;
  border: 0.75pt solid ${colors.gray};
  ::placeholder {
    color: ${colors.lightGray3};
  }
`;

const Address = styled.div`
  display: flex;
  flex-direction: column;
  /* margin-top: 30px; */
  width: 100%;
`;

const InputWrap = styled.div`
  align-items: center;
  position: relative;
`;

const InputBtn = styled.button`
  position: absolute;
  right: 6pt;
  top: 50%;
  transform: translateY(-50%);
  margin-top: 4.5pt;
  background: #5221cb;
  border-radius: 6pt;
  padding: 7.5pt 9pt;
  cursor: pointer;
  span {
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 400;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: #ffffff;
  }
`;
const ButtonBox = styled.div`
  @media (max-width: 899.25pt) {
    position: fixed;
    bottom: 30pt;
    width: 100%;
    padding: 0 15pt;
    /* left: 15pt; */
  }
`;

const EditAdressBtn = styled.button`
  border-radius: 8px;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  background: ${colors.main1};
  color: ${colors.lightWhite};
  padding: 15pt 0;
  width: 100%;
  box-sizing: border-box;
  /* margin-top: 315pt; */
  @media (max-width: 899.25pt) {
    position: fixed;
    bottom: 30pt;
    /* left: 15pt; */
  }
`;

const Wrap = styled.div`
  margin-left: -15pt;
`;

const SubTitle = styled.span`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 12pt;
  font-weight: 500;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #222222;
  margin-bottom: 15pt;
`;
