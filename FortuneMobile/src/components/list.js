
'use strict';
import React, { Component } from 'react';
import { Text, ListView } from 'react-native';

class MyComponent extends Component {
    constructor() {
      super();
      const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      this.state = {
        dataSource: ds.cloneWithRows(['row 1', 'row 2']),
      };
    }
  
    render() {
      return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData}</Text>}
        />
      );
    }
  }

  module.exports = MyComponent;
