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
  newSelected: string;
  setNewSelected: Dispatch<SetStateAction<string>>;
}

const NewAs = ({
  data,
  isLoading,
  newSearchWord,
  setNewFilterTypeEn,
  setNewSearchWord,
  newSelected,
  setNewSelected,
}: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
  const memberType = JSON.parse(localStorage.getItem('MEMBER_TYPE')!);

  const [modal, setModal] = useState<boolean>(false);

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
            setSelected={setNewSelected}
            setFilterTypeEn={setNewFilterTypeEn}
            type={'receivedAS'}
          />
        )}
        <Wrap>
          <MobFilter onClick={() => setModal(true)}>
            <span>{newSelected}</span>
            <IconBox>
              <Image src={blackDownArrow} alt="rijgtArrow" />
            </IconBox>
          </MobFilter>
          <WebFilter
            setSelected={setNewSelected}
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
  font-family: 'Spoqa Han Sans Neo';
  height: 100%;
  @media (max-width: 899.25pt) {
    margin: 0 15pt;
  }
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
  /* margin-left: 23pt; */

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
  @media (min-width: 900pt) {
    padding: 21.75pt 20.25pt 17.25pt 26.25pt;
    border-radius: 12pt;
  }
`;
const StoreName = styled.p`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 12pt;
  font-weight: 700;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #222222;
  @media (min-width: 900pt) {
    font-size: 13.5pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;
const Text = styled.p`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 10.5pt;
  font-weight: 400;
  line-height: 18pt;
  letter-spacing: -0.02em;
  text-align: left;
  height: 18pt;
  width: 200pt;
  text-overflow: ellipsis;
  overflow: hidden;
  height: auto;
  white-space: pre;
  @media (min-width: 900pt) {
    padding-top: 9pt;
    font-size: 12pt;
    font-weight: 400;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
    width: 450pt;
    text-overflow: ellipsis;
    overflow: hidden;
    height: auto;
    white-space: pre;
  }
`;

const FlexWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 12pt;
  @media (min-width: 900pt) {
    padding-top: 21pt;
  }
`;

const Badge = styled.div<{ bgColor: string }>`
  background: ${({ bgColor }) => (bgColor ? bgColor : '#F75015')};
  font-style: normal;
  font-weight: 500;
  font-size: 9pt !important;
  line-height: 9pt !important;
  letter-spacing: -0.02em;
  color: #ffffff;
  padding: 4.5pt 7.5pt !important;
  border-radius: 12pt !important;
`;
const Date = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: #caccd1;
`;
