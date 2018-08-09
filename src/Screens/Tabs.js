import React from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import {  TabNavigator } from 'react-navigation';
import {
  Icon,
} from 'react-native-elements';
import TaskNav from '../Screens/Task';
import UserNav from '../Screens/Users';
import GroupNav from '../Screens/Groups';
import DiscussionNav from '../Screens/Discussion';
import { colors } from 'theme';

const styles = StyleSheet.create({
  tabBarLabel: { marginLeft: 0 },
  tabBarIconContainer: { flexDirection: 'column', alignItems: 'center', height: 30 },
});

const TabsScreen = TabNavigator({
  Task: {
    screen: (props) => {
      const { screenProps, navigation, ...otherProps } = props;

      return (
        <TaskNav
          { ...screenProps }
          { ...otherProps }
        />
      );
    },
    navigationOptions: {
      tabBarLabel: 'Task',
      tabBarIcon: ({ tintColor }) => (
        <View style={styles.tabBarIconContainer}>
          <Icon type='font-awesome' name="wrench" style={styles.tabBarIcon} color={tintColor} />
        </View>
      ),
    },
  },
  User: {
    screen: (props) => {
      const { screenProps, ...otherProps } = props;

      return (
        <UserNav
          { ...screenProps }
          { ...otherProps }
        />
      )
    },
    navigationOptions: {
      tabBarLabel: 'User',
      tabBarIcon: ({ tintColor }) => (
        <View style={styles.tabBarIconContainer}>
          <Icon type='font-awesome' name="user" style={styles.tabBarIcon} color={tintColor} />
        </View>
      )
    },
  },
  Group: {
    screen: (props) => {
      const { screenProps, ...otherProps } = props;

      return (
        <GroupNav
          { ...screenProps }
          { ...otherProps }
        />
      )
    },
    navigationOptions: {
      tabBarLabel: 'Groups',
      tabBarIcon: ({ tintColor }) => (
        <View style={styles.tabBarIconContainer}>
          <Icon type='font-awesome' name="group" style={styles.tabBarIcon} color={tintColor} />
        </View>
      )
    },
  },
  Discussion: {
    screen: (props) => {
      const { screenProps, ...otherProps } = props;

      return (
        <DiscussionNav
          { ...screenProps }
          { ...otherProps }
        />
      )
    },
    navigationOptions: {
      tabBarLabel: 'Discussions',
      tabBarIcon: ({ tintColor }) => (
        <View style={styles.tabBarIconContainer}>
          <Icon type='font-awesome' name="wechat" style={styles.tabBarIcon} color={tintColor} />
        </View>
      )
    },
  },
}, {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      tabStyle: { borderTopWidth: 0.5, borderTopColor: '#ededed' },
      showIcon: true,
      showLabel: Platform.OS === 'ios',
      activeTintColor: colors.primary,
    },
  });

export default (props) => {
  const { screenProps, ...otherProps } = props;
  return <TabsScreen screenProps={{ ...screenProps, ...otherProps }} />
};
