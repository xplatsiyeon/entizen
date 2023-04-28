import styled from '@emotion/styled';
import { useCallback, useEffect, useRef, useState } from 'react';
import colors from 'styles/colors';
import fileImg from 'public/mypage/file-icon.svg';
import Image from 'next/image';
import { Button } from '@mui/material';
import DoubleArrow from 'public/mypage/CaretDoubleDown.svg';
import { useRouter } from 'next/router';
import RightArrow from 'public/images/black-right-arrow.svg';
import CommunicationIcon from 'public/images/communication-icon.svg';
import camera from 'public/images/gray_camera.png';
import { BusinessRegistrationType } from 'components/SignUp';
import CloseImg from 'public/images/XCircle.svg';
import { AsDetailReseponse } from 'pages/mypage/as';
import { dateFomat, hyphenFn } from 'utils/calculatePackage';
import { useMutation } from 'react-query';
import { isTokenPostApi, multerApi } from 'api';
import Loader from 'components/Loader';
import Modal from 'components/Modal/Modal';
import {
  ImgFile,
  MulterResponse,
} from 'componentsCompany/MyProductList/ProductAddComponent';
import { AxiosError } from 'axios';
import CommunicationBox from 'components/CommunicationBox';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { fileDownload, requestPermissionCheck } from 'bridge/appToWeb';
import { useMediaQuery } from 'react-responsive';

type Props = {
  data: AsDetailReseponse;
};

