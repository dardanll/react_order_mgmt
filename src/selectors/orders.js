export const filteredOrders = (orders, sortBy, searchTerm) => {
  const filteredOrders = orders.filter( order =>
    order.id.toLowerCase().includes(searchTerm)
  )

  switch (sortBy) {
  case 'id':
    return filteredOrders.sort((a, b) => 
      b.id.localeCompare(a.id)
    )

  case 'date': 
    return filteredOrders.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )

  case 'price':
    return filteredOrders.sort((a, b) => 
      b.price > a.price
    )

  default:
    return filteredOrders
  }
}