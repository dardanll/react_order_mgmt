import React, { Component } from 'react' ;
import { connect } from 'react-redux';

import { filteredOrders } from '../selectors/orders'
import { createTab, removeTab, removeMultipleTabs } from '../actions/tabs';
import { setSortBy, deleteOrder, deleteMultipleOrders, toggleOrderLockable, searchOrders } from '../actions/orders'

class OrdersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOrders: [],
    }
  }

  toggleCheckbox = event => {
    const { value } = event.target;
    
    if(event.target.checked) {
      this.setState((prevState) => ({
        selectedOrders: prevState.selectedOrders.concat(value)
      }))
    } else {
      this.setState((prevState) => ({
        selectedOrders: prevState.selectedOrders.filter((orderValue) => {
          return orderValue !== value
        })
      }))
    }
  }

  deleteMultiOrders = () => {
    if (window.confirm('Are you sure you wish to delete selected orders?')) {
      this.props.deleteMultipleOrders(this.state.selectedOrders);
      this.props.removeMultipleTabs(this.state.selectedOrders);
      this.setState({ selectedOrders: [] });
    }
  }

  deleteOrder = order => {
    if (window.confirm('Are you sure you wish to delete this order?')) {
      this.props.deleteOrder(order.id);
      this.props.removeTab(order.id);
    }
  }

  toggleOrderLockable = order => {
    if (window.confirm('Are you sure you wish to change this order locked value?')){
      this.props.toggleOrderLockable(order);
    }
  }

  onSearchInput = event => {
    const searchTerm = event.target.value.toLowerCase();
    this.props.searchOrders(searchTerm);
  }

  sortOrders = (event) => {
    this.props.setSortBy(event.target.name);
  }

  totalOrdersPrice = () => {
    const totalPrice = this.props.orders.reduce((accumulator, order) => (
      accumulator + order.price
    ), 0)

    return totalPrice.toFixed(2)
  }

  render() {
    return (
      <div>
        <h3>Orders List</h3>        
        <button onClick={() => this.props.createTab('New Order')}>Add new order</button>
        <input type="text" placeholder="Search..." value={this.props.searchTerm} onChange={this.onSearchInput}/>
        <hr/>
        <table>
          <thead>
            <tr>
              <td>
              { this.state.selectedOrders.length ?
                  <button onClick={this.deleteMultiOrders}>Delete selected ({ this.state.selectedOrders.length })</button>
                :
                  <button disabled>Delete</button>
              }
              </td>
              <td> 
                <button onClick={this.sortOrders} name="id">Sort by ID</button>
              </td>
              <td>
                <button onClick={this.sortOrders} name="date">Sort by Date</button>
              </td>
              <td>
                <button onClick={this.sortOrders} name="price">Sort by Price</button>
              </td>
            </tr>
            <tr>
              <th>Check</th>
              <th>Order Number </th>
              <th>Order Date</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
              {
                this.props.orders.map( order => {
                  return(
                    <tr key={order.id}>
                      <td>
                        <input 
                          type="checkbox" 
                          value={order.id} 
                          disabled={order.locked}
                          onClick={this.toggleCheckbox} />
                      </td>
                      <td>
                        <button onClick={ () => this.props.createTab(order.id)}>
                          {order.id}
                        </button>
                      </td>
                      <td>{order.date}</td>
                      <td>{order.price}</td>
                      <td>
                        { !order.locked ? 
                            <button disabled={order.locked} onClick={() => this.deleteOrder(order)}>
                              Delete
                            </button>
                          : null }
                        <button onClick={() => this.toggleOrderLockable(order)}>
                          { order.locked ? 'Unlock' : 'Lock'}
                        </button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
        </table>
        <hr/>
        <p>Total: {this.totalOrdersPrice()} </p>
      </div>
    )
  }
}

const mapStateToProps = state => {
 return {
    orders: filteredOrders(state.orders.ordersList, state.orders.sortBy, state.orders.searchTerm),
    sortBy: state.orders.sortBy,
    searchTerm: state.orders.searchTerm
  }
}

export default connect(mapStateToProps, { 
  setSortBy,
  createTab, 
  removeTab,
  deleteOrder, 
  searchOrders,
  removeMultipleTabs, 
  toggleOrderLockable,
  deleteMultipleOrders, 
})(OrdersList)
