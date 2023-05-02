import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import AdminHeader from 'componentsAdmin/Header';
import {
  isTokenAdminGetApi,
  isTokenAdminPutExcelApi,
  multerAdminApi,
} from 'api';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import colors from 'styles/colors';
import { NewCell } from 'componentsAdmin/AdminInformationNotify/AdminNotice/AdminNoticeList';
import { AdminBannerDetailResponse } from 'types/tableDataType';
import { useDispatch } from 'react-redux';
import { adminPageNumberAction } from 'storeAdmin/adminPageNumberSlice';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import AlertModal from 'componentsAdmin/Modal/AlertModal';

import { MulterResponse } from 'componentsCompany/MyProductList/ProductAddComponent';
import { AxiosError } from 'axios';
import Image from 'next/image';
import fileImg from 'public/mypage/file-icon.svg';
import SubsidyTable from './SubsidyTable';
import Loader from 'components/Loader';

type Props = {
  setNowHeight?: React.Dispatch<React.SetStateAction<number | undefined>>;
  setNumber: React.Dispatch<React.SetStateAction<number>>;
};

export type SubsidyDataResponse = {
  isSuccess: boolean;
  data: {
    originalName: string;
    simulation: {
      subsidyTableIdx: number;
      year: number;
      applicationAgency: string;
      installationLocationSiGunGu: string;
      canApply: boolean;
      applyStartDate: string;
      applyEndDate: string;
      duplicateApplyGroup: string;
      totalApplyCount: number;
      siteApplyCount: number;
      minInstallationCount: number;
      maxInstallationCount: number;
      price_charging_consent: number;
      price_7_home_wall_single: number;
      price_7_home_stand_single: number;
      price_7_common_economy_wall_single: number;
      price_7_common_economy_stand_single: number;
      price_7_common_economy_kiosk_single: number;
      price_7_common_wall_single: number;
      price_7_common_stand_single: number;
      price_7_common_kiosk_single: number;
      price_11_common_wall_single: number;
      price_11_common_stand_single: number;
      price_11_common_wall_dual: number;
      price_11_common_stand_dual: number;
      price_14_common_wall_dual: number;
      price_14_common_stand_dual: number;
      price_17_6_common_wall_single: number;
      price_17_6_common_stand_single: number;
      price_20_common_wall_single: number;
      price_20_common_stand_single: number;
      price_30_common_stand_dual: number;
      price_30_common_stand_single: number;
      price_30_common_wall_dual: number;
      price_30_common_wall_single: number;

      price_50_common_stand_single: number;
      price_50_common_stand_dual: number;
      price_50_common_stand_3_mode: number;
      price_100_common_stand_single: number;
      price_100_common_stand_dual: number;
      price_200_common_stand_single: number;
      price_200_common_stand_dual: number;
      price_200_common_detachable_power_bank_single: number;
      price_200_common_detachable_power_bank_dual: number;
      price_300_common_stand_single: number;
      price_300_common_stand_dual: number;
      price_300_common_detachable_power_bank_single: number;
      price_300_common_detachable_power_bank_dual: number;
      price_300_common_bus_stand_dual: number;
      price_300_common_bus_detachable_power_bank_dual: number;
      price_350_common_stand_single: number;
      price_350_common_stand_dual: number;
      price_350_common_detachable_power_bank_single: number;
      price_350_common_detachable_power_bank_dual: number;
      price_350_common_bus_stand_dual: number;
      price_350_common_bus_detachable_power_bank_dual: number;
      price_400_common_stand_single: number;
      price_400_common_stand_dual: number;
      price_400_common_detachable_power_bank_single: number;
      price_400_common_detachable_power_bank_dual: number;
      price_400_common_bus_stand_dual: number;
      price_400_common_bus_detachable_power_bank_dual: number;
    }[];
  };
};

