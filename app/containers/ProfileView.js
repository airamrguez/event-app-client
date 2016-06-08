'use strict';

import React, {
  Navigator,
  StyleSheet,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import Profile from '../components/profile/Profile';
import NavRouteMapper from '../components/common/navbarRouteMapper';
const theme = require('../style/theme');

const styles = StyleSheet.create({
  navigator: {
    paddingTop: Platform.OS === 'ios' ? 42 : 0
  },
  navbar: {
    backgroundColor: theme.secondary,
    height: 62,
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

var ProfileView = React.createClass({
  renderScene(route, navigator) {
    if (route.component) {
      const RouteComponent = route.component;
      return <RouteComponent navigator={navigator} route={route} {...this.props} />
    }
  },

  render() {
    return (
      <Navigator
        style={styles.navigator}
        navigationBar={
          Platform.OS === 'ios' ? <Navigator.NavigationBar
            style={styles.navbar}
            routeMapper={NavRouteMapper} /> : null
        }
        initialRoute={{
          component: Profile,
          name: 'Settings'
        }}
        renderScene={this.renderScene}
        configureScene={() => ({
          ...Navigator.SceneConfigs.FloatFromRight
        })}
      />
    );
  }
});

const select = store => {
  return {};
};

export default connect(select)(ProfileView);
