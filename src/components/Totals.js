import React from 'react';
import { values as valuesDecorator } from 'redux-form';

const totalPrice = values => {
  if (values && values.products) {
    return values.products.reduce(function (accumulator, product) {
      if (product.quantity && product.price)
        return accumulator + (product.quantity * product.price);
      else
        return accumulator
    }, 0);
  } else {
    return 0
  }
}

const totalItems = values => {
  if (values && values.products) {
    return values.products.reduce((accumulator, product) => {
      if (product.quantity)
        return accumulator + +product.quantity
      else
        return accumulator
    }, 0);
  } else {
    return 0
  }
}

const totalTaxes = values => (
  (totalPrice(values) * (15/100)).toFixed(2)
)

const total = values => (
  totalPrice(values) + totalTaxes(values)
)

export default ({ form }) => {
  const decorator = valuesDecorator({ form })
  const component = ({ values }) =>
    (
      <div style={{float: 'right', marginLeft: '200px'}}>
        <h2>Totals</h2>
        <p>Ext. Price: {totalPrice(values)}</p>
        <p>Tax: {totalTaxes(values)} </p>
        <hr/>
        <p>Total Value: {total(values)}</p>
        <p>Total Items in Order: {totalItems(values)}</p>
      </div>
    )
  const Decorated = decorator(component)
  return <Decorated/>
}