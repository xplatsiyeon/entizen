import React, { useRef, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import ReactQuill from 'react-quill';
import {
  ImgFile,
  MulterResponse,
} from 'componentsCompany/MyProductList/ProductAddComponent';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { multerAdminApi } from 'api';

type Props = {
  setBodyText: React.Dispatch<React.SetStateAction<string>>;
  bodyText: string;
  firstContent: string;
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

const AdminTermsQuill = ({ setBodyText, bodyText, firstContent }: Props) => {
  const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
    // loading: () => <p>Loading ...</p>,
  });
  const [insideImgArr, setInsideImgArr] = useState<IMG[]>([]);
  // 경고창에 보내는 메세지
  const [message, setMessage] = useState('');
  // 수정 등록 버튼 누를때 나오는 모달창
  const [messageModal, setMessageModal] = useState<boolean>(false);
  const QuillRef = useRef<ReactQuill>();

  const { mutate: inImage, isLoading: multerInImageLoading } = useMutation<
    MulterResponse,
    AxiosError,
    FormData
  >(multerAdminApi, {
    onSuccess: (res) => {
      // console.log(TAG + ' 👀 ~ line 84 multer onSuccess');

      let newFile: NEWIMG[] = [];
      if (insideImgArr !== undefined) {
        newFile = insideImgArr?.map((e) => {
          const { createdAt, bannerImageIdx, ...rest } = e;
          // console.log('rest', { ...rest });
          return { ...rest };
        });
      } else {
        newFile = [];
      }

      res?.uploadedFiles.forEach((img) => {
        newFile.push({
          url: img.url,
          size: img.size,
          originalName: decodeURIComponent(img.originalName),
        });
      });
      setInsideImgArr(newFile);
    },
    onError: (error: any) => {
      if (error.response.data.message) {
        setMessage(error.response.data.message);
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

  const saveFileInsideImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const maxLength = 3;
    const formData = new FormData();
    for (let i = 0; i < maxLength; i += 1) {
      if (files![i] === undefined) {
        break;
      }
      formData.append('banner', files![i], encodeURIComponent(files![i].name));
    }
    inImage(formData);
    e.target.value = '';
  };

  const handleInPhotoDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    const name = Number(e.currentTarget.dataset.name);
    const copyArr = [...insideImgArr];
    for (let i = 0; i < copyArr.length; i++) {
      if (i === name) {
        copyArr.splice(i, 1);
        return setInsideImgArr(copyArr);
      }
    }
  };

  const imgInHandler = () => {
    const input = document.createElement('input');
    const formData = new FormData();
    let url = '';
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    QuillRef.current?.getEditor();
  };

  //   const modules = {
  //     toolbar: [
  //       [{ header: '1' }, { header: '2' }, { font: [] }],
  //       [{ size: ['small', 'normal', 'large', 'huge'] }, { color: [] }],
  //       ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  //       [
  //         { list: 'ordered' },
  //         { list: 'bullet' },
  //         { indent: '-1' },
  //         { indent: '+1' },
  //         { align: [] },
  //       ],
  //       ['image'],
  //       ['clean'],
  //     ],
  //     clipboard: {
  //       // toggle to add extra line breaks when pasting HTML:
  //       matchVisual: false,
  //     },
  //   };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: '1' }, { header: '2' }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ size: ['small', false, 'large', 'huge'] }],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
            { align: [] },
          ],
          ['image'],
        ],
        handlers: {
          image: imgInHandler,
        },
      },
    }),
    [],
  );

  const formats = [
    'header',
    'size',

    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'align',
    'image',
  ];

  return (
    <ReactQuill
      //   ref={(element) => {
      //     if (element !== null) {
      //       QuillRef.current = element;
      //     }
      //   }}
      theme="snow"
      modules={modules}
      formats={formats}
      value={bodyText !== undefined ? bodyText : firstContent}
      placeholder={'약관을 입력해주세요'}
      onChange={(event) => setBodyText(event)}
      style={{ height: '416px' }}
    />
  );
};

export default AdminTermsQuill;