const AsCompText = ({ data }: Props) => {
  const mobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });
  //dummy text
  // const { userAgent } = useSelector((state: RootState) => state.userAgent);
  const userAgent = JSON.parse(sessionStorage.getItem('userAgent')!);
  const router = useRouter();
  const routerId = router?.query?.afterSalesServiceIdx;
  const imgRef = useRef<any>(null);
  // 모달
  const [isModal, setIsModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  // 텍스트
  const [acceptanceContent, setAcceptanceContent] = useState('');
  const [afterSalesServiceResultContent, setAfterSalesServiceResultContent] =
    useState('');
  // 필수 확인 채우면 버튼 활성화
  const [isValidAcceptance, setIsValidAcceptance] = useState(false);
  const [isValidCompletion, setIsValidCompletion] = useState(false);
  // 이미지
  const [imgArr, setImgArr] = useState<ImgFile[]>([]);

  //a링크에 넘길거
  const callPhone = hyphenFn(
    data?.data?.afterSalesService?.afterSalesService?.project?.finalQuotation
      ?.preQuotation?.quotationRequest?.member?.phone!,
  );
  // file s3 multer 저장 API (with useMutation)
  const { mutate: multerImage, isLoading: multerImageLoading } = useMutation<
    MulterResponse,
    AxiosError,
    FormData
  >(multerApi, {
    onSuccess: (res) => {
      const newFile = [...imgArr];
      res?.uploadedFiles.forEach((img) => {
        newFile.push({
          url: img.url,
          size: img.size,
          originalName: decodeURIComponent(img.originalName),
        });
      });
      setImgArr(newFile);
    },
    onError: (error: any) => {
      if (error.response.data.message) {
        setModalMessage(error.response.data.message);
        setIsModal(true);
      } else if (error.response.status === 413) {
        setModalMessage('용량이 너무 큽니다.');
        setIsModal(true);
      } else {
        setModalMessage('다시 시도해주세요');
        setIsModal(true);
      }
    },
  });
  // 요청하기
  const { mutate: acceptanceMutate, isLoading: acceptanceIsLoading } =
    useMutation(isTokenPostApi, {
      onSuccess: () => {
        setIsModal(true);
        setModalMessage('접수확인 되었습니다.');
      },
      onError: (error: any) => {
        setIsModal(true);
        setModalMessage('접수확인이 실패했습니다.\n다시 시도해주세요');
      },
    });
  // 완료하기
  const { mutate: completionMutate, isLoading: completionIsLoading } =
    useMutation(isTokenPostApi, {
      onSuccess: () => {
        setIsModal(true);
        setModalMessage('A/S 완료 되었습니다.');
      },
      onError: (error: any) => {
        setIsModal(true);
        setModalMessage('A/S 완료가 실패했습니다.\n다시 시도해주세요');
      },
    });

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
    const formData = new FormData();
    for (let i = 0; i < maxLength; i += 1) {
      if (files![i] === undefined) {
        break;
      }
      formData.append(
        'afterSalesServiceCompletion',
        files![i],
        encodeURIComponent(files![i].name),
      );
    }
    multerImage(formData);
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

  // 모달 온클릭
  const onClickModal = () => {
    if (
      modalMessage === '용량이 너무 큽니다.' ||
      modalMessage === '다시 시도해주세요.'
    ) {
      setIsModal(false);
    } else {
      setIsModal(false);
      router.replace('/company/as?id=0');
    }
  };
  // 접수 확인 온클릭
  const onClickAcceptance = () => {
    if (isValidAcceptance) {
      acceptanceMutate({
        url: `/after-sales-services/${routerId}/acceptance`,
        data: {
          acceptanceContent: acceptanceContent,
        },
      });
    }
  };
  // A/S 완료하기
  const onClickCompletion = () => {
    // console.log(isValidCompletion);

    if (isValidCompletion) {
      completionMutate({
        url: `/after-sales-services/${routerId}/completion`,
        data: {
          afterSalesServiceResultContent: afterSalesServiceResultContent,
          afterSalesServiceCompletionFiles: imgArr,
        },
      });
    }
  };

  // 유효성 검사
  useEffect(() => {
    // 접수 확인
    acceptanceContent.length > 0
      ? setIsValidAcceptance(true)
      : setIsValidAcceptance(false);

    // 접수 완료
    afterSalesServiceResultContent.length > 0
      ? setIsValidCompletion(true)
      : setIsValidCompletion(false);
  }, [acceptanceContent, afterSalesServiceResultContent]);

  // 앱에서 이미지 or 파일 온클릭 (앱->웹)
  useEffect(() => {
    if (userAgent === 'Android_App') {
      window.openGallery = () => {
        imgRef?.current?.click();
      };
    } else if (userAgent === 'iOS_App') {
      window.openGallery = () => {
        imgRef?.current?.click();
      };
    }
  }, []);

  if (acceptanceIsLoading) {
    return <Loader />;
  }
  // console.log('adadfsd', data?.data?.afterSalesService?.badge);

  return (
    <>
      <Wrapper>
        {isModal && (
          <Modal
            click={onClickModal}
            text={modalMessage}
            textAlignLeft={true}
          />
        )}
        <DownArrowBox>
          <Image src={DoubleArrow} alt="double-arrow" />
        </DownArrowBox>

        <Contents>
          <Customer>고객 정보</Customer>
          <div className="text-box">
            <span className="name">이름</span>
            <span className="text">
              {
                data?.data?.afterSalesService?.afterSalesService?.project
                  ?.finalQuotation?.preQuotation?.quotationRequest?.member?.name
              }
            </span>
          </div>
          <div className="text-box">
            <span className="name">연락처</span>
            <a href={'tel:' + callPhone} className="text phone">
              {callPhone}
            </a>
            <span className="text webPhone">{callPhone}</span>
          </div>
        </Contents>

        <ReceiptTitle>접수내용</ReceiptTitle>
        <SecondList>
          <Items>
            <span className="name">제목</span>
            <span className="value2">
              {data?.data?.afterSalesService?.afterSalesService?.requestTitle}
            </span>
          </Items>
          <Items>
            <span className="name">요청내용</span>
            <span className="value2">
              {data?.data?.afterSalesService?.afterSalesService?.requestContent}
            </span>
          </Items>
          <Items>
            <span className="name">접수일자</span>
            <span className="value">
              {dateFomat(
                data?.data?.afterSalesService?.afterSalesService?.createdAt!,
              )}
            </span>
          </Items>
          <Items>
            <div className="name">첨부파일</div>
            <div className="value">
              {data?.data?.afterSalesService?.afterSalesService?.afterSalesServiceRequestFiles?.map(
                (file, index) => (
                  <FileDownloadBtn key={index}>
                    <FileDownload
                      download={file.originalName}
                      // href={file.url}
                      onClick={() => {
                        fileDownload(userAgent, file.originalName, file.url);
                      }}
                    >
                      <Image src={fileImg} alt="file-icon" layout="intrinsic" />
                      <FileName>{file.originalName}</FileName>
                    </FileDownload>
                  </FileDownloadBtn>
                ),
              )}
            </div>
          </Items>
        </SecondList>
        {/* 1. 접수 요청 뱃지가 달려 있을 때 */}
        {data?.data?.afterSalesService?.badge?.includes('요청') && (
          <InputBox className="lastInputBox">
            <div className="withTextNumber">
              <span className="titleText">접수확인</span>
              <span>{acceptanceContent.length}/500</span>
            </div>
            <div className="monthFlex">
              <TextArea
                onChange={(e) => setAcceptanceContent(e.target.value)}
                value={acceptanceContent}
                name="firstPageTextArea"
                placeholder="추정 원인 및 대응 계획에 대해 입력 후 &#13;&#10;접수 확인을 클릭해주세요!"
                rows={5}
                maxLength={500}
              />
            </div>
          </InputBox>
        )}
        {/* 2. 접수 확인 뱃지가 달려 있을 때 */}
        {data?.data?.afterSalesService?.badge?.includes('확인') && (
          <>
            <ReceiptTitle>접수확인</ReceiptTitle>
            <SecondList>
              <Items>
                <span className="name">내용</span>
                <span className="value">
                  {
                    data?.data?.afterSalesService?.afterSalesService
                      ?.acceptanceContent
                  }
                </span>
              </Items>
              <Items>
                <span className="name">답변일자</span>
                <span className="value">
                  {dateFomat(
                    data?.data?.afterSalesService?.afterSalesService
                      ?.acceptanceDate!,
                  )}
                </span>
              </Items>
            </SecondList>

            <InputBox className="lastInputBox">
              <div className="requiredLabel">
                <span className="withAfter"> 필수 입력</span>
              </div>
              <div className="withTextNumber">
                <span className="asLabel">A/S결과</span>
                <span className="length">
                  {afterSalesServiceResultContent.length}/500
                </span>
              </div>
              <div className="monthFlex">
                <TextArea
                  onChange={(e) =>
                    setAfterSalesServiceResultContent(e.target.value)
                  }
                  value={afterSalesServiceResultContent}
                  name="firstPageTextArea"
                  placeholder="A/S 결과를 입력해주세요"
                  rows={5}
                  maxLength={500}
                />
              </div>
            </InputBox>
            <Line />
            {/* 사진 첨부 부분 */}
            <RemainderInputBox>
              <Label>파일첨부</Label>
              <PhotosBox>
                <AddPhotos onClick={imgHandler}>
                  <Image src={camera} alt="camera-icon" />
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
                </ImgSpanBox>
              </PhotosBox>
            </RemainderInputBox>
          </>
        )}
        {/* 3. 완료대기 뱃지가 달려 있을 때 */}
        {data?.data?.afterSalesService?.badge?.includes('완료') && (
          <>
            <ReceiptTitle>접수확인</ReceiptTitle>
            <SecondList>
              <Items>
                <span className="name">내용</span>
                <span className="value">
                  {
                    data?.data?.afterSalesService?.afterSalesService
                      ?.acceptanceContent
                  }
                </span>
              </Items>
              <Items>
                <span className="name">답변일자</span>
                <span className="value">
                  {dateFomat(
                    data?.data?.afterSalesService?.afterSalesService
                      ?.acceptanceDate!,
                  )}
                </span>
              </Items>
            </SecondList>
            <ReceiptTitle>A/S결과</ReceiptTitle>
            <SecondList isLastChildren={true}>
              <Items>
                <span className="name">내용</span>
                <span className="value">
                  {
                    data?.data?.afterSalesService?.afterSalesService
                      ?.afterSalesServiceResultContent
                  }
                </span>
              </Items>
              <Items>
                <span className="name">A/S일자</span>
                <span className="value">
                  {dateFomat(
                    data?.data?.afterSalesService?.afterSalesService
                      ?.afterSalesServiceResultDate!,
                  )}
                </span>
              </Items>
              <Items>
                <div className="name">첨부파일</div>
                <div className="value">
                  {data?.data?.afterSalesService?.afterSalesService?.afterSalesServiceCompletionFiles?.map(
                    (file, index) => (
                      <FileDownloadBtn key={index}>
                        <FileDownload
                          download={file.originalName}
                          // href={file.url}
                          onClick={() => {
                            fileDownload(
                              userAgent,
                              file.originalName,
                              file.url,
                            );
                          }}
                        >
                          <Image
                            src={fileImg}
                            alt="file-icon"
                            layout="intrinsic"
                          />
                          <FileName>{file.originalName}</FileName>
                        </FileDownload>
                      </FileDownloadBtn>
                    ),
                  )}
                </div>
              </Items>
            </SecondList>
          </>
        )}
        {/* 웹 버튼 */}
        {data?.data?.afterSalesService?.badge?.includes('요청') && (
          <WebBtn isValid={isValidAcceptance} onClick={onClickAcceptance}>
            접수확인
          </WebBtn>
        )}
        {data?.data?.afterSalesService?.badge?.includes('확인') && (
          <WebBtn isValid={isValidCompletion} onClick={onClickCompletion}>
            A/S 완료하기
          </WebBtn>
        )}
        {router.pathname !== `/company/as/history` && (
          <CommunicationWrapper>
            <CommunicationBox
              text={'고객과 소통하기'}
              id={
                data?.data?.afterSalesService?.afterSalesService?.project
                  ?.finalQuotation?.preQuotation?.quotationRequest?.member
                  ?.memberIdx
              }
            />
          </CommunicationWrapper>
          // <CommunityButton
          //   onClick={() => alert('소통하기로')}
          //   confirmWait={data?.data?.afterSalesService?.badge?.includes('대기')}
          // >
          //   <div>
          //     <Image src={CommunicationIcon} alt="right-arrow" />
          //   </div>
          //   고객과 소통하기
          //   <div>
          //     <Image src={RightArrow} alt="right-arrow" />
          //   </div>
          // </CommunityButton>
        )}
        {/* 앱 버튼 */}
        {data?.data?.afterSalesService?.badge?.includes('요청') && (
          <Btn isValid={isValidAcceptance} onClick={onClickAcceptance}>
            접수확인
          </Btn>
        )}
        {data?.data?.afterSalesService?.badge?.includes('확인') && (
          <Btn isValid={isValidCompletion} onClick={onClickCompletion}>
            A/S 완료하기
          </Btn>
        )}
      </Wrapper>
    </>
  );
};

