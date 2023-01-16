import styled from '@emotion/styled';
import { isTokenPatchApi } from 'api';
import CompanyAddress from 'components/SignUp/CompanyAddress';
import useProfile from 'hooks/useProfile';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
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

    const {mutate: addressMutate} =  useMutation(isTokenPatchApi, {
      onSuccess: (res) => {
        console.log('주소 변경 성공 ', res);
        //setComponent(0);
      },
      onError: (error) => {
        console.log('주소 변경 실패 ',error);
      },
    })

 
    const handleEditAddress =()=>{

      //주소 수정할 경우
      addressMutate({
        url: '/members/address',
        data: {
          address: companyAddress,
          detailAddress: "",
          zipCode: postNumber,
        }
      }) 
    
      }
      
      if (addressOn) {
        return (
          <CompanyAddress
            setPostNumber={setPostNumber}
            setCompanyAddress={setCompanyAddress}
            setAddressOn={setAddressOn}
            handleEditAddress={handleEditAddress}
          />
        );
      }

  return (
    <>
          <Address>
          <p>기업 주소</p>
          <InputWrap>
            <InputBox
              placeholder="회사 우편번호 입력"
              value={
                postNumber
                  ? postNumber
                  : profile?.companyMemberAdditionalInfo?.companyZipCode
              }
              name="id"
              readOnly={true}
              // onClick={() => setAddressOn(true)}
            />
            {/* <InputBtn onClick={() => setAddressOn(true)}> */}
            <InputBtn onClick={()=>setAddressOn(true)}>
              <span>주소찾기</span>
            </InputBtn>
          </InputWrap>
          <InputBox
            placeholder="회사 주소 입력"
            value={
              companyAddress
                ? companyAddress
                : profile?.companyMemberAdditionalInfo?.companyAddress
            }
            name="checkPw"
            readOnly={true}
            // onClick={() => setAddressOn(true)}
          />
          <InputBox
            placeholder="회사 상세주소 입력"
            value={
              companyDetailAddress
                ? companyAddress
                : profile?.companyMemberAdditionalInfo?.companyDetailAddress
            }
            onChange={(e) => setCompanyDetailAddress(e.target.value)}
            name="checkPw"
          />
        </Address>
    </>
  )
};

export default EditAddress;


const InputBox = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 13.5pt 16pt;
  margin-top: 9pt;
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  border-radius: 6pt;
  letter-spacing: -0.02em;
  /* color: ${colors.main2}; */
  border: 0.75pt solid ${colors.gray};
  ::placeholder {
    color: ${colors.lightGray3};
  }
`;

const Address = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
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