import styled from '@emotion/styled';
import Search from 'componentsCompany/CompanyQuotation/Search';
import { useState } from 'react';
import blackDownArrow from 'public/images/blackDownArrow16.png';
import Image from 'next/image';
import FilterModal from './filterModal';
import NoAsHistyory from './noAsHistrory';
import { useRouter } from 'next/router';
import CaretDown24 from 'public/images/CaretDown24.png';

const AsHistoryUnder = () => {
  //히스토리 리스트 get();
  const arr = [0, 1, 2, 3, 4];

  // const arr:number[] = [];

  const [searchWord, setSearchWord] = useState<string>('');
  const [selected, setSelected] = useState<string>('현장별 보기');
  const [modal, setModal] = useState<boolean>(false);

  const router = useRouter();

  const handleRoute = (idx: number) => {
    router.push({
      pathname: '/company/as/history',
      query: {
        id: idx,
      },
    });
  };

  return (
    <Body>
      <List>
        {arr.length > 0 ? (
          <ListWrap>
            {arr.map((d, idx) => {
              return (
                <>
                  <ListBox onClick={() => handleRoute(idx + 1)}>
                    <StoreName>LS 안양 주유소</StoreName>
                    <ListIconBox>
                      <Image src={CaretDown24} alt="RightArrow" />
                    </ListIconBox>
                  </ListBox>
                </>
              );
            })}
          </ListWrap>
        ) : (
          <NoAsHistyory />
        )}
      </List>
      {/* {arr.length > 0 && <BtnBox>A/S 히스토리 다운받기</BtnBox>} */}
    </Body>
  );
};

export default AsHistoryUnder;

const Body = styled.div`
  flex: 1;
  /* margin: 0 15pt; */
  font-family: 'Spoqa Han Sans Neo';
  display: flex;
  flex-direction: column;
  @media (max-width: 899pt) {
    display: none;
  }
`;

const ListWrap = styled.div`
  margin: 18pt 0;
  height: 190pt;
  overflow-y: scroll;
`;

const List = styled.div`
  //margin-top: 18pt;
  flex: 1;
  min-height: 174pt;
  position: relative;
`;
const ListBox = styled.div`
  background: white;
  box-shadow: 0px 0px 7.5pt rgba(137, 163, 201, 0.2);
  border-radius: 6pt;
  padding: 13.5pt;
  width: 180.5pt;
  height: 21pt;
  margin-bottom: 9pt;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const StoreName = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 12pt;
  line-height: 15pt;
  color: #222222;
`;
const ListIconBox = styled.div`
  width: 18pt;
  height: 18pt;
  position: relative;
`;
