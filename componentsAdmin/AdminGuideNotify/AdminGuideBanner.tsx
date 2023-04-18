import styled from '@emotion/styled';
import { multerAdminApi } from 'api';
import { AxiosError } from 'axios';
import { MulterResponse } from 'componentsCompany/MyProductList/ProductAddComponent';
import Image from 'next/image';
import React, { useRef } from 'react';
import { useMutation } from 'react-query';
import colors from 'styles/colors';
import CloseImg from 'public/images/XCircle.svg';
import { GuideImage } from './PlatformGuide/PlatformGuideEditor';

type Props = {
  pcImgArr: IMG[];
  setPcImgArr: React.Dispatch<React.SetStateAction<IMG[]>>;
  tabletImgArr: IMG[];
  setTabletImgArr: React.Dispatch<React.SetStateAction<IMG[]>>;
  mobileImgArr: IMG[];
  setMobileImgArr: React.Dispatch<React.SetStateAction<IMG[]>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setMessageModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export type IMG = {
  originalName: string;
  size: number;
  url: string;
  createdAt?: string | undefined;
  bannerImageIdx?: number | undefined;
};

export default function AdminGuideBanner({
  pcImgArr,
  setPcImgArr,
  tabletImgArr,
  setTabletImgArr,
  mobileImgArr,
  setMobileImgArr,
  setMessage,
  setMessageModal,
}: Props) {
  // Img
  const pcRef = useRef<HTMLInputElement>(null);
  const tabletRef = useRef<HTMLInputElement>(null);
  const mobileRef = useRef<HTMLInputElement>(null);

  // file s3 multer 저장 API (with useMutation)
  const { mutate: pcImage, isLoading: pcLoading } = useMutation<
    MulterResponse,
    AxiosError,
    FormData
  >(multerAdminApi, {
    onSuccess: (res) => {
      // const newFile = pcImgArr;
      let newFile: IMG[] = [];
      res?.uploadedFiles.forEach((img) => {
        newFile.push({
          url: img.url,
          size: img.size,
          originalName: decodeURIComponent(img.originalName),
        });
      });
      setPcImgArr(newFile!);
    },
    onError: (error: any) => {
      if (error.response.data.message) {
        setMessage(`첫번째 에러:${error.response.data.message}`);
        setMessageModal(true);
      } else if (error.response.status === 413) {
        setMessage('용량이 너무 큽니다.');
        setMessageModal(true);
      } else {
        setMessage('다시 시도해주세요');
        setMessageModal(true);
      }
    },
  });

  const { mutate: tabletImage, isLoading: tabletLoading } = useMutation<
    MulterResponse,
    AxiosError,
    FormData
  >(multerAdminApi, {
    onSuccess: (res) => {
      // const newFile = tabletImgArr;
      let newFile: IMG[] = [];
      res?.uploadedFiles.forEach((img) => {
        newFile.push({
          url: img.url,
          size: img.size,
          originalName: decodeURIComponent(img.originalName),
        });
      });
      setTabletImgArr(newFile);
    },
    onError: (error: any) => {
      if (error.response.data.message) {
        setMessage(`첫번째 에러:${error.response.data.message}`);
        setMessageModal(true);
      } else if (error.response.status === 413) {
        setMessage('용량이 너무 큽니다.');
        setMessageModal(true);
      } else {
        setMessage('다시 시도해주세요');
        setMessageModal(true);
      }
    },
  });

  const { mutate: mobileImage, isLoading: mobileLoading } = useMutation<
    MulterResponse,
    AxiosError,
    FormData
  >(multerAdminApi, {
    onSuccess: (res) => {
      let newFile: IMG[] = [];
      // const newFile = mobileImgArr;
      res?.uploadedFiles.forEach((img) => {
        newFile.push({
          url: img.url,
          size: img.size,
          originalName: decodeURIComponent(img.originalName),
        });
      });
      setMobileImgArr(newFile);
    },
    onError: (error: any) => {
      if (error.response.data.message) {
        setMessage(`첫번째 에러:${error.response.data.message}`);
        setMessageModal(true);
      } else if (error.response.status === 413) {
        setMessage('용량이 너무 큽니다.');
        setMessageModal(true);
      } else {
        setMessage('다시 시도해주세요');
        setMessageModal(true);
      }
    },
  });

  // 사진 온클릭
  const pcImgOutHandler = (ref: React.RefObject<HTMLElement>) => {
    console.log('🔥 ref : ', ref);
    ref?.current?.click();
  };
  // 이미지 첨부 api
  const saveFileImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'pc' | 'tablet' | 'mobile',
  ) => {
    console.log('🔥 type : ', type);

    const { files } = e.target;
    const maxLength = 1;
    const formData = new FormData();
    for (let i = 0; i < maxLength; i += 1) {
      if (files![i] === undefined) {
        break;
      }
      formData.append('banner', files![i], encodeURIComponent(files![i].name));
    }
    switch (type) {
      case 'pc':
        pcImage(formData);
        break;
      case 'tablet':
        tabletImage(formData);
        break;
      case 'mobile':
        mobileImage(formData);
        break;
    }

    e.target.value = '';
  };
  // 사진 삭제
  const handleDeleteImg = (
    e: React.MouseEvent<HTMLDivElement>,
    type: 'pc' | 'tablet' | 'mobile',
  ) => {
    // const name = Number(e.currentTarget.dataset.name);
    console.log('🔥 name : ', name);
    let copyArr: IMG[]; // 이미지 배열 복사
    switch (type) {
      case 'pc':
        copyArr = pcImgArr;
        break;
      case 'tablet':
        copyArr = tabletImgArr;
        break;
      case 'mobile':
        copyArr = mobileImgArr;
        break;
    }

    console.log('🔥 copyArr : ', copyArr);
    // 이미지 값 state에 저장
    for (let i = 0; i < copyArr.length; i++) {
      switch (type) {
        case 'pc':
          setPcImgArr([]);
          break;
        case 'tablet':
          setTabletImgArr([]);
          break;
        case 'mobile':
          setMobileImgArr([]);
          break;
      }
      return;
    }
  };

  return (
    <div>
      {/* ================================ PC ============================ */}
      <ImgWrap>
        <span className="addImgWrap">
          <p className="imgText">
            메인 이미지 추가 <br />
            (PC 이미지)
          </p>
          <label htmlFor="imgUpload" className="fileLabel">
            <button onClick={() => pcImgOutHandler(pcRef)}>사진 첨부</button>
            <input
              className="fileInput"
              id="imgUpload"
              type="file"
              accept="image/*"
              onChange={(e) => saveFileImage(e, 'pc')}
              ref={pcRef}
            />
          </label>

          <p className="imgSize">1920*480</p>
        </span>
        <div className="previewImgWrap">
          {pcImgArr.map((img) => (
            <ImgSpan>
              <Image
                src={img?.url}
                alt={img?.originalName}
                width={140}
                height={104}
                priority={true}
                unoptimized={true}
                objectFit="cover"
              />
              <Xbox onClick={(e) => handleDeleteImg(e, 'pc')}>
                <Image
                  src={CloseImg}
                  layout="intrinsic"
                  alt="closeBtn"
                  width={24}
                  height={24}
                />
              </Xbox>
            </ImgSpan>
          ))}
        </div>
      </ImgWrap>
      {/*========================== tablet ============================== */}
      <ImgWrap>
        <span className="addImgWrap">
          <p className="imgText">
            메인 이미지 추가 <br />
            (모바일 이미지)
          </p>
          <label htmlFor="tabletImgUpload" className="fileLabel">
            <button onClick={() => pcImgOutHandler(tabletRef)}>
              사진 첨부
            </button>
            <input
              className="fileInput"
              id="tabletImgUpload"
              type="file"
              accept="image/*"
              onChange={(e) => saveFileImage(e, 'tablet')}
              ref={tabletRef}
            />
          </label>
          <p className="imgSize">1024*132</p>
        </span>
        <div className="previewImgWrap">
          {tabletImgArr.map((img) => (
            <ImgSpan>
              <Image
                src={img?.url}
                alt={img?.originalName}
                width={140}
                height={104}
                priority={true}
                unoptimized={true}
                objectFit="cover"
              />
              <Xbox onClick={(e) => handleDeleteImg(e, 'tablet')}>
                <Image
                  src={CloseImg}
                  layout="intrinsic"
                  alt="closeBtn"
                  width={24}
                  height={24}
                />
              </Xbox>
            </ImgSpan>
          ))}
        </div>
      </ImgWrap>
      {/* ============================= mobile =============================== */}
      <ImgWrap>
        <span className="addImgWrap">
          <p className="imgText">
            메인 이미지 추가 <br />
            (PC 이미지)
          </p>
          <label htmlFor="mobileImgUpload" className="fileLabel">
            <button onClick={() => pcImgOutHandler(mobileRef)}>
              사진 첨부
            </button>
            <input
              className="fileInput"
              id="mobileImgUpload"
              type="file"
              accept="image/*"
              onChange={(e) => saveFileImage(e, 'mobile')}
              ref={mobileRef}
            />
          </label>
          <p className="imgSize">430*132</p>
        </span>
        <div className="previewImgWrap">
          {mobileImgArr.map((img) => (
            <ImgSpan>
              <Image
                src={img?.url}
                alt={img?.originalName}
                width={140}
                height={104}
                priority={true}
                unoptimized={true}
                objectFit="cover"
              />
              <Xbox onClick={(e) => handleDeleteImg(e, 'mobile')}>
                <Image
                  src={CloseImg}
                  layout="intrinsic"
                  alt="closeBtn"
                  width={24}
                  height={24}
                />
              </Xbox>
            </ImgSpan>
          ))}
        </div>
      </ImgWrap>
    </div>
  );
}

const ImgWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  border: 1px solid ${colors.gray};
  border-radius: 0px 0px 2px 2px;
  margin-bottom: 15px;
  .addImgWrap {
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    color: ${colors.main2};
    border-right: 1px solid ${colors.gray};
    padding-right: 13px;
  }
  .imgText {
    margin-bottom: 8px;
  }
  .previewImgWrap {
    padding-left: 13px;
  }

  .fileInput {
    display: none;
  }
  .fileLabel {
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    text-align: center;
    color: ${colors.lightGray7};
    background: ${colors.lightWhite3};
    /* border: 1px solid ${colors.lightGray7}; */
    border-radius: 2px;
    cursor: pointer;
    outline: none;
  }
  .imgSize {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: ${colors.main2};
    margin-top: 16px;
    text-align: center;
  }
`;

const ImgSpan = styled.div`
  position: relative;
  width: 140px;
  height: 104px;
  border-radius: 4px;
  border: 0.75pt solid #e2e5ed;
  & > span > img {
    border-radius: 4px;
  }
`;

const Xbox = styled.div`
  position: absolute;
  top: -7pt;
  right: -7pt;
  cursor: pointer;
`;
