import { selectionFormTypes, setAtomTypes } from "./types";
import { atom } from "jotai";

// 업체선택 ATOM[E]
export const selectionDataAtom = atom<selectionFormTypes>({
  option: "",
  name: "",
  phone: "",
  address: "",
  addressDetail: "",
  isAgree: false,
});

export const selectionIsValidAtom = atom<boolean>(false);

// selectionDataAtom 설정 Atom
export const setDataAtom = atom(
  null,
  (get, set, { name, value }: setAtomTypes) => {
    const prevData = get(selectionDataAtom);
    const data = { ...prevData, [name]: value };
    set(selectionDataAtom, data);

    const values = Object.values(data);

    if (!values.includes("") && !values.includes(false)) {
      set(selectionIsValidAtom, true);
    } else {
      set(selectionIsValidAtom, false);
    }
  },
);

// 업체선택 ATOM[E]
