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
    window.entizen!.openExternalBrowser('https://www.naver.com');
  } else if (userAgent === 'iOS_App') {
    window.webkit.messageHandlers.openExternalBrowser.postMessage(
      'https://www.naver.com',
    );
  }
};
