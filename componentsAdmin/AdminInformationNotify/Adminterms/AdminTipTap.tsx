import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TipTapMenu from './TipTapMenu';
import styled from '@emotion/styled';

type Props = {
  setBodyText: React.Dispatch<React.SetStateAction<string>>;
  bodyText: string;
  firstContent?: string;
};

const editor = useEditor({
  extensions: [StarterKit],
  content: '<p>Hello World!</p>',
});

const AdminTipTap = ({ setBodyText, bodyText, firstContent }: Props) => {
  return (
    <Menu>
      <TipTapMenu editor={editor} />
      <EditorContent editor={editor} />
    </Menu>
  );
};

export default AdminTipTap;

const Menu = styled.div`
  border: 1px solid red;
`;
