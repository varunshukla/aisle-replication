import React from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Screen1 from './src/components/Screen1';
import Screen2 from './src/components/Screen2';
import Screen3 from './src/components/Screen3';

import DiscoverIcon from './src/assets/images/4.svg';
import NotesIcon from './src/assets/images/1.svg';
import MatchesIcon from './src/assets/images/2.svg';
import ProfileIcon from './src/assets/images/3.svg';

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
      <Tab.Screen name="screen3" component={Screen3} />
      <Tab.Screen name="notes" component={Screen3} options={{tabBarBadge: 3}} />
      <Tab.Screen
        name="matches"
        component={Screen3}
        options={{tabBarBadge: 30}}
      />
      <Tab.Screen name="profile" component={Screen3} />
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
        <Stack.Screen name="screen1" component={Screen1} />
        <Stack.Screen name="screen2" component={Screen2} />
        <Stack.Screen name="discovertab" component={DiscoverTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
