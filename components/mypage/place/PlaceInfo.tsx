import styled from '@emotion/styled';
import CommunicationBox from 'components/CommunicationBox';
import React, { useEffect, useRef, useState } from 'react';
import DoubleArrow from 'public/mypage/CaretDoubleDown.svg';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { ChargingStations } from 'QueryComponents/UserQuery';
import { hyphenFn } from 'utils/calculatePackage';
import Carousel from '../projects/Carousel';
import colors from 'styles/colors';
import { Button } from '@mui/material';
import fileImg from 'public/mypage/file-icon.svg';
import { SelfContract } from '../projects/ClientProgress';
import { fileDownLoad } from 'componentsCompany/Mypage/ProgressBody';
import { fileDownload } from 'bridge/appToWeb';
import {
  getDocument,
  modusignPdfDown,
  modusignPdfResponse,
  downloadModusignPdf,
} from 'api/getDocument';
import {
  useMutation,
  useQuery as reactQuery,
  useQueryClient,
} from 'react-query';
import ImgDetailCarousel from 'components/ImgDetailCarousel';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { imgDetailAction } from 'store/imgDetailSlice';

interface Props {
  data: ChargingStations;
}
const TAG = 'components/mypage/place/PlaceInfo.tsx';
const PlaceInfo = ({ data }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const mobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });
  const [idx, setIdx] = useState<number>(1);
  const [webIdx, setWebIdx] = useState<number>(0);
  const [imageData, setImageData] = useState<any>([]);

  const fileArray: any = [];
  for (let i = data?.projectCompletionFiles?.length - 1; i >= 0; i--) {
    fileArray.push(data?.projectCompletionFiles[i]);
  }

  // 이미지 상세보기 모달창
  const [openImgModal, setOpenImgModal] = useState(false);

  // 충전기 이미지 클릭시 뭐 눌렀는지 확인
  const idxRef = useRef(0);

  const initialSlideOnChange = (idx: number) => {
    idxRef.current = idx;
  };

  const webHandleNum = (idx: number) => {
    setWebIdx(idx);
  };

  const contractContent: SelfContract[] =
    data?.contract && JSON.parse(data?.contract?.contractContent!);

  // const { userAgent } = useSelector((state: RootState) => state.userAgent);
  const userAgent = JSON.parse(sessionStorage.getItem('userAgent')!);
  // 자체 계약서 다운로드
  const onClickBtn = (data: fileDownLoad) => {
    const a = document.createElement('a');
    a.download = data?.originalName;
    a.href = data?.url;
    a.onclick = () => fileDownload(userAgent, data?.originalName, data?.url);
    a.click();
    a.remove();
    URL.revokeObjectURL(a.href);
  };

  const DataFilter = data?.projectCompletionFiles[webIdx]!;

  //a링크에 넘길거
  const callPhone = hyphenFn(data?.companyMember?.phone);

  // 모두싸인 PDF 파일 다운로드
  const {
    data: modusignPdfDownData,
    isLoading: modusignPdfDownLoading,
    isError: modusignPdfDownError,
  } = reactQuery<modusignPdfResponse>(
    'contract-pdf',
    () => modusignPdfDown(data?.contract?.documentId!),
    {
      enabled:
        data?.contract?.documentId?.substring(0, 7) !== 'project' &&
        data?.contract?.documentId !== undefined
          ? true
          : false,
    },
  );

  useEffect(() => {
    setImageData(data);
  }, [data]);
  // download('modusgin');
  // download('data:text/html,Hello Developer!', 'HelloDeveloper.txt');

  // console.log(`🔥 프로젝트 상세 데이터 ~30 --> ${TAG}`);
  // console.log(data);

  return (
    <Wrapper>
      <DownArrowBox>
        <Image src={DoubleArrow} alt="double-arrow" />
      </DownArrowBox>
      {/* 데이터 하드코딩*/}
      <Contents>
        <Partner>파트너 정보</Partner>
        <div className="text-box">
          <span className="name">회사명</span>
          <span className="text">
            {data?.companyMember?.companyMemberAdditionalInfo?.companyName}
          </span>
        </div>
        <div className="text-box">
          <span className="name">담당자</span>
          <span className="text">{data?.companyMember?.name}</span>
        </div>
        <div className="text-box">
          <span className="name">이메일</span>
          <span className="text emailText">
            {data?.companyMember?.companyMemberAdditionalInfo?.managerEmail}
          </span>
        </div>
        <div className="text-box">
          <span className="name">전화번호</span>
          <a href={'tel:' + callPhone} className="textPhone">
            {hyphenFn(data?.companyMember?.phone)}
          </a>
          <span className="webPhone">
            {hyphenFn(data?.companyMember?.phone)}
          </span>
        </div>
      </Contents>

      <FileBox>
        <FileLabel>첨부 파일</FileLabel>
        {data?.finalQuotation?.finalQuotationChargers?.map((item, index) => (
          <React.Fragment key={item.finalQuotationChargerIdx}>
            {item?.finalQuotationChargerFiles
              ?.filter((el) => el.productFileType === 'CATALOG')
              ?.map((file, index) => (
                <FileDownloadBtn key={file.finalQuotationChargerFileIdx}>
                  <FileDownload download={file?.originalName} href={file?.url}>
                    <Image src={fileImg} alt="file-icon" layout="intrinsic" />
                    <FileName>{file.originalName}</FileName>
                  </FileDownload>
                </FileDownloadBtn>
              ))}
          </React.Fragment>
        ))}
        {data?.finalQuotation?.finalQuotationDetailFiles?.map(
          (elements, idx) => (
            <React.Fragment>
              <FileDownloadBtn key={idx}>
                <FileDownload
                  download={elements?.originalName}
                  href={elements?.url}
                >
                  <Image src={fileImg} alt="file-icon" layout="intrinsic" />
                  <FileName>{elements.originalName}</FileName>
                </FileDownload>
              </FileDownloadBtn>
            </React.Fragment>
          ),
        )}
        {!Array.isArray(contractContent) ? (
          <FileDownloadBtn
            onClick={() => {
              downloadModusignPdf(modusignPdfDownData?.file?.downloadUrl!);
            }}
          >
            <FileDownload>
              <Image src={fileImg} alt="file-icon" layout="intrinsic" />
              <FileName>모두싸인 계약서</FileName>
            </FileDownload>
          </FileDownloadBtn>
        ) : (
          <FileDownloadBtn
            onClick={() => {
              const contractUrl = JSON.parse(
                data?.contract?.contractContent!,
              )[0];
              onClickBtn(contractUrl);
            }}
          >
            <FileDownload>
              <Image src={fileImg} alt="file-icon" layout="intrinsic" />
              <FileName>{contractContent[0]?.originalName}</FileName>
            </FileDownload>
          </FileDownloadBtn>
        )}
      </FileBox>

      <>
        <FinishedPhotoText>완료현장 사진</FinishedPhotoText>

        {/* 모바일 사진이 들어갈 공간*/}
        <FinishedPhotoBox>
          <Carousel file={data?.projectCompletionFiles} ImgDetail={true} />
        </FinishedPhotoBox>

        {/* 웹 사진이 들어갈 공간*/}
        <WebFinishedPhotoWrapper>
          <WebLeftPhotoBox>
            {data?.projectCompletionFiles?.map((el, idx) => (
              <WebLeftPhotos
                key={el?.projectCompletionFileIdx}
                onClick={() => {
                  webHandleNum(idx);
                  initialSlideOnChange(idx);
                }}
                webIdx={webIdx}
                idx={idx}
              >
                <div className="imgBox">
                  <Image
                    src={el?.url}
                    alt={el?.originalName}
                    layout="fill"
                    priority={true}
                    unoptimized={true}
                    objectFit="cover"
                  />
                </div>
              </WebLeftPhotos>
            ))}
          </WebLeftPhotoBox>
          <WebRightPhotoBox
            key={DataFilter?.projectCompletionFileIdx}
            onClick={() => {
              if (mobile) {
                dispatch(imgDetailAction.setFile(fileArray));
                router.push('/ImgDetailCarousel');
              } else {
                setOpenImgModal(!openImgModal);
              }
            }}
          >
            <div className="imgBox">
              <Image
                src={DataFilter?.url}
                alt={DataFilter?.originalName}
                layout="fill"
                priority={true}
                unoptimized={true}
                objectFit="contain"
              />
            </div>
          </WebRightPhotoBox>
        </WebFinishedPhotoWrapper>
        {/* 이미지 자세히 보기 기능 */}
        {!mobile && openImgModal && (
          <ImgDetailCarousel
            file={fileArray}
            setOpenImgModal={setOpenImgModal}
            idxRef={idxRef}
          />
        )}
        <Wrap>
          <CommunicationBox
            text="파트너와 소통하기"
            id={data?.companyMember?.memberIdx}
          />
        </Wrap>
      </>
    </Wrapper>
  );
};

