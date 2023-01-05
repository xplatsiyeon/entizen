import styled from '@emotion/styled';
import { M5_LIST } from 'assets/selectList';
import { CHARGING_METHOD } from 'companyAssets/selectList';
import ChargerDropDownBtn from 'componentsAdmin/ChargerDropDownBtn';
import DropDownBtn from 'componentsAdmin/DropDownBtn';
import AdminHeader from 'componentsAdmin/Header';
import { DarkAdminBtn } from 'componentsAdmin/Layout';
import PPTable from 'componentsAdmin/PartnerProducts/PPtable';
import { on } from 'events';
import { useEffect, useRef, useState } from 'react';
import colors from 'styles/colors';
import ModalPartnerProduct from './ModalPartnerProduct';

type Props = {
  setNowHeight?: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const PartnerProductsList = ({ setNowHeight }: Props) => {
  const [isDetail, setIsDetail] = useState(false);
  const [detatilId, setDetailId] = useState<number>(0);
  const [EnchargeKind, setEnChargeKind] = useState<string>('');
  const [chargeMethod, setChargeMethod] = useState<string>('');
  const [EnchargeChannel, setEnChargeChannel] = useState<string>('');

  const [selected, setSelected] = useState<string[]>(['', '', '']);

  const handle = () => {
    setSelected([EnchargeKind, chargeMethod, EnchargeChannel]);
  };

  // 엑셀 다운로드 버튼
  const handleCommon = () => {
    alert('개발중입니다.');
  };

  console.log(
    '🦋 제품리스트입니다',
    window.document.documentElement.scrollHeight,
  );

  useEffect(() => {
    if (setNowHeight) {
      setNowHeight(window.document.documentElement.scrollHeight);
    }
  }, []);

  return (
    <Body>
      {isDetail && (
        <ModalPartnerProduct setIsDetail={setIsDetail} detatilId={detatilId} />
      )}
      <AdminHeader title="파트너 등록 제품" type="main" />
      <Wrapper>
        <Search>
          <li className="search">
            <label>업체명 검색</label>
            <SearchBox type="text" placeholder="검색" />
          </li>
          <Wrap>
            <label className="ul-label">선택 조회</label>
            <li>
              <label>충전모달</label>
              <ChargerDropDownBtn
                width="208px"
                currentStep="충전모달"
                dropDownValue={M5_LIST}
                chargeKind={true}
                setEnChargeKind={setEnChargeKind}
              />
            </li>
            <li>
              <label>충전방식모달</label>
              <ChargerDropDownBtn
                width="130px"
                currentStep="충전방식모달"
                dropDownValue={CHARGING_METHOD}
                setChargeMethod={setChargeMethod}
              />
            </li>
            <li>
              <label>채널</label>{' '}
              <ChargerDropDownBtn
                width="70px"
                currentStep="채널"
                dropDownValue={['싱글', '듀얼', '3모드']}
                chargeChannel={true}
                setEnChargeChannel={setEnChargeChannel}
              />
            </li>
          </Wrap>
        </Search>
        <DarkAdminBtn onClick={handle} margin="10px auto">
          조회
        </DarkAdminBtn>
      </Wrapper>
      <PPTable
        setIsDetail={setIsDetail}
        setDetailId={setDetailId}
        selected={selected}
        handleCommon={handleCommon}
      />
    </Body>
  );
};

export default PartnerProductsList;

const Body = styled.div`
  margin: 0 15px;
  width: 100%;
  position: relative;
`;
const Wrapper = styled.div`
  width: 950px;
  position: relative;
`;

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
  border-top: none;
  align-items: center;
  > li {
    width: 284px;
    padding: 0;
    border-right: none;
    border-top: none;
    border-bottom: none;
    border-left: 1px solid ${colors.lightWhite3};
    &:nth-of-type(1) {
      width: 316px;
      border-left: none;
      label {
        padding-left: 0;
      }
    }
    &:nth-last-of-type(1) {
      width: 217px;
      border-right: none;
    }
    > label {
      padding-left: 15px;
      margin-right: 10px;
    }
  }
  .ul-label {
    padding-left: 13px;
    margin-right: 28px;
    width: 130px;
  }
`;
