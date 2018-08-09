import React from 'react';
import { View, ScrollView, Text, Animated, StyleSheet, Easing, Modal } from 'react-native';
import { Button, Icon, ListItem, List } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet'
import { API } from 'aws-amplify';
import AddTaskNav from './AddTask';
import ViewDashboard from './ViewDashboard';
import SideMenuIcon from '../Components/SideMenuIcon';
import { colors } from 'theme';
import SideMenuBell from '../Components/BellIcon';
import Chat from '../Screens/ChatView';

let styles = {};

class Task extends React.Component {
  constructor(props) {
    super(props);

    this.handleRetrieveTask = this.handleRetrieveTask.bind(this);
    this.animate = this.animate.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.openActionSheet = this.openActionSheet.bind(this);
    this.animatedIcon = new Animated.Value(0);

    this.state = {
      apiResponse: null,
      loading: true,
      modalVisible: false,
    }
  }

  componentDidMount() {
    this.handleRetrieveTask();
    this.animate();
  }

  animate() {
    Animated.loop(
      Animated.timing(
        this.animatedIcon,
        {
          toValue: 1,
          duration: 1300,
          easing: Easing.linear,
        }
      )
    ).start();
  }

  handleRetrieveTask() {
    API.get('todo', '/items/userTask').then(apiResponse => {
      return Promise.all(apiResponse.map(async (pet) => {

        // const [, , , key] = /(([^\/]+\/){2})?(.+)$/.exec(pet.picKey);

        // const picUrl = pet.picKey && await Storage.get(key, { level: 'private' });

        return { ...pet };
      }));
    }).then(apiResponse => {
      this.setState({ apiResponse, loading: false });
    }).catch(e => {
      this.setState({ apiResponse: e.message, loading: false });
    });
  }

  openActionSheet = () => {
    this.ActionSheet.show()
  }

  toggleModal() {
    if (!this.state.modalVisible) {
      this.handleRetrieveTask();
      this.animate();
    }
    this.setState((state) => ({ modalVisible: !state.modalVisible }));
  }

  renderList(pet, index) {
    const list = [
      {
        name: 'ERA 2.0 Design Review',
        iconLeft: 'list',
        iconRight: 'upload',
        subtitle: 'Vice President',
        rcolor: 'green'
      },
      {
        name: 'Cons Final Demo',
        icon: 'download',
        iconLeft: 'eye',
        iconRight: 'download',
        subtitle: 'Vice Chairman',
        rcolor: 'orange'
      },
      {
        name: 'JIRA Progress review',
        iconLeft: 'list',
        iconRight: 'download',
        subtitle: 'Vice President',
        rcolor: 'orange'
      },
      {
        name: 'Dashboard review',
        icon: 'download',
        iconLeft: 'eye',
        iconRight: 'upload',
        subtitle: 'Vice Chairman',
        rcolor: 'green'
      },
      {
        name: 'Perf Tune Centroid',
        iconLeft: 'list',
        iconRight: 'download',
        subtitle: 'Vice President',
        rcolor: 'orange'
      },
      {
        name: 'JIRA UI Fix',
        icon: 'download',
        iconLeft: 'eye',
        iconRight: 'download',
        subtitle: 'Vice Chairman',
        rcolor: 'orange'
      },
      {
        name: 'HNB Sale Follow Up',
        iconLeft: 'list',
        iconRight: 'download',
        subtitle: 'Vice President',
        rcolor: 'orange'
      },
      {
        name: 'Citi RPA Status',
        icon: 'download',
        iconLeft: 'eye',
        iconRight: 'upload',
        subtitle: 'Vice Chairman',
        rcolor: 'green'
      },
      {
        name: 'BNY Client Update',
        iconLeft: 'list',
        iconRight: 'upload',
        subtitle: 'Vice President',
        rcolor: 'green'
      },
      {
        name: 'Demo',
        icon: 'download',
        iconLeft: 'eye',
        iconRight: 'download',
        subtitle: 'Vice Chairman',
        rcolor: 'orange'
      }
    ]

    return (
      <View>
        <List containerStyle={styles.listStyle}>
          {
            list.map((l, i) => (
              <ListItem
                key={i}
                title={l.name}
                leftIcon={{ name: l.iconLeft, type: 'font-awesome', style: styles.leftIcon }}
                rightIcon={{ name: l.iconRight, type: 'font-awesome', style: { marginRight: 10, fontSize: 20, color: l.rcolor } }}
                onPress={() => {
                  this.props.navigation.navigate('ViewDashboard', { pet })
                }}
              />
            ))
          }
        </List>
      </View>
    )
  }

