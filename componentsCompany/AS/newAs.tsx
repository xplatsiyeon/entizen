import styled from '@emotion/styled';
import Search from 'componentsCompany/CompanyQuotation/Search';
import { useState } from 'react';
import blackDownArrow from 'public/images/blackDownArrow16.png';
import Image from 'next/image';
import FilterModal from './filterModal';
import NoAsHistyory from './noAsHistrory';
import { bgcolor } from '@mui/system';
import { handleColorAS } from 'utils/changeValue';
import { useRouter } from 'next/router';
import colors from 'styles/colors';
import WebFilter from './webFilter';

const NewAs = () => {
  //히스토리 리스트 get();
  const arr: number[] = [0, 1, 2];

  const router = useRouter();

  const [searchWord, setSearchWord] = useState<string>('');
  const [selected, setSelected] = useState<string>('등록일순 보기');
  const [modal, setModal] = useState<boolean>(false);

  return (
    <Body>
      {modal && (
        <FilterModal
          setModal={setModal}
          setSelected={setSelected}
          type={'receivedAS'}
        />
      )}
      <Wrap>
        <MobFilter onClick={() => setModal(true)}>
          <span>{selected}</span>
          <IconBox>
            <Image src={blackDownArrow} alt="rijgtArrow" />
          </IconBox>
        </MobFilter>
        <WebFilter setSelected={setSelected} type={'receivedAS'} />
        <InputWrap>
          <Search searchWord={searchWord} setSearchWord={setSearchWord} />
        </InputWrap>
      </Wrap>
      <List>
        {arr.length > 0 ? (
          arr.map((d, idx) => {
            return (
              <ListBox
                key={idx}
                onClick={() =>
                  router.push({
                    pathname: '/company/as/receivedAS/',
                    query: {
                      asIdx: idx,
                    },
                  })
                }
              >
                <StoreName>LS 안양 주유소</StoreName>
                <Text>100kW 충전기의 충전 건이 파손되었습니다.</Text>
                <FlexWrap>
                  <Badge bgColor={handleColorAS('접수')}>접수요청 D+3</Badge>
                  <Date>2022.05.17 18:13</Date>
                </FlexWrap>
              </ListBox>
            );
          })
        ) : (
          <NoAsHistyory />
        )}
      </List>
    </Body>
  );
};

export default NewAs;

const Body = styled.div`
  /* flex: 1; */
  margin: 0 15pt;
  font-family: 'Spoqa Han Sans Neo';
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: row-reverse;
  @media (max-width: 899pt) {
    flex-direction: column;
    align-items: flex-end;
  }
`;

const MobFilter = styled.button`
  background: none;
  border: none;
  display: flex;
  justify-content: center;
  align-content: center;
  font-style: normal;
  font-weight: 500;
  font-size: 9pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: #222222;
  @media (min-width: 900pt) {
    display: none;
  }
`;

const InputWrap = styled.div`
  width: 100%;
`;
const IconBox = styled.div<{ arrow?: boolean }>`
  align-self: center;
  width: 10pt;
  margin-left: 9pt;
  display: flex;
  align-items: center;
  //transform: ${({ arrow }) => (arrow !== true ? `` : `rotate(180deg)`)};
`;

const List = styled.div`
  margin: 18pt 0;
  @media (max-width: 899pt) {
    padding-bottom: 80pt;
  }
`;
const ListBox = styled.div`
  background: white;
  box-shadow: 0px 0px 7.5pt rgba(137, 163, 201, 0.2);
  border-radius: 6pt;
  padding: 13.5pt;
  margin-bottom: 9pt;
  cursor: pointer;
`;
const StoreName = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 12pt;
  line-height: 15pt;
  color: #222222;
`;
const Text = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 10.5pt;
  line-height: 18pt;
  color: #222222;
  margin-bottom: 12pt;
`;

const FlexWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Badge = styled.div<{ bgColor: string }>`
  background: ${({ bgColor }) => (bgColor ? bgColor : '#F75015')};
  font-style: normal;
  font-weight: 500;
  font-size: 9pt;
  line-height: 9pt;
  letter-spacing: -0.02em;
  color: #ffffff;
  padding: 4.5pt 7.5pt;
  border-radius: 12pt;
`;
const Date = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: #caccd1;
`;
