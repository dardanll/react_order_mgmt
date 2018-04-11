import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, TabLink, TabContent } from 'react-tabs-redux';

import { changeSelectedTab } from '../actions/tabs';
import OrdersList from './OrdersList';
import Order from './Order';
import styles from '../styles/app'


class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      selectedTab: null,
      tabName: ""
    }
  }

  render() {
    let { props } = this;

    return (
      <div>
        <Tabs
          style={styles.tabs}
          selectedTab={props.selectedTab}
          visibleTabStyle={styles.visibleTabStyle}
          activeLinkStyle={styles.activeLinkStyle}
          handleSelect={(selectedTab) => props.changeSelectedTab(selectedTab)}
        >
          <div style={styles.links}>
            <TabLink 
              default 
              to="ordersTab"
              style={styles.tabLink}
            >
              <h3>Orders</h3>
            </TabLink>
            {
              props.tabs.map(tab => {
              return (
                <TabLink 
                  to={tab} 
                  key={tab}
                  style={styles.tabLink}
                >
                  <h3>{tab}</h3>
                </TabLink>
              )})
            }
          </div>

            <div style={styles.content}>
                <TabContent for="ordersTab">
                    <OrdersList />
                </TabContent>

                {props.tabs.map(tab => (
                  <TabContent for={tab} key={tab}>
                      <Order orderId={tab} />
                  </TabContent>
                ))}
            </div>
        </Tabs>
    </div>
    );
  }
}

const mapStateToProps = state => (
  {
    tabs: state.tabs.tabsList,
    orders: state.orders.orders,
    selectedTab: state.tabs.selectedTab,
  }
);

export default connect(mapStateToProps, { changeSelectedTab })(App);