  render() {
    const { loading, apiResponse } = this.state;
    const spin = this.animatedIcon.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    const options = [
      'Cancel',
      <Text style={{ color: 'black' }}>Date</Text>,
      <Text style={{ color: 'black' }}>Status</Text>
    ]

    return (
      <View style={[{ flex: 1 }]}>
        {!loading && <View style={{ position: 'absolute', bottom: 25, right: 25, zIndex: 1 }}>
          <Icon
            onPress={this.toggleModal}
            raised
            reverse
            name='add'
            size={44}
            containerStyle={{ width: 50, height: 50 }}
            color={colors.primary}
          />
        </View>}
        <ScrollView style={[{ flex: 1, zIndex: 0 }]} contentContainerStyle={[loading && { justifyContent: 'center', alignItems: 'center' }]}>
          {loading && <Animated.View style={{ transform: [{ rotate: spin }] }}><Icon name='autorenew' color={colors.grayIcon} /></Animated.View>}
          {
            !loading &&
            <View style={styles.container}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Button
                  buttonStyle={styles.filterButton}
                  icon={
                    <Icon
                      name='arrow-right'
                      size={17}
                      color='white'
                    />
                  }
                  onPress={this.openActionSheet}
                  title="Filter By"
                  color="#f2f2f2"
                  accessibilityLabel="Learn more about this purple button"
                />
              </View>

              {
                typeof apiResponse === 'string' ?
                  <Text>{apiResponse}</Text> :
                  apiResponse.map((pet, index) => this.renderList(pet, index))
              }
              <View>
                <ActionSheet
                  ref={o => this.ActionSheet = o}
                  title={<Text style={{ color: '#000', fontSize: 18 }}>Filter options</Text>}
                  options={options}
                  cancelButtonIndex={0}
                  destructiveButtonIndex={4}
                  onPress={(index) => { /* do something */ }}
                />
              </View>
            </View>
          }
        </ScrollView>

        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={this.toggleModal}
        >
          <AddTaskNav screenProps={{ handleRetrieveTask: this.handleRetrieveTask, toggleModal: this.toggleModal, otherProps: { ...this.props } }} />
        </Modal>

      </View >
    );
  }
};

styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  filterButton: {
    width: 320,
    height: 30,
  },
  leftIcon: {
    marginRight: 10,
    color: '#1d6799'
  },
  listStyle: {
    marginBottom: 20
  }
})

const HomeRouteStack = {
  Task: {
    screen: (props) => {
      const { screenProps, ...otherProps } = props;
      return <Task {...props.screenProps} {...otherProps} />
    },
    navigationOptions: (props) => {
      return {
        title: 'Tasks',
        headerLeft: <SideMenuIcon onPress={() => props.screenProps.rootNavigator.navigate('DrawerOpen')} />,
        headerRight: <SideMenuBell />,
        headerStyle: {
          backgroundColor: '#04963a',
        },
      }
    }
  },
  ViewDashboard: { screen: ViewDashboard },
  Chat: { screen: Chat }
};

const TaskNav = StackNavigator(HomeRouteStack);

export default (props) => {
  const { screenProps, rootNavigator, ...otherProps } = props;
  return <TaskNav screenProps={{ rootNavigator, ...screenProps, ...otherProps }} />
};
