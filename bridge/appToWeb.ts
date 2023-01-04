// 웹 ---> 앱
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

export const bridgeTestOnClick = (userAgent: string, url: string) => {
  if (userAgent === 'Android_App') {
    window.entizen!.openExternalBrowser(url);
  } else if (userAgent === 'iOS_App') {
    window.webkit.messageHandlers.openExternalBrowser.postMessage(url);
  } else {
    window.open(url);
  }
};

export const fileDownload = (
  userAgent: string,
  fileName: string,
  url: string,
) => {
  if (userAgent === 'Android_App') {
    window.entizen!.fileDownload(fileName, url);
  } else if (userAgent === 'iOS_App') {
    window.webkit.messageHandlers.fileDownload.postMessage(fileName, url);
  } else {
    // window.open(url);
  }
};
