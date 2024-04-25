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
    //@ts-expect-error
    window.entizen!.requestPermissionCheck(type);
  } else if (userAgent === 'iOS_App') {
    //@ts-expect-error
    window.webkit.messageHandlers.requestPermissionCheck.postMessage(type);
  }
};

/**
 * 외부 브라우저 브릿지
 * @param userAgent : 기기정보
 * @param url : 외부 링크 주소
 */
export const openExternalBrowser = (userAgent: string, url: string) => {
  console.log('🔥 url : ', url);
  if (userAgent === 'Android_App') {
    //@ts-expect-error
    window.entizen!.openExternalBrowser(url);
  } else if (userAgent === 'iOS_App') {
    //@ts-expect-error
    window.webkit.messageHandlers.openExternalBrowser.postMessage(url);
  } else {
    window.open(url, '_blank', 'noopener, noreferrer');
    // window.open(url);
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
    //@ts-expect-error
    window.entizen!.fileDownload(newFileName, url);
  } else if (userAgent === 'iOS_App') {
    //@ts-expect-error
    window.webkit.messageHandlers.fileDownload.postMessage([newFileName, url]);
  } else {
    location.href = url;
  }
};

/**
 * 앱 정보 삭제를 위한 로그아웃 브릿지
 * @param userAgent 유저 정보
 */
export const appLogout = (userAgent: string) => {
  // 로그아웃 브릿지 연결
  if (userAgent === 'Android_App') {
    //@ts-expect-error
    window.entizen!.googleUnlink();
    //@ts-expect-error
    window.entizen!.logout();
  } else if (userAgent === 'iOS_App') {
    //@ts-expect-error
    window.webkit.messageHandlers.googleUnlink.postMessage('');
    //@ts-expect-error
    window.webkit.messageHandlers.logout.postMessage('');
  }
};
export const googleUnlink = (userAgent: string) => {
  // 로그아웃 브릿지 연결
  if (userAgent === 'Android_App') {
    //@ts-expect-error
    window.entizen!.googleUnlink();
  } else if (userAgent === 'iOS_App') {
    //@ts-expect-error
    window.webkit.messageHandlers.googleUnlink.postMessage('');
  }
};