export default PlaceInfo;

const Wrapper = styled.div`
  margin-top: 42pt;
`;
const DownArrowBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 21pt;
`;

const Partner = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: 0em;
  text-align: left;
  padding-bottom: 12pt;
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

const Contents = styled.div`
  padding-top: 19.5pt;
  padding-bottom: 18pt;
  border-bottom: 1px solid #e9eaee;
  .text-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    :not(:nth-of-type(1)) {
      padding-top: 12pt;
    }

    .emailText {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 10.5pt;
      font-weight: 500;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: right;
      @media (min-width: 900pt) {
        font-family: 'Spoqa Han Sans Neo';
        font-size: 12pt;
        font-weight: 500;
        line-height: 12pt;
        letter-spacing: -0.02em;
        text-align: left;
      }
    }
  }

  .textPhone {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 10.5pt;
    font-weight: 500;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: right;
    color: #0057ff;
    cursor: pointer;
    @media (min-width: 900pt) {
      display: none;
    }
  }

  .webPhone {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 12pt;
    font-weight: 500;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: right;
    color: #0057ff;
    border-bottom: 0.75pt solid #0057ff;
    @media (max-width: 899.25pt) {
      display: none;
    }
  }

  .name {
    font-family: 'Spoqa Han Sans Neo';
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
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: #222222;
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

const FileBox = styled.div`
  padding-bottom: 18pt;
  border-bottom: 0.75pt solid ${colors.lightGray};
`;

const WebFinishedPhotoWrapper = styled.div`
  @media (min-width: 900pt) {
    width: 580.5pt;
    display: flex;
    justify-content: space-between;
    margin-top: 24pt;
  }
  @media (max-width: 899.25pt) {
    display: none;
  }
`;

const WebLeftPhotoBox = styled.div`
  @media (min-width: 900pt) {
    // display: flex;
    // flex-direction: column;
    overflow-y: scroll;
    // justify-content: flex-start;
    // gap: 9pt;
    height: 330pt;
  }
`;

const WebLeftPhotos = styled.div<{ idx: number; webIdx: number }>`
  @media (min-width: 900pt) {
    width: 60pt;
    height: 60pt;
    /* border-radius: 6pt; */
    margin-bottom: 8pt;
    overflow: hidden;
    border: ${({ idx, webIdx }) => idx === webIdx && `0.75pt solid #5221cb`};
    border-radius: 6pt;
    cursor: pointer;
    .imgBox {
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
`;

const WebRightPhotoBox = styled.div`
  @media (min-width: 900pt) {
    cursor: pointer;
    width: 508.5pt;
    height: 330pt;
    border-radius: 12pt;
    /* box-shadow: 3pt 0px 7.5pt rgba(137, 163, 201, 0.2); */
    .imgBox {
      position: relative;
      border-radius: 12pt;
      width: 100%;
      height: 100%;
    }
  }
`;

const FinishedPhotoText = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 10.5pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
  margin-top: 39pt;
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
const FinishedPhotoBox = styled.div`
  width: 100%;
  height: 91.5pt;
  /* border-bottom: 0.75pt solid ${colors.lightGray}; */
  border: 0.75pt solid ${colors.lightGray};
  margin-top: 12pt;
  border-radius: 6pt;
  position: relative;
  @media (min-width: 900pt) {
    display: none;
  }
`;

const Index = styled.div`
  width: 12pt;
  padding: 1.5pt 4.5pt;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 7.5pt;
  color: white;
  position: absolute;
  bottom: 9pt;
  right: 6pt;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 500;
  font-size: 7.5pt;
  line-height: 9pt;
  letter-spacing: -0.02em;
`;

const Wrap = styled.div`
  margin-top: 60pt;
  display: flex;
  justify-content: center;
  padding-bottom: 135pt;
  @media (min-width: 900pt) {
    display: none;
  }
`;
const FileLabel = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 10.5pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
  margin-top: 39pt;
  padding-bottom: 15pt;
  color: #222222;
  @media (min-width: 900pt) {
    padding-bottom: 24pt;
    font-family: 'Spoqa Han Sans Neo';
    font-size: 15pt;
    font-weight: 700;
    line-height: 15pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;
const FileDownloadBtn = styled(Button)`
  margin-bottom: 6pt;
  margin-right: 6pt;
  padding: 7.5pt 6pt;
  border: 0.75pt solid ${colors.lightGray3};
  border-radius: 8px;
  @media (min-width: 900pt) {
    display: flex;
    flex-direction: column;
  }
`;
const FileDownload = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 3pt;
  color: ${colors.gray2};
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
