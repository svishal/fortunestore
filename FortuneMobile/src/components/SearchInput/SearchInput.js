'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { View, TextInput, Image, TouchableOpacity } from 'react-native';
import Icon from '../Icon';
import { WHITE } from '../../constants/colors';
import iconSearch from './images/ic_search.png';
import styles from './style';

class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.searchInput = null;
    if (this.props.debounceTime) {
      this.changeHandler = debounce(this.changeHandler.bind(this), 500);
    } else {
      this.changeHandler = this.changeHandler.bind(this);
    }
    this.getCloseIcon = this.getCloseIcon.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.state = {
      currentTextSearch: this.props.defaultValue || '',
    };
  }
  getCloseIcon() {
    const { currentTextSearch } = this.state;
    const { styleIconClose } = this.props;
    if (currentTextSearch) {
      return (
        <TouchableOpacity
          style={[styles.iconClear, styleIconClose]}
          activeOpacity={1}
          onPress={this.clearSearch}
        >
          <Icon name="ClearSearch" width="24" height="24" viewBox="0 0 24 24" fill={WHITE} />
        </TouchableOpacity>
      );
    }
    return null;
  }
  clearSearch() {
    const { clearSearchMethod } = this.props;
    this.searchInput.clear();
    this.setState({
      currentTextSearch: '',
    });
    if (clearSearchMethod) {
      clearSearchMethod();
    }
  }
  changeHandler(textSearch) {
    const { handlerChange } = this.props;
    handlerChange(textSearch);
    this.setState({
      currentTextSearch: textSearch,
    });
  }
  render() {
    const {
      placeholder,
      defaultValue,
      returnKeyType,
      styleInput,
      styleIcon,
    } = this.props;
    return (
      <View style={styles.boxSearch}>
        <TextInput
          style={[styles.inputSearch, styleInput]}
          onChangeText={this.changeHandler}
          underlineColorAndroid="transparent"
          placeholder={placeholder}
          defaultValue={defaultValue}
          returnKeyType={returnKeyType || 'default'}
          ref={(searchInput) => { this.searchInput = searchInput; }}
        />
        {this.getCloseIcon()}
        <Image style={[styles.iconSearch, styleIcon]} source={iconSearch} />
      </View>
    );
  }
}

SearchInput.defaultProps = {
  placeholder: '',
  debounceTime: 0,
  defaultValue: '',
  clearSearchMethod: null,
  returnKeyType: '',
  styleInput: {},
  styleIcon: {},
  styleIconClose: {},
};

SearchInput.propTypes = {
  handlerChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  debounceTime: PropTypes.number,
  defaultValue: PropTypes.string,
  clearSearchMethod: PropTypes.func,
  returnKeyType: PropTypes.string,
  styleInput: PropTypes.any,
  styleIcon: PropTypes.any,
  styleIconClose: PropTypes.any,
};

module.exports = SearchInput;
