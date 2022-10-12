import styled from '@emotion/styled';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
// import Btn from 'components/button';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import colors from 'styles/colors';
import Btn from './button';
import camera from 'public/images/gray_camera.png';
import CloseImg from 'public/images/XCircle.svg';
import Image from 'next/image';
import AddImg from 'public/images/add-img.svg';

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
  const imgRef = useRef<any>(null);

  const [nextPageOn, setNextPageOn] = useState<boolean>(false);
  const [review, setReview] = useState<{
    productImg: any;
    createDt: number;
  }>({
    productImg: [],
    createDt: new Date().getTime(),
  });

  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(e.target.value);
  };
  const handleCompanyPostNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPostNumber(e.target.value);
  };

  const handleCompanyAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyAddress(e.target.value);
  };

  const handleNextClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setLevel(level + 1);
  };
  const imgHandler = (e: React.MouseEvent<HTMLLabelElement>) => {
    e.preventDefault();
    imgRef.current.click();
  };
  const saveFileImage = (e: any) => {
    const { files } = e.target;
    const newImageURL = [];
    const maxLength = 3;
    for (let i = 0; i < maxLength; i += 1) {
      if (files[i] === undefined) {
        break;
      }
      const nowImageUrl = URL.createObjectURL(files[i]);
      newImageURL.push(nowImageUrl);
    }
    const copyArr = [];
    copyArr.push(review);
    for (let i = 0; i < newImageURL.length; i++) {
      copyArr[0].productImg.push(newImageURL[i]);
    }

    if (review.productImg.length > 0) {
      setReview({
        ...review,
        productImg: copyArr[0].productImg,
      });
    } else if (review.productImg.length === 0) {
      setReview({
        ...review,
        productImg: newImageURL,
      });
    }
  };
  const handlePhotoDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    const name = Number(e.currentTarget.dataset.name);
    const copyArr = [];
    copyArr.push(review);
    copyArr[0].productImg.splice(name, 1);
    setReview({ ...review, productImg: copyArr[0].productImg });
  };
  useEffect(() => {
    if (
      companyName.length > 2 &&
      postNumber.length > 2 &&
      companyAddress.length > 2 &&
      companyDetailAddress.length > 2 &&
      review.productImg.length > 0
    ) {
      setNextPageOn(true);
    } else {
      setNextPageOn(false);
    }
    console.log(review.productImg[0]);
  }, [companyName, postNumber, companyAddress, companyDetailAddress, review]);

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
          onChange={(e) => setPostNumber(e.target.value)}
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
          onChange={handleCompanyAddress}
          name="checkPw"
        />
        <Input
          placeholder="회사 상세주소 입력"
          value={companyDetailAddress}
          onChange={(e) => setCompanyDetailAddress(e.target.value)}
          name="checkPw"
        />
      </Box>
      <RemainderInputBox>
        {/* <Label>사진첨부</Label> */}
        <PhotosBox>
          <Form>
            <label>사업자 등록증</label>
            <div>
              <File onClick={imgHandler}>
                <Image src={AddImg} alt="img" />
                <div>이미지 또는 파일 업로드</div>
                <input type="file" />
              </File>
            </div>
          </Form>
          {/* <AddPhotos onClick={imgHandler}>
            <Image src={camera} alt="" />
          </AddPhotos> */}
          <input
            style={{ display: 'none' }}
            ref={imgRef}
            className="imageClick"
            type="file"
            accept="image/*"
            onChange={saveFileImage}
            multiple
          />
          {/* <Preview> */}
          <div className="photos">
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
            {/* </Preview> */}
          </div>
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
const RemainderInputBox = styled.div`
  flex-direction: column;
  display: flex;
  margin-top: 30pt;
`;

const PhotosBox = styled.div`
  width: 100%;
  /* height: 56.0625pt; */
  /* margin-top: 9pt; */
  display: flex;
  flex-direction: column;
  /* gap: 15pt; */
  /* align-items: center; */
  & .photos {
    display: flex;
    margin-top: 15pt;
    /* margin-bottom: 15pt; */
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
  top: 3.75pt;
  right: 3.75pt;
`;

export default CompanyDetailInfo;
