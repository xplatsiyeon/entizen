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
import {
  M5_LIST,
  M5_LIST_EN,
  M5_TYPE_SET,
  M6_LIST,
  M6_LIST_EN,
  M7_LIST,
  M7_LIST_EN,
} from 'assets/selectList';
import { CHARGING_METHOD } from 'companyAssets/selectList';
import FileText from 'public/images/FileText.png';
import AddImg from 'public/images/add-img.svg';
// import { BusinessRegistrationType } from 'components/SignUp';
import { useMutation, useQuery } from 'react-query';
import {
  isTokenGetApi,
  isTokenPatchApi,
  isTokenPostApi,
  isTokenPutApi,
  multerApi,
} from 'api';
import Modal from 'components/Modal/Modal';
import { AxiosError } from 'axios';
import { convertEn, convertKo, getByteSize } from 'utils/calculatePackage';
import SelectComponents from 'components/Select';
import { ProductDetailResponse } from './myProduct';
import Loader from 'components/Loader';
import WebBuyerHeader from 'componentsWeb/WebBuyerHeader';
import WebFooter from 'componentsWeb/WebFooter';
import CompanyRightMenu from 'componentsWeb/CompanyRightMenu';
import ReactLoading from 'react-loading';
import { requestPermissionCheck } from 'bridge/appToWeb';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { BusinessRegistrationType } from 'componentsCompany/CompanyQuotation/LastQuotation/ThirdStep';
export interface ImgFile {
  originalName: string;
  size: number;
  url: string;
  chargerProductFileIdx?: number | undefined;
  chargerProductIdx?: number | undefined;
  createdAt?: string | undefined;
  productFileType?: string | undefined;
  bannerImageIdx?: number;
}
export interface MulterResponse {
  isSuccess: boolean;
  uploadedFiles: ImgFile[];
}

