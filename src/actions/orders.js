export const SORT_BY = 'SORT_BY';
export const SORT_ORDER = 'SORT_ORDER';
export const CREATE_ORDER = 'CREATE_ORDER';
export const UPDATE_ORDER = 'UPDATE_ORDER';
export const DELETE_ORDER = 'DELETE_ORDER';
export const SEARCH_ORDERS = 'SEARCH_ORDERS';
export const TOGGLE_ORDER_LOCKABLE = 'TOGGLE_ORDER_LOCKABLE';
export const DELETE_MULTIPLE_ORDERS = 'DELETE_MULTIPLE_ORDERS';

export function deleteOrder(orderId) {
  return {
    type: DELETE_ORDER,
    orderId
  }
}

export function deleteMultipleOrders(orders) {
  return {
    type: DELETE_MULTIPLE_ORDERS,
    orders
  }
}

export function toggleOrderLockable(order) {
  return {
    type: TOGGLE_ORDER_LOCKABLE,
    order
  }
}

export function setSortBy(sort_by) {
  return {
    type: SORT_BY,
    sort_by
  }
}

export function searchOrders(searchTerm) {
  return {
    type: SEARCH_ORDERS,
    searchTerm
  }
}

export function createOrder(values) {
  const newOrder = {
    ...values,
    price: calculateOrderPrice(values),
    locked: false
  }
  return {
    type: CREATE_ORDER,
    newOrder
  }
}

export function updateOrder(values) {
  const updatedOrder = {
    ...values,
    price: calculateOrderPrice(values)
  }

  return {
    type: UPDATE_ORDER,
    values: updatedOrder
  }
}

const calculateOrderPrice = values => {
  return values.products.reduce((accumulator, product) => (
    accumulator + (product.quantity * product.price)
  ), 0);
}