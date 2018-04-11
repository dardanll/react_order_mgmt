import React, { Component } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';

import Totals from './Totals';


class OrderForm extends Component {

  renderField = ({ input, disabled, label, type, meta: { touched, error } }) => (
    <div> 
      <div>
        <input {...input} type={type} placeholder={label} disabled={disabled} />
        {touched && error && <span style={{color: 'red'}}>{error}</span>}
      </div>
    </div>
  )

  renderSelect = ({ input, children, meta: {touched, error } }) => {
    return (<div>
      <select {...input}> {children} </select>
      {touched && error && <span style={{color: 'red'}}>{error}</span>}
    </div>)
  }

  renderProducts = ({ fields, meta: { error, submitFailed } }) => (
    <div>
      <hr/>
      <button type="button" onClick={() => fields.push({})}>
        Add product
      </button>
      {submitFailed && error && <span style={{color: 'red'}}>{error}</span>}
      { fields.length > 0 &&
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
          {fields.map((product, index) => (
            <tr key={index}>                
              <td>#{index + 1}</td>
              <td>
                <Field name={`${product}.productId`} component={this.renderSelect}>
                  <option></option>
                  <option name="book">Book</option>
                  <option name="pencil">Pencil</option>
                  <option name="ruler">Ruler</option>
                </Field>
              </td>
              <td>
                <Field
                  name={`${product}.quantity`}
                  type="number"
                  component={this.renderField}
                  placeholder="Enter Quantity"
                />
              </td>
              <td>
                <Field
                  name={`${product}.price`}
                  type="number"
                  component={this.renderField}
                />
              </td>
              <td>
                <button
                  type="button"
                  title="Remove Product"
                  onClick={() => fields.remove(index)}
                >
                  Remove
                </button>
              </td>
            </tr>
              ))}
          </tbody>
        </table>
      }
    </div>
  )

  onCancel = () => {
    if (window.confirm("Are you sure you want to cancel?")){
      window.location.replace('/')
    }
  }

  render() {
    const { handleSubmit, form, initialValues } = this.props
    const disabledField = initialValues && initialValues.locked ? true : false;
    
    return (
      <div>
      <Totals form={form}/>

      <form onSubmit={handleSubmit} style={{float: 'left', marginTop: '25px'}}>
        <fieldset disabled={disabledField}>
          <Field
            disabled={true}
            name="id"
            type="text"
            label="Order No."
            component={this.renderField}
          />
          <Field
            name="date"
            type="date"
            label="Date"
            component={this.renderField}
          />
          <Field
            disabled={true}
            name="tax"
            type="text"
            label="Tax 15%"
            component={this.renderField}
          />
          <FieldArray name="products" component={this.renderProducts} />
          <div>
            <button type="submit" disabled={disabledField} onClick={handleSubmit}>
              Save
            </button>
            <button type="button" onClick={this.onCancel}>
              Cancel
            </button>
          </div>
        </fieldset>
      </form>
      </div>
    )
  }
}

const validate = values => {
  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).setHours(0,0,0,0);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).setHours(0,0,0,0);
  const currentDate = new Date(values.date).setHours(0,0,0,0)
  const errors = {}

  // date validations
  if (!values.date) {
    errors.date = 'Required';
  } else if(currentDate < firstDay || currentDate > lastDay) {
    errors.date = "You can choose only date from current month";
  }

  // products validations
  if (!values.products || !values.products.length) {
    errors.products = { _error: 'At least one product must be entered' }
  } else {
    const productsArrayErrors = []
    values.products.forEach((product, productIndex) => {
      const productErrors = {}
      if (!product || !product.quantity) {
        productErrors.quantity = 'Required'
        productsArrayErrors[productIndex] = productErrors
      }
      if (!product || !product.productId) {
        productErrors.productId = 'Required'
        productsArrayErrors[productIndex] = productErrors
      }
      if (!product || !product.price) {
        productErrors.price = 'Required'
        productsArrayErrors[productIndex] = productErrors
      }
    })
    if (productsArrayErrors.length) {
      errors.products = productsArrayErrors
    }
  }
  return errors
}

export default reduxForm({ validate })(OrderForm)