export default AsCompText;

const Wrapper = styled.div`
  padding-top: 21pt;
  /* padding-left: 15pt;
  padding-right: 15pt; */
`;

const DownArrowBox = styled.div`
  display: flex;
  justify-content: center;
`;

const Contents = styled.div`
  padding-top: 19.5pt;
  padding-bottom: 18pt;
  border-bottom: 0.75pt solid #e9eaee;
  @media (min-width: 900pt) {
    padding-top: 66.75pt;
    padding-bottom: 30pt;
  }
  .text-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    :not(:nth-of-type(1)) {
      padding-top: 12pt;
      @media (min-width: 900pt) {
        padding-top: 15pt;
      }
    }
    .emailText {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 12pt;
      font-weight: 500;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: right;
    }
  }
  .name {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.gray2};
    @media (min-width: 900pt) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 12pt;
      font-weight: 500;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: left;
    }
  }
  .text {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    text-align: right;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    @media (min-width: 900pt) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 12pt;
      font-weight: 500;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: left;
    }
  }
  .img-box {
    padding-top: 42pt;
    padding-bottom: 24pt;
    text-align: center;
  }
  .phone {
    text-decoration: underline;
    color: ${colors.main};
    @media (min-width: 900pt) {
      display: none;
    }
  }
  .webPhone {
    @media (max-width: 899.25pt) {
      display: none;
    }
  }
`;

