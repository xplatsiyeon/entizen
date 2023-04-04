import React, { useEffect, useRef, useState } from 'react';
import 'jodit/build/jodit.min.css';
import styled from '@emotion/styled';
import { useMutation } from 'react-query';
import {
  ImgFile,
  MulterResponse,
} from 'componentsCompany/MyProductList/ProductAddComponent';
import { AxiosError } from 'axios';
import { multerAdminApi } from 'api';
import { Rsvp } from '@mui/icons-material';

type Props = {
  setBodyText: React.Dispatch<React.SetStateAction<string>>;
  bodyText: string;
  firstContent?: string;
};

type IMG = {
  originalName: string;
  size: number;
  url: string;
  createdAt?: string | undefined;
  bannerImageIdx?: number | undefined;
};

type NEWIMG = {
  originalName: string;
  size: number;
  url: string;
};

const JoditReact = React.lazy(() => {
  return import('jodit-react-ts');
});

const AdminTermsJodit = ({ setBodyText, bodyText, firstContent }: Props) => {
  const isSSR = typeof window === 'undefined';
  const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const [pcImgArr, setPcImgArr] = useState<IMG[]>([]);
  const { mutate: pcImage, isLoading: multerPcImageLoading } = useMutation<
    MulterResponse,
    AxiosError,
    FormData
  >(multerAdminApi, {
    onSuccess: (res) => {
      // console.log(TAG + ' 👀 ~ line 104 multer onSuccess');
      // console.log(res);
      const newFile = pcImgArr;
      // const newFile = preFile.map((e) => {
      //   const { createdAt, bannerImageIdx, ...rest } = e;
      //   return { ...rest };
      // });
      res?.uploadedFiles.forEach((img) => {
        newFile.push({
          url: img.url,
          size: img.size,
          originalName: decodeURIComponent(img.originalName),
        });
      });
      setPcImgArr(newFile);
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

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    height: '450px',
    width: '100%',
    enableDragAndDropFileToEditor: true,
    buttons: [
      'source',
      '|',
      'bold',
      'italic',
      'underline',
      '|',
      'ul',
      'ol',
      '|',
      'font',
      'fontsize',
      'brush',
      'paragraph',
      '|',
      'image',
      '|',
      'link',
      '|',
      'left',
      'center',
      'right',
      'justify',
      '|',
      'undo',
      'redo',
      '|',
      'hr',
      'eraser',
      'fullsize',
    ],
    // uploader: { insertImageAsBase64URI: true },
    uploader: {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/files`,
      insertImageAsBase64URI: false,
      imagesExtensions: ['jpg', 'png', 'jpeg', 'gif'],
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ContentType: 'multipart/form-data; charset=EUC-KR',
        Accept: '*/*',
      },
      filesVariableName: function (t: any) {
        return 'files[' + t + ']';
      },
      withCredentials: true,
      pathVariableName: 'path',
      format: 'json',
      method: 'POST',
      processData: true,
      prepareData: function (formdata: any) {
        let file = formdata.getAll('files[0]')[0];
        setPcImgArr(file);
        // const saveImg = (file: any) => {
        //   const formData = new FormData();
        //   for (let i = 0; i < file.length; i += 1) {
        //     if (file![i] === undefined) {
        //       break;
        //     }
        //     formData.append(
        //       'banner',
        //       file![i],
        //       encodeURIComponent(file![i].name),
        //     );
        //   }
        //   return pcImage(formData);
        // };
        // saveImg(file);
        const newFile = [...pcImgArr];
        file?.forEach((img: any) => {
          newFile.push({
            url: img.url,
            size: img.size,
            originalName: decodeURIComponent(img.originalName),
          });
        });

        console.log('newFile', newFile);

        formdata.append('banner', file);
        formdata.delete('path');
        formdata.delete('source');

        return formdata;
      },
      isSuccess: function (resp: any) {
        console.log('resp🥭', resp);

        if (resp?.fileKey && resp?.fileKey?.length) {
          console.log('resp.fileKey 🥭', resp.fileKey);
          resp?.fileKey?.forEach((item: any, idx: any) => {
            const fileNm = resp.fileNm[idx];
            console.log('fileNm 🥭', fileNm);
          });
        }

        // return !resp.error;
      },
      getMessage: function (resp: any) {
        return resp.msgs.join('\n');
      },
      process: function (resp: any) {
        // return resp;
        return {
          files: resp.files || [],
          path: resp.path,
          baseurl: resp.baseurl,
          error: resp.error,
          msg: resp.msg,
        };
      },
    },
    removeButtons: ['brush', 'file'],
    showXPathInStatusbar: false,
    showCharsCounter: false,
    showWordsCounter: false,
    toolbarAdaptive: true,
    toolbarSticky: true,
    // style: {
    //     background: '#27272E',
    //     color: 'rgba(255,255,255,0.5)',
    // },
  };

  const [insideImgArr, setInsideImgArr] = useState<IMG[]>([]);
  // 경고창에 보내는 메세지
  const [message, setMessage] = useState('');
  // 수정 등록 버튼 누를때 나오는 모달창
  const [messageModal, setMessageModal] = useState<boolean>(false);

  console.log('pcImgArr 🍌', pcImgArr);

  useEffect(() => {
    const placeHolder: HTMLSpanElement | null =
      document.querySelector('.jodit-placeholder');
    if (placeHolder) {
      placeHolder.innerText = '약관을 입력해주세요.';
    }
  }, []);

  return (
    <div>
      {!isSSR && (
        <>
          <JoditReact
            onChange={(content) => setBodyText(content)}
            config={config}
            defaultValue={bodyText}
          />
          {/* {bodyText} */}
        </>
      )}
    </div>
  );
};

export default AdminTermsJodit;