type Props = {};
const TAG = 'componentsCompany/MyProductList/ProductAddComponents.tsx';
const ProductAddComponent = (props: Props) => {
  // const { userAgent } = useSelector((state: RootState) => state.userAgent);
  const userAgent = JSON.parse(sessionStorage.getItem('userAgent')!);
  const router = useRouter();
  const routerId = router?.query?.chargerProductIdx;

  const imgRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [componentId, setComponentId] = useState<number>();
  const [openSubLink, setOpenSubLink] = useState<boolean>(false);
  // 모델명
  const [modelName, setModelName] = useState<string>('');
  // 충전기 종류
  const [chargerType, setChargerType] = useState<string>('');
  // 충전 타입
  const [chargerStandType, setChargerStandType] = useState<string>('');
  // 충전 채널
  const [chargingChannel, setChargingChannel] = useState<string>('');
  // 충전 방식
  const [chargingMethod, setChargingMethod] = useState<string[]>(['']);
  // 제조사
  const [manufacturer, setManufacturer] = useState<string>('');
  // 특장점
  const [advantages, setAdvantages] = useState<string>('');
  const advantagesText = advantages.length;
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
  const {
    data: detailData,
    isLoading: detailLoaidng,
    isError: detailError,
  } = useQuery<ProductDetailResponse>(
    'product-detail',
    () => isTokenGetApi(`/products/${routerId}`),
    {
      enabled: router?.isReady! && routerId ? true : false,
    },
  );
  const { mutate: putMutate, isLoading: putLoading } = useMutation(
    isTokenPutApi,
    {
      onSuccess: () => {
        setErrorMessage('수정되었습니다.');
        setIsModal(true);
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
    },
  );
  // api 호출 (with react-query)
  const { mutate: addProduct, isLoading: addProductLoading } = useMutation(
    isTokenPostApi,
    {
      onSuccess: () => {
        router.replace('/company/myProductList');
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
    },
  );
  // image s3 multer 저장 API (with useMutation)
  const { mutate: multerImage, isLoading: multerImageLoading } = useMutation<
    MulterResponse,
    AxiosError,
    FormData
  >(multerApi, {
    onSuccess: (res) => {
      // console.log(TAG + ' 👀 ~ line 84 multer onSuccess');
      // console.log(res);
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
      // console.log(TAG + ' 👀 ~ line 84 multer onSuccess');
      // console.log(res);
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

  // 모달 클릭
  const onClickModal = () => {
    if (networkError) {
      setIsModal(false);
      router.push('/company/quotation');
    } else if (errorMessage === '수정되었습니다.') {
      router.replace('/company/myProductList');
    } else {
      setIsModal(false);
    }
  };

  // SelectBox 값
  const onChangeSelectBox = (value: string, name: string, index: number) => {
    switch (name) {
      case 'kind':
        setChargerType(value);
        break;
      case 'channel':
        setChargingChannel(value);
        break;
      case 'chargingMethod':
        let pasteArray: string[] = [];
        if (index === undefined) {
          pasteArray.push(value);
        } else {
          pasteArray.push(...chargingMethod);
        }
        if (index === 0) {
          pasteArray[index] = value;
        } else if (index !== 0) {
          pasteArray[index] = value;
        }
        setChargingMethod(pasteArray);
        break;
      case 'standType':
        setChargerStandType(value);
        break;
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
  // 수정하기 버튼
  const onClickPutBtn = () => {
    if (isValid) {
      putMutate({
        url: `/products/${routerId}`,
        data: {
          modelName: modelName,
          chargerKind: convertEn(M5_LIST, M5_LIST_EN, chargerType), // 변환
          chargerStandType: convertEn(M6_LIST, M6_LIST_EN, chargerStandType), // 변환
          chargerChannel: convertEn(M7_LIST, M7_LIST_EN, chargingChannel), // 변환
          chargerMethods: chargingMethod,
          manufacturer: manufacturer,
          feature: advantages,
          chargerImageFiles: imgArr,
          catalogFiles: fileArr,
        },
      });
    }
  };
  // 등록 버튼
  const buttonOnClick = () => {
    if (isValid) {
      addProduct({
        url: '/products',
        data: {
          modelName: modelName,
          chargerKind: convertEn(M5_LIST, M5_LIST_EN, chargerType), // 변환
          chargerStandType: convertEn(M6_LIST, M6_LIST_EN, chargerStandType), // 변환
          chargerChannel: convertEn(M7_LIST, M7_LIST_EN, chargingChannel), // 변환
          chargerMethods: chargingMethod,
          manufacturer: manufacturer,
          feature: advantages,
          chargerImageFiles: imgArr,
          catalogFiles: fileArr,
        },
      });
    }
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
    //// console.log('files', files, files![0])
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

    /* 파일 올린 후 혹은 삭제 후, 똑같은 파일 올릴 수 있도록*/
    e.target.value = '';
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
        'chargerProduct',
        files![i],
        encodeURIComponent(files![i].name),
      );
    }
    multerFile(formData);

    /* 파일 올린 후 혹은 삭제 후, 똑같은 파일 올릴 수 있도록,*/
    e.target.value = '';
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
  // 수정하기 데이터 불러오기
  useEffect(() => {
    if (routerId && detailData?.isSuccess === true) {
      const preProduct = detailData?.chargerProduct!;
      const chargerImg = preProduct?.chargerImageFiles.map((item) => {
        const {
          chargerProductFileIdx,
          chargerProductIdx,
          createdAt,
          productFileType,
          ...newArr
        } = item;
        return newArr;
      });
      const chargerCatalog = preProduct?.chargerCatalogFiles.map((item) => {
        const {
          chargerProductFileIdx,
          chargerProductIdx,
          createdAt,
          productFileType,
          ...newArr
        } = item;
        return newArr;
      });
      setModelName(preProduct?.modelName);
      setChargerType(convertKo(M5_LIST, M5_LIST_EN, preProduct?.kind));
      setChargerStandType(
        convertKo(M6_LIST, M6_LIST_EN, preProduct?.standType),
      );
      setChargingChannel(convertKo(M7_LIST, M7_LIST_EN, preProduct?.channel));
      setChargingMethod(preProduct?.method);
      setManufacturer(preProduct?.manufacturer);
      setAdvantages(preProduct?.feature);
      setImgArr(chargerImg);
      setFileArr(chargerCatalog);
    }
  }, [routerId, detailData]);
  // 테스트 useEffect
  useEffect(() => {
    validFn([
      modelName,
      chargerType,
      chargerStandType,
      chargingChannel,
      chargingMethod[0],
      manufacturer,
    ]);
  }, [
    modelName,
    chargerType,
    chargerStandType,
    chargingChannel,
    chargingMethod,
    manufacturer,
  ]);

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

  // useEffect(() => {
  //   console.log('⭐️ chargerStandType : ', chargerStandType);
  // }, [chargerStandType]);
  if (detailLoaidng) {
    return <Loader />;
  }

  return (
    <WebBody>
      <CompanyRightMenu />
      <WebBuyerHeader
        componentId={componentId}
        openSubLink={openSubLink}
        setOpenSubLink={setOpenSubLink}
      />
      <Inner>
        <>
          {/* 에러 모달 */}
          {isModal && <Modal click={onClickModal} text={errorMessage} />}
          {/* 헤더 */}
          <CompanyHeader back={true} title={'제품 추가하기'} />
          {/* 인풋 바디 */}
          <InputContainer>
            {routerId ? (
              <AddProductText>제품 수정하기</AddProductText>
            ) : (
              <AddProductText>제품 추가하기</AddProductText>
            )}

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
            <LabelBox>
              <RequiredLabel>충전기 종류</RequiredLabel>
            </LabelBox>
            <SelectComponents
              name="kind"
              option={M5_LIST}
              placeholder={'충전기 종류'}
              value={chargerType}
              onClickCharger={onChangeSelectBox}
            />
            {/* 충전 타입 */}
            <LabelBox>
              <RequiredLabel>충전 타입</RequiredLabel>
            </LabelBox>
            <SelectComponents
              name="standType"
              option={M5_TYPE_SET[M5_LIST.indexOf(chargerType)]}
              placeholder={'충전 타입'}
              value={chargerStandType}
              onClickCharger={onChangeSelectBox}
            />
            {/* 충전 채널 */}
            <LabelBox>
              <RequiredLabel>충전 채널</RequiredLabel>
            </LabelBox>

            <SelectComponents
              name="channel"
              option={M7_LIST}
              value={chargingChannel}
              placeholder={'충전기 채널'}
              onClickCharger={onChangeSelectBox}
            />

            {/* 충전방식 */}
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
                    <SelectComponents
                      name="chargingMethod"
                      option={CHARGING_METHOD}
                      value={chargingMethod[index]}
                      index={index}
                      placeholder={'충전 방식'}
                      onClickCharger={onChangeSelectBox}
                    />
                  )}
                  {/* + 버튼 눌러서 추가되는 부분  */}
                  {index > 0 && (
                    <PlusBox key={index}>
                      <SelectComponents
                        name="chargingMethod"
                        option={CHARGING_METHOD}
                        value={chargingMethod[index]}
                        index={index}
                        placeholder={'충전 방식'}
                        onClickCharger={onChangeSelectBox}
                      />
                      <DeleteBtn onClick={() => onClickMinus(index)}>
                        <Image src={Xbtn} alt="delete" />
                      </DeleteBtn>
                    </PlusBox>
                  )}
                </React.Fragment>
              ))}
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
                <TextAlign>
                  <UnRequired>특장점</UnRequired>
                  <TextLength> {advantagesText} / 500</TextLength>
                </TextAlign>
              </LabelBox>
              <TextArea
                name="firstPageTextArea"
                value={advantages}
                onChange={(e) => setAdvantages(e.target.value)}
                placeholder="선택 입력사항"
                rows={7}
                maxLength={500}
              />
            </InputBox>
            {/* 사진 첨부 부분 */}
            {multerImageLoading ? (
              <Loader type="images" />
            ) : (
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
                  <ImgWrap>
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
                  </ImgWrap>
                  {/* </Preview> */}
                </PhotosBox>
              </RemainderInputBox>
            )}
            {/* 파일 부분 */}
            {multerFileLoading ? (
              <Loader type="images" />
            ) : (
              <RemainderInputBoxs>
                <PhotosBoxs>
                  <Form>
                    <label>충전기 카탈로그</label>
                    <div>
                      <File onClick={handleFileClick}>
                        <Image src={AddImg} alt="img" />
                        <UploadText>파일 업로드</UploadText>
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
                    {fileArr?.map((item, index) => (
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
                    ))}
                  </div>
                  {routerId ? (
                    <WebBtn
                      buttonActivate={isValid}
                      tabNumber={0}
                      onClick={onClickPutBtn}
                    >
                      정보 수정하기
                    </WebBtn>
                  ) : (
                    <WebBtn
                      buttonActivate={isValid}
                      tabNumber={0}
                      onClick={buttonOnClick}
                    >
                      제품 등록하기
                    </WebBtn>
                  )}
                </PhotosBoxs>
              </RemainderInputBoxs>
            )}
          </InputContainer>
          <WebHide>
            {routerId ? (
              <Btn
                buttonActivate={isValid}
                tabNumber={0}
                onClick={onClickPutBtn}
              >
                정보 수정하기
              </Btn>
            ) : (
              <Btn
                buttonActivate={isValid}
                tabNumber={0}
                onClick={buttonOnClick}
              >
                제품 등록하기
              </Btn>
            )}
          </WebHide>
        </>
      </Inner>
      <WebFooter />
    </WebBody>
  );
};

const WebBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
  background: #fcfcfc;
  @media (max-height: 809pt) {
    display: block;
    height: 100%;
  }
  @media (max-width: 899.25pt) {
    background: ${colors.lightWhite};
  }
`;

const Inner = styled.div`
  display: block;
  position: relative;
  margin: 100pt auto;
  width: 900pt;
  border-radius: 12pt;
  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    padding: 0;
    box-shadow: none;
    background: none;
    margin: 0;
  }

  @media (min-width: 900pt) {
    margin: 54pt auto 100pt;
    background-color: #ffffff;
    width: 345pt;
    border-radius: 12pt;
    box-shadow: 0px 0px 7.5pt rgba(137, 163, 201, 0.2);
    height: auto;
  }
