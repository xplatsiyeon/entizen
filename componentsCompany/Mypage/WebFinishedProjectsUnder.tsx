import styled from '@emotion/styled';
import Image from 'next/image';
import CaretDown24 from 'public/images/CaretDown24.png';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type Props = {
  tabNumber: number;
  componentId?: number;
  setSuccessComponentId?: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  successComponentId?: number;
};

interface Data {
  id: number;
  storeName: string;
  date: string;
}

// 데이터 없을 때 나오는 페이지
// const tempProceeding: [] = [];
const tempProceeding: Data[] = [
  {
    id: 0,
    storeName: '타임스트림 쇼핑몰',
    date: '2022년 4월 7일',
  },
  {
    id: 1,
    storeName: '맥도날드 대이동점',
    date: '2021.05.10',
  },
  {
    id: 2,
    storeName: 'LS카페 신림점',
    date: '2021.03.10',
  },
  {
    id: 3,
    storeName: 'LS카페 마곡점',
    date: '2021.07.23',
  },
  {
    id: 4,
    storeName: '스타벅스 마곡점',
    date: '2021.07.23',
  },
  {
    id: 5,
    storeName: 'LS카페 계양점',
    date: '2021.07.23',
  },
  {
    id: 6,
    storeName: 'LS카페 신림점',
    date: '2021.07.23',
  },
];

const WebFinishedProjectsUnder = ({
  tabNumber,
  setSuccessComponentId,
  successComponentId,
}: Props) => {
  const handleId = (index: number) => {
    if (setSuccessComponentId !== undefined) {
      setSuccessComponentId(index);
    }
  };

  const router = useRouter();

  useEffect(() => {
    if (successComponentId !== undefined) {
      router.push(`/company/mypage/successedProject/${successComponentId}`);
    }
  }, [successComponentId]);

  return (
    <>
      {successComponentId !== undefined && (
        <div>
          {tabNumber === 1 && tempProceeding.length > 0 && (
            <ListContainer>
              {tempProceeding.map((el, index) => (
                <div key={index}>
                  <List
                    onClick={() => {
                      handleId(index);
                    }}
                    index={index}
                    successComponentId={successComponentId}
                  >
                    <ListTextBox key={el.id}>
                      <ListTitle>{el.storeName}</ListTitle>
                      <ListIconBox>
                        <Image src={CaretDown24} alt="RightArrow" />
                      </ListIconBox>
                    </ListTextBox>
                  </List>
                </div>
              ))}
            </ListContainer>
          )}
        </div>
      )}
    </>
  );
};

const ListContainer = styled.div`
  margin-top: 21pt;
  padding-top: 30pt;
  padding-left: 15pt;
  padding-right: 15pt;
  height: 190pt;
  overflow-y: scroll;
  @media (min-width: 900pt) {
    display: grid;
    flex-direction: column;
    margin: 0 auto;
    gap: 10pt;
  }
`;

const List = styled.div<{
  index: number;
  successComponentId: number | undefined;
}>`
  margin: 0 auto;
  padding: 0 15pt;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 6pt;
  width: 198pt;
  height: 48pt;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: ${({ successComponentId, index }) =>
    successComponentId === index ? `0.75pt solid #5221CB` : ``};
`;

const ListTextBox = styled.div`
  display: flex;
  width: 200pt;
  justify-content: space-between;
  align-items: center;
  gap: 1.5pt;
`;

const ListTitle = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 700;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: left;
`;

const ListIconBox = styled.div`
  width: 18pt;
  height: 18pt;
  position: relative;
`;

export default WebFinishedProjectsUnder;
