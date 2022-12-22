import { EntriesState } from "./EntriesProvider";

type EntriesActionType = { type: "[Entries] - Open Sidebar" };

export const entriesReducer = (
  state: EntriesState,
  action: EntriesActionType
): EntriesState => {
  switch (action.type) {
    // case "UI - Open Sidebar":
    //   return {
    //     ...state,

    //   };
    // case "UI - Close Sidebar":
    //   return {
    //     ...state,

    //   };

    default:
      return state;
  }
};
