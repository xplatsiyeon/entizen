// 웹 ---> 앱

/**
 * 카메라 권한 승인 브릿지
 * @param userAgent : 기기정보
 * @param type : 사진 or 파일
 */
export const requestPermissionCheck = (
  userAgent: string,
  type: 'photo' | 'file',
) => {
  if (userAgent === 'Android_App') {
    window.entizen!.requestPermissionCheck(type);
  } else if (userAgent === 'iOS_App') {
    window.webkit.messageHandlers.requestPermissionCheck.postMessage(type);
  }
};

/**
 * 외부 브라우저 브릿지
 * @param userAgent : 기기정보
 * @param url : 외부 링크 주소
 */
export const openExternalBrowser = (userAgent: string, url: string) => {
  if (userAgent === 'Android_App') {
    window.entizen!.openExternalBrowser(url);
  } else if (userAgent === 'iOS_App') {
    window.webkit.messageHandlers.openExternalBrowser.postMessage(url);
  } else {
    window.open(url);
  }
};

/**
 * 파일 다운로드 브릿지
 * @param userAgent : 기기정보
 * @param fileName : 파일이름
 * @param url : 다운로드 될 url 주소
 */
export const fileDownload = (
  userAgent: string,
  fileName: string,
  url: string,
) => {
  const temp = url.split('/');
  const newFileName = temp[temp.length - 1];

  if (userAgent === 'Android_App') {
    window.entizen!.fileDownload(newFileName, url);
  } else if (userAgent === 'iOS_App') {
    window.webkit.messageHandlers.fileDownload.postMessage([newFileName, url]);
  } else {
    location.href = url;
  }
};
