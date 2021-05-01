import React from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './src/components/Login';
import OtpVerify from './src/components/OtpVerify';
import Discover from './src/components/Discover';
import Notes from './src/components/Notes';

import DiscoverIcon from './src/assets/images/4.svg';
import NotesIcon from './src/assets/images/1.svg';
import MatchesIcon from './src/assets/images/2.svg';
import ProfileIcon from './src/assets/images/3.svg';
import Matches from './src/components/Matches';
import Profile from './src/components/Profile';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const DiscoverTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="screen3"
      screenOptions={({route}) => ({
        tabBarLabel: () => {
          let label;
          if (route.name === 'screen3') {
            label = 'Discover';
          } else if (route.name === 'notes') {
            label = 'Notes';
          } else if (route.name === 'matches') {
            label = 'Matches';
          } else if (route.name === 'profile') {
            label = 'Profile';
          }
          return <Text>{label}</Text>;
        },
        tabBarIcon: () => {
          let iconName;
          if (route.name === 'screen3') {
            iconName = <DiscoverIcon width={25} height={25} />;
          } else if (route.name === 'notes') {
            iconName = <NotesIcon width={25} height={25} />;
          } else if (route.name === 'matches') {
            iconName = <MatchesIcon width={25} height={25} />;
          } else if (route.name === 'profile') {
            iconName = <ProfileIcon width={25} height={25} />;
          }

          return iconName;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="screen3" component={Discover} />
      <Tab.Screen name="notes" component={Notes} options={{tabBarBadge: 3}} />
      <Tab.Screen
        name="matches"
        component={Matches}
        options={{tabBarBadge: 30}}
      />
      <Tab.Screen name="profile" component={Profile} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="screen1"
        mode="card"
        headerMode="screen"
        screenOptions={() => ({
          headerBackTitleVisible: false,
          headerTitle: 'Aisle replication',
        })}>
        <Stack.Screen name="screen1" component={Login} />
        <Stack.Screen name="screen2" component={OtpVerify} />
        <Stack.Screen name="discovertab" component={DiscoverTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
