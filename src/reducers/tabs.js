import { CREATE_TAB,
         REMOVE_TAB, 
         CHANGE_SELECTED_TAB,
         REMOVE_MULTIPLE_TABS, } from '../actions/tabs';

const initialState = {
  tabsList: [],
  selectedTab: null
}

export default function tabsReducer(state = initialState, action) {
  switch (action.type) {
  case CREATE_TAB:
    const tabAlreadyExists = state.tabsList.indexOf(action.tabName) > -1
    const createTabList = tabAlreadyExists ? state.tabsList : [...state.tabsList, action.tabName]

    return {
        ...state,
        tabsList: createTabList,
        selectedTab: action.tabName
    }

  case REMOVE_TAB:
    const tabsList = state.tabsList.filter( tab => action.tab !== tab)

    return {
      ...state,
      tabsList
    }

  case REMOVE_MULTIPLE_TABS:
    const newTabsList = state.tabsList.filter( tab => !action.tabs.includes(tab))

    return {
      ...state,
      tabsList: newTabsList
    }

  case CHANGE_SELECTED_TAB:
    return {
        ...state,
        selectedTab: action.selectedTab
    };

  default:
      return state;
  }
}