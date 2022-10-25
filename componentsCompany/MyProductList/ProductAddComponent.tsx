import styled from '@emotion/styled';
import { MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import colors from 'styles/colors';
import CompanyHeader from './Header';
import plusIcon from 'public/images/PlusCircle28.png';
import Xbtn from 'public/images/XCircle28.png';
import camera from 'public/images/gray_camera.png';
import CloseImg from 'public/images/XCircle.svg';
import Image from 'next/image';
import { M5_LIST, M5_LIST_EN, M7_LIST, M7_LIST_EN } from 'assets/selectList';
import { CHARGING_METHOD } from 'companyAssets/selectList';
import FileText from 'public/images/FileText.png';
import AddImg from 'public/images/add-img.svg';
import { BusinessRegistrationType } from 'components/SignUp';
import { useMutation } from 'react-query';
import { isTokenPostApi, multerApi } from 'api';
import Modal from 'components/Modal/Modal';
import { convertEn } from 'utils/changeValue';
import { AxiosError } from 'axios';
import { getByteSize } from 'utils/calculatePackage';

export interface ImgFile {
  originalName: string;
  size: number;
  url: string;
}
export interface MulterResponse {
  isSuccess: boolean;
  uploadedFiles: ImgFile[];
}

type Props = {};
const TAG = 'componentsCompany/MyProductList/ProductAddComponents.tsx';
const ProductAddComponent = (props: Props) => {
  const router = useRouter();
  const imgRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  // 모델명
  const [modelName, setModelName] = useState<string>('');
  // 충전기 종류
  const [chargerType, setChargerType] = useState<string>('');
  // 충전 채널
  const [chargingChannel, setChargingChannel] = useState<string>('');
  // 충전 방식
  const [chargingMethod, setChargingMethod] = useState<string[]>(['']);
  // 제조사
  const [manufacturer, setManufacturer] = useState<string>('');
  // 특장점
  const [advantages, setAdvantages] = useState<string>('');
  // 이미지
  const [imgArr, setImgArr] = useState<BusinessRegistrationType[]>([]);
  // 파일
  const [fileArr, setFileArr] = useState<BusinessRegistrationType[]>([]);
  // 유효성 검사
  const [isValid, setIsValid] = useState(false);
  // 에러 모달
  const [isModal, setIsModal] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // api 호출 (with react-query)
  const { mutate: addProduct, isLoading } = useMutation(isTokenPostApi, {
    onSuccess: () => {
      router.push('/company/myProductList');
    },
    onError: (error: any) => {
      if (error.response.data) {
        setErrorMessage(error.response.data.message);
        setIsModal(true);
      } else {
        setErrorMessage('다시 시도해주세요');
        setIsModal(true);
        setNetworkError(true);
      }
    },
  });
  // image s3 multer 저장 API (with useMutation)
  const { mutate: multerImage, isLoading: multerImageLoading } = useMutation<
    MulterResponse,
    AxiosError,
    FormData
  >(multerApi, {
    onSuccess: (res) => {
      console.log(TAG + ' 👀 ~ line 84 multer onSuccess');
      console.log(res);
      const newArr = [...imgArr];
      res?.uploadedFiles.forEach((img) => {
        newArr.push({
          url: img.url,
          size: img.size,
          originalName: decodeURIComponent(img.originalName),
        });
      });
      setImgArr(newArr);
    },
    onError: (error: any) => {
      if (error.response.data.message) {
        setErrorMessage(error.response.data.message);
        setIsModal(true);
      } else if (error.response.state === 413) {
        setErrorMessage('용량이 너무 큽니다.');
        setIsModal(true);
      } else {
        setErrorMessage('다시 시도해주세요');
        setIsModal(true);
        setNetworkError(true);
      }
    },
  });
  // file s3 multer 저장 API (with useMutation)
  const { mutate: multerFile, isLoading: multerFileLoading } = useMutation<
    MulterResponse,
    AxiosError,
    FormData
  >(multerApi, {
    onSuccess: (res) => {
      console.log(TAG + ' 👀 ~ line 84 multer onSuccess');
      console.log(res);
      const newFile = [...fileArr];
      res?.uploadedFiles.forEach((img) => {
        newFile.push({
          url: img.url,
          size: img.size,
          originalName: decodeURIComponent(img.originalName),
        });
      });
      setFileArr(newFile);
    },
    onError: (error: any) => {
      if (error.response.data.message) {
        setErrorMessage(error.response.data.message);
        setIsModal(true);
      } else if (error.response.state === 413) {
        setErrorMessage('용량이 너무 큽니다.');
        setIsModal(true);
      } else {
        setErrorMessage('다시 시도해주세요');
        setIsModal(true);
        setNetworkError(true);
      }
    },
  });

  // 모달 클릭
  const onClickModal = () => {
    if (networkError) {
      setIsModal(false);
      router.push('/company/quotation');
    } else {
      setIsModal(false);
    }
  };

  // SelectBox 값
  const onChangeSelectBox = (e: any, index?: number) => {
    switch (e.target.name) {
      case 'kind':
        setChargerType(e.target.value);
        break;
      case 'channel':
        setChargingChannel(e.target.value);
        break;
      case 'chargingMethod':
        let pasteArray: string[] = [];
        if (index === 0) {
          pasteArray.push(e.target.value);
        } else {
          pasteArray.push(...chargingMethod);
        }
        if (index) {
          pasteArray[index] = e.target.value;
        }
        setChargingMethod(pasteArray);
    }
  };
  // 인풋박스 추가 버튼
  const handlePlusSelect = () => {
    if (chargingMethod.length === 5) return;
    let copy: string[] = chargingMethod.concat('');
    setChargingMethod(copy);
  };
  // 인풋박스 삭제 버튼
  const onClickMinus = (index: number) => {
    const copy = [...chargingMethod];
    copy.splice(index, 1);
    setChargingMethod(copy);
  };
  // 다음 버튼
  const buttonOnClick = () => {
    if (isValid) {
      addProduct({
        url: '/products',
        data: {
          modelName: modelName,
          chargerKind: convertEn(M5_LIST, M5_LIST_EN, chargerType), // 변환
          chargerChannel: convertEn(M7_LIST, M7_LIST_EN, chargingChannel), // 변환
          chargerMethods: chargingMethod,
          manufacturer: manufacturer,
          feature: advantages,
          chargerImageFiles: imgArr,
          catalogFiles: fileArr,
        },
      });
    }
  }; // 사진 온클릭
  const imgHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    imgRef?.current?.click();
  };
  // 사진 저장
  const saveFileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const maxLength = 3;
    // max길이 보다 짧으면 멈춤
    const formData = new FormData();
    for (let i = 0; i < maxLength; i += 1) {
      if (files![i] === undefined) {
        break;
      }
      formData.append(
        'chargerProduct',
        files![i],
        encodeURIComponent(files![i].name),
      );
    }
    multerImage(formData);
  };
  // 사진 삭제
  const handlePhotoDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    const name = Number(e.currentTarget.dataset.name);
    const copyArr = [...imgArr];
    for (let i = 0; i < copyArr.length; i++) {
      if (i === name) {
        copyArr.splice(i, 1);
        return setImgArr(copyArr);
      }
    }
  };
  //파일 온클릭
  const handleFileClick = () => {
    fileRef?.current?.click();
  };
  // 파일 저장
  const saveFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const maxLength = 3;
    // max길이 보다 짧으면 멈춤
    const formData = new FormData();
    for (let i = 0; i < maxLength; i += 1) {
      if (files![i] === undefined) {
        break;
      }
      formData.append(
        'chargerProduct',
        files![i],
        encodeURIComponent(files![i].name),
      );
    }
    multerFile(formData);
  };

  // 파일 삭제
  const handleFileDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    const name = Number(e.currentTarget.dataset.name);
    const copyArr = [...fileArr];
    for (let i = 0; i < copyArr.length; i++) {
      if (i === name) {
        copyArr.splice(i, 1);
        return setFileArr(copyArr);
      }
    }
  };
  // 유효성 검사 함수
  function validFn(value: string[]) {
    const result = value.filter((e) => e === '');
    result.length >= 1 ? setIsValid(false) : setIsValid(true);
  }
  // 테스트 useEffect
  useEffect(() => {
    validFn([
      modelName,
      chargerType,
      chargingChannel,
      chargingMethod[0],
      manufacturer,
    ]);
  }, [modelName, chargerType, chargingChannel, chargingMethod, manufacturer]);

  useEffect(() => {
    console.log(`🚀 ~ ${TAG} ~ line 292 ~ imgArr ~ decode`);
    console.log(imgArr);
  }, [imgArr]);

  return (
    <>
      {/* 에러 모달 */}
      {isModal && <Modal click={onClickModal} text={errorMessage} />}
      {/* 헤더 */}
      <CompanyHeader back={true} title={'제품 추가하기'} />
      {/* 인풋 바디 */}
      <InputContainer>
        <InputBox>
          <LabelBox>
            <RequiredLabel>모델명</RequiredLabel>
            <RightLabel>필수 입력</RightLabel>
          </LabelBox>
          <Input
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            required
          />
        </InputBox>
        {/* 충전기 종류 */}
        <InputBox>
          <LabelBox>
            <RequiredLabel>충전기 종류</RequiredLabel>
          </LabelBox>
          <SelectBox
            value={chargerType || ''}
            placeholder="충전기 종류"
            name="kind"
            onChange={(e) => onChangeSelectBox(e)}
            IconComponent={SelectIcon}
            displayEmpty
          >
            <MenuItem value="">
              <Placeholder>충전기 종류</Placeholder>
            </MenuItem>
            {M5_LIST.map((el, index) => (
              <MenuItem key={index} value={el}>
                {el}
              </MenuItem>
            ))}
          </SelectBox>
        </InputBox>
        {/* 충전 채널 */}
        <InputBox>
          <LabelBox>
            <RequiredLabel>충전 채널</RequiredLabel>
          </LabelBox>
          <SelectBox
            value={chargingChannel || ''}
            placeholder="충전기 채널"
            name="channel"
            onChange={(e) => onChangeSelectBox(e)}
            IconComponent={SelectIcon}
            displayEmpty
          >
            <MenuItem value="">
              <Placeholder>충전기 채널</Placeholder>
            </MenuItem>

            {M7_LIST.map((el, index) => (
              <MenuItem key={index} value={el}>
                {el}
              </MenuItem>
            ))}
          </SelectBox>
        </InputBox>
        {/* 충전방식 */}
        <InputBox>
          <LabelBox>
            <RequiredLabel>충전 방식</RequiredLabel>
            <RightPlus onClick={handlePlusSelect}>
              <Image src={plusIcon} alt="plusBtn" />
            </RightPlus>
          </LabelBox>

          {chargingMethod.length > 0 &&
            chargingMethod?.map((el, index) => (
              <React.Fragment key={index}>
                {/* 원래 기본 */}
                {index === 0 && (
                  <SelectBox
                    value={chargingMethod[index] || ''}
                    placeholder="충전 방식"
                    name="chargingMethod"
                    onChange={(e) => onChangeSelectBox(e, index)}
                    IconComponent={SelectIcon}
                    displayEmpty
                  >
                    <MenuItem value="">
                      <Placeholder>충전 방식</Placeholder>
                    </MenuItem>

                    {CHARGING_METHOD.map((el, index) => (
                      <MenuItem key={index} value={el}>
                        {el}
                      </MenuItem>
                    ))}
                  </SelectBox>
                )}
                {/* + 버튼 눌러서 추가되는 부분  */}
                {index > 0 && (
                  <PlusBox key={index}>
                    <SelectBox
                      value={chargingMethod[index] || ''}
                      placeholder="충전 방식"
                      name="chargingMethod"
                      onChange={(e) => onChangeSelectBox(e, index)}
                      IconComponent={SelectIcon}
                      displayEmpty
                    >
                      <MenuItem value="">
                        <Placeholder>충전 방식</Placeholder>
                      </MenuItem>

                      {CHARGING_METHOD.map((el, index) => (
                        <MenuItem key={index} value={el}>
                          {el}
                        </MenuItem>
                      ))}
                    </SelectBox>

                    <DeleteBtn onClick={() => onClickMinus(index)}>
                      <Image src={Xbtn} alt="delete" />
                    </DeleteBtn>
                  </PlusBox>
                )}
              </React.Fragment>
            ))}
        </InputBox>
        {/* 제조사 부분  */}
        <InputBox>
          <LabelBox>
            <RequiredLabel>제조사</RequiredLabel>
          </LabelBox>
          <Input
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
            required
          />
        </InputBox>
        {/* 특장점 */}
        <InputBox>
          <LabelBox>
            <UnRequired>특장점</UnRequired>
          </LabelBox>
          <TextArea
            name="firstPageTextArea"
            value={advantages}
            onChange={(e) => setAdvantages(e.target.value)}
            placeholder="선택 입력사항"
            rows={7}
          />
        </InputBox>
        {/* 사진 첨부 부분 */}
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
            {imgArr?.map((img, index) => (
              <ImgSpan key={index} data-name={index}>
                <Image
                  layout="fill"
                  alt="preview"
                  data-name={index}
                  key={index}
                  src={img.url}
                  priority={true}
                  unoptimized={true}
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
        {/* 파일 부분 */}
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
              {fileArr?.map((item, index) => (
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
      </InputContainer>
      <Btn buttonActivate={isValid} tabNumber={0} onClick={buttonOnClick}>
        제품 등록하기
      </Btn>
    </>
  );
};

const InputContainer = styled.div`
  margin-top: 11.25pt;
  padding-left: 15pt;
  padding-right: 15pt;
  padding-bottom: 126.75pt;
`;

const InputBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 9pt;
  margin-bottom: 24pt;
`;

const LabelBox = styled.div``;

//  별 붙은 필수 요소 라벨
const RequiredLabel = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 10.5pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
  &::after {
    content: ' *';
    margin-left: 1pt;
    color: #f75015;
  }
`;

const RightLabel = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 9pt;
  font-weight: 500;
  line-height: 10.5pt;
  letter-spacing: -0.02em;
  text-align: left;
  position: absolute;
  right: 0;
  top: 0;
  &::before {
    content: '* ';
    margin-left: 1pt;
    color: #f75015;
  }
`;

const RightPlus = styled.div`
  width: 21pt;
  height: 21pt;
  position: absolute;
  right: 0;
  top: -4.5pt;
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
  & > .MuiInputBase-root > fieldset {
    border: 1pt solid #e2e5ed !important;
    border-radius: 6pt !important;
  }
  :focus > .remove {
    display: block;
  }
`;

const SelectBox = styled(Select)`
  width: 100%;
  border: 1px solid #e2e5ed;
  border-radius: 8px;
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
    margin-right: 11.25pt;
  }
`;

const SelectIcon = styled(KeyboardArrowDownIcon)`
  width: 18pt;
  height: 18pt;
  color: ${colors.dark} !important;
`;

const Placeholder = styled.em`
  font-weight: 400;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.lightGray3};
`;

const UnRequired = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 10.5pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
`;

const TextArea = styled.textarea`
  resize: none;
  border: 1px solid ${colors.gray};
  width: 100%;
  padding: 12pt;
  box-sizing: border-box;
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

const Btn = styled.div<{ buttonActivate: boolean; tabNumber?: number }>`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  color: ${colors.lightWhite};
  width: ${({ tabNumber }) => (tabNumber === 0 ? '100%' : '64%')};
  padding: 15pt 0 15pt 0;
  text-align: center;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  margin-top: 30pt;
  cursor: pointer;
  background-color: ${({ buttonActivate }) =>
    buttonActivate ? colors.main : colors.blue3};

  @media (max-width: 899pt) {
    position: fixed;
    padding: 15pt 0 39pt 0;
  }
`;

const PlusBox = styled.div`
  display: flex;
  gap: 12pt;
`;

const DeleteBtn = styled.div`
  width: 21pt;
  height: 21pt;
  padding-top: 10.885pt;
  padding-bottom: 10.885pt;
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
  padding-bottom: 58.6875pt;
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
  width: 56.0625pt;
  height: 56.0625pt;
  border-radius: 6pt;
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

export default ProductAddComponent;
