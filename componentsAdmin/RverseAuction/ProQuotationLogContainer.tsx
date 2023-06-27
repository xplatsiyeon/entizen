import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import colors from 'styles/colors';

type Props = {
  logoData: any[];
  title: string;
};

export default function ProQuotationLogContainer({ logoData, title }: Props) {
  const convertDate = (date: string | undefined) => {
    if (date) {
      const days = new Date(date);
      // Date 객체로 변환합니다.
      const dateObj = new Date(days.toString());

      // 년, 월, 일, 시간, 분, 초를 추출합니다.
      const year = dateObj.getFullYear().toString();
      const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
      const day = dateObj.getDate().toString().padStart(2, '0');
      const hours = dateObj.getHours().toString().padStart(2, '0');
      const minutes = dateObj.getMinutes().toString().padStart(2, '0');
      const seconds = dateObj.getSeconds().toString().padStart(2, '0');

      // yyyymmddhhmmss 형식으로 변환합니다.
      const yyyymmddhhmmss = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      return yyyymmddhhmmss;
    }
  };

  // 스크롤 제일 하단으로 배치
  useEffect(() => {
    const scrollBox: HTMLUListElement | null =
      document.querySelector('.scroll-box');
    if (scrollBox) {
      scrollBox.scrollTop = scrollBox.scrollHeight - scrollBox.clientHeight;
    }
  }, []);
  return (
    <Wrap>
      <Label className="label">{title}</Label>
      <Container className="scroll-box">
        <li className="title">
          <span className="id">아이디</span>
          <span className="date">날짜 &middot; 시간</span>
          <span className="companyName">업체 이름</span>
          <span className="subscriptionFee">구독료</span>
        </li>
        {logoData?.map((item) => (
          <li className="contents">
            <span className="id">12</span>
            <span className="date">2023-06-26 11:32:42</span>
            <span className="companyName">스티브</span>
            <span className="subscriptionFee">10,000원</span>
          </li>
        ))}
      </Container>
    </Wrap>
  );
}

const Wrap = styled.div`
  margin: 16px;
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
    flex: 2;
  }
  .companyName {
    flex: 2;
  }
  .subscriptionFee {
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