const Customer = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 10.5pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: 0em;
  text-align: left;
  padding-bottom: 24pt;
  color: #222222;

  @media (min-width: 900pt) {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 15pt;
    font-weight: 700;
    line-height: 15pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;

const ReceiptTitle = styled.h1`
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  margin-top: 18pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  @media (min-width: 900pt) {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 15pt;
    font-weight: 700;
    line-height: 15pt;
    letter-spacing: -0.02em;
    text-align: left;
    margin-top: 30pt;
  }
`;

const ReceiptConfirmTitle = styled.h1`
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  margin-top: 18pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  @media (min-width: 900pt) {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 15pt;
    font-weight: 700;
    line-height: 15pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;

const SecondList = styled.ul<{ isLastChildren?: boolean }>`
  margin-top: 12pt;
  padding-bottom: 18pt;
  gap: 12pt;
  border-bottom: ${({ isLastChildren }) =>
    isLastChildren === true ? 'none' : '1px solid #e9eaee'};
  @media (min-width: 900pt) {
    margin-top: 23.25pt;
    padding-bottom: 30pt;
  }
`;

const Items = styled.li`
  display: flex;
  gap: 26.5pt;
  :not(:nth-of-type(1)) {
    margin-top: 12pt;
  }
  .name {
    font-family: 'Spoqa Han Sans Neo';
    /* width: 20%; */
    font-weight: 500;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.gray2};
    flex: 1;
    @media (min-width: 900pt) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 12pt;
      font-weight: 500;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: left;
    }
  }
  .value2 {
    font-family: 'Spoqa Han Sans Neo';
    /* width: 80%; */
    font-size: 10.5pt;
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    text-align: left;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    flex: 3;
    /* display: flex;
    gap: 6pt;
    flex-direction: column;
    justify-content: start;
    position: relative; */
    @media (min-width: 900pt) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 12pt;
      font-weight: 500;
      line-height: 18pt;
      letter-spacing: -0.02em;
      text-align: left;
    }
  }
  .value {
    /* width: 80%; */
    font-size: 10.5pt;
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    text-align: left;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    /* display: flex;
    gap: 6pt;
    flex-direction: column;
    justify-content: start;
    position: relative; */
    flex: 3;
    @media (min-width: 900pt) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 12pt;
      font-weight: 500;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: left;
    }
  }
