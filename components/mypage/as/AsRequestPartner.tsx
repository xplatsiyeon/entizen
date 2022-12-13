import Image from 'next/image';
import colors from 'styles/colors';
import DoubleArrow from 'public/mypage/CaretDoubleDown.svg';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import fileImg from 'public/mypage/file-icon.svg';
import { useCallback, useEffect, useRef, useState } from 'react';
import CallManager from 'components/Modal/CallManager';
import { AsDetailReseponse } from 'pages/mypage/as';
import { dateFomat, hyphenFn } from 'utils/calculatePackage';

interface Props {
  pb?: number;
  data: AsDetailReseponse;
}
const TAG = 'components/mypage/as/AsRequestPartner.tsx';
const AsRequestPartner = ({ pb, data }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>();
  const HandleModal = () => {
    setModalOpen(false);
  };

  console.log('⭐️ 하단 부분 데이터 확인 ~line 40 ' + TAG);
  console.log(data);

  // width 실시간
  const [nowWidth, setNowWidth] = useState<number>(window.innerWidth);

  // 실시간으로 width 받아오는 함수
  const handleResize = () => {
    setNowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [nowWidth]);

  const compnayName =
    data?.data?.afterSalesService?.afterSalesService?.project?.finalQuotation
      ?.preQuotation?.member?.companyMemberAdditionalInfo?.companyName;
  const name =
    data?.data?.afterSalesService?.afterSalesService?.project?.finalQuotation
      ?.preQuotation?.member?.name;
  const managerEmail =
    data?.data?.afterSalesService?.afterSalesService?.project?.finalQuotation
      ?.preQuotation?.member?.companyMemberAdditionalInfo?.managerEmail;
  const phone =
    data?.data?.afterSalesService?.afterSalesService?.project?.finalQuotation
      ?.preQuotation?.member?.phone;
  const callPhone = hyphenFn(phone);

  return (
    <>
      {/* {modalOpen && <CallManager HandleModal={HandleModal} />} */}

      <Wrapper>
        <DownArrowBox>
          <Image src={DoubleArrow} alt="double-arrow" />
        </DownArrowBox>
        <Title>파트너 정보</Title>
        <List>
          <Item>
            <span className="name">회사명</span>
            <span className="value">{compnayName}</span>
          </Item>
          <Item>
            <span className="name">담당자</span>
            <span className="value">{name}</span>
          </Item>
          <Item>
            <span className="name">이메일</span>
            <span className="value">{managerEmail}</span>
          </Item>
          <Item>
            <span className="name">전화번호</span>
            <a
              href="tel:'callPhone'"
              className="value"
              onClick={() => nowWidth < 1200 && setModalOpen(true)}
            >
              {hyphenFn(phone)}
            </a>
          </Item>
        </List>
        {/* ---------------------접수 내용-------------------- */}
        <ReceiptTitle>접수내용</ReceiptTitle>
        <SecondList>
          <Items>
            <span className="name">제목</span>
            <span className="value">
              {data?.data?.afterSalesService?.afterSalesService?.requestTitle}
            </span>
          </Items>
          <Items className="contents">
            <span className="name">요청내용</span>
            <span className="value">
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
                    <FileDownload download={file.originalName} href={file.url}>
                      <Image src={fileImg} alt="file-icon" layout="intrinsic" />
                      <FileName>{file.originalName}</FileName>
                    </FileDownload>
                  </FileDownloadBtn>
                ),
              )}
            </div>
          </Items>
        </SecondList>
        {/* ---------------------접수 확인-------------------- */}
        {data?.data?.afterSalesService?.afterSalesService?.acceptanceDate! && (
          <>
            <ReceiptTitle>접수확인</ReceiptTitle>
            <SecondList
              className={
                !data?.data?.afterSalesService?.afterSalesService
                  ?.acceptanceDate!
                  ? 'listChildren'
                  : ''
              }
            >
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
                <span className="name">접수일자</span>
                <span className="value">
                  {dateFomat(
                    data?.data?.afterSalesService?.afterSalesService
                      ?.acceptanceDate!,
                  )}
                </span>
              </Items>
            </SecondList>
          </>
        )}

        {/* ----------------------A/S 결과-------------------- */}
        {data?.data?.afterSalesService?.afterSalesService
          .afterSalesServiceResultDate! && (
          <>
            <ReceiptTitle>A/S결과</ReceiptTitle>
            <SecondList className="listChildren">
              <Items>
                <span className="name">내용</span>
                <span className="value">
                  {
                    data?.data?.afterSalesService?.afterSalesService
                      .afterSalesServiceResultContent!
                  }
                </span>
              </Items>
              <Items>
                <span className="name">A/S일자</span>
                <span className="value">
                  {dateFomat(
                    data?.data?.afterSalesService?.afterSalesService
                      .afterSalesServiceResultDate!,
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
                          href={file.url}
                        >
                          <Image
                            src={fileImg}
                            alt="file-icon"
                            layout="intrinsic"
                          />
                          <FileName> {file.originalName}</FileName>
                        </FileDownload>
                      </FileDownloadBtn>
                    ),
                  )}
                </div>
              </Items>
            </SecondList>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default AsRequestPartner;

const Wrapper = styled.div`
  padding-top: 21pt;
  padding-left: 15pt;
  padding-right: 15pt;
`;
const DownArrowBox = styled.div`
  display: flex;
  justify-content: center;
`;
const Title = styled.h1`
  font-weight: 700;
  font-size: 15pt;
  line-height: 15pt;
  margin-top: 37.5pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;
const ReceiptTitle = styled.h1`
  font-weight: 700;
  font-size: 15pt;
  line-height: 15pt;
  margin-top: 18pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;

const List = styled.ul`
  margin-top: 24pt;
  padding-bottom: 30pt;
  gap: 12pt;
  border-bottom: 0.75pt solid ${colors.lightGray};
  @media (max-width: 899.25pt) {
    margin-top: 15pt;
    padding-bottom: 18pt;
  }
`;
const SecondList = styled.ul`
  gap: 12pt;
  margin-top: 24pt;
  padding-bottom: 30pt;
  border-bottom: 0.75pt solid ${colors.lightGray};
  &.listChildren {
    border-bottom: none;
  }

  @media (max-width: 899.25pt) {
    margin-top: 15pt;
    padding-bottom: 18pt;
  }
`;
const Item = styled.li`
  display: flex;
  justify-content: space-between;
  :not(:nth-of-type(1)) {
    margin-top: 12pt;
  }
  .name {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.gray2};
  }
  .value {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    text-align: left;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  & button {
  }
`;

const CallItem = styled.a`
  display: flex;
  justify-content: space-between;
  :not(:nth-of-type(1)) {
    margin-top: 12pt;
  }
  .name {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.gray2};
  }
  .value {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    text-align: left;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  & button {
  }
`;
const Items = styled.li`
  display: flex;
  :not(:nth-of-type(1)) {
    margin-top: 12pt;
  }
  .name {
    font-weight: 500;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.gray2};
    width: 63.2025pt;
    @media (max-width: 899.25pt) {
      width: 41.25pt;
    }
  }
  .value {
    font-size: 10.5pt;
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    text-align: left;
    letter-spacing: -0.02em;
    /* margin-left: 89pt; */
    color: ${colors.main2};
    display: flex;
    gap: 6pt;
    flex-direction: column;
    justify-content: start;
    word-break: break-all;
    width: 100%;
  }
  @media (max-width: 899.25pt) {
    word-break: normal;

    .value {
      margin-left: 26.25pt;
      width: auto;
    }
  }
`;

const FileDownloadBtn = styled(Button)`
  margin: 0 15pt 6pt 0;
  padding: 7.5pt 6pt;
  border: 0.75pt solid ${colors.lightGray3};
  border-radius: 6pt;
  cursor: pointer;
  @media (min-width: 900pt) {
    width: 40%;
  }
`;
const FileDownload = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 3pt;
  color: ${colors.gray2};
  // 글자수 넘어갈때 ... 처리하는거 필수값: width, text-overflow, overflow
  width: 150pt;
  text-overflow: ellipsis;
  overflow: hidden;
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
