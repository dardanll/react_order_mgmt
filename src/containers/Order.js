import React, { Component } from 'react';
import { connect } from 'react-redux';

import OrderForm from '../components/OrderForm';
import { createOrder, updateOrder } from '../actions/orders';
import { removeTab, changeSelectedTab } from '../actions/tabs';

class Order extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: this.findOrder(props)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ order: this.findOrder(nextProps) });  
  }

  findOrder(props) {
    return props.orders.find( order => (
      order.id === this.props.orderId
    ))
  }

  handleSubmt = values => {
    if (this.state.order) {
      this.props.removeTab(this.state.order.id);
      this.props.changeSelectedTab("ordersTab")
      this.props.updateOrder(values)
    } else {
      this.props.removeTab("New Order");
      this.props.changeSelectedTab("ordersTab")
      this.props.createOrder(values)
    }
  }
  
  render() {
    const { order } = this.state;
    const formName = order ? order.id : "NewForm";

    return (
      <div>
        <OrderForm form={formName} onSubmit={this.handleSubmt} initialValues={order}/>
      </div>
    )
  }
}

const mapStateToProps = state => (
  {
    orders: state.orders.ordersList,
  }
);

export default connect(mapStateToProps, { 
  removeTab, 
  updateOrder,
  createOrder,
  changeSelectedTab })(Order)