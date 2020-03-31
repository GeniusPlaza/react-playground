import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import PropTypes from 'prop-types';


class MyComponent extends React.Component {

  state = {
    isSelected: false
  }

  static propTypes = {
    isSelected: PropTypes.bool,
    selectRepo: PropTypes.func,
  };

  static defaultProps = {
     name: 'Default Name',
  };

  selectRepo = () => {
    // Invert a boolean | Change boolean.
    let selected = this.state.isSelected;
    this.setState({
      isSelected: !selected
    });
  }

  render() {

    const itemStyle = (
      this.state.isSelected && [styles.item, styles.selected] || styles.item);

    return (
      <TouchableHighlight
        onPress={() => {this.selectRepo()}}
        underlayColor='#E0F2F1'>
        <View style={itemStyle}>
          <Text style={styles.title}>{this.props.name}</Text>
          <Text style={styles.stars}>
            {`${this.props.stargazers_count} stars`}
          </Text>
          { this.state.isSelected 
            ? <Text style={styles.back}>{this.props.description}</Text> 
            : null }
        </View>
      </TouchableHighlight>
    );
  }
};


export const styles = StyleSheet.create({
  item: {
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  selected: {
    backgroundColor: '#B2DFDB',
  },
  stars: {
    paddingBottom: 8,
  },
  back: {
    backgroundColor: '#DDD', 
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 4,
  },
});


export default MyComponent;
