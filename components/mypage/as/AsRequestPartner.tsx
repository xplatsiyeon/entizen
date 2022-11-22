import Image from 'next/image';
import colors from 'styles/colors';
import DoubleArrow from 'public/mypage/CaretDoubleDown.svg';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import fileImg from 'public/mypage/file-icon.svg';
import { useCallback, useState } from 'react';
import CallManager from 'components/Modal/CallManager';
import { AsDetailReseponse } from 'pages/mypage/as';
import { hyphenFn } from 'utils/calculatePackage';

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
  return (
    <>
      {modalOpen && <CallManager HandleModal={HandleModal} />}
      <Wrapper>
        <DownArrowBox>
          <Image src={DoubleArrow} alt="double-arrow" />
        </DownArrowBox>
        <Title>{compnayName}</Title>
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
            <span className="value" onClick={() => setModalOpen(true)}>
              {hyphenFn(phone)}
            </span>
          </Item>
        </List>
        <ReceiptTitle>접수내용</ReceiptTitle>
        <SecondList>
          <Items>
            <span className="name">제목</span>
            <span className="value">
              {data?.data?.afterSalesService?.afterSalesService?.requestTitle}
            </span>
          </Items>
          <Items>
            <span className="name">요청내용</span>
            {data?.data?.afterSalesService?.afterSalesService?.requestContent
              .split('\n')
              ?.map((line, index) => (
                <span key={index} className="value">
                  {line}
                  <br />
                </span>
              ))}
          </Items>
          <Items>
            <span className="name">접수일자</span>
            <span className="value">
              {data?.data?.afterSalesService?.afterSalesService?.createdAt
                .replace('T', ' ')
                .replace(/\..*/, '')
                .slice(0, -3)
                .replaceAll('-', '.')}
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
                      {file.originalName}
                    </FileDownload>
                  </FileDownloadBtn>
                ),
              )}
            </div>
          </Items>
        </SecondList>
        {/* ---------------------접수 확인-------------------- */}
        {/* <ReceiptTitle>접수확인</ReceiptTitle>
        <SecondList>
          <Items>
            <span className="name">내용</span>
            <span className="value">
              파손 정도 파악 및 수리/교체를 위해
              <br />
              금주 중 방문하도록 하겠습니다.
            </span>
          </Items>
          <Items>
            <span className="name">접수일자</span>
            <span className="value">2022.05.18 20:21 </span>
          </Items>
        </SecondList> */}

        {/* ----------------------A/S 결과-------------------- */}
        {/* <ReceiptTitle>A/S결과</ReceiptTitle>
        <SecondList>
          <Items>
            <span className="name">내용</span>
            <span className="value">충전 건 교체</span>
          </Items>
          <Items>
            <span className="name">A/S일자</span>
            <span className="value">2022/05.20 14:52</span>
          </Items>
          <Items>
            <div className="name">첨부파일</div>
            <div className="value">
              <FileBtn onClick={DownloadFile}>
                <Image src={fileImg} alt="file-icon" />
                DSFJEIFKSL.jpg
              </FileBtn>
            </div>
          </Items>
        </SecondList> */}
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
  margin-top: 15pt;
  padding-bottom: 18pt;
  gap: 12pt;
  border-bottom: 0.75pt solid ${colors.lightGray};
`;
const SecondList = styled.ul`
  margin-top: 15pt;
  padding-bottom: 18pt;
  gap: 12pt;
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
    width: 41.25pt;
  }
  .value {
    font-size: 10.5pt;
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    text-align: left;
    letter-spacing: -0.02em;
    margin-left: 26.25pt;
    color: ${colors.main2};
    display: flex;
    gap: 6pt;
    flex-direction: column;
    justify-content: start;
  }
`;
const Subtitle = styled.h2`
  font-weight: 700;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;
const Label = styled.h3`
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.gray2};
  :nth-of-type(1) {
    padding-top: 15pt;
  }
  :nth-of-type(2) {
    padding-top: 24pt;
  }
`;
const FeaturesList = styled.ol`
  padding-top: 6pt;
  list-style-type: decimal;
  list-style-position: inside;
  & li {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 18pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    :not(:nth-of-type(1)) {
      padding-top: 2pt;
    }
  }
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
