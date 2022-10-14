import styled from '@emotion/styled';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import colors from 'styles/colors';
import Btn from './button';
import CloseImg from 'public/images/XCircle.svg';
import Image from 'next/image';
import AddImg from 'public/images/add-img.svg';
import CompanyAddress from './CompanyAddress';
import FileSelectModal from 'components/Modal/FileSelectModal';
import { BusinessRegistrationType } from '.';

type Props = {
  businessRegistration: BusinessRegistrationType[];
  setBusinessRegistration: Dispatch<SetStateAction<BusinessRegistrationType[]>>;
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
  businessRegistration,
  setBusinessRegistration,
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
  const imgRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [nextPageOn, setNextPageOn] = useState<boolean>(false);
  const [addressOn, setAddressOn] = useState<boolean>(false);
  const [fileModal, setFileModal] = useState<boolean>(false);

  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(e.target.value);
  };
  const handleNextClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setLevel(level + 1);
  };
  const onClickFile = () => {
    fileRef?.current?.click();
    setFileModal(false);
  };
  const onClickPhoto = () => {
    imgRef?.current?.click();
    setFileModal(false);
  };
  // 이미지 저장
  const saveFileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const maxLength = 3;
    const newArr = [...businessRegistration];
    // max길이 보다 짧으면 멈춤
    for (let i = 0; i < maxLength; i += 1) {
      if (files![i] === undefined) {
        break;
      }
      // 이미지 객체 생성 후 상태에 저장
      const imageUrl = URL.createObjectURL(files![i]);
      const imageName = files![i].name;
      const imageSize = files![i].size;
      newArr.push({
        url: imageUrl,
        size: imageSize,
        originalName: imageName,
      });
    }
    setBusinessRegistration(newArr);
  };
  // 이미지 삭제
  const handlePhotoDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log('delete');
    const name = Number(e.currentTarget.dataset.name);
    const copyArr = [...businessRegistration];
    for (let i = 0; i < copyArr.length; i++) {
      if (i === name) {
        copyArr.splice(i, 1);
        return setBusinessRegistration(copyArr);
      }
    }
  };

  // 버튼 유효성 검사
  useEffect(() => {
    if (
      companyName &&
      postNumber &&
      companyAddress &&
      companyDetailAddress &&
      businessRegistration.length >= 1
    ) {
      setNextPageOn(true);
    } else {
      setNextPageOn(false);
    }
  }, [
    companyName,
    postNumber,
    companyAddress,
    companyDetailAddress,
    businessRegistration,
  ]);

  // 테스트용 useeffect
  useEffect(() => {
    console.log(businessRegistration);
  }, [businessRegistration]);

  // 주소검색
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
    <>
      {fileModal && (
        <FileSelectModal
          onClickFile={onClickFile}
          onClickPhoto={onClickPhoto}
          cencleBtn={() => setFileModal(false)}
        />
      )}
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
          value={postNumber}
          name="id"
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <OverlapBtn
                  className="overlap"
                  onClick={() => setAddressOn(true)}
                >
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
          InputProps={{
            readOnly: true,
          }}
        />
        <Input
          placeholder="회사 상세주소 입력"
          value={companyDetailAddress}
          onChange={(e) => setCompanyDetailAddress(e.target.value)}
          name="checkPw"
        />
      </Box>
      <RemainderInputBox>
        <PhotosBox>
          <Form>
            <label>사업자 등록증</label>
            <div>
              <File onClick={() => setFileModal(true)}>
                <Image src={AddImg} alt="img" />
                <div>이미지 또는 파일 업로드</div>
              </File>
            </div>
          </Form>
          <input
            style={{ display: 'none' }}
            ref={imgRef}
            className="imageClick"
            type="file"
            accept="image/*"
            onChange={saveFileImage}
            multiple
          />
          <input
            style={{ display: 'none' }}
            ref={fileRef}
            className="imageClick"
            type="file"
            accept="xlsx"
            // onChange={saveFileImage}
            multiple
          />
          {/* <Img_Preview> */}
          <div className="photos">
            {businessRegistration?.map((item, index) => (
              <ImgSpan key={index} data-name={index}>
                <Image
                  style={{
                    borderRadius: '6pt',
                  }}
                  layout="intrinsic"
                  alt="preview"
                  width={80}
                  data-name={index}
                  height={80}
                  key={index}
                  src={item.url}
                />
                <Xbox onClick={handlePhotoDelete} data-name={index}>
                  <Image
                    src={CloseImg}
                    data-name={index}
                    layout="intrinsic"
                    alt="closeBtn"
                    width={24}
                    height={24}
                  />
                </Xbox>
              </ImgSpan>
            ))}
          </div>

          {/* <File_Preview> */}
          {/* <div className="photos">
            {review.productImg &&
              review.productImg.map((img: any, index: any) => (
                <ImgSpan key={index} data-name={index}>
                  <Image
                    style={{
                      borderRadius: '6pt',
                    }}
                    layout="intrinsic"
                    alt="preview"
                    width={80}
                    data-name={index}
                    height={80}
                    key={index}
                    src={img}
                  />
                  <Xbox onClick={handlePhotoDelete} data-name={index}>
                    <Image
                      src={CloseImg}
                      data-name={index}
                      layout="intrinsic"
                      alt="closeBtn"
                      width={24}
                      height={24}
                    />
                  </Xbox>
                </ImgSpan>
              ))}
          </div> */}
        </PhotosBox>
      </RemainderInputBox>
      <Btn
        isClick={nextPageOn}
        text={'다음'}
        marginTop={15}
        bottom={30}
        handleClick={handleNextClick}
      />
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
const Form = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  & > label {
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: -0.02em;
  }
  & > div {
    margin-top: 12pt;
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
  padding: 15pt 0;
  cursor: pointer;
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
  cursor: pointer;
  &.changeColor {
    background-color: ${colors.main};
  }
  :hover {
    background-color: ${colors.main};
  }
`;
const RemainderInputBox = styled.div`
  flex-direction: column;
  display: flex;
  margin-top: 30pt;
`;
const PhotosBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  & .photos {
    display: flex;
    margin-top: 15pt;
    gap: 6pt;
  }
`;
const AddPhotos = styled.button`
  display: inline-block;
  width: 56.0625pt;
  height: 56.0625pt;
  border: 1px solid #e2e5ed;
  border-radius: 6pt;
`;
const ImgSpan = styled.div`
  position: relative;
`;
const Xbox = styled.div`
  position: absolute;
  cursor: pointer;
  top: 3.75pt;
  right: 3.75pt;
`;

export default CompanyDetailInfo;
