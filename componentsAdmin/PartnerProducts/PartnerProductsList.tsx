import styled from "@emotion/styled";
import { M5_LIST } from "assets/selectList";
import { CHARGING_METHOD } from "companyAssets/selectList";
import DropDownBtn from "componentsAdmin/DropDownBtn";
import AdminHeader from "componentsAdmin/Header";
import { DarkAdminBtn } from "componentsAdmin/Layout";
import { useState } from "react";
import colors from "styles/colors";
import ModalPartnerProduct from "./ModalPartnerProduct";

const PartnerProductsList = () => {

    const [isDetail, setIsDetail] = useState(false);

    return (
        <Body >
            {isDetail && <ModalPartnerProduct/>}
            <AdminHeader title="파트너 등록 제품" type="main" />
            <Search>
                <li className="search">
                    <label>업체명 검색</label>
                    <SearchBox
                        type="text"
                        placeholder="검색"
                    />
                    <Btn>
                        <Text>
                            조회
                        </Text>
                    </Btn>
                </li>
                <Wrap>
                    <label className="ul-label">선택 조회</label>
                    <li>
                        <label>충전모달</label>
                        <DropDownBtn width="208px" currentStep="충전모달" dropDownValue={M5_LIST} />
                    </li>
                    <li>
                        <label>충전방식모달</label>
                        <DropDownBtn width="130px" currentStep="충전방식모달" dropDownValue={CHARGING_METHOD} />
                    </li>
                    <li>
                        <label>채널</label> <DropDownBtn width="70px" currentStep="채널" dropDownValue={['싱글', '듀얼', '3모드']} />
                    </li>
                </Wrap>
            </Search>
            <DarkAdminBtn onClick={()=>setIsDetail(!isDetail)}>조회</DarkAdminBtn>
        </Body>
    )
}

export default PartnerProductsList;

const Body = styled.div`
    margin:15px;
`

const Search = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-family: 'Spoqa Han Sans Neo';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 150%;

color: #000000;
  label {
    margin-right: 38pt;
  }
  li {
    gap: 7.5pt;
    display: flex;
    align-items: center;
    background: #ffffff;
    border: 1px solid ${colors.lightWhite3};
    height: 30pt;
    padding: 4pt 0 4pt 12pt;
    width: 100%;
  }

  .search {
    width: 946px;
  }
`;

const Btn = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 3pt;
  padding: 5px 17px;
  height: 19.5pt;
  background: #e2e5ed;
  border: 1px solid #747780;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  outline: none;
  text-align: center;
`;

const Text = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: #747780;
  text-align: center;
`;

const SearchBox = styled.input`
  border: 1px solid ${colors.lightWhite3};
  height: 100%;
  width: 274.5pt;
  border-radius: 4px;
  ::placeholder {
    padding-left: 10px;
  }
`;

const Wrap = styled.ul`
    display: flex;
    width: 946px;
    border: 1px solid ${colors.lightWhite3};
    border-top:none;
    align-items: center;
    >li{
        width: 284px;
        padding: 0;
        border-right: none;
        border-top: none;
        border-bottom: none;
        border-left: 1px solid ${colors.lightWhite3};
        &:nth-of-type(1){
            width: 316px;
            border-left: none;
            label{
                padding-left: 0;
            }
        }
        &:nth-last-of-type(1){ 
            width: 217px;
            border-right: none;
        }
        >label{
            padding-left: 15px;
            margin-right: 10px;
        }
    }
    .ul-label{
        padding-left: 13px;
        margin-right: 28px;
        width: 130px;
    }
`