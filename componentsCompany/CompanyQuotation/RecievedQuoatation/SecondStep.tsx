import styled from '@emotion/styled';
import { MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import colors from 'styles/colors';
import Image from 'next/image';
import camera from 'public/images/gray_camera.png';
import CloseImg from 'public/images/XCircle.svg';
import { reviewType } from './HeadOpenContent';
import { BusinessRegistrationType } from 'components/SignUp';
import FileText from 'public/images/FileText.png';
import AddImg from 'public/images/add-img.svg';

type Props = {
  tabNumber: number;
  setTabNumber: Dispatch<SetStateAction<number>>;
  canNext: boolean;
  SetCanNext: Dispatch<SetStateAction<boolean>>;
  customerOwner: number;
  setCustomerOwner: Dispatch<SetStateAction<number>>;
  review: reviewType;
  setReview: Dispatch<SetStateAction<reviewType>>;
  businessRegistration: BusinessRegistrationType[];
  setBusinessRegistration: Dispatch<SetStateAction<BusinessRegistrationType[]>>;
};

const SecondStep = ({
  tabNumber,
  setTabNumber,
  canNext,
  SetCanNext,
  customerOwner,
  setCustomerOwner,
  review,
  setReview,
  businessRegistration,
  setBusinessRegistration,
}: Props) => {
  // 사진을 위한 ref
  const imgRef = useRef<any>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const BtnList: string[] = ['구매자 자율', '운영사업자 입력'];
  const chargerData: string[] = [
    'LECS-007ADE',
    'LECS-006ADE',
    'LECS-005ADE',
    'LECS-004ADE',
  ];

  const [selectedItem, setSelectedItem] = useState();

  useEffect(() => {
    SetCanNext(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    console.log(customerOwner);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerOwner]);

  const handleCustomerOwner = (index: any) => {
    setCustomerOwner(index);
  };

  const imgHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
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
  // 사진 삭제
  const handlePhotoDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    const name = Number(e.currentTarget.dataset.name);
    const copyArr = [];
    copyArr.push(review);
    copyArr[0].productImg.splice(name, 1);
    setReview({ ...review, productImg: copyArr[0].productImg });
  };

  //파일

  const handleFileClick = () => {
    fileRef?.current?.click();
  };

  const saveFile = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      console.log('test');
      console.log(imageUrl);
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

  const getByteSize = (size: number) => {
    const byteUnits = ['KB', 'MB', 'GB', 'TB'];
    for (let i = 0; i < byteUnits.length; i++) {
      size = Math.floor(size / 1024);
      if (size < 1024) return size.toFixed(1) + byteUnits[i];
    }
  };
  const handleFileDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    const name = Number(e.currentTarget.dataset.name);
    const copyArr = [...businessRegistration];
    for (let i = 0; i < copyArr.length; i++) {
      if (i === name) {
        copyArr.splice(i, 1);
        return setBusinessRegistration(copyArr);
      }
    }
  };

  const onChangeSelectBox = (e: SelectChangeEvent<unknown>) => {
    e.target.value;
    // setSelectedItem(e.target.value);
  };
  // 이전
  const handlePrevBtn = () => {
    if (tabNumber > 0) setTabNumber(tabNumber - 1);
  };
  // 다음
  const handleNextBtn = () => {
    // if (buttonActivate) {
    //   // 홈충전기 그래프 선택 불가 상품일 경우
    //   if (unavailableGraph) {
    //     dispatch(
    //       quotationAction.setStep2({
    //         subscribeProduct: subscribeTypeEn[subscribeNumber],
    //         investRate: '1',
    //       }),
    //     );
    //     // 일반 경우
    //   } else {
    //     dispatch(
    //       quotationAction.setStep2({
    //         subscribeProduct: subscribeTypeEn[subscribeNumber],
    //         investRate: (value / 100).toString(),
    //       }),
    //     );
    //   }
    setTabNumber(tabNumber + 1);
    // }
  };

  return (
    <>
      <Wrapper>
        <TopStep>
          <div>STEP 2</div>
          <div>* 필수 입력</div>
        </TopStep>
        <SubWord>
          <p>7 kW 충전기 (공용), 벽걸이, 싱글</p> 제품의
          <br />
          정보를 입력해주세요.
        </SubWord>
        <ChargeMoney>
          <div className="withAfter">충전요금</div>
          <BtnBox>
            {BtnList.map((el, index) => (
              <Btn
                key={index}
                //   onClick={() => setCustomerOwner(index)}
                onClick={() => handleCustomerOwner(index)}
                className={index == customerOwner ? 'selected' : ''}
              >
                {el}
              </Btn>
            ))}
          </BtnBox>
          <InputBox>
            <div>
              <Input
                placeholder="0"
                //   value={monthlySubscribePrice}
                name="subscribeMoney"
              />
              <div>원/kW</div>
            </div>
          </InputBox>
        </ChargeMoney>
      </Wrapper>
      <Divide></Divide>
      <SecondWrapper>
        <TopBox>
          <div>
            [선택사항] 내 제품 리스트에서 <div>가져오기</div>
          </div>
          <div>* 등록된 제품을 선택하면 아래 정보가 자동으로 입력됩니다.</div>
        </TopBox>
        <SelectBox
          value={selectedItem}
          placeholder="충전기 종류"
          name="kind"
          onChange={(e) => onChangeSelectBox(e)}
          IconComponent={() => <SelectIcon />}
          displayEmpty
        >
          <MenuItem value="">
            <Placeholder>충전기 종류</Placeholder>
          </MenuItem>

          {chargerData.map((el, index) => (
            <MenuItem key={index} value={el}>
              {el}
            </MenuItem>
          ))}
        </SelectBox>
        <BottomInputBox>
          <div className="withAfter">제조사</div>
          <div>
            <Inputs
              // onChange={(e) => setConstructionPeriod(e.target.value)}
              // value={constructionPeriod}
              name="constructionPeriod"
            />
          </div>
        </BottomInputBox>
        <InputBox className="secondChargerText">
          <div>충전기 특장점</div>
          <div>
            <TextArea
              //   onChange={(e) => setFirstPageTextArea(e.target.value)}
              //   value={firstPageTextArea}
              name="firstPageTextArea"
              placeholder="선택 입력사항"
              rows={7}
            />
          </div>
        </InputBox>
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
        {/*  여기서부터 파일 */}
        <RemainderInputBoxs>
          <PhotosBoxs>
            <Form>
              <label>충전기 카탈로그</label>
              <div>
                <File onClick={handleFileClick}>
                  <Image src={AddImg} alt="img" />
                  <div>파일 업로드</div>
                </File>
              </div>
            </Form>
            {/* 파일 input */}
            <input
              style={{ display: 'none' }}
              ref={fileRef}
              className="imageClick"
              type="file"
              accept="xlsx"
              onChange={saveFile}
              multiple
            />

            {/* <File_Preview> */}
            <div className="file-preview">
              {businessRegistration?.map((item, index) => (
                <FileBox key={index} data-name={index}>
                  <div className="file">
                    <div className="file-img">
                      <Image src={FileText} alt="file-icon" />
                    </div>
                    <div className="file-data">
                      <span className="file-name">{item.originalName}</span>
                      <span className="file-size">{`용량 ${getByteSize(
                        item.size,
                      )}`}</span>
                    </div>
                    <div
                      className="file-exit"
                      onClick={handleFileDelete}
                      data-name={index}
                    >
                      <Image src={CloseImg} data-name={index} alt="closeBtn" />
                    </div>
                  </div>
                </FileBox>
              ))}
            </div>
          </PhotosBoxs>
        </RemainderInputBoxs>
      </SecondWrapper>
      <TwoBtn>
        <PrevBtn onClick={handlePrevBtn}>이전</PrevBtn>
        <NextBtn onClick={handleNextBtn}>다음</NextBtn>
      </TwoBtn>
    </>
  );
};

