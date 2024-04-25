import { atom } from "jotai";
interface PopupList {
  popups: {
    id: number;
    type: "info" | "error" | "confirm" | "popup";
    title?: string;
    content: any;
    data?: any;
    accept?: (data: any) => void;
  }[];
  active: number;
}

export const popupAtom = atom<PopupList>({
  popups: [],
  active: -1,
});

export const addPopupAtom = atom(
  null,
  (
    get,
    set,
    popup: {
      type: "info" | "error" | "confirm" | "popup";
      title?: string;
      content: any;
      data?: any;
      accept?: (data: any) => void;
    }
  ) => {
    const currentPopup = get(popupAtom);
    const newPopup = {
      popups: [
        ...currentPopup.popups,
        { id: currentPopup.popups.length, ...popup },
      ],
      active: currentPopup.popups.length,
    };
    location.search;
    set(popupAtom, newPopup);
  }
);

export const removePopupAtom = atom(null, (get, set, id: number) => {
  if (id !== -1) {
    const currentPopup = get(popupAtom);
    const filteredPopups = currentPopup.popups.filter(
      (popup) => popup.id !== id
    );

    set(popupAtom, {
      popups: filteredPopups,
      active:
        filteredPopups.length > 0
          ? filteredPopups[filteredPopups.length - 1].id
          : -1,
    });
  }
});

export const updatePopupDataAtom = atom(null, (get, set, data: any) => {
  const currentPopup = get(popupAtom);
  if (currentPopup.active !== -1) {
    currentPopup.popups[currentPopup.active].data = data;
    set(popupAtom, { ...currentPopup });
  }
});
