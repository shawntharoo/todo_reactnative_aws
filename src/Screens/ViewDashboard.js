import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';
import {
  FormLabel,
  FormInput,
  Button,
  Icon
} from 'react-native-elements';
import DatePicker from '../Components/DatePicker';
import { colors } from 'theme';
import SideMenuBell from '../Components/BellIcon';

class ViewDashboard extends React.PureComponent {

  static navigationOptions = ({ navigation, screenProps }) => console.log(screenProps) || ({
    title: `Viewing ${navigation.state.params.pet.name}`,
    headerRight: <SideMenuBell onPress={() => props.screenProps.rootNavigator.navigate('DrawerOpen')} />,
    headerStyle: {
      backgroundColor: '#04963a',
    },
    headerTintColor: 'black'
  })

  render() {

    const { pet } = this.props.navigation.state.params;
    const dob = new Date(pet.dob);
    const years = (new Date()).getFullYear() - dob.getFullYear();
    const birthDay = `${years} years old, ${dob.getMonth() + 1}/${dob.getDate()}/${dob.getFullYear()}`;

    return (
      <View>
        <ScrollView>
          <View style={styles.titleBar}>
            <View style={styles.header}>
              <Icon name="wrench" type="font-awesome" size={15} />
              <Text style={styles.title}> Dashboard Review</Text>
            </View>
          </View>

          <FormLabel>Task Name</FormLabel>
          <FormInput
            inputStyle={styles.input}
            selectionColor={colors.primary}
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="transparent"
            editable={false}
            placeholder="Please enter the task title"
            returnKeyType="next"
          />

          <FormLabel>Task Description</FormLabel>
          <FormInput
            inputStyle={styles.input}
            selectionColor={colors.primary}
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="transparent"
            editable={false}
            placeholder="Please enter a description"
            returnKeyType="next"
            multiline={true}
            numberOfLines={4}
          />

          <FormLabel>Assigned User</FormLabel>
          <FormInput
            inputStyle={styles.input}
            selectionColor={colors.primary}
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="transparent"
            editable={false}
            placeholder="Please enter a assign user"
            returnKeyType="next"
          />

          <FormLabel>Due Date</FormLabel>
          <DatePicker
            inputStyle={styles.input}
            selectionColor={colors.primary}>
          </DatePicker>

          <FormLabel>Assign Group</FormLabel>
          <FormInput
            inputStyle={styles.input}
            selectionColor={colors.primary}
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="transparent"
            editable={false}
            placeholder="Please enter a assign group"
            returnKeyType="next"
          />
          <Button
            fontFamily='lato'
            containerViewStyle={{ marginTop: 20 }}
            backgroundColor={colors.red}
            large
            title="Update Task"
            buttonStyle={styles.addTaskButton}
          />
          <View flex={1} style={styles.discussion}>
            <Icon underlayColor="transparent" type='font-awesome' name="wechat" color={colors.black} size={50}
            onPress={() => {
              this.props.navigation.navigate('Chat')
            }}
            />
            <Text style={styles.discussTxt}> Discussion</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const imageSize = 130;
const styles = StyleSheet.create({
  image: {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  },
  title: {
    color: colors.white,
    fontSize: 18,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 20,
  },
  titleBar: {
    backgroundColor: '#65a36c'
  },
  input: {
    fontFamily: 'lato',
  },
  addTaskButton: {
    width: 350,
    height: 35,
  },
  discussion: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginBottom: 15,
    marginHorizontal: 15,
    marginTop: 20,
  },
  discussTxt: {
    fontSize: 15
  }
});

export default ViewDashboard;
