import styled from '@emotion/styled';
import Image from 'next/image';
import CaretDown24 from 'public/images/CaretDown24.png';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  GET_historyProjectsDetail,
  ResponseHistoryProjectsDetail,
} from 'QueryComponents/CompanyQuery';
import NoProject from './NoProject';

type Props = {
  tabNumber: number;
  componentId?: number;
  setComponentId?: React.Dispatch<React.SetStateAction<number | undefined>>;
  historyData: ResponseHistoryProjectsDetail;
};

interface Data {
  id: number;
  storeName: string;
  date: string;
}

const WebFinishedProjectsUnder = ({
  tabNumber,
  setComponentId,
  componentId,
  historyData,
}: Props) => {
  if (historyData?.completedProjects?.projects?.length === 0) {
    return <NoProject />;
  }

  const handleId = (index: number) => {
    if (setComponentId !== undefined) {
      setComponentId(index);
    }
  };

  const router = useRouter();

  return (
    <>
      <div>
        {historyData?.completedProjects?.projects?.length > 0 && (
          <ListContainer>
            {historyData?.completedProjects?.projects?.map((el, index) => (
              <div key={index}>
                <List
                  componentId={componentId}
                  projectIdx={Number(el.projectIdx)}
                  key={el.projectIdx}
                  onClick={() => {
                    handleId(index);
                    router.push({
                      pathname: '/company/mypage/successedProject/',
                      query: {
                        projectIdx: el?.projectIdx,
                      },
                    });
                  }}
                >
                  <ListTextBox>
                    <ListTitle>{el.projectName}</ListTitle>
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
    </>
  );
};

const ListContainer = styled.div`
  padding-top: 20pt;
  height: 150pt;
  overflow-y: scroll;

  @media (max-width: 899.25pt) {
    display: none;
  }
`;

const List = styled.div<{
  projectIdx: number;
  componentId: number | undefined;
}>`
  margin-bottom: 9pt;
  margin-left: 2pt;
  padding: 12pt 13.5pt;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 6pt;
  width: 200pt;
  height: 48pt;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: ${({ componentId, projectIdx }) =>
    componentId === projectIdx ? `0.75pt solid #5221CB` : ``};
`;

const ListTextBox = styled.div`
  display: flex;
  width: 200pt;
  justify-content: space-between;
  align-items: center;
`;

const ListTitle = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 700;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: left;
  padding-right: 10pt;
`;

const ListIconBox = styled.div`
  width: 18pt;
  height: 18pt;
`;

export default WebFinishedProjectsUnder;
