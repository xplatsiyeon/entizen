import styled from '@emotion/styled';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
// import Btn from 'components/button';
import React, { Dispatch, SetStateAction } from 'react';
import colors from 'styles/colors';
import Btn from './button';
import AddImg from 'public/images/add-img.svg';
import CloseImg from 'public/images/XCircle.svg';
import Image from 'next/image';

type Props = {
  level: number;
  setLevel: Dispatch<SetStateAction<number>>;
  companyName: string;
  setCompanyName: Dispatch<SetStateAction<string>>;
  postNumber: string;
  setPostNumber: Dispatch<SetStateAction<string>>;
  companyAddress: string;
  setCompanyAddress: Dispatch<SetStateAction<string>>;
  companyDetailAddress: string;
  setCompanyDetailAddress: Dispatch<SetStateAction<string>>;
};

const CompanyDetailInfo = ({
  level,
  setLevel,
  companyName,
  setCompanyName,
  postNumber,
  setPostNumber,
  companyAddress,
  setCompanyAddress,
  companyDetailAddress,
  setCompanyDetailAddress,
}: Props) => {
  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(e.target.value);
  };
  const handleCompanyPostNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    console.log('cc');
  };
  const handleNextClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setLevel(level + 1);
  };
  return (
    <>
      <Info>
        상세 내용을
        <br />
        입력해주세요
      </Info>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: '24pt',
          width: '100%',
          position: 'relative',
        }}
      >
        <Label>회사명</Label>
        <Input
          placeholder="기업명 입력"
          onChange={handleCompanyNameChange}
          value={companyName}
          name="companyName"
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: '30pt',
          width: '100%',
        }}
      >
        <Label>주소</Label>
        <Input
          placeholder="회사 우편번호 입력"
          onChange={handleCompanyPostNumberChange}
          value={postNumber}
          name="id"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <OverlapBtn className="overlap">
                  <Typography className="checkOverlap">주소찾기</Typography>
                </OverlapBtn>
              </InputAdornment>
            ),
          }}
        />
        <Input
          placeholder="회사 주소 입력"
          value={companyAddress}
          name="checkPw"
        />
        <Input
          placeholder="회사 상세주소 입력"
          value={companyDetailAddress}
          name="checkPw"
        />
      </Box>
      <Form>
        <label>사업자 등록증</label>
        <div>
          <File>
            <Image src={AddImg} alt="img" />
            <div>이미지 또는 파일 업로드</div>
            <input type="file" />
          </File>
        </div>
      </Form>
      {/* img preview */}
      <Preview>
        {[1, 2, 3].map((item, index) => (
          <span key={index}>
            <div>
              <Image className="exit" src={CloseImg} alt="exit" />
            </div>
          </span>
        ))}
      </Preview>
      <Btn
        isClick={true}
        text={'다음'}
        marginTop={77.25}
        handleClick={handleNextClick}
      />
      <NameInput className="nameInput" />
      <PhoneInput className="phoneInput" />
    </>
  );
};

const Info = styled.p`
  padding-top: 6pt;
  font-weight: 700;
  font-size: 18pt;
  line-height: 24pt;
  color: ${colors.main2};
`;
const Label = styled.label`
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;

const NameInput = styled.input`
  display: none;
`;
const PhoneInput = styled.input`
  display: none;
`;

const Input = styled(TextField)`
  border: 0.75pt solid ${colors.gray};
  border-radius: 6pt;
  margin-top: 9pt;
  & input {
    padding: 10.875pt 0 10.875pt 12pt;
    font-size: 12pt;
    line-height: 12pt;
  }

  & .MuiInputBase-root {
    padding-right: 9pt;
  }

  ::placeholder {
    color: ${colors.gray};
    font-weight: 500;
  }
  & .remove {
    display: none;
  }
  :focus > .remove {
    display: block;
  }
`;
const OverlapBtn = styled.button`
  & .checkOverlap {
    padding: 4.5pt 9pt;
  }
  margin-right: 0;
  background: #e2e5ed;
  color: #ffffff;
  border-radius: 6pt;
  font-size: 10.5pt;
  font-weight: 500;
  line-height: 12pt;
  &.changeColor {
    background-color: ${colors.main};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding-top: 30pt;
  position: relative;
  & > label {
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: -0.02em;
  }
  & > div {
    margin-top: 12pt;
    padding: 15pt 67.5pt;
    border: 0.75pt dashed ${colors.lightGray};
    border-radius: 6pt;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
const File = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 9pt;
  & > input {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
  }
  & > div {
    font-size: 12pt;
    line-height: 12pt;
    color: #caccd1;
  }
`;
const Preview = styled.div`
  display: flex;
  gap: 6pt;
  width: 100%;
  margin-top: 15pt;
  & > span {
    display: flex;
    flex-direction: row-reverse;
    width: 60pt;
    height: 60pt;
    border-radius: 6pt;
    border: 1px solid red;
  }
`;

export default CompanyDetailInfo;
