import styled from '@emotion/styled';
import {
  containerClasses,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
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
import { BusinessRegistrationType } from 'components/SignUp';
import FileText from 'public/images/FileText.png';
import AddImg from 'public/images/add-img.svg';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { useDispatch } from 'react-redux';
import { chargerData, myEstimateAction } from 'storeCompany/myQuotation';
import { useMutation } from 'react-query';
import { isTokenPostApi, multerApi } from 'api';
import { useRouter } from 'next/router';
import Modal from 'components/Modal/Modal';
import { getByteSize, inputPriceFormat } from 'utils/calculatePackage';
import { AxiosError } from 'axios';
import { MulterResponse } from 'componentsCompany/MyProductList/ProductAddComponent';
import {
  ChargePriceType,
  chargers,
  finalQuotationAction,
  InstallationLocation,
} from 'storeCompany/finalQuotation';

type Props = {
  tabNumber: number;
  setTabNumber: Dispatch<SetStateAction<number>>;
  canNext: boolean;
  SetCanNext: Dispatch<SetStateAction<boolean>>;
  maxIndex: number | undefined;
  routerId: string | string[];
  selectedOption: chargers[];
  setSelectedOption: Dispatch<SetStateAction<chargers[]>>;
  selectedOptionEn: chargers[];
  setSelectedOptionEn: Dispatch<SetStateAction<chargers[]>>;
};

const TAG = 'omponentsCompany/CompanyQuotation/RecievedQuoatation/SecondStep';

const SecondStep = ({
  tabNumber,
  maxIndex,
  setTabNumber,
  canNext,
  SetCanNext,
  routerId,
  selectedOption,
  setSelectedOption,
  selectedOptionEn,
  setSelectedOptionEn,
}: Props) => {
  // 사진을 위한 ref
  const dispatch = useDispatch();
  const router = useRouter();
  const imgRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const chargeLocationTypeList: string[] = ['건물 안', '건물 밖'];
  const chargeLocationTypeListEn: string[] = ['OUTSIDE', 'INSIDE'];
  const chargeTypeList: string[] = ['구매자 자율', '운영사업자 입력'];
  const chargeTypeListEn: string[] = [
    'PURCHASER_AUTONOMY',
    'OPERATION_BUSINESS_CARRIER_INPUT',
  ];

  const chargerData: string[] = [
    'LECS-007ADE',
    'LECS-006ADE',
    'LECS-005ADE',
    'LECS-004ADE',
  ];
  const [chargeTypeNumber, setChargeTypeNumber] = useState<number>(-1);
  const [chargeLocationTypeNumber, setChargeLocationTypeNumber] =
    useState<number>(-1);
  const [fee, setFee] = useState<string>('');
  const [productItem, setProductItem] = useState<chargerData>('');
  const [manufacturingCompany, setManufacturingCompany] = useState<string>('');
  const [chargeFeatures, setChargeFeatures] = useState<string>('');
  const [imgArr, setImgArr] = useState<BusinessRegistrationType[]>([]);
  const [fileArr, setFileArr] = useState<BusinessRegistrationType[]>([]);
  // 에러 모달
  const [isModal, setIsModal] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // 리덕스
  const {
    chargers,
    subscribeProductFeature,
    constructionPeriod,
    subscribePricePerMonth,
  } = useSelector((state: RootState) => state.companymyEstimateData);
  const newCharge = chargers.slice(0, maxIndex);

  // image s3 multer 저장 API (with useMutation)
  const { mutate: multerImage, isLoading: multerImageLoading } = useMutation<
    MulterResponse,
    AxiosError,
    FormData
  >(multerApi, {
    onSuccess: (res) => {
      console.log(TAG + ' 👀 ~ line 95 multer onSuccess');
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
      } else if (error.response.status === 413) {
        setErrorMessage('용량이 너무 큽니다.');
        setIsModal(true);
      } else {
        setErrorMessage('다시 시도해주세요');
        setIsModal(true);
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
      console.log(TAG + ' 👀 ~ line 128 multer onSuccess');
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
      } else if (error.response.status === 413) {
        setErrorMessage('용량이 너무 큽니다.');
        setIsModal(true);
      } else {
        setErrorMessage('다시 시도해주세요');
        setIsModal(true);
      }
    },
  });
  // 보내기 POST API
  const { mutate: postMutate, isLoading } = useMutation(isTokenPostApi, {
    onSuccess: () => {
      router.push('/company/recievedRequest/complete');
    },
    onError: (error: any) => {
      const {
        response: { data },
      } = error;
      if (data) {
        setErrorMessage(data.message);
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

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFee(inputPriceFormat(value));
  };
  // 사진 온클릭
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
  // 셀렉트 박스 클릭
  const onChangeSelectBox = (e: SelectChangeEvent<unknown>) => {
    setProductItem(e.target.value as chargerData);
  };
  // 이전, 다음 버튼 리덕스 데이터 처리
  const storeChargeData = () => {
    dispatch(
      finalQuotationAction.addChargeStep2({
        idx: tabNumber - 1,
        chargePriceType: chargeTypeListEn[chargeTypeNumber] as ChargePriceType,
        chargePrice: Number(fee.replaceAll(',', '')),
        installationLocation: chargeLocationTypeListEn[
          chargeLocationTypeNumber
        ] as InstallationLocation,
        modelName: productItem,
        manufacturer: manufacturingCompany,
        productFeature: chargeFeatures,
        chargerImageFiles: imgArr,
        catalogFiles: fileArr,
      }),
    );
    dispatch(
      finalQuotationAction.addChargeKoStep2({
        idx: tabNumber - 1,
        chargePriceType: chargeTypeList[chargeTypeNumber] as ChargePriceType,
        chargePrice: Number(fee.replaceAll(',', '')),
        installationLocation: chargeLocationTypeList[
          chargeLocationTypeNumber
        ] as InstallationLocation,
        modelName: productItem,
        manufacturer: manufacturingCompany,
        productFeature: chargeFeatures,
        chargerImageFiles: imgArr,
        catalogFiles: fileArr,
      }),
    );
  };
  // 이전 버튼
  const handlePrevBtn = () => {
    if (tabNumber > 0) {
      storeChargeData();
      setTabNumber(tabNumber - 1);
    }
  };
  // 다음 버튼
  const handleNextBtn = () => {
    if (canNext) {
      if (tabNumber < maxIndex!) {
        storeChargeData();
        setTabNumber(tabNumber + 1);
      } else {
        setTabNumber(6);
      }
    }
  };

  // 다음버튼 유효성 검사
  useEffect(() => {
    if (chargeTypeNumber === 0 && manufacturingCompany !== '') {
      SetCanNext(true);
    } else if (
      chargeTypeNumber === 1 &&
      manufacturingCompany !== '' &&
      fee !== ''
    ) {
      SetCanNext(true);
    } else {
      SetCanNext(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chargeTypeNumber, fee, manufacturingCompany]);
  // 상태 업데이트 및 초기화 (with 리덕스)
  // useEffect(() => {
  //   const target = chargers[StepIndex];
  //   console.log(TAG + 'target 확인');
  //   console.log(StepIndex);
  //   console.log(target);
  //   if (target?.chargePriceType !== '') {
  //     if (target?.chargePriceType === 'PURCHASER_AUTONOMY')
  //       setChargeTypeNumber(0);
  //     if (target?.chargePriceType === 'OPERATION_BUSINESS_CARRIER_INPUT')
  //       setChargeTypeNumber(1);
  //   }
  //   if (target?.chargePrice !== 0) {
  //     setFee(target?.chargePrice.toString());
  //   }
  //   if (target?.modelName !== '') {
  //     setProductItem(target?.modelName);
  //   }
  //   if (target?.manufacturer !== '') {
  //     setManufacturingCompany(target?.manufacturer);
  //   }
  //   if (target?.feature !== '') {
  //     setChargeFeatures(target?.feature);
  //   }
  //   if (target?.chargerImageFiles?.length >= 1) {
  //     setImgArr(target?.chargerImageFiles);
  //   }
  //   if (target?.catalogFiles?.length >= 1) {
  //     setFileArr(target?.catalogFiles);
  //   }
  //   return () => {
  //     setChargeTypeNumber(-1);
  //     setFee('');
  //     setManufacturingCompany('');
  //     setProductItem('');
  //     setChargeFeatures('');
  //     setImgArr([]);
  //     setFileArr([]);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [StepIndex]);
  // 금액 초기화
  useEffect(() => {
    if (chargeTypeNumber === 0) {
      setFee('');
    }
  }, [chargeTypeNumber]);

  return (
    <>
      {/* 에러 모달 */}
      {isModal && <Modal click={onClickModal} text={errorMessage} />}
      <Wrapper>
        <TopStep>
          <div>STEP {tabNumber + 1}</div>
          <div>* 필수 입력</div>
        </TopStep>
        <SubWord>
          7 kW 충전기 (공용), 벽걸이, 싱글 <br />
          제품의 정보를 입력해주세요
        </SubWord>
        <ChargeMoney className="first">
          <div className="withAfter">충전요금</div>
          <BtnBox>
            {chargeTypeList.map((el, index) => (
              <Btn
                key={index}
                onClick={() => setChargeTypeNumber(index)}
                className={index === chargeTypeNumber ? 'selected' : ''}
              >
                {el}
              </Btn>
            ))}
          </BtnBox>
          <InputBox>
            <div>
              <Input
                onChange={onChangeInput}
                placeholder="0"
                value={fee}
                name="subscribeMoney"
                inputProps={{ readOnly: chargeTypeNumber === 0 ? true : false }}
              />
              <div>원/kW</div>
            </div>
          </InputBox>
        </ChargeMoney>
        <ChargeMoney>
          <div className="withAfter">충전기 설치 위치</div>
          <BtnBox>
            {chargeLocationTypeList.map((el, index) => (
              <Btn
                key={index}
                onClick={() => setChargeLocationTypeNumber(index)}
                className={index === chargeLocationTypeNumber ? 'selected' : ''}
              >
                {el}
              </Btn>
            ))}
          </BtnBox>
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
        <SelectContainer>
          <SelectBox
            value={productItem}
            onChange={onChangeSelectBox}
            IconComponent={SelectIcon}
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
        </SelectContainer>
        <BottomInputBox>
          <div className="withAfter">제조사</div>
          <div>
            <Inputs
              onChange={(e) => setManufacturingCompany(e.target.value)}
              value={manufacturingCompany}
              name="constructionPeriod"
            />
          </div>
        </BottomInputBox>
        <InputBox className="secondChargerText">
          <div>충전기 특장점</div>
          <div>
            <TextArea
              onChange={(e) => setChargeFeatures(e.target.value)}
              value={chargeFeatures}
              name="firstPageTextArea"
              placeholder="선택 입력사항"
              rows={7}
            />
          </div>
        </InputBox>
        <RemainderInputBox>
          <Label>충전기 이미지</Label>
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
            {imgArr?.map((item, index) => (
              <ImgSpan key={index} data-name={index}>
                <Image
                  layout="fill"
                  alt="preview"
                  data-name={index}
                  key={index}
                  src={item.url}
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
      </SecondWrapper>
      <TwoBtn>
        <PrevBtn onClick={handlePrevBtn}>이전</PrevBtn>
        <NextBtn canNext={canNext} onClick={handleNextBtn}>
          다음
        </NextBtn>
      </TwoBtn>
    </>
  );
};

const Wrapper = styled.div`
  padding-left: 15pt;
  padding-right: 15pt;
  box-sizing: border-box;
  padding-bottom: 30pt;
  .first {
    margin-top: 45pt;
  }
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
  margin-top: 21pt;
  font-family: Spoqa Han Sans Neo;
  font-size: 18pt;
  font-weight: 500;
  line-height: 24pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: ${colors.main2};
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
const SelectContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 8.25pt;
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
    margin-right: 11.25pt;
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
  color: ${colors.dark} !important;
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
  margin-top: 24pt;
  & .file-preview {
    display: flex;
    width: 100%;
    flex-direction: column;
    padding-bottom: 100pt;
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
const NextBtn = styled.div<{ canNext: boolean }>`
  color: ${colors.lightWhite};
  width: 100%;
  padding: 15pt 0;
  text-align: center;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  background-color: ${({ canNext }) => (canNext ? colors.main : '#B096EF')};
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
