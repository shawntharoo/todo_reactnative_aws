import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import { colors } from 'theme';
import { Icon } from 'react-native-elements';

const styles = StyleSheet.create({
  iconContainer: {
    width: 40,
    right: 10,
  },
});

const SideMenuBell= ({ onPress }) => (
  <View style={styles.iconContainer}>
    <Icon underlayColor="transparent" type='font-awesome' onPress={onPress} name="bell" color={colors.white} />
  </View>
);

export default SideMenuBell;
