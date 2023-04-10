import styled from '@emotion/styled';
import { Select, TextField } from '@mui/material';
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
// import { BusinessRegistrationType } from 'components/SignUp';
import FileText from 'public/images/FileText.png';
import AddImg from 'public/images/add-img.svg';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { useDispatch } from 'react-redux';
import { myEstimateAction } from 'storeCompany/myQuotation';
import { useMutation, useQuery } from 'react-query';
import { isTokenGetApi, isTokenPostApi, isTokenPutApi, multerApi } from 'api';
import { useRouter } from 'next/router';
import Modal from 'components/Modal/Modal';
import {
  convertKo,
  getByteSize,
  inputPriceFormat,
} from 'utils/calculatePackage';
import { AxiosError } from 'axios';
import { MulterResponse } from 'componentsCompany/MyProductList/ProductAddComponent';
import SelectComponents from 'components/Select';
import { QuotationsDetailResponse } from './HeadOpenContent';
import {
  M5_LIST,
  M5_LIST_EN,
  M6_LIST,
  M6_LIST_EN,
  M7_LIST,
  M7_LIST_EN,
} from 'assets/selectList';
import { ProductListRepsonse } from 'componentsCompany/MyProductList/ProductList';
import { SentRequestResponse } from '../SentQuotation/SentProvisionalQuoatation';
import Loader from 'components/Loader';
import { requestPermissionCheck } from 'bridge/appToWeb';
import { BusinessRegistrationType } from '../LastQuotation/ThirdStep';

type Props = {
  tabNumber: number;
  setTabNumber: Dispatch<SetStateAction<number>>;
  canNext: boolean;
  SetCanNext: Dispatch<SetStateAction<boolean>>;
  StepIndex: number;
  maxIndex: number | undefined;
  routerId: string | string[];
  data: QuotationsDetailResponse;
  editData: SentRequestResponse;
};

interface Result {
  chargePriceType: string;
  chargePrice: number;
  manufacturer: string;
  chargerImageFiles: BusinessRegistrationType[];
  catalogFiles: BusinessRegistrationType[];
  feature?: string;
  modelName?: string;
}

const TAG = 'omponentsCompany/CompanyQuotation/RecievedQuoatation/SecondStep';

