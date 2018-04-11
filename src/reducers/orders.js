import { SORT_BY,
         CREATE_ORDER,
         UPDATE_ORDER,
         DELETE_ORDER,
         SEARCH_ORDERS,
         TOGGLE_ORDER_LOCKABLE, 
         DELETE_MULTIPLE_ORDERS } from '../actions/orders'

import initialOrders from './initialOrders';

export default function tabsReducer(state = initialOrders, action) {
  switch (action.type) {
  case SORT_BY:
    return {
      ...state,
      sortBy: action.sort_by
    }

  case CREATE_ORDER:
    const ordersList = [
      ...state.ordersList, 
      action.newOrder ]

    return {
      ...state,
      ordersList
    }

  case UPDATE_ORDER:
    const updatedOrdersList = state.ordersList.map( order => {
      if (order.id === action.values.id) {
        return action.values
      } else {
        return order
      }
    })

    return {
      ...state,
      ordersList: updatedOrdersList
    }

  case DELETE_ORDER:
    //delete order by provided ID
    const orders = state.ordersList.filter( order => {
      return order.id !== action.orderId;
    });

    return {
      ...state,
      ordersList: orders,
    }

  case DELETE_MULTIPLE_ORDERS:
    // delete multiple orders by provided IDs
    const newOrders = state.ordersList.filter(order => !action.orders.includes(order.id))

    return {
      ...state,
      ordersList: newOrders,
    }

  case TOGGLE_ORDER_LOCKABLE:
    // toggle order locked property
    const updatedOrder = state.ordersList.map( order => {
      if(order.id === action.order.id) {
        return {
          ...order, 
          locked: !action.order.locked
        }
      }
      return order
    })

    return {
      ...state,
      ordersList: updatedOrder
    }

  case SEARCH_ORDERS:
    return {
      ...state,
      searchTerm: action.searchTerm
    }

  default:
      return state;
  }
}