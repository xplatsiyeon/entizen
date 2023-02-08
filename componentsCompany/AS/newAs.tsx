import styled from '@emotion/styled';
import Search from 'componentsCompany/CompanyQuotation/Search';
import { Dispatch, SetStateAction, useState } from 'react';
import blackDownArrow from 'public/images/blackDownArrow16.png';
import Image from 'next/image';
import FilterModal from './filterModal';
import NoAsHistyory from './noAsHistrory';
import { handleColorAS } from 'utils/changeValue';
import { useRouter } from 'next/router';
import WebFilter from './webFilter';
import Loader from 'components/Loader';
import { dateFomat } from 'utils/calculatePackage';
import { useDispatch } from 'react-redux';
import { redirectAction } from 'store/redirectUrlSlice';

export interface NewReceivedAfterSalesServices {
  afterSalesService: {
    afterSalesServiceIdx: number;
    createdAt: string;
    requestTitle: string;
    acceptanceDate: string | null;
    afterSalesServiceResultDate: string | null;
    afterSalesServiceCompletionConsentStatus: boolean;
    project: {
      projectIdx: number;
      finalQuotation: {
        finalQuotationIdx: number;
        preQuotation: {
          preQuotationIdx: number;
          quotationRequest: {
            quotationRequestIdx: number;
            installationAddress: string;
          };
        };
      };
    };
  };
  badge: string;
}
export interface CompanyAsListResposne {
  isSuccess: true;
  data: {
    newReceivedAfterSalesServices: NewReceivedAfterSalesServices[];
  };
}

interface Props {
  data: CompanyAsListResposne;
  isLoading: boolean;
  newSearchWord: string;
  setNewFilterTypeEn: Dispatch<SetStateAction<string>>;
  setNewSearchWord: Dispatch<SetStateAction<string>>;
}

const NewAs = ({
  data,
  isLoading,
  newSearchWord,
  setNewFilterTypeEn,
  setNewSearchWord,
}: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const memberType = JSON.parse(sessionStorage.getItem('MEMBER_TYPE')!);
  const [selected, setSelected] = useState<string>('등록일순 보기');
  const [modal, setModal] = useState<boolean>(false);

  console.log('🔥 newAs data==>>', data);

  if (!accessToken && memberType !== 'COMPANY') {
    dispatch(redirectAction.addUrl(router.asPath));
    router.push('/signin');
    return <div></div>;
  } else {
    return (
      <Body>
        {modal && (
          <FilterModal
            setModal={setModal}
            setSelected={setSelected}
            setFilterTypeEn={setNewFilterTypeEn}
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
          <WebFilter
            setSelected={setSelected}
            setFilterTypeEn={setNewFilterTypeEn}
            type={'receivedAS'}
          />
          <InputWrap>
            <Search
              searchWord={newSearchWord}
              setSearchWord={setNewSearchWord}
            />
          </InputWrap>
        </Wrap>
        {isLoading ? (
          <Loader />
        ) : (
          <List>
            {data?.data?.newReceivedAfterSalesServices?.length! > 0 ? (
              data?.data?.newReceivedAfterSalesServices?.map((el, idx) => {
                return (
                  <ListBox
                    key={idx}
                    onClick={() =>
                      router.push({
                        pathname: '/company/as/receivedAS/',
                        query: {
                          afterSalesServiceIdx:
                            el?.afterSalesService?.afterSalesServiceIdx,
                        },
                      })
                    }
                  >
                    <StoreName>
                      {
                        el?.afterSalesService?.project?.finalQuotation
                          ?.preQuotation?.quotationRequest?.installationAddress
                      }
                    </StoreName>
                    <Text>{el?.afterSalesService?.requestTitle}</Text>
                    <FlexWrap>
                      <Badge bgColor={handleColorAS(el?.badge)}>
                        {el?.badge}
                      </Badge>
                      <Date>{dateFomat(el?.afterSalesService?.createdAt)}</Date>
                    </FlexWrap>
                  </ListBox>
                );
              })
            ) : (
              <NoAsHistyory />
            )}
          </List>
        )}
      </Body>
    );
  }
};

export default NewAs;

const Body = styled.div`
  margin: 0 15pt;
  font-family: 'Spoqa Han Sans Neo';
  height: 100%;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: row-reverse;
  @media (max-width: 899.25pt) {
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
`;

const List = styled.div`
  margin: 18pt 0;
  @media (max-width: 899.25pt) {
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
