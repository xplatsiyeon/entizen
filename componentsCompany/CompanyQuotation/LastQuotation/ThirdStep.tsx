import styled from '@emotion/styled';
import Image from 'next/image';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import FileText from 'public/images/FileText.png';
import AddImg from 'public/images/add-img.svg';
import colors from 'styles/colors';
import CloseImg from 'public/images/XCircle.svg';
import { useRouter } from 'next/router';
import { MulterResponse } from 'componentsCompany/MyProductList/ProductAddComponent';
import { AxiosError } from 'axios';
import { isTokenPostApi, multerApi } from 'api';
import { useMutation } from 'react-query';
import { chargers } from 'storeCompany/finalQuotation';
import Modal from 'components/Modal/Modal';
import { BusinessRegistrationType } from 'components/SignUp';
import { convertEn, getByteSize } from 'utils/calculatePackage';
import { subscribeType, subscribeTypeEn } from 'assets/selectList';
import { BusinessRegistrationFiles } from '../SentQuotation/SentProvisionalQuoatation';

type Props = {
  tabNumber: number;
  setTabNumber: Dispatch<SetStateAction<number>>;
  canNext: boolean;
  SetCanNext: Dispatch<SetStateAction<boolean>>;
  maxIndex: number;
  selectedOptionEn: chargers[];
  setSelectedOptionEn: Dispatch<SetStateAction<chargers[]>>;
  BusinessRegistration: BusinessRegistrationType[];
  setBusinessRegistration: Dispatch<SetStateAction<BusinessRegistrationType[]>>;
  quotationRequestIdx: number;
  preQuotationIdx: number;
  subscribeProduct: string;
  subscribePeriod: string;
  userInvestRate: string;
  chargingPointRate: string;
  subscribePricePerMonth: string;
  chargers: chargers[];
  detailQuotationFiles: BusinessRegistrationType[];
  constructionPeriod: string;
  spotInspectionResult: string;
  subscribeProductFeature: string;
};
const TAG = 'componentsCompany/CompanQuotation/LastQuotation/ThirdStep.tsx';
const ThirdStep = ({
  tabNumber,
  setTabNumber,
  canNext,
  SetCanNext,
  maxIndex,
  BusinessRegistration,
  setBusinessRegistration,
  quotationRequestIdx,
  preQuotationIdx,
  subscribeProduct,
  subscribePeriod,
  userInvestRate,
  chargingPointRate,
  subscribePricePerMonth,
  chargers,
  constructionPeriod,
  spotInspectionResult,
  subscribeProductFeature,
}: Props) => {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  // 에러 모달
  const [isModal, setIsModal] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // file s3 multer 저장 API (with useMutation)
  const { mutate: multerFile, isLoading: multerFileLoading } = useMutation<
    MulterResponse,
    AxiosError,
    FormData
  >(multerApi, {
    onSuccess: (res) => {
      const newFile = [...BusinessRegistration];
      res?.uploadedFiles.forEach((img) => {
        newFile.push({
          url: img.url,
          size: img.size,
          originalName: decodeURIComponent(img.originalName),
        });
      });
      setBusinessRegistration(newFile);
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
        'businessRegistration',
        files![i],
        encodeURIComponent(files![i].name),
      );
    }
    multerFile(formData);
  };

  // 파일 삭제
  const handleFileDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    const name = Number(e.currentTarget.dataset.name);
    const copyArr = [...BusinessRegistration];
    for (let i = 0; i < copyArr.length; i++) {
      if (i === name) {
        copyArr.splice(i, 1);
        return setBusinessRegistration(copyArr);
      }
    }
  };

  const changeCharger = [...chargers].map((obj) => {
    if (typeof obj.chargePrice === 'string') {
      obj.chargePrice = Number(obj?.chargePrice?.replaceAll(',', ''));
    }
    return obj;
  });

  const onClickPost = () => {
    if (canNext) {
      postMutate({
        url: '/quotations/final',
        data: {
          quotationRequestIdx: quotationRequestIdx,
          preQuotationIdx: preQuotationIdx,
          subscribeProduct: convertEn(
            subscribeType,
            subscribeTypeEn,
            subscribeProduct,
          ),
          subscribePeriod: subscribePeriod.slice(0, 2),
          userInvestRate: Number(userInvestRate) / 100 + '',
          chargingPointRate: Number(chargingPointRate) / 100 + '',
          subscribePricePerMonth: Number(
            subscribePricePerMonth.replaceAll(',', ''),
          ),
          chargers: changeCharger,
          detailQuotationFiles: BusinessRegistration,
          constructionPeriod: constructionPeriod,
          spotInspectionResult: spotInspectionResult,
          subscribeProductFeature: subscribeProductFeature,
        },
      });
    }
  };

  const handlePrevBtn = () => {
    setTabNumber(maxIndex);
  };

  const handleNextBtn = (e: any) => {
    if (canNext) {
      router.push('/company/quotation/sentProvisionalQuotaionComplete');
    }
  };

  // 모달 클릭
  const onClickModal = () => {
    if (networkError) {
      setIsModal(false);
      router.push('/company/quotation');
    } else {
      setIsModal(false);
    }
  };

  useEffect(() => {
    if (BusinessRegistration.length >= 1) {
      SetCanNext(true);
    } else {
      SetCanNext(false);
    }
  }, [BusinessRegistration]);

  return (
    <>
      <WebRapper>
        <Wrapper>
          {/* 에러 모달 */}
          {isModal && <Modal click={onClickModal} text={errorMessage} />}
          <TopStep>
            <div>STEP {tabNumber + 1}</div>
          </TopStep>
          <SubWord>
            사업자 등록증, 상세 견적서를
            <br />
            첨부해주세요
          </SubWord>

          <RemainderInputBoxs>
            <PhotosBoxs>
              <Form>
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
                {BusinessRegistration?.map((item, index) => (
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
          <TwoBtn>
            <PrevBtn onClick={handlePrevBtn}>이전</PrevBtn>
            <NextBtn canNext={canNext} onClick={onClickPost}>
              보내기
            </NextBtn>
          </TwoBtn>
        </Wrapper>
      </WebRapper>
    </>
  );
};

const WebRapper = styled.div`
  @media (min-width: 899pt) {
    height: auto;
    background-color: #ffffff;
    box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
    border-radius: 12pt;
    margin-bottom: 30pt;
    padding-bottom: 30pt;
    margin-top: -11pt;
  }
`;

const Wrapper = styled.div`
  padding-left: 15pt;
  padding-right: 15pt;
  box-sizing: border-box;
  padding-bottom: 30pt;
  @media (min-width: 899pt) {
    margin: 0 auto;
  }
`;

const TopStep = styled.div`
  @media (min-width: 899pt) {
    margin-top: 0;
    padding-top: 70pt;
  }
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
  font-family: Spoqa Han Sans Neo;
  font-size: 18pt;
  font-weight: 500;
  line-height: 24pt;
  letter-spacing: -0.02em;
  text-align: left;
  margin-top: 21pt;
`;

const RemainderInputBoxs = styled.div`
  flex-direction: column;
  position: relative;
  width: 100%;
  display: flex;
  margin-top: 38.25pt;
  & .file-preview {
    display: flex;
    width: 100%;
    flex-direction: column;
    /* padding-bottom: 100pt; */
    gap: 9pt;
  }
  @media (min-width: 899pt) {
    width: 534pt;
    & .file-preview {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 9pt;
    }
  }
`;

const PhotosBoxs = styled.div`
  /* height: 56.0625pt; */
  margin-top: 9pt;
  display: flex;
  flex-direction: column;
  gap: 9pt;
  align-items: center;
  padding-bottom: 58.6875pt;
  @media (min-width: 899pt) {
    padding-bottom: 0;
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
  @media (min-width: 899pt) {
    display: flex;
    width: 100%;
    flex-direction: column;
    position: relative;
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

const TwoBtn = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  @media (max-width: 899pt) {
    position: fixed;
  }
  @media (min-width: 899pt) {
    width: 534pt;
    position: relative;
    margin: 0 auto;
    top: 40pt;
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
  @media (min-width: 899pt) {
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
  @media (max-width: 899pt) {
    padding: 15pt 0 39pt 0;
  }
  @media (min-width: 899pt) {
    padding: 15pt 0 15pt 0;
    border-radius: 6pt;
  }
`;

export default ThirdStep;
