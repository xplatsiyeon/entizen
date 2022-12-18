import styled from '@emotion/styled';
import Header from 'components/mypage/request/header';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import AvatarIcon from 'public/images/avatar.png';
import AvatarPhoto from 'public/images/avatar-photo.png';
import colors from 'styles/colors';
import axios, { AxiosError } from 'axios';
import CompanyAddress from 'components/SignUp/CompanyAddress';
import arrowRight from 'public/images/arrow-right.png';
import { isTokenPatchApi, multerApi } from 'api';
import { useMutation } from 'react-query';
import useProfile from 'hooks/useProfile';
import { UploadFileResponse } from 'components/Profile/ProfileModify';
import { JwtTokenType } from 'pages/signin';
import jwt_decode from 'jwt-decode';

type Props = {
  setComponent: React.Dispatch<React.SetStateAction<number>>;
  setHeightOn?: React.Dispatch<React.SetStateAction<boolean>>;
  component: number;
  routeHandle?: boolean;
  isAddressOn?: boolean;
};
const TAG = 'componentsCompany/Profile/profileEditing.tsx';
const ProfileEditing = ({
  setComponent,
  component,
  routeHandle,
  isAddressOn,
  setHeightOn,
}: Props) => {
  const [checkSns, setCheckSns] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState(false);
  const [data, setData] = useState<string>('');
  const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const token: JwtTokenType = jwt_decode(accessToken);
  const { profile, invalidate, isLoading } = useProfile(accessToken);

  console.log('프로필', profile);

  //주소
  const [addressOn, setAddressOn] = useState<boolean>(Boolean(isAddressOn));
  const [postNumber, setPostNumber] = useState<string>('');
  const [companyAddress, setCompanyAddress] = useState<string>('');
  const [companyDetailAddress, setCompanyDetailAddress] = useState<string>('');

  // 에러 모달
  const [isModal, setIsModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  {
    /* const {mutate: addressMutate} =  useMutation(isTokenPatchApi, {

})
    //주소 수정할 경우
      addressMutate({
        url: '/members/address',
        data: {
          address: companyAddress,
          detailAddress: "",
          zipCode: postNumber,
        }
      })
    } */
  }

  const { mutate: profileMutae, isLoading: profileLoading } = useMutation(
    isTokenPatchApi,
    {
      onSuccess: (res) => {
        console.log(`🔥 이미지 변경 성공 ~line 53 ${TAG}`);
        console.log(res);
        invalidate();
      },
      onError: (error) => {
        console.log(`🔥 이미지 변경 실패 ~line 57 ${TAG}`);
        console.log(error);
      },
    },
  );

  const { mutate: multerMutae, isLoading: multerLoading } = useMutation<
    UploadFileResponse,
    AxiosError,
    FormData
  >(multerApi, {
    onSuccess: (res) => {
      console.log(' 👀 ~ line 95 multer onSuccess' + TAG);
      console.log(res);
      profileMutae({
        url: '/members/profile-image',
        data: {
          profileImageUrl: res?.uploadedFiles[0]?.url,
        },
      });
    },
    onError: (error: any) => {
      if (error.response.data.message) {
        setErrorMessage(error.response.data.message);
        setIsModal(true);
      } else if (error.response.status === 413) {
        setErrorMessage('용량이 너무 큽니다.');
        setIsModal(true);
      } else {
        setErrorMessage('다시 시도해주세요');
        setIsModal(true);
      }
    },
  });
  // 프로필 이미지 변경
  const onImgInputBtnClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const maxLength = 1;
    // 이미지 저장
    const formData = new FormData();
    for (let i = 0; i < maxLength; i += 1) {
      if (files![i] === undefined) {
        break;
      }
      formData.append(
        'profileImage', // 어디로 해야 할까
        files![i],
        encodeURIComponent(files![i].name),
      );
    }
    multerMutae(formData);
  };
  // 비밀번호 변경
  const HandlePassword = async () => {
    // let key = sessionStorage.getItem('key');
    // let data = JSON.parse(key!);
    setComponent(3);
  };

  // // 나이스 인증
  // const fnPopup = (event: any) => {
  //   console.log('나이스 인증');
  //   console.log(event);
  //   const { id } = event.currentTarget;
  //   console.log(`id -> ${id}`);
  //   if (typeof window !== 'object') return;
  //   else {
  //     window.open(
  //       '',
  //       'popupChk',
  //       'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no',
  //     );
  //     let cloneDocument = document as any;
  //     cloneDocument.form_chk.action =
  //       'https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb';
  //     cloneDocument.form_chk.target = 'popupChk';
  //     cloneDocument.form_chk.submit();
  //   }
  // };
  // // // 나이스 인증
  // useEffect(() => {
  //   axios({
  //     method: 'post',
  //     url: 'https://test-api.entizen.kr///api/auth/nice',
  //     data: { memberType: token.memberType },
  //   })
  //     .then((res) => {
  //       setData(res.data.executedData);
  //     })
  //     .catch((error) => {
  //       console.error('나이스 인증 에러 발생');
  //       console.error(error);
  //     });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [data]);

  const handleAddress = () => {
    if (routeHandle) {
      setComponent(2);
    } else {
      setAddressOn(true);
    }
    if (setHeightOn) setHeightOn(true);
    // 나중에 프포필 변경 기본으로 돌아가는 ( setComponent(0) ) 기능이 생기면
    // 그 때 setHeightOn(false) 로 바꿔줘야 함.
  };

  useEffect(() => {
    const snsMember = JSON.parse(sessionStorage.getItem('SNS_MEMBER')!);
    if (snsMember) {
      setCheckSns(snsMember);
    }
    console.log('여기임둥');
    console.log(checkSns);
    console.log(snsMember);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (addressOn) {
    return (
      <CompanyAddress
        setPostNumber={setPostNumber}
        setCompanyAddress={setCompanyAddress}
        setAddressOn={setAddressOn}
      />
    );
  }

  return (
    <Wrapper>
      <Header back={true} title="프로필 변경" />
      <Body component={component}>
        {component === 1 && <ChangeProfileText>프로필 변경</ChangeProfileText>}
        <Avatar>
          <div className="img-bg">
            {/* 아바타 */}
            <div className="avatar-bg">
              <Image
                src={
                  profile?.companyMemberAdditionalInfo?.companyLogoImageUrl
                    ?.length! > 1
                    ? profile?.companyMemberAdditionalInfo?.companyLogoImageUrl!
                    : AvatarIcon
                }
                alt="avatar"
                layout="fill"
                priority={true}
                unoptimized={true}
                objectFit="cover"
              />
            </div>
            {/* 포토 이미지 */}
            <label className="avatar-photo">
              <input
                className="file-input"
                type={'file'}
                accept="image/*"
                onChange={onImgInputBtnClick}
              />
              <Image src={AvatarPhoto} alt="avatar-photo" />
            </label>
          </div>
        </Avatar>
        <Label mt={33}>아이디</Label>
        <InputBox type="text" readOnly placeholder={profile?.id} />
        <Label mt={30}>기업명</Label>
        <InputBox
          type="text"
          readOnly
          placeholder={profile?.companyMemberAdditionalInfo?.companyName}
        />
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
            <InputBtn onClick={handleAddress}>
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
        {/* 나이스 인증 */}
        {/* <form name="form_chk" method="get">
          <input type="hidden" name="m" value="checkplusService" />
          <input type="hidden" id="encodeData" name="EncodeData" value={data} />
          <input type="hidden" name="recvMethodType" value="get" />
          </form> */}
        {/* <Div className="PW" onClick={fnPopup}> */}
        <Div className="PW" onClick={HandlePassword}>
          <span>비밀번호 변경</span>
          <ImageWrap>
            <Image src={arrowRight} layout="fill" />
          </ImageWrap>
        </Div>

        <Div onClick={() => setComponent(4)}>
          <span>사업자 등록 변경</span>
          <ImageWrap>
            <Image src={arrowRight} layout="fill" />
          </ImageWrap>
        </Div>

        {/* 나이스 인증 */}
        {/* <Buttons className="firstNextPage" onClick={HandlePassword}>
          숨겨진 비밀번호 버튼
        </Buttons> */}
      </Body>
      <Line />

      <Wrap>
        <Label mt={30}>담당자 이름</Label>
        <InputBox type="text" readOnly value={profile?.name} />

        <Label mt={30}>담당자 휴대폰</Label>
        <InputBox type="text" readOnly value={profile?.phone} />

        <Label mt={30}>담당자 이메일</Label>
        <InputBox
          type="text"
          readOnly
          value={profile?.companyMemberAdditionalInfo?.managerEmail}
        />

        <MBtn onClick={() => setComponent(5)}>담당자 변경하기</MBtn>
      </Wrap>
    </Wrapper>
  );
};

export default ProfileEditing;

const Wrapper = styled.div`
  padding-bottom: 132.75pt;
`;
const ChangeProfileText = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 21pt;
  font-weight: 700;
  line-height: 21pt;
  letter-spacing: -0.02em;
  text-align: left;
  display: flex;
  justify-content: center;
  padding-bottom: 50.25pt;
`;
const Body = styled.div<{ component: number }>`
  /* padding: 21.5pt 15pt 0; */
  padding: 0 15pt;
  padding-top: 21.5pt;
  @media (min-width: 900pt) {
    padding-top: ${({ component }) => (component === 1 ? '10.75pt' : '21.5pt')};
  }
`;
const Avatar = styled.div`
  display: flex;
  justify-content: center;
  .img-bg {
    position: relative;
  }
  .avatar-bg {
    position: relative;
    width: 75pt;
    height: 75pt;
    border-radius: 50%;
    overflow: hidden;
  }
  .avatar-photo {
    position: absolute;
    cursor: pointer;
    bottom: 0;
    right: 0;
  }
  .file-input {
    display: none;
  }
`;
const Label = styled.h3<{ mt: number }>`
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  margin-top: ${({ mt }) => mt + 'pt'};
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;
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

const Div = styled.div`
  padding-bottom: 18pt;
  border-bottom: 1px solid #e2e5ed;
  margin-top: 31.5pt;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;
const ImageWrap = styled.div`
  width: 4.5pt;
  height: 9pt;
  position: relative;
`;

const Line = styled.div`
  height: 6pt;
  width: 100%;
  background: #f3f4f7;
  margin-top: 30pt;
  @media (min-width: 900pt) {
    width: 345pt;
    margin-left: -31.5pt;
  }
`;

const Wrap = styled.div`
  padding: 0 15pt;
  position: relative;
`;

const MBtn = styled.button`
  background: none;
  border: none;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-decoration-line: underline;
  color: #5a2dc9;
  position: absolute;
  bottom: -27pt;
  right: 15pt;
  cursor: pointer;
`;
const Buttons = styled.button`
  display: none;
`;