const Wrapper = styled.div`
  padding-left: 15pt;
  padding-right: 15pt;
  box-sizing: border-box;
  padding-bottom: 30pt;
`;

const SecondWrapper = styled.div`
  padding-left: 15pt;
  padding-right: 15pt;
  box-sizing: border-box;
  margin-top: 30pt;
  padding-bottom: 58.6875pt;
`;

const TopStep = styled.div`
  margin-top: 24pt;
  display: flex;
  justify-content: space-between;
  & div:first-of-type {
    font-family: Spoqa Han Sans Neo;
    font-size: 15pt;
    font-weight: 500;
    line-height: 21pt;
    letter-spacing: -0.02em;
    text-align: left;
    color: ${colors.main};
  }
  & div:nth-of-type(2) {
    font-family: Spoqa Han Sans Neo;
    font-size: 9pt;
    font-weight: 500;
    line-height: 10.5pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;

const SubWord = styled.div`
  margin-top: 6pt;
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 400;
  line-height: 18pt;
  letter-spacing: -0.02em;
  text-align: left;
  & p {
    font-weight: 700;
    display: inline-block;
  }
`;

// 충전요금 버튼, 인풋 부분
const ChargeMoney = styled.div`
  margin-top: 30pt;
  display: flex;
  flex-direction: column;
  gap: 9pt;
  & .withAfter {
    font-family: Spoqa Han Sans Neo;
    font-size: 10.5pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
  & .withAfter::after {
    content: ' *';
    margin-left: 1pt;
    color: #f75015;
  }
`;

const BtnBox = styled.div`
  display: flex;
  gap: 11.25pt;
`;

const Btn = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 400;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: center;
  width: 100%;
  color: #a6a9b0;
  padding-top: 13.5pt;
  padding-bottom: 13.5pt;
  border: 1px solid #e2e5ed;
  border-radius: 6pt;
  &.selected {
    border: 1px solid ${colors.main};
    color: ${colors.main};
  }
`;

const InputBox = styled.div`
  display: flex;
  gap: 9pt;
  flex-direction: column;

  &.secondChargerText {
    margin-top: 30pt;
    & div:first-of-type {
      font-family: Spoqa Han Sans Neo;
      font-size: 10.5pt;
      font-weight: 700;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: left;
    }
  }

  & > div {
    display: flex;
    gap: 12pt;
    align-items: center;
  }
  & div > .MuiFormControl-root > .MuiInputBase-root > fieldset {
    border: 1pt solid #e2e5ed !important;
    border-radius: 6pt !important;
  }
  & > div > div {
    font-family: Spoqa Han Sans Neo;
    font-size: 12pt;
    font-weight: 400;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: right;
  }
`;
// 밑에 분리되어있는 곳의 input박스
const BottomInputBox = styled.div`
  display: flex;
  margin-top: 30pt;
  flex-direction: column;
  gap: 9pt;
  & .withAfter {
    font-family: Spoqa Han Sans Neo;
    font-size: 10.5pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
  & .withAfter::after {
    content: ' *';
    margin-left: 1pt;
    color: #f75015;
  }
  // input border 색 맞추기
  & div > .MuiFormControl-root > .MuiInputBase-root > fieldset {
    border: 1pt solid #e2e5ed !important;
    border-radius: 6pt !important;
  }
  & > div > div {
    font-family: Spoqa Han Sans Neo;
    font-size: 12pt;
    font-weight: 400;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;

const Input = styled(TextField)`
  width: 100%;
  & input {
    padding: 10.885pt 0 10.885pt 12pt;
    text-align: right;
    font-weight: 500;
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

// 제조사 input 텍스트 align 달라서 분리
const Inputs = styled(TextField)`
  width: 100%;
  & input {
    padding: 10.885pt 0 10.885pt 12pt;
    text-align: left;
    font-weight: 500;
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

const Divide = styled.div`
  width: 100vw;
  height: 3pt;
  background-color: #f3f4f7;
`;

const TopBox = styled.div`
  & div:first-of-type {
    font-family: Spoqa Han Sans Neo;
    font-size: 10.5pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
  & > div > div {
    display: inline-block;
    color: ${colors.main};
  }
  & div:nth-of-type(2) {
    font-family: Spoqa Han Sans Neo;
    font-size: 9pt;
    margin-top: 6pt;
    font-weight: 400;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
    color: #747780;
  }
`;

const SelectBox = styled(Select)`
  width: 100%;
  border: 1px solid #e2e5ed;
  border-radius: 8px;
  margin-top: 9pt;
  font-weight: 400;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  & div {
    padding-left: 12.75pt;
    padding-top: 10.135pt;
    padding-bottom: 10.135pt;
  }
  & fieldset {
    border: none;
  }
  & svg {
    padding-right: 11.25pt;
  }
`;
const Placeholder = styled.em`
  font-weight: 400;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.lightGray3};
`;

const SelectIcon = styled(KeyboardArrowDownIcon)`
  width: 18pt;
  height: 18pt;
  color: ${colors.dark};
`;

const TextArea = styled.textarea`
  resize: none;
  border: 1px solid ${colors.gray};
  width: 100%;
  padding: 12pt;
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

const RemainderInputBox = styled.div`
  flex-direction: column;
  display: flex;
  margin-top: 24pt;
`;
const RemainderInputBoxs = styled.div`
  flex-direction: column;
  position: relative;
  width: 100%;
  display: flex;
  /* height: 100%; */
  margin-top: 24pt;
  & .file-preview {
    display: flex;
    width: 100%;
    flex-direction: column;
    padding-bottom: 58.6875pt;
    gap: 9pt;
  }
`;

const Label = styled.label`
  font-family: Spoqa Han Sans Neo;
  font-size: 10.5pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
`;

const PhotosBox = styled.div`
  width: 100%;
  height: 56.0625pt;
  margin-top: 9pt;
  display: flex;
  gap: 9.1875pt;
  align-items: center;
`;
const PhotosBoxs = styled.div`
  /* width: 100%; */
  height: 56.0625pt;
  margin-top: 9pt;
  display: flex;
  flex-direction: column;
  gap: 9pt;
  align-items: center;
  padding-bottom: 58.6875pt;
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

const FileBox = styled.div`
  display: flex;
  align-items: center;
  background: ${colors.lightWhite2}; // 컬러 왜 안나옴?..
  border: 1px solid #e2e5ed;
  border-radius: 6pt;
  position: relative;
  box-sizing: border-box;
  padding: 12pt 15pt;
  & .file {
    display: flex;
    width: 100%;
  }
  & .file > .file-img {
    width: 24pt;
    height: 24pt;
  }
  & .file > .file-data {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 9pt;
    padding-left: 15pt;
  }
  & .file > .file-data > .file-name {
    font-weight: 400;
    font-size: 10.5pt;
    line-height: 9pt;
    letter-spacing: -0.02em;
    color: ${colors.dark2};
  }
  .file-size {
    font-weight: 400;
    font-size: 9pt;
    line-height: 9pt;
    letter-spacing: -0.02em;
    color: ${colors.lightGray2};
  }
  .file-exit {
    /* display: flex;
    justify-content: center;
    align-items: center; */
    cursor: pointer;
    position: absolute;
    top: 16.5pt;
    right: 15pt;
  }
`;

const Form = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  /* margin-top: 24pt; */
  position: relative;
  & > label {
    font-family: Spoqa Han Sans Neo;
    font-size: 10.5pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
  & > div {
    margin-top: 9pt;
    width: 100%;
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
/* ${({ subscribeNumber }) => (subscribeNumber === 0 ? '100%' : '64%')}; */
/* ${({ buttonActivate }) =>
    buttonActivate ? colors.main : colors.blue3}; */
const NextBtn = styled.div<{
  //   buttonActivate: boolean;
  //   subscribeNumber?: number;
}>`
  color: ${colors.lightWhite};
  width: 100%;

  padding: 15pt 0;
  text-align: center;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  margin-top: 30pt;
  background-color: ${colors.main};

  cursor: pointer;
  @media (max-width: 899pt) {
    padding: 15pt 0 39pt 0;
  }
`;
const PrevBtn = styled.div`
  color: ${colors.lightWhite};
  width: 36%;
  padding: 15pt 0;
  text-align: center;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  margin-top: 30pt;
  background-color: ${colors.gray};
  cursor: pointer;
  @media (max-width: 899pt) {
    padding: 15pt 0 39pt 0;
  }
`;
const TwoBtn = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  @media (max-width: 899pt) {
    position: fixed;
  }
`;

export default SecondStep;
