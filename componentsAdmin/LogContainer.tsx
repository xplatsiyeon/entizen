import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import colors from 'styles/colors';
import { ProjectLog, QuotationsLog } from 'types/admin';
import { originDateFomat } from 'utils/calculatePackage';

type Props = {
  projectData?: ProjectLog[];
  quotationData?: QuotationsLog[];
  title: string;
  type: 'project' | 'quotation';
};

export default function LogContainer({
  type,
  projectData,
  quotationData,
  title,
}: Props) {
  console.log('🔥 quotationData : ', quotationData);
  console.log('🔥 projectData : ', projectData);
  // 스크롤 제일 하단으로 배치
  useEffect(() => {
    const scrollBox: HTMLUListElement | null =
      document.querySelector('.scroll-box');
    if (scrollBox) {
      scrollBox.scrollTop = scrollBox.scrollHeight - scrollBox.clientHeight;
    }
  }, []);
  return (
    <Wrap type={type}>
      <Label className="label">{title}</Label>
      <Container className="scroll-box">
        <li className="title">
          <span className="id">아이디</span>
          <span className="date">날짜 &middot; 시간</span>
          <span className="before">변경 전 상태</span>
          <span className="after">변경 후 상태</span>
          <span className="projectId">프로젝트 아이디</span>
        </li>
        {quotationData &&
          quotationData?.map((item) => (
            <li className="contents">
              <span className="id">{item.quotationRequestIdx}</span>
              <span className="date">{originDateFomat(item.updatedAt)}</span>
              <span className="before">
                {item.beforeQuotationRequestStatus}
              </span>
              <span className="after">{item.afterQuotationRequestStatus}</span>
              <span className="projectId">
                {item.quotationStatusHistoryLogIdx}
              </span>
            </li>
          ))}
        {projectData &&
          projectData?.map((item) => (
            <li className="contents">
              <span className="id">{item.projectIdx}</span>
              <span className="date">{originDateFomat(item.updatedAt)}</span>
              <span className="before">{item.beforeProjectStatus}</span>
              <span className="after">{item.afterProjectStatus}</span>
              <span className="projectId">{item.projectHistoryLogIdx}</span>
            </li>
          ))}
      </Container>
    </Wrap>
  );
}

const Wrap = styled.div<{ type: 'project' | 'quotation' }>`
  margin-top: ${({ type }) => (type === 'project' ? '50' : '')}px;
  padding-left: ${({ type }) => (type === 'quotation' ? '16' : '')}px;
  padding-right: ${({ type }) => (type === 'quotation' ? '16' : '')}px;
  padding-bottom: ${({ type }) => (type === 'quotation' ? '50' : '')}px;
`;
const Container = styled.ul`
  width: 100%;
  height: 350px;
  border: 1px solid ${colors.gray};
  position: relative;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: initial;
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    // 뒷배경
    background: ${colors.lightWhite4};
  }
  ::-webkit-scrollbar-thumb {
    // 막대
    background: ${colors.gray};
    border-radius: 10px;
  }
  li {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 5px;
  }
  .title {
    position: sticky;
    top: 0;
    left: 0;
    background-color: ${colors.lightWhite3};
  }
  .contents {
  }
  li > span {
    text-align: center;
  }
  .id {
    flex: 1;
  }
  .date {
    flex: 3;
  }
  .before {
    flex: 3;
  }
  .after {
    flex: 3;
  }
  .projectId {
    flex: 2;
  }
`;
const Label = styled.label`
  display: inline-block;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  margin-bottom: 16px;
  color: ${colors.main2};
`;
