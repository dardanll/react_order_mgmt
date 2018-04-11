import zeroFill from 'zero-fill';

const incrementedID = (orders, prefix) => {
  // sort orders by ID
  const sortedOrders = orders.sort((a, b) => b.id.localeCompare(a.id))
  // get number of last/recent order
  const lastOrderNumber = sortedOrders[0].id.split("-")[2]
  // increment lasrOrderNumber by 1
  const id = 1 + +lastOrderNumber
  // Zero-fill a number to the given size. Ex. 1 -> 001
  return prefix + zeroFill(3, id)
}

const setID = (orders, prefix) => {
  const filteredOrders = orders.filter( order => order.id.includes(prefix))

  if(filteredOrders.length)
    return incrementedID(filteredOrders, prefix)
  else
    return prefix + "001"
}

const newOrderID = (state) => {
  const currentDate = new Date();
  const month = ((currentDate.getMonth() + 1) >= 10) ? (currentDate.getMonth()+1) : '0' + (currentDate.getMonth()+1);  
  const year = currentDate.getFullYear().toString().substr(2)

  return setID(state.orders.ordersList, `ORD-${month}${year}-`)
}

export default store => next => action => {
  if(action.type === 'CREATE_ORDER'){
    const id = newOrderID(store.getState());
    const newOrder = {...action.newOrder, id};
    const newAction = {...action, newOrder};
    next(newAction);
  } else {
    next(action);
  }
}