`;

const AddProductText = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 18pt;
  font-weight: 700;
  line-height: 21pt;
  letter-spacing: -0.02em;
  text-align: center;
  padding-top: 32.25pt;
  padding-bottom: 26.25pt;
  color: #222222;
  @media (max-width: 899.25pt) {
    display: none;
  }
`;

const InputContainer = styled.div`
  margin-top: 11.25pt;
  padding-left: 15pt;
  padding-right: 15pt;
  padding-bottom: 126.75pt;
  @media (min-width: 900pt) {
    padding-left: 46.5pt;
    padding-right: 46.5pt;
    padding-bottom: 0;
  }
`;

const InputBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 9pt;
  margin-bottom: 24pt;
`;

const LabelBox = styled.div`
  margin-top: 24pt;
  margin-bottom: 9pt;
  position: relative;
`;

const TextAlign = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RequiredLabel = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 10.5pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #222222;
  &::after {
    content: ' *';
    margin-left: 1pt;
    color: #f75015;
  }
  @media (min-width: 900pt) {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 12pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;

const RightLabel = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 9pt;
  font-weight: 500;
  line-height: 10.5pt;
  letter-spacing: -0.02em;
  text-align: left;
  position: absolute;
  right: 0;
  top: 0;
  color: #222222;
  &::before {
    content: '* ';
    margin-left: 1pt;
    color: #f75015;
  }
  @media (min-width: 900pt) {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 10.5pt;
    font-weight: 500;
    line-height: 10.5pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;

const RightPlus = styled.div`
  width: 21pt;
  height: 21pt;
  position: absolute;
  right: 0;
  top: -4.5pt;
  cursor: pointer;
