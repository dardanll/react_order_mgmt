export const CREATE_TAB = 'CREATE_TAB';
export const REMOVE_TAB = 'REMOVE_TAB';
export const CHANGE_SELECTED_TAB = 'CHANGE_SELECTED_TAB';
export const REMOVE_MULTIPLE_TABS = 'REMOVE_MULTIPLE_TABS';

export function changeSelectedTab(selectedTab) {
  return {
    type: CHANGE_SELECTED_TAB,
    selectedTab
  };
}

export function createTab(tabName) {
  return {
    type: CREATE_TAB,
    tabName
  };
}

export function removeTab(tab) {
  return {
    type: REMOVE_TAB,
    tab
  }
}

export function removeMultipleTabs(tabs) {
  return {
    type: REMOVE_MULTIPLE_TABS,
    tabs
  }
}
