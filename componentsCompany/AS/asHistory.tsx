import styled from "@emotion/styled";
import Search from "componentsCompany/CompanyQuotation/Search";
import { useState } from "react";
import blackDownArrow from 'public/images/blackDownArrow16.png';
import Image from "next/image";
import FilterModal from "./filterModal";
import NoAsHistyory from "./noAsHistrory";

const AsHistory = () => {

    //히스토리 리스트 get();
    const arr = [0, 1, 2, 3, 4];
    // const arr:number[] = [];

    const [searchWord, setSearchWord] = useState<string>('')
    const [selected, setSelected] = useState<string>('현장별 보기');
    const [modal, setModal] = useState<boolean>(false);

    return (
        <Body>
            {modal && <FilterModal setModal={setModal} setSelected={setSelected} />}
            <Wrap>
                <MobFilter onClick={() => setModal(true)}>
                    <span>{selected}</span>
                    <IconBox >
                        <Image src={blackDownArrow} alt="rijgtArrow" />
                    </IconBox>
                </MobFilter>
                <InputWrap>
                    <Search searchWord={searchWord} setSearchWord={setSearchWord} />
                </InputWrap>
            </Wrap>
            <List>
                {arr.length > 0 ?
                    <ListWrap>
                        { arr.map((d, idx) => {
                            return (
                                <ListBox>
                                    <StoreName>...</StoreName>
                                    <FlexWrap>
                                        <Text> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, eveniet cumq </Text>
                                        <Score> 평점 4.5 </Score>
                                    </FlexWrap>
                                </ListBox>
                                )
                            })
                        }
                    </ListWrap>
                    : <NoAsHistyory />
                }
            </List>
        </Body>
    )
}

export default AsHistory;

const Body = styled.div`
    flex: 1;
    margin: 0 15pt;
    font-family: 'Spoqa Han Sans Neo';
    display: flex;
    flex-direction: column;
`

const Wrap = styled.div`
    display: flex;
    flex-direction: row-reverse;
    @media (max-width: 899pt) {
        flex-direction: column;
        align-items: flex-end;
  }
`

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
`

const InputWrap = styled.div`
    width:100%;
`
const IconBox = styled.div<{ arrow?: boolean }>`
  align-self: center;
  width: 10pt;
  margin-left: 9pt;
  display: flex;
  align-items: center;
  //transform: ${({ arrow }) => (arrow !== true ? `` : `rotate(180deg)`)};
`;

const List = styled.div`
    //margin-top: 18pt;
    flex: 1;
    min-height: 174pt;
    position: relative;
    
`
const ListBox = styled.div`
    background: white;
    box-shadow: 0px 0px 7.5pt rgba(137, 163, 201, 0.2);
    border-radius: 6pt;
    padding: 13.5pt;
    margin-bottom: 9pt;

`
const StoreName = styled.p`
    
font-style: normal;
font-weight: 700;
font-size: 12pt;
line-height: 15pt;
color: #222222;
margin-bottom: 6pt;
`
const Text = styled.p`
font-style: normal;
font-weight: 400;
font-size: 10.5pt;
line-height: 18pt;
color: #222222;
`
const Score = styled.p`
font-family: 'Spoqa Han Sans Neo';
font-style: normal;
font-weight: 500;
font-size: 9pt;
line-height: 12pt;
letter-spacing: -0.02em;
color: #CACCD1;
`

const FlexWrap = styled.div`
display: flex;
justify-content: space-between;
`

const ListWrap = styled.div`
    margin: 18pt 0;
`