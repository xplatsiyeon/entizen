"use client";

import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import Cookies from "js-cookie";

interface MemberInfo {
  id: string;
  type: string;
  name: string;
  nickname: string;
}

export const memberAtom = atomWithStorage<MemberInfo | null>("member", null);

// 로그인 처리를 위한 atom
export const signinAtom = atom(null, (_, set, member: MemberInfo) => {
  localStorage.setItem("member", JSON.stringify(member));
  set(memberAtom, member);
});

// 로그아웃 처리를 위한 atom
export const signoutAtom = atom(null, (_, set) => {
  localStorage.removeItem("member");
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  set(memberAtom, null);
});
