import styled from '@emotion/styled';
import Image from 'next/image';
import React from 'react';
import DoubleArrow from 'public/mypage/CaretDoubleDown.svg';
import colors from 'styles/colors';
import fileImg from 'public/mypage/file-icon.svg';
import { Button } from '@mui/material';
import { HistoryProjectsDetail } from 'QueryComponents/CompanyQuery';
import { hyphenFn } from 'utils/calculatePackage';
import AsCompGetReview from 'componentsCompany/AS/component/AsCompGetReview';
import { fileDownload } from 'bridge/appToWeb';
import { fileDownLoad } from 'componentsCompany/Mypage/ProgressBody';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { SelfContract } from 'components/mypage/projects/ClientProgress';
import {
  useMutation,
  useQuery as reactQuery,
  useQueryClient,
} from 'react-query';
import {
  getDocument,
  modusignPdfDown,
  modusignPdfResponse,
  downloadModusignPdf,
} from 'api/getDocument';

type Props = {
  data: HistoryProjectsDetail;
};

const FinishedBottomBox = ({ data }: Props) => {
  const callPhone = hyphenFn(data?.userMember?.phone.toString());
  // const { userAgent } = useSelector((state: RootState) => state.userAgent);
  const userAgent = JSON.parse(sessionStorage.getItem('userAgent')!);

  const contractContent: SelfContract[] =
    data?.contract && JSON.parse(data?.contract?.contractContent!);

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

  return (
    <>
      <Wrapper>
        <ImageBox>
          <Image src={DoubleArrow} alt="doubleArrow" layout="fill" />
        </ImageBox>
        <BiggerText>고객 정보</BiggerText>
        <Contents>
          <div className="text-box">
            <span className="name">이름</span>
            <span className="text">{data?.userMember?.name}</span>
          </div>
          <div className="text-box">
            <span className="name">연락처</span>
            <a href={'tel:' + callPhone} className="phone">
              {callPhone}
            </a>
            <span className="webPhone">{callPhone}</span>
          </div>
        </Contents>
        {/* 첨부 파일 */}
        <BiggerText className="catalog">첨부 파일</BiggerText>
        {data?.finalQuotation?.finalQuotationChargers?.map((el, idx) =>
          el?.finalQuotationChargerFiles
            ?.filter((e) => e.productFileType === 'CATALOG')
            .concat(data?.finalQuotation?.finalQuotationDetailFiles as any)
            .map((file, fileIdx) => (
              <FileDownloadBtn key={fileIdx}>
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
            )),
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
        <Line />
        {/* 현장 실사 사진 */}
        {/* =========================================================== */}

        {/* =========================================================== */}
        <Line />
        {/* 리뷰 */}
        <ReviewBox>
          <AsCompGetReview review={data?.projectReview} isProject={true} />
        </ReviewBox>
      </Wrapper>
      <BtnBox></BtnBox>
    </>
  );
};
const Wrapper = styled.div`
  padding-left: 15pt;
  padding-right: 15pt;
  margin-top: 21pt;
  position: relative;
  .catalog {
    margin-top: 18pt;
    margin-bottom: 15pt;
    @media (min-width: 900pt) {
      margin-top: 30pt;
      margin-bottom: 24pt;
    }
  }
  .review {
    border-top: 1px solid #e9eaee;
    margin-top: 6pt;
    padding-top: 18pt;
  }
`;
const ImageBox = styled.div`
  width: 24pt;
  height: 24pt;
  margin: 0 auto;
  position: relative;
`;
const ReviewBox = styled.div`
  padding-bottom: 63pt;
  @media (max-width: 899.25pt) {
    padding-bottom: 48pt;
  }
`;
const BiggerText = styled.div`
  margin-top: 37.5pt;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: 0em;
  text-align: left;
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
const BtnBox = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-left: 15pt;
  padding-right: 15pt;
  width: 100%;
  gap: 6pt;
  bottom: 30pt;
`;
const Contents = styled.div`
  padding-top: 19.5pt;
  padding-bottom: 18pt;
  border-bottom: 1px solid #e9eaee;
  @media (min-width: 900pt) {
    padding-top: 24pt;
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
      font-weight: 500;
      font-size: 10.5pt;
      line-height: 12pt;
      letter-spacing: -0.02em;
      @media (min-width: 900pt) {
        font-family: 'Spoqa Han Sans Neo';
        font-size: 12pt;
        font-weight: 500;
        line-height: 12pt;
        letter-spacing: -0.02em;
        text-align: right;
      }
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
    color: #0057ff;
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    @media (min-width: 900pt) {
      display: none;
    }
  }
  .webPhone {
    color: #222222;
    font-family: 'Spoqa Han Sans Neo';
    font-size: 12pt;
    font-weight: 500;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
    color: #0057ff;
    border-bottom: 0.75pt solid #0057ff;
    @media (max-width: 899.25pt) {
      display: none;
    }
  }
`;
const FileDownloadBtn = styled(Button)`
  margin: 0 15pt 6pt 0;
  padding: 7.5pt 6pt;
  border: 0.75pt solid ${colors.lightGray3};
  border-radius: 6pt;
  display: block;
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
  /* color: ${colors.dark2}; */
  color: #747780;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Line = styled.div`
  padding-top: 24pt;
  border-bottom: 0.75pt solid #e9eaee;
`;

export default FinishedBottomBox;
