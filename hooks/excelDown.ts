import axios from 'axios';

// 백엔드에 get 하는 url을 props 값으로 전달하면 됩니다!!!!!

export const excelDownloadFile = async (
  propsUrl: string,
  accessToken: string,
) => {
  // 로컬에서 사용할때만 활성화 시키기
  const BASE_URL = `/api`;
  await axios({
    method: 'GET',
    url: `${BASE_URL}${propsUrl}`, // 파일 다운로드 요청 URL

    responseType: 'blob', // 응답 데이터 타입 정의
    headers: {
      local: process.env.NEXT_PUBLIC_LOCAL!,
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => {
    // 다운로드(서버에서 전달 받은 데이터) 받은 바이너리 데이터를 blob으로 변환
    // const blob = new Blob([res.data]);
    const blob = new Blob([res.data], {
      // 엑셀 파일 타입 정의
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    // 특정 타입을 정의해야 경우에는 옵션을 사용해 MIME 유형을 정의 가능.
    // const blob = new Blob([this.content], {type: 'text/plain'})

    // blob을 사용해 객체 URL을 생성
    const fileObjectUrl = window.URL.createObjectURL(blob);

    // blob 객체 URL을 설정할 링크 생성
    const link = document.createElement('a');
    link.href = fileObjectUrl;
    link.style.display = 'none';

    // 다운로드 파일 이름을 지정 가능

    const extractDownloadFilename = (res: any) => {
      const disposition = res.headers['content-disposition'];
      const fileName = decodeURI(
        disposition
          .match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1]
          .replace(/['"]/g, ''),
      );
      return fileName;
    };

    // 일반적으로 서버에서 전달해준 파일 이름은 응답 Header의 Content-Disposition에 설정
    link.download = extractDownloadFilename(res);

    // 다운로드 파일의 이름은 직접 지정 할 수 있습니다.
    // link.download = "sample-file.xlsx";

    // 링크를 body에 추가하고 강제로 click 이벤트를 발생시켜 파일 다운로드를 실행
    document.body.appendChild(link);
    link.click();
    link.remove();

    // 다운로드가 끝난 리소스(객체 URL)를 해제
    window.URL.revokeObjectURL(fileObjectUrl);
  });
};
