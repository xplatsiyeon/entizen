"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-custom-build";
import classes from "./Editor.module.scss";

class MyUploadAdapter {
  loader: any;
  url: string;

  constructor(loader: any) {
    // CKEditor에서 제공하는 파일 로더 인스턴스를 저장합니다.
    this.loader = loader;
    // 이미지를 업로드할 서버의 URL을 설정합니다.
    this.url = "/api/file/upload";
  }

  // 파일을 서버로 업로드합니다.
  async upload(): Promise<any> {
    const data = new FormData();
    const file = await this.loader.file;
    data.append("files", file);

    const response = await fetch(this.url, {
      method: "POST",
      body: data,
    });

    if (!response.ok) {
      throw new Error(`Could not upload image: ${response.statusText}`);
    }

    const responseData = await response.json();

    console.log(responseData);

    // 서버에서 반환된 이미지 URL을 CKEditor에 전달해야 합니다.
    return {
      default: responseData.updatedFilesInfo[0].url, // 예시: { url: '업로드된 이미지의 URL' }
    };
  }

  // 선택적으로 진행 상태를 업데이트하는 로직을 추가할 수 있습니다.
  abort() {
    // 요청을 중단하는 로직을 구현합니다.
  }
}

function MyCustomUploadAdapterPlugin(editor: any) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
    return new MyUploadAdapter(loader);
  };
}

interface EditorType {
  data: string;
  onChange: (data: string) => void;
}

const Editor = ({ data, onChange }: EditorType) => {
  return (
    <div className={classes.custom}>
      <CKEditor
        editor={ClassicEditor}
        data={data}
        config={{
          extraPlugins: [MyCustomUploadAdapterPlugin],
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log(data);
          onChange(data);
        }}
      />
    </div>
  );
};

export default Editor;