const Subsidy = ({ setNowHeight, setNumber }: Props) => {
  const dispatch = useDispatch();
  const fileRef = useRef<HTMLInputElement>(null);
  // 등록, 추가, 삭제 했을때 리스트 페이지로 이동 할거임
  const [changeNumber, setChangeNumber] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [detatilId, setDetailId] = useState<string>('');
  const [fileModal, setFileModal] = useState<boolean>(false);
  const [sendUserType, setSendUserType] = useState<string>('');

  const [isModal, setIsModal] = useState(false);
  const [message, setMessage] = useState('');

  const [tabNumber, setTabNumber] = useState<number>(0);

  const [success, setSuccess] = useState<string>('');

  const {
    data: subsidyData,
    isLoading,
    isError,
    refetch,
    remove,
  } = useQuery<SubsidyDataResponse>('subsidyData', () =>
    isTokenAdminGetApi(`/admin/simulations/subsidy`),
  );

  // 파일 업로드 PUT
  const {
    mutate: simulationExcel,
    isLoading: simulationExcelIsLoading,
    isError: simulationExcelIsError,
  } = useMutation(isTokenAdminPutExcelApi, {
    onSuccess: async () => {
      setMessage('엑셀파일 업로드가 완료 됐습니다.');
      setIsModal(true);
      setSuccess('성공');
    },
    onError: (error) => {
      setFileModal(false);
      setMessage('엑셀파일 업로드에 실패했습니다');
      // console.log(error);
      // if (error.response.data.message) {
      //   setMessage(error.response.data.message);
      //   setIsModal(true);
      // } else if (error.response.status === 413) {
      //   setMessage('용량이 너무 큽니다.');
      //   setIsModal(true);
      // } else {
      //   setMessage('다시 시도해주세요');
      //   setIsModal(true);
      // }
    },
  });

  // file s3 multer 저장 API (with useMutation)
  // const { mutate: multerFile, isLoading: multerFileLoading } = useMutation<
  //   MulterResponse,
  //   AxiosError,
  //   FormData
  // >(multerAdminApi, {
  //   onSuccess: (res) => {
  //     setMessage('엑셀파일 업로드가 완료 됐습니다.');
  //     setIsModal(true);
  //     simulationExcel({
  //       url: `/admin/simulations/charge`,
  //       data: {
  //         file: '',
  //       },
  //     });
  //     refetch();
  //     setFileModal(false);
  //   },
  //   onError: (error: any) => {
  //     setFileModal(false);
  //     if (error.response.data.message) {
  //       setMessage(error.response.data.message);
  //       setIsModal(true);
  //     } else if (error.response.status === 413) {
  //       setMessage('용량이 너무 큽니다.');
  //       setIsModal(true);
  //     } else {
  //       setMessage('다시 시도해주세요');
  //       setIsModal(true);
  //     }
  //   },
  // });

  // 파일 저장
  const saveFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (!files?.length) {
      setFileModal(false);
    } else {
      const formData = new FormData();
      const maxLength = 1;

      for (let i = 0; i < maxLength; i += 1) {
        if (files![i] === undefined) {
          break;
        }
        formData.append(
          'file', // 어디로 해야 할까
          files![i],
          encodeURIComponent(files![i].name),
        );
      }

      simulationExcel({
        url: '/admin/simulations/subsidy',
        data: formData,
      });
      // setLoading(true);
      e.target.value = '';
    }
  };

  //파일 온클릭
  const fileHandler = () => {
    fileRef?.current?.click();
  };

  // 등록
  const handleCommon = () => {
    setIsDetail(true);
  };

  useEffect(() => {
    if (isDetail === false) {
      setDetailId('');
      // remove();
    }
  }, [isDetail]);

  useEffect(() => {
    if (setNowHeight) {
      setNowHeight(window.document.documentElement.scrollHeight);
    }
  }, []);

  // 등록, 추가, 삭제 했을때 리스트 페이지로 넘길거임
  useEffect(() => {
    if (changeNumber) {
      // bannerListRefetch();
      // dispatch(adminPageNumberAction.setIsAdminPage(16));
    }
  }, [changeNumber]);

  useEffect(() => {
    refetch();
    if (success === '성공') {
      refetch();
    }
  }, [tabNumber, success]);

  if (simulationExcelIsLoading) {
    return <Loader />;
  }

  return (
    <Wrapper>
      {isModal && (
        <AlertModal
          setIsModal={setIsModal}
          message={message}
          setIsDetail={setIsDetail}
          size={'lg'}
        />
      )}
      <TitleWrapper>
        <TitleBox>
          <AdminHeader title="DATA 업데이트" type="main" />
          <SubText>보조금</SubText>
        </TitleBox>
        <ExelButton onClick={fileHandler}>엑셀 업로드</ExelButton>
        <input
          style={{ display: 'none' }}
          ref={fileRef}
          type="file"
          // accept=".xlsx,.xls"
          onChange={saveFile}
        />
      </TitleWrapper>
      <SubsidyTable
        handleCommon={handleCommon}
        subsidyData={subsidyData!}
        setTabNumber={setTabNumber}
        tabNumber={tabNumber}
      />
      {/* <File>
        <FileDownload
        onClick={DownloadFile}
        href={item?.fileUrl!}
        download={item?.fileOriginalName!}
        onClick={() => {
          fileDownload(item?.fileOriginalName!, item?.fileUrl!);
        }}
        type={'blob'}
        >
          <Image
            src={fileImg}
            alt="file-icon"
            layout="intrinsic"
            style={{ marginRight: '10px' }}
          />
          {subsidyData?.data?.originalName}
        </FileDownload>
      </File> */}
      <File>
        <Image src={fileImg} alt="file-icon" layout="intrinsic" />
        <FileText>{subsidyData?.data?.originalName}</FileText>
      </File>
      {/* <UnderLine /> */}
    </Wrapper>
  );
};

export default Subsidy;

const Wrapper = styled.div`
  width: 100%;
  margin: 0 18pt;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: baseline;
`;

const SubText = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 16px;
  color: #000000;
  margin-bottom: 12pt;
  font-weight: 500;
`;

const UserList = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  padding-left: 8px;
`;

const UserText = styled.div<{ userNum: number; idx: number }>`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 16px;
  font-weight: 500;
  line-height: 150%;
  color: ${({ userNum, idx }) => (userNum === idx ? '#222222' : '#747780')};
  cursor: pointer;
`;

const UnderLine = styled.div`
  width: 100%;
  height: 4px;
  background-color: #e2e5ed;
`;

const TextUnderLine = styled.div<{ userNum: number; isDetail: boolean }>`
  position: absolute;
  z-index: 10;
  width: 76px;
  height: 4px;
  background-color: #464646;
  margin-top: 27px;
  left: ${({ userNum }) => (userNum === 0 ? '0' : '80px')};
  display: ${({ isDetail }) => (isDetail ? 'none' : '')};
`;

const ExelButton = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  text-align: center;
  background-color: #747780;
  color: white;
  padding: 3px 13px;
  border: 1px solid ${colors.gray2};
  border-radius: 2px;
  height: 28px;
  margin-top: 60pt;
  cursor: pointer;
`;

const File = styled.div`
  margin-bottom: 6pt;
  margin-right: 6pt;
  padding: 7.5pt 6pt;
  border: 0.75pt solid '#999999';
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FileText = styled.p`
  display: block;
  width: 300px;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;

const FileDownload = styled.div`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 3pt;
  color: '#E2E5ED';
  overflow: hidden;
  text-overflow: ellipsis;
  width: 200px;
`;
