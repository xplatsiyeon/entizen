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
import FileText from 'public/images/FileText.png';
import AddImg from 'public/images/add-img.svg';
import { chargerData } from 'storeCompany/myQuotation';
import { useMutation, useQuery } from 'react-query';
import { isTokenGetApi, multerApi } from 'api';
import { useRouter } from 'next/router';
import Modal from 'components/Modal/Modal';
import {
  commaInputLastFocus,
  getByteSize,
  inputPriceFormat,
} from 'utils/calculatePackage';
import { AxiosError } from 'axios';
import { MulterResponse } from 'componentsCompany/MyProductList/ProductAddComponent';
import { chargers } from 'storeCompany/finalQuotation';
import SelectComponents from 'components/Select';
import { ProductListRepsonse } from 'componentsCompany/MyProductList/ProductList';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { requestPermissionCheck } from 'bridge/appToWeb';

type Props = {
  tabNumber: number;
  setTabNumber: Dispatch<SetStateAction<number>>;
  canNext: boolean;
  SetCanNext: Dispatch<SetStateAction<boolean>>;
  maxIndex: number | undefined;
  selectedOption: chargers[];
  setSelectedOption: Dispatch<SetStateAction<chargers[]>>;
  selectedOptionEn: chargers[];
  setSelectedOptionEn: Dispatch<SetStateAction<chargers[]>>;
};

const TAG = 'componentsCompany/CompanyQuotation/RecievedQuoatation/SecondStep';

