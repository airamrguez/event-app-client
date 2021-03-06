'use strict'

import React, {
  Component,
  View,
  Navigator,
  StatusBar,
  PropTypes,
  BackAndroid
} from 'react-native'

/* Containers */
import { connect } from 'react-redux';
import _ from 'lodash';
import CalendarView from './CalendarView';
import EventMapView from './EventMapView';
import CompetitionView from './CompetitionNavigator';
import FeedView from './FeedView';
import ProfileView from './ProfileView';
import RegistrationView from '../components/registration/RegistrationView';
import errorAlert from '../utils/error-alert';

const AndroidTabs = require('react-native-scrollable-tab-view');
const theme = require('../style/theme');
const IconTabBar = require('../components/common/IconTabBar');

const AndroidTabNavigation = React.createClass({
  propTypes: {
    navigator: PropTypes.object.isRequired
  },
  render() {

    return (
      <AndroidTabs
        initialPage={2}
        tabBarPosition={'top'}
        tabBarUnderlineColor={theme.accent}
        tabBarBackgroundColor={theme.secondary}
        tabBarActiveTextColor={theme.light}
        tabBarInactiveTextColor={theme.light}
        renderTabBar={() => <IconTabBar rippleColor={theme.secondaryDark} />}
      >
        <EventMapView navigator={this.props.navigator} tabLabel={{title:'Map', icon:'map'}} />
        <CalendarView navigator={this.props.navigator} tabLabel={{title:'Events', icon:'event-note'}} />
        <FeedView navigator={this.props.navigator} tabLabel={{title:'Buzz', icon:'whatshot'}} />
        <CompetitionView tabLabel={{title:'Ranking', icon:'equalizer'}} />
        <ProfileView tabLabel={{title:'Profile', icon:'person'}} />
      </AndroidTabs>
    )
  }
});

let _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

class App extends Component {

  constructor(props) {
    super(props)
  }

  renderScene(route, navigator) {
    _navigator = navigator;
    if (route.component) {
      const RouteComponent = route.component;
      return <RouteComponent navigator={_navigator} route={route} {...this.props} />
    }
  }

  render() {
    const immutableError = this.props.errors.get('error');
    if (immutableError) {
      const error = immutableError.toJS();
      errorAlert(this.props.dispatch, _.get(error, 'header'), _.get(error, 'message'));
    }
    return (
      <View style={{flex:1}}>

      <StatusBar backgroundColor={theme.secondaryDark} />

      <Navigator
        initialRoute={{
          component: AndroidTabNavigation,
          name: 'Whappu'
        }}
        renderScene={this.renderScene}
        configureScene={() => ({
          ...Navigator.SceneConfigs.FloatFromBottomAndroid
        })}
      />
      <RegistrationView />
    </View>
    )
  }
}

const select = store => {
  return {
    currentTab: store.navigation.get('currentTab'),
    errors: store.errors
  }
};
export default connect(select)(App);