const SecondStep = ({
  tabNumber,
  maxIndex,
  setTabNumber,
  canNext,
  SetCanNext,
  StepIndex,
  data,
  editData,
}: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const imgRef = useRef<any>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const chargeTypeList: string[] = ['구매자 자율', '운영사업자 입력'];
  const chargeTypeListEn: string[] = [
    'PURCHASER_AUTONOMY',
    'OPERATION_BUSINESS_CARRIER_INPUT',
  ];

  const charger =
    data?.receivedQuotationRequest?.quotationRequestChargers[StepIndex]!;
  const [chargeTypeNumber, setChargeTypeNumber] = useState<number>(-1); // 충전 요금 종류
  const [fee, setFee] = useState<string>(''); // 충전 요금
  const [productItem, setProductItem] = useState<string>(); // 내 제품 리스트 종류
  const [productId, setProductId] = useState<number | null>(null);
  const [isChangeProduct, setIsChangeProduct] = useState<boolean>(false);
  const [manufacturingCompany, setManufacturingCompany] = useState<string>(''); // 제조사
  const [chargeFeatures, setChargeFeatures] = useState<string>(''); // 충전기 특장점
  const [imgArr, setImgArr] = useState<BusinessRegistrationType[]>([]); // 사진 첨부
  const [fileArr, setFileArr] = useState<BusinessRegistrationType[]>([]); // 충전기 카탈로그
  const [isModal, setIsModal] = useState(false); // 에러 모달
  const [networkError, setNetworkError] = useState(false); // 네트워크 에러
  const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지
  // 리덕스
  const {
    chargers,
    subscribeProductFeature,
    constructionPeriod,
    subscribePricePerMonth,
    chargingStationInstallationPrice,
  } = useSelector((state: RootState) => state.companymyEstimateData);
  const companymyEstimateData = useSelector(
    (state: RootState) => state.companymyEstimateData,
  );
  const newCharge = chargers.slice(0, maxIndex);
  // const { userAgent } = useSelector((state: RootState) => state.userAgent);
  const userAgent = JSON.parse(sessionStorage.getItem('userAgent')!);
  // image s3 multer 저장 API (with useMutation)
  const { mutate: multerImage, isLoading: multerImageLoading } = useMutation<
    MulterResponse,
    AxiosError,
    FormData
  >(multerApi, {
    onSuccess: (res) => {
      // console.log(TAG + ' 👀 ~ line 95 multer onSuccess');
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
      // console.log(TAG + ' 👀 ~ line 128 multer onSuccess');
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
  // 보내기 POST API
  const { mutate: postMutate, isLoading: postLoading } = useMutation(
    isTokenPostApi,
    {
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
    },
  );
  // 수정하기 Put API
  const { mutate: putMutate, isLoading: putLoading } = useMutation(
    isTokenPutApi,
    {
      onSuccess: () => {
        setIsModal(true);
        setErrorMessage('수정되었습니다.');
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
    },
  );
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
    if (errorMessage === '수정되었습니다.') {
      router.push('/company/quotation');
    } else if (networkError) {
      setIsModal(false);
      router.push('/company/quotation');
    } else {
      setIsModal(false);
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (e.target.value.length > 1 && e.target.value[0] === '0') {
      setFee(inputPriceFormat(value.substring(1)));
    } else setFee(inputPriceFormat(value));
    // if (e.target.value[0] !== '0') {
    //   setFee(inputPriceFormat(value));
    // } else setFee(inputPriceFormat(value.substring(1)));
  };

  const handleChargeTypeNumber = (index: number) => {
    setChargeTypeNumber(index);
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
  const onChangeSelectBox = (value: string, idx: number) => {
    setProductId(idx);
    setProductItem(value);
    // isChangeProduct 값이 변경 될때마다 하단의 내제품리스트 불러오는 useEffect가 실행됨.
    // true, false로 판단 X -> 그냥 업데이트를 위해 계속 반대값으로 바꿔줌
    setIsChangeProduct((prev) => !prev);

    // 만약에 같은 제품 id 또 클릭하면 입력값 초기화
    if (productId === idx) {
      setProductId(null);
      setProductItem('');
      setManufacturingCompany('');
      setChargeFeatures('');
      setImgArr([]);
      setFileArr([]);
    }
  };
  // 이전 버튼
  const handlePrevBtn = () => {
    if (tabNumber > 0) {
      dispatch(
        myEstimateAction.setCharge({
          index: StepIndex,
          data: {
            chargePriceType:
              chargeTypeNumber !== -1 ? chargeTypeListEn[chargeTypeNumber] : '',
            chargePrice: Number(fee.replaceAll(',', '')),
            modelName: productItem,
            manufacturer: manufacturingCompany,
            feature: chargeFeatures,
            chargerImageFiles: imgArr,
            catalogFiles: fileArr,
          },
        }),
      );
      setTabNumber(tabNumber - 1);
    }
  };
  // 다음 버튼
  const handleNextBtn = (e: any) => {
    if (canNext && tabNumber < maxIndex!) {
      dispatch(
        myEstimateAction.setCharge({
          index: StepIndex,
          data: {
            chargePriceType:
              chargeTypeNumber !== -1 ? chargeTypeListEn[chargeTypeNumber] : '',
            chargePrice: Number(fee.replaceAll(',', '')),
            modelName: productItem,
            manufacturer: manufacturingCompany,
            feature: chargeFeatures,
            chargerImageFiles: imgArr,
            catalogFiles: fileArr,
          },
        }),
      );
      setTabNumber(tabNumber + 1);
    }
  };
  // 포스트 버튼
  const onClickPost = () => {
    if (canNext) {
      const chargers = [
        ...newCharge.slice(0, maxIndex! - 1),
        {
          chargePriceType:
            chargeTypeNumber !== -1 ? chargeTypeListEn[chargeTypeNumber] : '',
          chargePrice: Number(fee.replaceAll(',', '')),
          modelName: productItem,
          manufacturer: manufacturingCompany,
          feature: chargeFeatures,
          chargerImageFiles: imgArr,
          catalogFiles: fileArr,
        },
      ];
      const newChargers = chargers.map((charger) => {
        const { feature, modelName, ...newCharger } = charger;
        let result: Result = { ...newCharger };
        if (feature && feature?.length! > 0) {
          result = {
            ...newCharger,
            feature,
          };
        }
        if (modelName && modelName?.length! > 0) {
          result = {
            ...result,
            modelName,
          };
        }
        return result;
      });

      const newData = {
        chargingStationInstallationPrice: chargingStationInstallationPrice,
        subscribePricePerMonth: subscribePricePerMonth,
        constructionPeriod: constructionPeriod,
        chargers: newChargers,
        subscribeProductFeature:
          subscribeProductFeature.length > 0
            ? subscribeProductFeature
            : undefined,
      };

      postMutate({
        url: `/quotations/pre/${router?.query?.quotationRequestIdx}`,
        data: newData,
      });

      dispatch(myEstimateAction.reset());
    }
  };
  // 수정하기 버튼
  const onClickEdit = () => {
    if (canNext) {
      const chargers = [
        ...newCharge.slice(0, maxIndex! - 1),
        {
          chargePriceType:
            chargeTypeNumber !== -1 ? chargeTypeListEn[chargeTypeNumber] : '',
          chargePrice: Number(fee.replaceAll(',', '')),
          modelName: productItem,
          manufacturer: manufacturingCompany,
          feature: chargeFeatures,
          chargerImageFiles: imgArr,
          catalogFiles: fileArr,
        },
      ];
      const newChargers = chargers.map((charger) => {
        const { feature, modelName, ...newCharger } = charger;
        let result: Result = { ...newCharger };
        if (feature && feature?.length! > 0) {
          result = {
            ...newCharger,
            feature,
          };
        }
        if (modelName && modelName?.length! > 0) {
          result = {
            ...result,
            modelName,
          };
        }
        return result;
      });
      const newData = {
        chargingStationInstallationPrice: chargingStationInstallationPrice,
        subscribePricePerMonth: subscribePricePerMonth,
        constructionPeriod: constructionPeriod,
        chargers: newChargers,
      };
      if (subscribeProductFeature.length < 1) {
        putMutate({
          url: `/quotations/pre/${router?.query?.quotationRequestIdx}`,
          data: newData,
        });
      } else {
        putMutate({
          url: `/quotations/pre/${router?.query?.quotationRequestIdx}`,
          data: {
            ...newData,
            subscribeProductFeature,
          },
        });
      }
      dispatch(myEstimateAction.reset());
    }
  };
  // 수정하기
  useEffect(() => {
    if (editData) {
      const charger =
        editData?.sendQuotationRequest?.preQuotation?.preQuotationCharger[
          StepIndex
        ];
      const newImage = charger?.chargerImageFiles!.map((item) => {
        const {
          chargerProductFileIdx,
          preQuotationChargerIdx,
          productFileType,
          createdAt,
          ...newArr
        } = item;
        return newArr;
      });
      const newFile = charger?.chargerImageFiles!.map((item) => {
        const {
          chargerProductFileIdx,
          preQuotationChargerIdx,
          productFileType,
          createdAt,
          ...newFile
        } = item;
        return newFile;
      });

      setChargeTypeNumber(chargeTypeListEn.indexOf(charger.chargePriceType));
      setFee(charger.chargePrice?.toString()!);
      setProductItem(charger.modelName);
      setManufacturingCompany(charger.manufacturer);
      setChargeFeatures(charger.productFeature);
      setImgArr(newImage);
      setFileArr(newFile);
    }
  }, [tabNumber, editData, StepIndex]);
  // 내 제품 리스트 제품이름 선택 시 하단에 불러오기
  useEffect(() => {
    if (productId) {
      // console.log('🔥 productId 확인 -> ');
      // console.log(productId);
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

      setManufacturingCompany(targetProduct?.manufacturer!);
      setChargeFeatures(targetProduct?.feature!);
      setImgArr(newImage!);
      setFileArr(newFile!);
    }
  }, [isChangeProduct]);
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
  useEffect(() => {
    const target = chargers[StepIndex];
    if (target?.chargePriceType !== '') {
      if (target?.chargePriceType === 'PURCHASER_AUTONOMY')
        setChargeTypeNumber(0);
      if (target?.chargePriceType === 'OPERATION_BUSINESS_CARRIER_INPUT')
        setChargeTypeNumber(1);
    }
    if (target?.chargePrice !== 0) {
      setFee(target?.chargePrice.toString());
    }
    if (target?.modelName !== '') {
      setProductItem(target?.modelName);
    }
    if (target?.manufacturer !== '') {
      setManufacturingCompany(target?.manufacturer);
    }
    if (target?.feature !== '') {
      setChargeFeatures(target?.feature);
    }
    if (target?.chargerImageFiles?.length >= 1) {
      setImgArr(target?.chargerImageFiles);
    }
    if (target?.catalogFiles?.length >= 1) {
      setFileArr(target?.catalogFiles);
    }
    return () => {
      setChargeTypeNumber(-1);
      setFee('');
      setManufacturingCompany('');
      setProductItem('');
      setChargeFeatures('');
      setImgArr([]);
      setFileArr([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [StepIndex]);
  // 금액 초기화
  useEffect(() => {
    if (chargeTypeNumber === 0) {
      setFee('');
    }
  }, [chargeTypeNumber]);

  // 페이지 최상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tabNumber]);

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

  return (
    <>
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

        {charger?.standType ? (
          <SubWord>
            <p className="boldText">
              {`${convertKo(M5_LIST, M5_LIST_EN, charger?.kind)}, ${convertKo(
                M6_LIST,
                M6_LIST_EN,
                charger?.standType,
              )}, ${convertKo(M7_LIST, M7_LIST_EN, charger?.channel)}`}
              &nbsp;
            </p>
            제품의
            <br />
            정보를 입력해주세요.
          </SubWord>
        ) : (
          <SubWord>
            <p>
              {`${convertKo(M5_LIST, M5_LIST_EN, charger?.kind)},  ${convertKo(
                M7_LIST,
                M7_LIST_EN,
                charger?.channel,
              )}`}
              &nbsp;
            </p>
            제품의
            <br />
            정보를 입력해주세요.
          </SubWord>
        )}

        <ChargeMoney>
          <div className="withAfter">충전요금</div>
          <BtnBox>
            {chargeTypeList.map((el, index) => (
              <Btn
                key={index}
                onClick={() => handleChargeTypeNumber(index)}
                className={index === chargeTypeNumber ? 'selected' : ''}
              >
                {el}
              </Btn>
            ))}
          </BtnBox>
          <InputBox isSelected={chargeTypeNumber === 1 ? true : false}>
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
            value={productItem!}
            placeholder="충전기 종류"
            productOption={productData?.chargerProduct!}
            onClickProject={onChangeSelectBox}
          />
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
          <FlexText>
            <span className="titleText">충전기 특장점</span>
            <span className="lengthText">{chargeFeatures.length}/500</span>
          </FlexText>
          <div>
            <TextArea
              onChange={(e) => setChargeFeatures(e.target.value)}
              value={chargeFeatures}
              name="firstPageTextArea"
              placeholder="선택 입력사항"
              rows={7}
              maxLength={500}
            />
          </div>
        </InputBox>

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
                capture={userAgent === 'Android_App' && true}
                multiple
              />
              {/* <Preview> */}
              <ImgSpanBox>
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
                ))}
              </ImgSpanBox>
              {/* </Preview> */}
            </PhotosBox>
          </RemainderInputBox>
        )}
        {/*  여기서부터 파일 */}
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
            </PhotosBoxs>
          </RemainderInputBoxs>
        )}
      </SecondWrapper>
      <TwoBtn>
        <PrevBtn onClick={handlePrevBtn}>이전</PrevBtn>
        {tabNumber === maxIndex ? (
          editData ? (
            <NextBtn canNext={canNext} onClick={onClickEdit}>
              수정하기
            </NextBtn>
          ) : (
            <NextBtn canNext={canNext} onClick={onClickPost}>
              보내기
            </NextBtn>
          )
        ) : (
          <NextBtn canNext={canNext} onClick={handleNextBtn}>
            다음
          </NextBtn>
        )}
      </TwoBtn>
    </>
  );
};

const Wrapper = styled.div`
  padding-left: 15pt;
  padding-right: 15pt;
  box-sizing: border-box;
  padding-bottom: 30pt;
  @media (min-width: 900pt) {
    /* padding-left: 25pt; */
    /* padding-right: 25pt; */
    padding-left: 22.5pt;
    padding-right: 22.5pt;
  }

  @media (max-width: 899.25pt) {
    padding-top: 20pt;
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
  @media (min-width: 900pt) {
    padding-top: 50pt;
  }
  .title {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 15pt;
    font-weight: 500;
    line-height: 21pt;
    letter-spacing: -0.02em;
    text-align: left;
    color: #5221cb;
    @media (min-width: 900pt) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 18pt;
      font-weight: 500;
      line-height: 24pt;
      letter-spacing: -0.02em;
      text-align: left;
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
`;
const SubWord = styled.div`
  margin-top: 6pt;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 12pt;
  font-weight: 400;
  line-height: 18pt;
  letter-spacing: -0.02em;
  text-align: left;
  & p {
    font-weight: 700;
    display: inline-block;
  }
  .boldText {
    font-family: 'Spoqa Han Sans Neo';
    color: #222222;
    font-size: 10.5pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
    @media (min-width: 900pt) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 16px;
      font-weight: 700;
      line-height: 24px;
      letter-spacing: -0.02em;
      text-align: left;
      color: #222222;
    }
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
  cursor: pointer;
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
  &.selected {
    border: 1px solid ${colors.main};
    color: ${colors.main};
  }
`;
const InputBox = styled.div<{ isSelected?: boolean }>`
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
    border-style: solid;
    border-width: 1pt;
    border-color: ${({ isSelected }) =>
      isSelected ? colors.main1 : colors.lightWhite3};
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
      font-size: 10.5pt;
      font-weight: 700;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: left;
      color: #222222;
    }
    font-family: 'Spoqa Han Sans Neo';
    color: #222222;
    font-size: 15pt;
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
  .withAfter {
    @media (min-width: 900pt) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 15pt;
      font-weight: 700;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: left;
      color: #222222;
    }
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

  @media (min-width: 900pt) {
    margin-top: 12pt;
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
  @media (max-width: 899.25pt) {
    height: auto;
    position: relative;
  }
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
  //height: 56.0625pt;
  margin-top: 9pt;
  gap: 9.1875pt;
  display: flex;
  align-items: inherit;
  @media (min-width: 900pt) {
    display: flex;
    align-items: inherit;
    height: auto;
    width: 100%;
  }
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
  /* display: inline-block; */
  min-width: 56.0625pt;
  min-height: 56.0625pt;
  border: 1px solid #e2e5ed;
  border-radius: 6pt;
  cursor: pointer;
  background-color: #ffffff;
  @media (min-width: 900pt) {
    background-color: #ffffff;
    min-width: 77.25pt;
    height: 77.25pt;
    margin-right: 10pt;
  }
`;

const ImgSpanBox = styled.div`
  @media (min-width: 900pt) {
    height: auto;
    width: 444.75;
    display: grid;
    grid-template-columns: 230pt 1fr;
    gap: 6pt;
  }
  @media (max-width: 899.25pt) {
    position: relative;
    display: flex;
    /* grid-auto-flow: column; */
    width: 100%;
    /* height: auto; */
    height: 100%;
    /* overflow-x: scroll; */
    flex-wrap: wrap;
    gap: 9pt;
  }
`;

const ImgSpan = styled.div`
  position: relative;
  width: 56.0625pt;
  height: 56.0625pt;
  border-radius: 6pt;
  & > span {
    border-radius: 6pt;
  }
  @media (min-width: 900pt) {
    margin-bottom: 0pt;
    width: 216pt;
    height: 135pt;
    border: 0.75pt solid #e2e5ed;
  }
`;

const Xbox = styled.div`
  position: absolute;
  right: -7pt;
  top: -5pt;
  cursor: pointer;
  @media (min-width: 900pt) {
    top: -6pt;
  }
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
  padding: 15pt 0 39pt 0;
  cursor: pointer;
  @media (min-width: 900pt) {
    padding: 15pt 0 15pt 0;
    border-radius: 6pt;
    margin-left: 12pt;
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
  padding: 15pt 0 39pt 0;
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
    width: 560.25pt;
    position: relative;
    margin: 0 auto;
    // padding-bottom: 40pt;
    margin-bottom: 50pt;
    padding-bottom: 20pt;
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
