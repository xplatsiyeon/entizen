import React, { useRef } from 'react';
import 'jodit/build/jodit.min.css';
import styled from '@emotion/styled';

type Props = {
  setBodyText: React.Dispatch<React.SetStateAction<string>>;
  bodyText: string;
  firstContent?: string;
};

const JoditReact = React.lazy(() => {
  return import('jodit-react-ts');
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
  uploader: { insertImageAsBase64URI: true },
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

const AdminTermsJodit = ({ setBodyText, bodyText, firstContent }: Props) => {
  const isSSR = typeof window === 'undefined';

  console.log('bodyText', bodyText);

  return (
    <div>
      {!isSSR && (
        <>
          <JoditReact
            onChange={(content) => setBodyText(content)}
            config={config}
            defaultValue={bodyText === '' ? '약관을 입력해주세요.' : ''}
          />
          {bodyText}
        </>
      )}
    </div>
  );
};

export default AdminTermsJodit;