const SecondStep = ({
  tabNumber,
  maxIndex,
  setTabNumber,
  canNext,
  SetCanNext,
  selectedOption,
  selectedOptionEn,
  setSelectedOptionEn,
}: Props) => {
  // 사진을 위한 ref
  const router = useRouter();
  const imgRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  // const { userAgent } = useSelector((state: RootState) => state.userAgent);
  const userAgent = JSON.parse(sessionStorage.getItem('userAgent')!);
  const chargeLocationTypeList: string[] = ['건물 안', '건물 밖'];
  const chargeLocationTypeListEn: string[] = ['INSIDE', 'OUTSIDE'];
  const chargeTypeList: string[] = ['구매자 자율', '운영사업자 입력'];
  const chargeTypeListEn: string[] = [
    'PURCHASER_AUTONOMY',
    'OPERATION_BUSINESS_CARRIER_INPUT',
  ];

  // 충전기 특장점 글자수
  const [textLength, setTextLength] = useState<number>(
    selectedOptionEn[tabNumber - 1]?.productFeature.length,
  );

  // 에러 모달
  const [isModal, setIsModal] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [productId, setProductId] = useState<number | null>(null);

  // 페이지 이동시 스크롤 최상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tabNumber]);

  // image s3 multer 저장 API (with useMutation)
  const { mutate: multerImage, isLoading: multerImageLoading } = useMutation<
    MulterResponse,
    AxiosError,
    FormData
  >(multerApi, {
    onSuccess: (res) => {
      // console.log(TAG + ' 👀 ~ line 95 multer onSuccess');
      const temp = [...selectedOptionEn];
      const newArr = [...temp[tabNumber - 1].chargerImageFiles];
      res?.uploadedFiles.forEach((img) => {
        newArr.push({
          url: img.url,
          size: img.size,
          originalName: decodeURIComponent(img.originalName),
        });
      });
      temp[tabNumber - 1] = {
        ...temp[tabNumber - 1],
        chargerImageFiles: newArr,
      };
      setSelectedOptionEn(temp);
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
      // console.log(TAG + ' 👀 ~ line 128 multer onSuccess');
      // console.log(res);
      const temp = [...selectedOptionEn];
      const newFile = [...temp[tabNumber - 1].catalogFiles];
      res?.uploadedFiles.forEach((img) => {
        newFile.push({
          url: img.url,
          size: img.size,
          originalName: decodeURIComponent(img.originalName),
        });
      });
      temp[tabNumber - 1] = {
        ...temp[tabNumber - 1],
        catalogFiles: newFile,
      };
      setSelectedOptionEn(temp);
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
  // 내제품 리스트 조회 API
  const {
    data: productData,
    isLoading: productIsLoading,
    isError: productIsError,
  } = useQuery<ProductListRepsonse>(
    'productList',
    () => isTokenGetApi('/products'),
    {
      cacheTime: Infinity,
      staleTime: 5000,
    },
  );

  // 모달 클릭
  const onClickModal = () => {
    if (networkError) {
      setIsModal(false);
      router.push('/company/quotation');
    } else {
      setIsModal(false);
    }
  };
  // 충전요금 탭
  const onClickCharge = (index: number) => {
    // console.log('클릭');
    const temp = [...selectedOptionEn];
    if (index === 0) {
      temp[tabNumber - 1] = {
        ...temp[tabNumber - 1],
        chargePriceType: 'PURCHASER_AUTONOMY',
      };
    }
    if (index === 1) {
      temp[tabNumber - 1] = {
        ...temp[tabNumber - 1],
        chargePriceType: 'OPERATION_BUSINESS_CARRIER_INPUT',
      };
    }
    setSelectedOptionEn(temp);
  };
  // 충전요금 금액 변경
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const temp = [...selectedOptionEn];
    // if (value[0] !== '0') {
    //   temp[tabNumber - 1] = {
    //     ...temp[tabNumber - 1],
    //     chargePrice: inputPriceFormat(value),
    //   };
    // } else if (value.length > 1 && value[0] === '0') {
    //   temp[tabNumber - 1] = {
    //     ...temp[tabNumber - 1],
    //     chargePrice: inputPriceFormat(value.replace(/(^0+)/, '')),
    //   };
    // }
    if (e.target.value.length > 1 && value[0] === '0') {
      temp[tabNumber - 1] = {
        ...temp[tabNumber - 1],
        chargePrice: inputPriceFormat(value.substring(1)),
      };
    } else {
      temp[tabNumber - 1] = {
        ...temp[tabNumber - 1],
        chargePrice: inputPriceFormat(value),
      };
    }
    setSelectedOptionEn(temp);
  };
  // 충전기 설치 위치 탭
  const onClickLocation = (index: number) => {
    // console.log('클릭 로케이션');
    const temp = [...selectedOptionEn];
    if (index === 0) {
      temp[tabNumber - 1] = {
        ...temp[tabNumber - 1],
        installationLocation: 'INSIDE',
      };
    }
    if (index === 1) {
      temp[tabNumber - 1] = {
        ...temp[tabNumber - 1],
        installationLocation: 'OUTSIDE',
      };
    }
    setSelectedOptionEn(temp);
  };
  // 제조사 이름 변경
  const onChangeManufacturer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const temp = [...selectedOptionEn];

    temp[tabNumber - 1] = {
      ...temp[tabNumber - 1],
      manufacturer: value,
    };

    setSelectedOptionEn(temp);
  };
  // 충전기 특장점 변경
  const onChangeProductFeature = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { value } = e.target;
    const temp = [...selectedOptionEn];

    temp[tabNumber - 1] = {
      ...temp[tabNumber - 1],
      productFeature: value,
    };

    setSelectedOptionEn(temp);
    setTextLength(temp[tabNumber - 1].productFeature.length);
  };
  // 사진 온클릭
  const imgHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!userAgent) {
      imgRef?.current?.click();
    } else {
      requestPermissionCheck(userAgent, 'photo');
    }
  };
  // 사진 저장
  const saveFileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const maxLength = 3;
    // max길이 보다 짧으면 멈춤
    const formData = new FormData();
    for (let i = 0; i < maxLength; i += 1) {
      if (files![i] === undefined) break;
      formData.append(
        'finalQuotation',
        files![i],
        encodeURIComponent(files![i].name),
      );
    }
    multerImage(formData);
  };
  // 사진 삭제
  const handlePhotoDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    const name = Number(e.currentTarget.dataset.name);
    const temp = [...selectedOptionEn];
    const copyArr = temp[tabNumber - 1].chargerImageFiles;
    for (let i = 0; i < copyArr.length; i++) {
      if (i === name) {
        copyArr.splice(i, 1);
        return setSelectedOptionEn(temp);
      }
    }
  };
  //파일 온클릭
  const handleFileClick = () => {
    if (!userAgent) {
      fileRef?.current?.click();
    } else {
      requestPermissionCheck(userAgent, 'file');
    }
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
        'finalQuotation',
        files![i],
        encodeURIComponent(files![i].name),
      );
    }
    multerFile(formData);
  };

  // 파일 삭제
  const handleFileDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    const name = Number(e.currentTarget.dataset.name);
    const temp = [...selectedOptionEn];
    const copyArr = temp[tabNumber - 1].catalogFiles;
    for (let i = 0; i < copyArr.length; i++) {
      if (i === name) {
        copyArr.splice(i, 1);
        return setSelectedOptionEn(temp);
      }
    }
  };
  // 셀렉트 박스 클릭
  const onChangeSelectBox = (value: string, idx: number) => {
    const temp = [...selectedOptionEn];
    temp[tabNumber - 1] = {
      ...temp[tabNumber - 1],
      modelName: value as chargerData,
    };
    setSelectedOptionEn(temp);
    setProductId(idx);

    // 만약에 같은 제품 id 또 클릭하면 입력값 초기화
    if (productId === idx) {
      const targetProduct = productData?.chargerProduct.filter(
        (e) => e.chargerProductIdx === productId,
      )[0];
      const temp = [...selectedOptionEn];
      temp[tabNumber - 1] = {
        ...temp[tabNumber - 1],
        modelName: '',
        manufacturer: '',
        productFeature: '',
        chargerImageFiles: [],
        catalogFiles: [],
      };
      setSelectedOptionEn(temp);
    }
  };

  // 이전 버튼
  const handlePrevBtn = () => {
    if (tabNumber > 0) {
      setTabNumber(tabNumber - 1);
    }
  };
  // 다음 버튼
  const handleNextBtn = () => {
    if (canNext) {
      if (tabNumber < maxIndex!) {
        setTabNumber(tabNumber + 1);
      } else {
        setTabNumber(6);
      }
    }
  };
  // 다음버튼 유효성 검사
  useEffect(() => {
    SetCanNext(false);
    const target = selectedOptionEn[tabNumber - 1];
    if (target?.chargePriceType === 'OPERATION_BUSINESS_CARRIER_INPUT') {
      if (
        target?.installationLocation &&
        target?.manufacturer &&
        target?.chargePrice
      )
        SetCanNext(true);
    }
    if (target?.chargePriceType === 'PURCHASER_AUTONOMY') {
      if (target?.installationLocation && target?.manufacturer)
        SetCanNext(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOptionEn]);
  // 충전요금 초기화
  useEffect(() => {
    if (
      selectedOptionEn[tabNumber - 1]?.chargePriceType ===
        'PURCHASER_AUTONOMY' &&
      selectedOptionEn[tabNumber - 1]?.chargePrice !== '' &&
      selectedOptionEn[tabNumber - 1]?.chargePrice !== 0
    ) {
      const temp = [...selectedOptionEn];
      temp[tabNumber - 1] = {
        ...temp[tabNumber - 1],
        chargePrice: '',
      };
      setSelectedOptionEn(temp);
    }
  }, [selectedOptionEn]);
  // 내 제품 리스트 하단 내용
  useEffect(() => {
    if (productId) {
      const targetProduct = productData?.chargerProduct.filter(
        (e) => e.chargerProductIdx === productId,
      )[0];

      const newImage = targetProduct?.chargerImageFiles!.map((item) => {
        const {
          chargerProductFileIdx,
          chargerProductIdx,
          productFileType,
          createdAt,
          ...newArr
        } = item;
        return newArr;
      });
      const newFile = targetProduct?.chargerCatalogFiles!.map((item) => {
        const {
          chargerProductFileIdx,
          chargerProductIdx,
          productFileType,
          createdAt,
          ...newArr
        } = item;
        return newArr;
      });

      const temp = [...selectedOptionEn];
      temp[tabNumber - 1] = {
        ...temp[tabNumber - 1],
        manufacturer: targetProduct?.manufacturer!,
        productFeature: targetProduct?.feature!,
        chargerImageFiles: newImage!,
        catalogFiles: newFile!,
      };
      setSelectedOptionEn(temp);
    }
  }, [productId]);

  // 실시간으로 width 받아오는 함수
  const [nowWidth, setNowWidth] = useState<number>(window.innerWidth);

  const handleResize = () => {
    setNowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [nowWidth]);

  useEffect(() => {
    setTextLength(selectedOptionEn[tabNumber - 1]?.productFeature.length);
  }, [selectedOptionEn]);

  // 앱에서 이미지 or 파일 온클릭 (앱->웹)
  useEffect(() => {
    if (userAgent === 'Android_App') {
      window.openGallery = () => {
        imgRef?.current?.click();
      };
      window.openFileUpload = () => {
        fileRef?.current?.click();
      };
    } else if (userAgent === 'iOS_App') {
      window.openGallery = () => {
        imgRef?.current?.click();
      };
      window.openFileUpload = () => {
        fileRef?.current?.click();
      };
    }
  }, []);

  // console.log('🔥 최종견적 선택된 옵션 리스트 목록 -> ');
  // console.log(selectedOption[maxIndex! - 1]);
  // console.log(maxIndex);

  return (
    <>
      <WebRapper>
        {/* 에러 모달 */}
        {isModal && <Modal click={onClickModal} text={errorMessage} />}
        <Wrapper>
          <TopStep>
            <span className="title">STEP {tabNumber + 1}</span>
            <div>
              <span className="redColor">*</span>{' '}
              <span className="sub">필수 입력</span>
            </div>
          </TopStep>
          <SubWord>
            {`${selectedOption[tabNumber! - 1]?.kind}, ${
              selectedOption[tabNumber! - 1]?.standType
            }, ${selectedOption[tabNumber! - 1]?.channel} `}
            <br />
            제품의 정보를 입력해주세요
          </SubWord>
          <ChargeMoney className="first">
            <div className="withAfter">충전요금</div>
            <BtnBox>
              {chargeTypeList.map((el, index) => (
                <Btn
                  key={index}
                  onClick={() => onClickCharge(index)}
                  className={
                    chargeTypeListEn[index] ===
                    selectedOptionEn[tabNumber - 1]?.chargePriceType
                      ? 'selected'
                      : ''
                  }
                >
                  {el}
                </Btn>
              ))}
            </BtnBox>
            <InputBox>
              <div>
                <Input
                  onMouseDown={commaInputLastFocus}
                  onChange={onChangeInput}
                  placeholder="0"
                  value={selectedOptionEn[tabNumber - 1]?.chargePrice}
                  name="subscribeMoney"
                  inputProps={{
                    readOnly:
                      selectedOptionEn[tabNumber - 1]?.chargePriceType ===
                      'PURCHASER_AUTONOMY'
                        ? true
                        : false,
                  }}
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
                  onClick={() => onClickLocation(index)}
                  className={
                    chargeLocationTypeListEn[index] ===
                    selectedOptionEn[tabNumber - 1]?.installationLocation
                      ? 'selected'
                      : ''
                  }
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
            <div className="titleText">
              [선택사항] 내 제품 리스트에서{' '}
              <div className="highlight">가져오기</div>
            </div>
            <div className="smallText">
              * 등록된 제품을 선택하면 아래 정보가 자동으로 입력됩니다.
            </div>
          </TopBox>
          <SelectContainer>
            <SelectComponents
              value={selectedOptionEn[tabNumber - 1]?.modelName}
              placeholder="등록된 제품을 업로드해주세요"
              productOption={productData?.chargerProduct!}
              onClickProject={onChangeSelectBox}
            />
          </SelectContainer>
          <BottomInputBox>
            <div className="withAfter">제조사</div>
            <div>
              <Inputs
                onChange={onChangeManufacturer}
                value={selectedOptionEn[tabNumber - 1]?.manufacturer}
                name="constructionPeriod"
              />
            </div>
          </BottomInputBox>
          <InputBox className="secondChargerText">
            <FlexText>
              <span className="titleText">충전기 특장점</span>
              <span className="lengthText">{textLength}/500</span>
            </FlexText>
            <div>
              <TextArea
                onChange={onChangeProductFeature}
                value={selectedOptionEn[tabNumber - 1]?.productFeature}
                name="firstPageTextArea"
                placeholder="선택 입력사항"
                rows={7}
                maxLength={500}
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
                capture={userAgent === 'Android_App' && true}
              />
              {/* <Preview> */}
              <ImgSpanBox>
                {selectedOptionEn[tabNumber - 1]?.chargerImageFiles?.map(
                  (item, index) => (
                    <ImgSpan key={index} data-name={index}>
                      <Image
                        layout="fill"
                        alt="preview"
                        data-name={index}
                        key={index}
                        src={item.url}
                        priority={true}
                        unoptimized={true}
                        objectFit="cover"
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
                  ),
                )}
              </ImgSpanBox>
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
                accept=".xlsx,.pdf,.pptx,.ppt,.ppt,.xls,.doc,.docm,.docx,.txt,.hwp"
                onChange={saveFile}
                multiple
              />

              {/* <File_Preview> */}
              <div className="file-preview">
                {selectedOptionEn[tabNumber - 1]?.catalogFiles?.map(
                  (item, index) => (
                    <FileBox key={index} data-name={index}>
                      <div className="file">
                        <div className="file-img">
                          <Image src={FileText} alt="file-icon" />
                        </div>
                        <div className="file-data">
                          <FileName>{item.originalName}</FileName>
                          <span className="file-size">{`용량 ${getByteSize(
                            item.size,
                          )}`}</span>
                        </div>
                        <div
                          className="file-exit"
                          onClick={handleFileDelete}
                          data-name={index}
                        >
                          <Image
                            src={CloseImg}
                            data-name={index}
                            alt="closeBtn"
                          />
                        </div>
                      </div>
                    </FileBox>
                  ),
                )}
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
      </WebRapper>
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
  @media (min-width: 900pt) {
    margin: 0 auto;
    padding-left: 25pt;
    padding-right: 25pt;
  }
`;
const SecondWrapper = styled.div`
  padding-left: 15pt;
  padding-right: 15pt;
  box-sizing: border-box;
  margin-top: 30pt;
  padding-bottom: 58.6875pt;
  @media (min-width: 900pt) {
    padding-left: 25pt;
    padding-right: 25pt;
  }
`;
const TopStep = styled.div`
  @media (min-width: 900pt) {
    margin-top: 0;
    padding-top: 70pt;
  }
  .redColor {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 10.5pt;
    font-weight: 500;
    line-height: 10.5pt;
    letter-spacing: -0.02em;
    text-align: left;
    color: #f75015;
    @media (max-width: 899.25pt) {
      font-size: 9pt;
    }
  }
  .sub {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 10.5pt;
    font-weight: 500;
    line-height: 10.5pt;
    letter-spacing: -0.02em;
    text-align: left;
    color: #222222;
    @media (max-width: 899.25pt) {
      font-size: 9pt;
    }
  }
  .title {
    color: #5221cb;
    font-family: 'Spoqa Han Sans Neo';
    font-size: 18pt;
    font-weight: 500;
    line-height: 24pt;
    letter-spacing: -0.02em;
    text-align: left;
    @media (max-width: 899.25pt) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 15pt;
      font-weight: 500;
      line-height: 21pt;
      letter-spacing: -0.02em;
      text-align: left;
    }
  }
  margin-top: 24pt;
  display: flex;
  justify-content: space-between;
  & div:first-of-type {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 15pt;
    font-weight: 500;
    line-height: 21pt;
    letter-spacing: -0.02em;
    text-align: left;
    color: ${colors.main};
  }
  & div:nth-of-type(2) {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 9pt;
    font-weight: 500;
    line-height: 10.5pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;
const SubWord = styled.div`
  margin-top: 21pt;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 18pt;
  font-weight: 500;
  line-height: 24pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #222222;
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
    font-family: 'Spoqa Han Sans Neo';
    font-size: 10.5pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
    color: #222222;
    @media (min-width: 900pt) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 15pt;
      font-weight: 700;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: left;
      color: #222222;
      padding-bottom: 15pt;
    }
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
  font-family: 'Spoqa Han Sans Neo';
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
  cursor: pointer;
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
      font-family: 'Spoqa Han Sans Neo';
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
    font-family: 'Spoqa Han Sans Neo';
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
  @media (min-width: 900pt) {
    gap: 12pt;
  }
  & .withAfter {
    @media (min-width: 900pt) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 15pt;
      font-weight: 700;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: left;
      color: #222222;
    }
    font-family: 'Spoqa Han Sans Neo';
    color: #222222;
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
    font-family: 'Spoqa Han Sans Neo';
    font-size: 12pt;
    font-weight: 400;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;
const Input = styled(TextField)`
  /* border: 0.75pt solid ${colors.gray}; */
  border-radius: 6pt;
  width: 100%;
  outline: none;
  .MuiOutlinedInput-root {
    &:hover fieldset {
      border: 0.75pt solid #e2e5ed;
    }
    &.Mui-focused fieldset {
      border: 0.75pt solid #5221cb;
    }
  }
  .MuiOutlinedInput-notchedOutline {
    border: 0.75pt solid #e2e5ed;
  }
  & input {
    padding: 10.885pt 0 10.885pt 12pt;
    text-align: right;
    font-weight: 500;
    font-size: 12pt;
    line-height: 12pt;
  }
  /* & fieldset {
    border: 0.75pt solid ${colors.gray};
  } */
  & .MuiInputBase-root {
    padding-right: 9pt;
    /* @media (min-width: 900pt) {
      width: 512.25pt;
    } */
  }
  ::placeholder {
    /* color: ${colors.gray}; */
    color: #caccd1;
    font-weight: 500;
    font-family: 'Spoqa Han Sans Neo';
    @media (min-width: 900pt) {
      font-size: 12pt;
      font-weight: 500;
      line-height: 12pt;
      letter-spacing: -0.02em;
    }
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
  @media (min-width: 900pt) {
    width: auto;
  }
`;
const TopBox = styled.div`
  /* & div:first-of-type {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 10.5pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
  } */
  & > div > div {
    display: inline-block;
    color: ${colors.main};
  }
  & div:nth-of-type(2) {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 9pt;
    margin-top: 6pt;
    font-weight: 400;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
    color: #747780;
  }
  .highlight {
    @media (min-width: 900pt) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 15pt;
      font-weight: 700;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: left;
      color: #5221cb;
    }
  }
  .titleText {
    @media (min-width: 900pt) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 15pt;
      font-weight: 700;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: left;
      color: #222222;
      padding-bottom: 15pt;
    }
  }
  .smallText {
    @media (min-width: 900pt) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 10.5pt;
      font-weight: 400;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: left;
      color: #747780;
    }
  }
`;
const SelectContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 8.25pt;
  margin-top: 9pt;
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
  :focus {
    border: 0.75pt solid #5221cb;
    font-weight: 400;
    font-family: 'Spoqa Han Sans Neo';
    font-size: 12pt;
    font-weight: 400;
    line-height: 19.5pt;
    letter-spacing: -0.02em;
    text-align: left;
    color: #222222;
    @media (max-width: 899.25pt) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 12pt;
      font-weight: 400;
      line-height: 18pt;
      letter-spacing: -0.02em;
      text-align: left;
      color: #222222;
    }
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
  @media (min-width: 900pt) {
    & .file-preview {
      display: grid;
      grid-template-columns: 1fr 1fr;
      width: 100%;
      padding-bottom: 0;
      gap: 9pt;
    }
  }
`;
const Label = styled.label`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 10.5pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;

  @media (min-width: 900pt) {
    font-size: 15pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
    color: #222222;
    padding-bottom: 12pt;
  }
`;
const PhotosBox = styled.div`
  width: 100%;
  /* height: 56.0625pt; */
  margin-top: 9pt;
  display: flex;
  gap: 9.1875pt;
  align-items: center;
  display: flex;
  align-items: inherit;
  height: auto;
  width: 100%;
`;
const PhotosBoxs = styled.div`
  //height: 56.0625pt;
  margin-top: 9pt;
  display: flex;
  flex-direction: column;
  gap: 9pt;
  align-items: center;
  padding-bottom: 58.6875pt;
  @media (min-width: 900pt) {
    height: auto;
    padding-bottom: 0;
  }
`;
const AddPhotos = styled.button`
  display: inline-block;
  width: 56.0625pt;
  height: 56.0625pt;
  background-color: #ffffff;
  border: 0.75pt solid #e2e5ed;
  border-radius: 6pt;
  @media (min-width: 900pt) {
    width: 77.25pt;
    height: 77.25pt;
  }
`;

const ImgSpanBox = styled.div`
  @media (max-width: 899.25pt) {
    display: flex;
    flex-wrap: wrap;
    gap: 8.1875pt;
    flex: 2;
  }
  @media (min-width: 900pt) {
    height: auto;
    width: 444.75;
    display: grid;
    grid-template-columns: 230pt 1fr;
  }
`;

const ImgSpan = styled.div`
  position: relative;
  width: 56.0625pt;
  height: 56.0625pt;
  border-radius: 6pt;
  border: 0.75pt solid #e2e5ed;
  & > span {
    border-radius: 6pt;
  }
  @media (min-width: 900pt) {
    margin-bottom: 10pt;
    width: 216pt;
    height: 135pt;
    gap: 6pt;
  }
`;
const Xbox = styled.div`
  position: absolute;
  top: -7pt;
  right: -7pt;
  cursor: pointer;
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
    font-family: 'Spoqa Han Sans Neo';
    font-size: 10.5pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
    padding-bottom: 12pt;
    color: #222222;
    @media (min-width: 900pt) {
      font-size: 15pt;
      font-weight: 700;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: left;
    }
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
  font-family: 'Spoqa Han Sans Neo';
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
  @media (max-width: 899.25pt) {
    padding: 15pt 0 39pt 0;
  }
  @media (min-width: 900pt) {
    padding: 15pt 0 15pt 0;
    border-radius: 6pt;
    margin-left: 12pt;
  }
`;
const PrevBtn = styled.div`
  font-family: 'Spoqa Han Sans Neo';
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
  @media (max-width: 899.25pt) {
    padding: 15pt 0 39pt 0;
  }
  @media (min-width: 900pt) {
    padding: 15pt 0 15pt 0;
    border-radius: 6pt;
  }
`;
const TwoBtn = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  @media (max-width: 899.25pt) {
    position: fixed;
  }
  @media (min-width: 900pt) {
    width: 534pt;
    position: relative;
    margin: 0 auto;
  }
`;

const WebRapper = styled.div`
  @media (min-width: 900pt) {
    height: auto;
    width: 580.5pt;
    background-color: #ffffff;
    box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
    border-radius: 12pt;
    margin-bottom: 54pt;
    padding-bottom: 30pt;
    margin-top: -2.1%;
  }
`;

const FileName = styled.div`
  display: block;
  width: 150pt;
  font-weight: 400;
  padding-top: 2pt;
  white-space: nowrap;
  font-size: 10.5pt;
  line-height: 9pt;
  letter-spacing: -0.02em;
  color: ${colors.dark2};
  text-overflow: ellipsis;
  overflow: hidden;
`;

const FlexText = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  .titleText {
    font-family: 'Spoqa Han Sans Neo';
    color: #222222;
    font-size: 10.5pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
    padding-bottom: 12pt;
    @media (min-width: 900pt) {
      font-size: 15pt;
      font-weight: 700;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: left;
    }
  }
  .lengthText {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 10.5pt;
    font-weight: 500;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: right;
    color: #222222;
  }
`;

export default SecondStep;