`;

const Input = styled(TextField)`
  width: 100%;
  outline: none;
  .MuiOutlinedInput-notchedOutline {
    border: 1pt solid #e2e5ed !important;
  }

  .MuiOutlinedInput-root {
    &:hover fieldset {
      border-color: #e2e5ed;
    }
    &.Mui-focused fieldset {
      border-color: #5221cb;
    }
  }

  & input {
    padding: 10.885pt 0 10.885pt 12pt;
    text-align: left;
    font-weight: 500;
    font-size: 12pt;
    line-height: 12pt;
    ::placeholder {
      /* color: ${colors.gray}; */
      color: #caccd1;
      font-family: 'Spoqa Han Sans Neo';
      font-size: 12pt;
      font-weight: 500;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: left;
    }
  }
  & .MuiInputBase-root {
    padding-right: 9pt;
    border-radius: 6pt;
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

const SelectBox = styled(Select)`
  width: 100%;
  border: 0.75pt solid #e2e5ed;
  border-radius: 6pt;
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
  font-family: 'Spoqa Han Sans Neo';
  font-size: 10.5pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #222222;
  @media (min-width: 900pt) {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 12pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;

const TextLength = styled.span`
  color: #222222;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 9pt;
  font-weight: 500;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: right;
  @media (min-width: 900pt) {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 10.5pt;
    font-weight: 500;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: right;
  }
`;

const TextArea = styled.textarea`
  resize: none;
  border: 0.75pt solid ${colors.gray};
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
  :focus {
    color: #222222;
    font-family: 'Spoqa Han Sans Neo';
    font-size: 12pt;
    font-weight: 400;
    line-height: 18pt;
    letter-spacing: -0.02em;
    text-align: left;
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

  @media (max-width: 899.25pt) {
    position: fixed;
    padding: 15pt 0 39pt 0;
  }
`;

const WebBtn = styled.div<{ buttonActivate: boolean; tabNumber?: number }>`
  position: relative;
  bottom: 0;
  left: 0;
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
  border-radius: 6pt;
  background-color: ${({ buttonActivate }) =>
    buttonActivate ? colors.main : colors.blue3};
  margin-bottom: 42.3pt;
  @media (max-width: 899.25pt) {
    display: none;
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
  cursor: pointer;
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
  padding-bottom: 58.6875pt;
  margin-top: 24pt;
  & .file-preview {
    display: flex;
    width: 100%;
    flex-direction: column;
    padding-bottom: 80.6875pt;
    gap: 9pt;
    @media (min-width: 900pt) {
      padding-bottom: 0;
    }
  }

  @media (min-width: 900pt) {
    padding-bottom: 0;
  }
`;
const Label = styled.label`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 10.5pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #222222;
  @media (min-width: 900pt) {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 12pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;

const PhotosBox = styled.div`
  width: 100%;
  height: 56.0625pt;
  margin-top: 9pt;
  display: flex;
  align-items: center;
  height: auto;
`;

const PhotosBoxs = styled.div`
  height: 56.0625pt;
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
  min-width: 56.0625pt;
  width: 56.0625pt;
  margin-right: 6.1875pt;
  height: 56.0625pt;
  border: 0.75pt solid #e2e5ed;
  border-radius: 6pt;
  background-color: #ffffff;
  cursor: pointer;
`;
const ImgWrap = styled.div`
  width: 100%;

  display: flex;
  /* 모바일 기기 데스크탑만 대응 (패드는 제외)*/
  @media (max-width: 337.5pt), (min-width: 900pt) {
    display: grid;
    grid-template-columns: repeat(3, 56.0625pt);
    gap: 6.1875pt;
  }
`;
const ImgSpan = styled.div`
  position: relative;
  width: 56.0625pt;
  height: 56.0625pt;
  border-radius: 6pt;
  margin-right: 6.1875pt;
  /* 모바일 기기 데스크탑만 대응 (패드는 제외)*/
  @media (max-width: 337.5pt), (min-width: 900pt) {
    margin-right: 0;
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
  border: 0.75pt solid #e2e5ed;
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

    width: 230px;
    text-overflow: ellipsis;
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
    color: #222222;
    @media (min-width: 900pt) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 12pt;
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

const WebHide = styled.div`
  @media (min-width: 900pt) {
    display: none;
  }
`;

const UploadText = styled.span`
  color: #caccd1;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 12pt;
  font-weight: 400;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: center;
`;

export default ProductAddComponent;