`;
const InputBox = styled.div`
  display: flex;
  gap: 9pt;
  flex-direction: column;
  position: relative;
  margin-top: 30pt;
  @media (min-width: 900pt) {
    gap: 23.25pt;
  }
  .titleText {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 10.5pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
    color: #222222;
    @media (min-width: 900pt) {
      font-size: 15pt;
      font-weight: 700;
      line-height: 15pt;
      letter-spacing: -0.02em;
      text-align: left;
    }
  }
  .withAfter {
    font-family: 'Spoqa Han Sans Neo';
    color: #222222;
  }
  & > .withAfter::after {
    content: ' * ';
    font-family: 'Spoqa Han Sans Neo';
    margin-left: 1pt;
    color: #f75015;
  }
  & > .withTextNumber {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 10.5pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
    position: relative;
    & span:nth-of-type(1) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 12pt;
      font-weight: 700;
      line-height: 12pt;
      letter-spacing: 0em;
      text-align: left;
      @media (min-width: 900pt) {
        font-family: 'Spoqa Han Sans Neo';
        font-size: 15pt;
        font-weight: 700;
        line-height: 12pt;
        letter-spacing: -0.02em;
        text-align: left;
      }
    }
    & span:nth-of-type(2) {
      position: absolute;
      right: 0;
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
    }
  }
  & > .withAfter {
    position: relative;
    & span:nth-of-type(2) {
      position: absolute;
      right: 0;
      font-family: 'Spoqa Han Sans Neo';
      font-size: 9pt;
      font-weight: 500;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: right;
    }
  }
  & div:nth-of-type(2) {
    display: flex;
  }
  .monthFlex {
    display: flex;
    gap: 12pt;
  }
  .requiredLabel {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 9pt;
    font-weight: 500;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: right;
    ::before {
      content: ' *';
      color: #f75015;
    }
  }
  .length {
    color: #222222;
    font-family: 'Spoqa Han Sans Neo';
    font-size: 10.5pt;
    font-weight: 500;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: right;
  }
  .asLabel {
    font-family: 'Spoqa Han Sans Neo';
    color: #222222;
    @media (min-width: 900pt) {
      font-size: 15pt;
      font-weight: 700;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: left;
      padding-bottom: 24pt;
    }
    ::after {
      content: ' *';
      color: #f75015;
    }
  }
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
    font-family: 'Spoqa Han Sans Neo';
    font-size: 12pt;
    font-weight: 400;
    line-height: 18pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;

