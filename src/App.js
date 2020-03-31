/**
 * Main Samus App. Gusty Garden project.
 */

import React from 'react';
import {StyleSheet, Text, View} from 'react-native'

import MyComponent from './components/MyComponents';


class App extends React.Component{

  name = () => {
    return 'and everyone else.';
  }

  render() {
    return (
      <View style={styles.container}>
        <MyComponent
          description='My description'
          name='Repo X'
          stargazers_count={123}/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd'
  }
});

export default App;
