import { MENU } from "@/constants/global";

export const actionMenuReducer = (state, action) => {
  switch (action.type) {
    case MENU.TOGGLE_MENU:
      return {
        ...state,
        openMenuId: state.openMenuId === action.payload ? null : action.payload,
      };
    case MENU.CLOSE_MENU:
      return {
        ...state,
        openMenuId: null,
      };
    default:
      return state;
  }
};
