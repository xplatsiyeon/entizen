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

  let doc: any;

  const [review, setReview] = useState<{
    productNm: string;
    review: string;
    productImg: any;
    createDt: number;
  }>({
    productNm: '',
    review: '',
    productImg: [],
    createDt: new Date().getTime(),
  });
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
  const imgHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('클릭이 됩니다~!');
    doc.click();

    imgRef.current.click();
    console.log('왜 안되냐');
  };
  const saveFileImage = (e: any) => {
    console.log('이것도 됩니다');
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
    console.log('여기도 됩니다');

    console.log(copyArr);
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
    } // setImgValidation(true);
  };
  useEffect(() => {
    if (document) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      doc = document.querySelector('.imageClick');
      console.log(doc);
      console.log('좀되라 제발;');
    }
  }, []);
  const handlePhotoDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    const name = Number(e.currentTarget.dataset.name);
    const copyArr = [];
    copyArr.push(review);
    copyArr[0].productImg.splice(name, 1);
    setReview({ ...review, productImg: copyArr[0].productImg });
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
      <RemainderInputBox>
        <Label>사진첨부</Label>
        <PhotosBox>
          <AddPhotos onClick={imgHandler}>
            <Image src={camera} alt="" />
          </AddPhotos>
          <input
            style={{ display: 'hidden' }}
            ref={imgRef}
            className="imageClick"
            type="file"
            accept="image/*"
            onChange={saveFileImage}
            multiple
          />
          {/* <Preview> */}
          {review.productImg &&
            review.productImg.map((img: any, index: any) => (
              <ImgSpan key={index} data-name={index}>
                <Image
                  style={{
                    borderRadius: '6pt',
                  }}
                  layout="intrinsic"
                  alt="preview"
                  width={74.75}
                  data-name={index}
                  height={74.75}
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
        </PhotosBox>
      </RemainderInputBox>
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
const RemainderInputBox = styled.div`
  flex-direction: column;
  display: flex;
  margin-top: 24pt;
`;

const PhotosBox = styled.div`
  width: 100%;
  height: 56.0625pt;
  margin-top: 9pt;
  display: flex;
  gap: 9.1875pt;
  align-items: center;
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
  top: -7pt;
  right: -7pt;
`;

export default CompanyDetailInfo;
