import styled from '@emotion/styled';
import Header from 'components/mypage/request/header';
import Image from 'next/image';
import React, { useEffect, useState, Dispatch, SetStateAction, } from 'react';
import AvatarIcon from 'public/images/avatar.png';
import AvatarPhoto from 'public/images/avatar-photo.png';
import colors from 'styles/colors';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { InputAdornment, TextField, Typography } from '@mui/material';
import CompanyAddress from 'components/SignUp/CompanyAddress';
import arrowRight from 'public/images/arrow-right.png';

type Props = {
 setComponent : React.Dispatch<React.SetStateAction<number>>;
}

const ProfileEditing = ({setComponent}:Props) => {
    const router = useRouter();
    const { selectedType } = useSelector((state: RootState) => state.selectType);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState<string>('');
    const [data, setData] = useState<any>();
    const [isPassword, setIsPassword] = useState(false);
    const [companyAddress, setCompanyAddress] = useState<string>('');
    const [checkSns, setCheckSns] = useState<boolean>(false);

    // 프로필 이미지 변경
    const onImgInputBtnClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files!;
        const fileReader: any = new FileReader();
        if (!files) return;
        fileReader.readAsDataURL(files[0]);
        fileReader.onload = () => {
            if (fileReader.readyState === 2) {
                setAvatar(fileReader.result);
            }
        };
    };
    // 비밀번호 변경
    const HandlePassword = async () => {
        let key = localStorage.getItem('key');
        let data = JSON.parse(key!);
        console.log('---------비밀번호 변경 data입니다 ---------');
        console.log(data);
        router.push('/profile/editing/password');
    };
    // 나이스 인증
    const fnPopup = (event: any) => {
        console.log('나이스 인증');
        console.log(event);
        const { id } = event.currentTarget;
        console.log(`id -> ${id}`);
        if (id === 'password') {
            setIsPassword(true);
            console.log('passowrd입니다');
        }
        if (typeof window !== 'object') return;
        else {
            window.open(
                '',
                'popupChk',
                'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no',
            );
            let cloneDocument = document as any;
            cloneDocument.form_chk.action =
                'https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb';
            cloneDocument.form_chk.target = 'popupChk';
            cloneDocument.form_chk.submit();
        }
    };
    // 유저정보 받아 오는 API
    const getUserInfo = () => {
        const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
        try {
            axios({
                method: 'get',
                url: 'https://test-api.entizen.kr/api/members/info',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    ContentType: 'application/json',
                },
            })
                .then((res) => {
                    console.log('---res 데이터---');
                    console.log(res);
                    setId(res.data.id);
                    setName(res.data.name);
                })
                .catch((error) => {
                    console.log('실패');
                    console.log(error);
                    alert('다시 시도해주세요.');
                    router.push('/');
                });
        } catch (error) {
            alert('다시 시도해주세요.');
            router.push('/');
            console.log('api 통신 에러');
            console.log(error);
        }
    };
    // 나이스 인증
    useEffect(() => {
        const memberType = selectedType;
        axios({
            method: 'post',
            url: 'https://test-api.entizen.kr/api/auth/nice',
            data: { memberType },
        })
            .then((res) => {
                setData(res.data.executedData);
            })
            .catch((error) => {
                console.error('나이스 인증 에러 발생');
                console.error(error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    // sns 체크
    useEffect(() => {
        const snsMember = JSON.parse(localStorage.getItem('SNS_MEMBER')!);
        if (snsMember) {
            setCheckSns(snsMember);
        }
        console.log('여기임둥');
        console.log(checkSns);
        console.log(snsMember);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 유저 종보 받아오기
    /*
    useEffect(() => {
      getUserInfo();
    }, []); */

    const [postNumber, setPostNumber] = useState<string>('');
    const [addressOn, setAddressOn] = useState<boolean>(false);
    const [companyDetailAddress, setCompanyDetailAddress] = useState<string>('');

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
            <Body>
                <Avatar>
                    <div className="img-bg">
                        {/* 아바타 */}
                        <div className="avatar-bg">
                            <Image
                                src={avatar.length > 1 ? avatar : AvatarIcon}
                                alt="avatar"
                                layout="fill"
                                className="test"
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
                <InputBox type="text" readOnly placeholder={id} />
                <Label mt={30}>기업명</Label>
                <InputBox type="text" readOnly placeholder={name} />

                <Address>
                    <p>기업 주소</p>

                    <InputWrap>
                        <InputBox
                            placeholder="회사 우편번호 입력"
                            value={postNumber}
                            name="id"
                            readOnly={true}
                            onClick={() => setAddressOn(true)}
                        />
                        <InputBtn onClick={() => setAddressOn(true)}><span>주소찾기</span></InputBtn>
                    </InputWrap>
                    <InputBox
                        placeholder="회사 주소 입력"
                        value={companyAddress}
                        name="checkPw"
                        readOnly={true}
                        onClick={() => setAddressOn(true)}
                    />
                    <InputBox
                        placeholder="회사 상세주소 입력"
                        value={companyDetailAddress}
                        onChange={(e) => setCompanyDetailAddress(e.target.value)}
                        name="checkPw"
                    />
                </Address>

                <Div className='PW' onClick={()=>setComponent(2)}>
                    <span>비밀번호 변경</span> 
                    <ImageWrap><Image src={arrowRight} layout='fill'/></ImageWrap>
                </Div>

                <Div onClick={()=>setComponent(3)}>
                <span>사업자 등록 변경</span> 
                    <ImageWrap><Image src={arrowRight} layout='fill'/></ImageWrap>
                </Div>

            </Body>
            <Line />

            <Wrap>

                <Label mt={30}>담당자 이름</Label>
                <InputBox type="text" readOnly placeholder={''} />


                <Label mt={30}>담당자 휴대폰</Label>
                <InputBox type="text" readOnly placeholder={''} />


                <Label mt={30}>담당자 이메일</Label>
                <InputBox type="text" readOnly placeholder={''} />
            
                <MBtn onClick={()=>setComponent(4)}>담당자 변경하기</MBtn>
            </Wrap>

        </Wrapper>
    );
};

export default ProfileEditing;

const Wrapper = styled.div`
    padding-bottom: 132.75pt;
`

const Body = styled.div`
  padding: 21.5pt 15pt 0;
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
`

const InputWrap = styled.div`
    align-items: center;
    position: relative;
`

const InputBtn = styled.button`
position: absolute;
    right: 6pt;
    top: 50%;
    transform:translateY(-50%);
    margin-top: 4.5pt;
    background: #E2E5ED;
    border-radius: 6pt;
    padding: 7.5pt 9pt;
    span{
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 400;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: #FFFFFF;
    }
`

const Div = styled.div`
    padding-bottom: 18pt;
    border-bottom: 1px solid #E2E5ED;
    margin-top: 31.5pt;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
`
const ImageWrap = styled.div`
width: 4.5pt;
height: 9pt;
position: relative;
`

const Line = styled.div`
height: 6pt;
width: 100%;
background: #F3F4F7;
margin-top: 30pt;
`

const Wrap = styled.div`
    padding: 0 15pt;
    position: relative;
`

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
    color: #5A2DC9;
    position: absolute;
    bottom: -27pt;
    right: 15pt;
    cursor: pointer;
`