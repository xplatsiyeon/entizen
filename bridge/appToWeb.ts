// 웹 ---> 앱
export const requestPermissionCheck = (
  userAgent: string,
  type: 'photo' | 'file',
) => {
  if (window.entizen!) {
    if (userAgent === 'Android_App') {
      window.entizen!.requestPermissionCheck(type);
    } else if (userAgent === 'iOS_App') {
      window.webkit.messageHandlers.requestPermissionCheck.postMessage(type);
    }
  }
};
