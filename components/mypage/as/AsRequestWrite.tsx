import styled from '@emotion/styled';
import { MenuItem, Select, TextField, SelectChangeEvent } from '@mui/material';
import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import colors from 'styles/colors';
import Header from './Header';
import camera from 'public/images/gray_camera.png';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Image from 'next/image';
import CloseImg from 'public/images/XCircle.svg';
import { Router, useRouter } from 'next/router';
const M5_LIST = [
  '3.5 kW 과금형 콘센트',
  '7 kW 홈 충전기 (가정용)',
  '7 kW 충전기 (공용, 경제형)',
  '7 kW 충전기 (공용)',
  '11 kW 충전기',
  '14 kW 충전기',
  '17.6 kW 충전기',
  '20 kW 충전기',
  '50 kW 충전기',
  '100 kW 충전기',
  '200 kW 충전기',
  '300 kW 충전기',
  '350 kW 충전기',
  '400 kW 충전기',
  '300 kW 충전기 (버스)',
  '350 kW 충전기 (버스)',
  '400 kW 충전기 (버스)',
];

type Props = {};

interface Option {
  m5: string;
}
interface CheckType {
  1: boolean;
  2: boolean;
  3: boolean;
}

interface ReviewType {
  productNm: string;
  review: string;
  productImg: any;
  createDt: number;
}

export interface DateType {
  new (): Date;
}

const AsRequestWrite = (props: Props) => {
  const router = useRouter();
  const imgRef = useRef<any>(null);
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option>({
    m5: '',
  });
  const [title, setTitle] = useState<string>('');
  const [imgValidation, setImgValidation] = useState(false);
  const [reqeustText, setRequestText] = useState('');
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
  useEffect(() => {
    if (
      title !== '' &&
      selectedOption.m5.length > 1 &&
      imgValidation &&
      reqeustText !== ''
    ) {
      setCheckAll(() => true);
    } else {
      setCheckAll(() => false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption, review, title, reqeustText]);

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
    }

    setImgValidation(true);
  };
  const imgHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    imgRef.current.click();
  };

  const handlePhotoDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    const name = Number(e.currentTarget.dataset.name);
    const copyArr = [];
    copyArr.push(review);
    copyArr[0].productImg.splice(name, 1);
    setReview({ ...review, productImg: copyArr[0].productImg });
  };

  const handleChange = (e: SelectChangeEvent<unknown>) => {
    const { name, value } = e.target;
    setSelectedOption(() => ({
      ...selectedOption,
      [name]: value,
    }));
  };

  const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(() => e.target.value);
  };

  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRequestText(() => e.target.value);
  };
  return (
    <>
      <Container>
        <Header text={'A/S 요청하기'} colorselect={checkAll} />
        <TitleInputBox>
          <Label>제목</Label>
          <Input value={title} onChange={titleChange} type="text" required />
        </TitleInputBox>
        <RemainderInputBox>
          <Label>충전소</Label>
          <SelectContainer>
            <SelectBox
              value={selectedOption.m5}
              name="m5"
              style={{
                color: selectedOption.m5.length > 0 ? 'black' : '#caccd1',
              }}
              onChange={handleChange}
              displayEmpty
              required
              IconComponent={() => <SelectIcon />}
            >
              <MenuItem value="">
                <em>충전소를 선택해주세요</em>
              </MenuItem>
              {M5_LIST.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </SelectBox>
          </SelectContainer>
        </RemainderInputBox>
        <RemainderInputBox>
          <Label>요청내용</Label>
          <TextArea
            placeholder="고장제품 종류, 증상, 사진, 발생 시점 등을 
알려주시면 더욱 빠른 서비스에 도움이 됩니다."
            rows={7}
            value={reqeustText}
            onChange={handleTextArea}
            required
          />
        </RemainderInputBox>
        <RemainderInputBox>
          <Label>사진첨부</Label>
          <PhotosBox>
            <AddPhotos onClick={imgHandler}>
              <Image src={camera} alt="" />
            </AddPhotos>
            <input
              style={{ display: 'none' }}
              ref={imgRef}
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
      </Container>
      <NextBtn
        onClick={() => router.push('/mypage/as/complete')}
        checkAll={checkAll}
      >
        A/S 요청하기
      </NextBtn>
    </>
  );
};

const Container = styled.div`
  padding-left: 15pt;
  padding-right: 15pt;
`;

const TitleInputBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 12pt;
  gap: 9pt;
`;
const RemainderInputBox = styled.div`
  flex-direction: column;
  display: flex;
  margin-top: 24pt;
`;

const Label = styled.label`
  font-family: Spoqa Han Sans Neo;
  font-size: 10.5pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
`;

const Input = styled(TextField)`
  width: 100%;
  border-radius: 6pt;
  border: 1px solid #e2e5ed;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  .MuiInputBase-root {
    padding: 10.5pt 12pt;
  }
  & input {
    font-size: 10.5pt;
    font-weight: 400;
    line-height: 12pt;
    letter-spacing: -2%;
    color: ${colors.lightGray3};
    text-align: left;
    padding: 0;
  }

  ::placeholder {
    color: #caccd1;
    font-weight: 400;
  }
  & span > img {
    width: 15pt;
    height: 15pt;
  }
  & fieldset {
    border: none;
  }
`;

const SelectContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SelectBox = styled(Select)`
  width: 100vw;
  border: 1px solid #e2e5ed;
  border-radius: 8px;
  margin-top: 9pt;
  font-weight: 400;
  font-size: 16px;
  letter-spacing: -0.02em;
  color: ${colors.lightGray2};
  & div {
    padding-left: 12.75pt;
    padding-top: 13.5pt;
    padding-bottom: 13.5pt;
  }
  & fieldset {
    border: none;
  }
  & svg {
    padding-right: 11.25pt;
  }
`;

const SelectIcon = styled(KeyboardArrowDownIcon)`
  width: 24px;
  height: 24px;
  color: ${colors.dark};
`;

const TextArea = styled.textarea`
  resize: none;
  border: 1px solid #e2e5ed;
  padding: 12pt;
  margin-top: 9pt;
  border-radius: 6pt;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 12pt;
  line-height: 18pt;
  letter-spacing: -0.02em;
  &::placeholder {
    color: #caccd1;
  }
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

const NextBtn = styled.button<{ checkAll: boolean }>`
  width: 100%;
  margin-top: 40.6875pt;
  padding-top: 15pt;
  padding-bottom: 15pt;
  background-color: ${({ checkAll }) =>
    checkAll ? `${colors.main}` : `${colors.blue3}`};
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: #ffffff;
  text-align: center;

  @media (max-width: 899pt) {
    padding-bottom: 39pt;
  }
`;

const ImgSpan = styled.div`
  position: relative;
`;
const Xbox = styled.div`
  position: absolute;
  top: -7pt;
  right: -7pt;
`;
export default AsRequestWrite;