const Btn = styled.div<{ isValid: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  color: ${colors.lightWhite};
  width: 100%;
  padding: 15pt 0 15pt 0;
  text-align: center;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  font-family: 'Spoqa Han Sans Neo';
  letter-spacing: -0.02em;
  margin-top: 30pt;
  /* border-radius: 6pt; */
  cursor: pointer;
  background-color: ${({ isValid }) => (isValid ? `#5221CB` : `#E2E5ED`)};
  @media (max-width: 899pt) {
    position: fixed;
    padding: 15pt 0 39pt 0;
  }
  @media (min-width: 900pt) {
    display: none;
  }
`;

const WebBtn = styled.div<{ isValid: boolean }>`
  color: ${colors.lightWhite};
  width: 100%;
  padding: 15pt 0 15pt 0;
  text-align: center;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  font-family: 'Spoqa Han Sans Neo';
  letter-spacing: -0.02em;
  margin-top: 30pt;
  border-radius: 6pt;
  cursor: pointer;
  background-color: ${({ isValid }) => (isValid ? `#5221CB` : `#E2E5ED`)};
  @media (max-width: 899pt) {
    position: fixed;
    padding: 15pt 0 39pt 0;
  }
  @media (max-width: 899pt) {
    display: none;
  }
`;

// const CommunityButton = styled.button<{
//   confirmWait: boolean | undefined;
// }>`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   /* margin: 60pt auto 48.75pt; */
//   margin: ${({ confirmWait }) =>
//     confirmWait === true ? `60pt auto 48.75pt` : `60pt auto 100pt`};
//   padding: 10.5pt 12pt;
//   border-radius: 21.75pt;
//   font-weight: 500;
//   font-size: 12pt;
//   line-height: 12pt;
//   letter-spacing: -0.02em;
//   background: #f3f4f7;
//   color: #222222;
//   @media (min-width: 900pt) {
//     margin: 60pt auto 0;
//     cursor: pointer;
//   }
// `;

const RemainderInputBox = styled.div`
  flex-direction: column;
  display: flex;
  margin-top: 24pt;
  @media (max-width: 899.25pt) {
    margin-top: 18pt;
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
    font-size: 15pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
    padding-bottom: 24pt;
  }
`;

const PhotosBox = styled.div`
  width: 100%;
  height: 56.0625pt;
  margin-top: 9pt;
  display: flex;
  gap: 9.1875pt;
  align-items: center;
  @media (min-width: 900pt) {
    display: flex;
    align-items: inherit;
    height: auto;
    width: 100%;
  }
`;

const AddPhotos = styled.button`
  display: inline-block;
  width: 56.0625pt;
  height: 56.0625pt;
  border: 1px solid #e2e5ed;
  background-color: #ffffff;
  border-radius: 6pt;
  cursor: pointer;
  @media (min-width: 900pt) {
    background-color: #ffffff;
    width: 77.25pt;
    height: 77.25pt;
  }
`;

const ImgSpanBox = styled.div`
  @media (max-width: 899.25pt) {
    display: flex;
    gap: 9.1875pt;
  }
  @media (min-width: 900pt) {
    height: auto;
    width: 444.75pt;
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
  & > span > img {
    border-radius: 6pt;
  }
  @media (min-width: 900pt) {
    margin-bottom: 10pt;
    width: 216pt;
    height: 135pt;
  }
`;
const Xbox = styled.div`
  position: absolute;
  top: -7pt;
  right: -7pt;
  cursor: pointer;
`;
const FileDownloadBtn = styled(Button)`
  margin: 0 15pt 6pt 0;
  padding: 7.5pt 6pt;
  border: 0.75pt solid ${colors.lightGray3};
  border-radius: 6pt;
`;
const FileDownload = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 3pt;
  color: ${colors.gray2};
`;
const CommunicationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 74.1975pt;
  @media (max-width: 899.25pt) {
    margin-top: 60pt;
    margin-bottom: 87.1875pt;
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

const Line = styled.div`
  border-bottom: 0.75pt solid #e9eaee;
  padding-top: 18pt;
  @media (min-width: 900pt) {
    padding-top: 30pt;
    padding-bottom: 6pt;
  }
`;
