/**
 * 구글 로그인 매니저 클래스
 */

import React from 'react';

import { gapi } from 'gapi-script';

<script src="https://apis.google.com/js/api:client.js"></script>

let googleUser: any;
let googleUserProfile: any;

/**
 * 구글 로그인 초기화 및 구글 로그인 버튼 핸들러 세팅
 * @param clientId 구글 클라이언트 아이디
 * @param element 구글 로그인 버튼
 * @param callBack 로그인 버튼 클릭 후 성공 시 GoogleUser 객체 반환
 */
export function initGoogleLogin(clientId: String, element: any, callBack: (_googleUser: any) => void) {
    gapi.load('auth2', function(){
        gapi.auth2.init({
          client_id: clientId,
          cookiepolicy: 'single_host_origin'
        }).then(
          function(auth2: any) {
              console.log("[Success] Google Login Auth2 init");
              attachSignin(element, auth2, function(_googleUser) {
                googleUser = _googleUser;
                googleUserProfile = _googleUser.getBasicProfile();

                callBack(_googleUser);
              });
          },
          function(fail: any) {
            console.log("Google Login Auth2 init Fail -> " + fail);
          });
      });
};

function attachSignin(element: any, auth2: any, callBack: (_googleUser: any) => void) {
  console.log("[attachSignin] Google Login");
  auth2.attachClickHandler(element, {},
      function(_googleUser: any) {
          console.log("[Success] Google Login");
          callBack(_googleUser);
      }, function(error: any) {
        console.log(JSON.stringify(error, undefined, 2));
      });
};

/**
 * 구글 로그인 후 제공되는 GoogleUser 객체 가져오기
 * @returns GoogleUser
 */
export function getGoogleUser(): any {
    return (googleUser !== undefined) ? googleUser : "undefined GoogleUser"
}

/**
 * 구글 계정에 부여되는 고유한 아이디 토큰 값 가져오기
 * @returns 구글 고유 아이디 토큰 값
 */
function getIdToken(): String {
  return (googleUser !== undefined && googleUser.isSignedIn()) ? googleUser.getAuthResponse().id_token : "is Not Google Login";
}

/**
 * 구글 계정에 부여되는 고유한 아이디 값 가져오기
 * @returns 고유 아이디 값
 */
export function getId(): String  {
  return (googleUser !== undefined && googleUser.isSignedIn()) ? googleUserProfile.getId() : "is Not Google Login";
};

/**
 * 구글에 등록된 이름 가져오기
 * @returns 이름
 */
export function getName(): String {
  return (googleUser !== undefined && googleUser.isSignedIn()) ? googleUserProfile.getName() : "is Not Google Login";
};

/**
 * 구글에 등록된 프로필 이미지 가져오기
 * @returns 프로필 이미지 주소
 */
export function getProfileImageUrl(): String {
  return (googleUser !== undefined && googleUser.isSignedIn()) ? googleUserProfile.getImageUrl() : "is Not Google Login";
};

/**
 * 구글에 등록된 이메일 주소 가져오기
 * @returns ex) steve@stevelabs.co
 */
export function getEmail(): String {
  return (googleUser !== undefined && googleUser.isSignedIn()) ? googleUserProfile.getEmail() : "is Not Google Login";
};

/**
 * 구글 로그아웃
 */
export function logout() {
    if(gapi.auth2.getAuthInstance() !== undefined) {
        gapi.auth2.getAuthInstance().signOut().then(
            gapi.auth2.getAuthInstance().disconnect()
        );
    }
}

/**
 * 구글 로그인 상태 반환
 * @returns [true] 로그인 O / [false] 로그인 X
 */
export function isSignedIn(): Boolean {
    return (googleUser !== undefined) ? googleUser.isSignedIn() : false
}