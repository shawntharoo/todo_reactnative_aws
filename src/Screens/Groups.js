import React from 'react';
import { View, ScrollView, Text, Animated, StyleSheet, Easing, Modal } from 'react-native';
import { Button, Icon, ListItem, List, SearchBar } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet'
import { API, Storage } from 'aws-amplify';
import SideMenuIcon from '../Components/SideMenuIcon';
import SideMenuBell from '../Components/BellIcon';
import { colors } from 'theme';
import ViewDashboard from './ViewDashboard';
import Chat from '../Screens/ChatView';
import GroupReview from '../Screens/GroupReview';

let styles = {};

class Group extends React.Component {
    constructor(props) {
        super(props);

        this.handleRetrievePet = this.handleRetrievePet.bind(this);
        this.animate = this.animate.bind(this);
        this.animatedIcon = new Animated.Value(0);

        this.state = {
            apiResponse: null,
            loading: true
        }
    }

    componentDidMount() {
        this.handleRetrievePet();
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

    handleRetrievePet() {
        API.get('Pets', '/items/pets').then(apiResponse => {
            return Promise.all(apiResponse.map(async (pet) => {

                const [, , , key] = /(([^\/]+\/){2})?(.+)$/.exec(pet.picKey);

                const picUrl = pet.picKey && await Storage.get(key, { level: 'private' });

                return { ...pet, picUrl };
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

    renderList() {
        const icon = "tasks";
        const list = [
            {
                name: 'ERA 2.0 Design Review',
                iconLeft: 'list',
                iconRight: 'arrow-right',
                subtitle: 'Vice President',
                rcolor: 'black'
            },
            {
                name: 'Cons Final Demo',
                iconLeft: 'eye',
                iconRight: 'arrow-right',
                subtitle: 'Vice Chairman',
                rcolor: 'black'
            },
            {
                name: 'JIRA Progress review',
                iconLeft: 'list',
                iconRight: 'arrow-right',
                subtitle: 'Vice President',
                rcolor: 'black'
            },
            {
                name: 'Dashboard review',
                iconLeft: 'eye',
                iconRight: 'arrow-right',
                subtitle: 'Vice Chairman',
                rcolor: 'black'
            },,
            {
                name: 'Perf Tune Centroid',
                iconLeft: 'eye',
                iconRight: 'arrow-right',
                subtitle: 'Vice Chairman',
                rcolor: 'black'
            },
            {
                name: 'JIRA UI Fix',
                iconLeft: 'list',
                iconRight: 'arrow-right',
                subtitle: 'Vice President',
                rcolor: 'black'
            },
            {
                name: 'HNB Sale Follow Up',
                iconLeft: 'eye',
                iconRight: 'arrow-right',
                subtitle: 'Vice Chairman',
                rcolor: 'black'
            },
        ]

        return (
            <View>
                <List containerStyle={{ marginBottom: 0 }}>
                    {
                        list.map((l, i) => (
                            <ListItem
                                key={i}
                                title={l.name}
                                rightIcon={{ name: l.iconRight, type: 'font-awesome', style: { marginRight: 10, fontSize: 20, color: l.rcolor } }}
                                onPress={() => {
                                    this.props.navigation.navigate('GroupReview')
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
                        <View>
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
                                    containerViewStyle={{ marginTop: 5 }}
                                    onPress={this.openActionSheet}
                                    title="Filter By"
                                    color="#f2f2f2"
                                    accessibilityLabel="Learn more about this purple button"
                                />
                            </View>


                            <View style={styles.container}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <SearchBar
                                        lightTheme
                                        icon={{ type: 'font-awesome', name: 'search' }}
                                        placeholder='Search Resource...' containerStyle={styles.SearchBar}
                                        inputStyle={styles.SearchBarInput} />
                                </View>

                                {
                                    typeof apiResponse === 'string' ?
                                        <Text>{apiResponse}</Text> :
                                        this.renderList()
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
                        </View>
                    }
                </ScrollView>
            </View >
        );
    }
};

styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    filterButton: {
        width: 340,
        height: 25,
    },
    SearchBar: {
        width: 350,
        backgroundColor: colors.darkGray
    },
    SearchBarInput: {
        backgroundColor: colors.white
    },
})



const GroupRouteStack = {
    Group: {
        screen: (props) => {
            const { screenProps, ...otherProps } = props;
            return <Group {...props.screenProps} {...otherProps} />
        },
        navigationOptions: (props) => {
            return {
                title: 'Groups',
                headerLeft: <SideMenuIcon onPress={() => props.screenProps.rootNavigator.navigate('DrawerOpen')} />,
                headerRight: <SideMenuBell onPress={() => props.screenProps.rootNavigator.navigate('DrawerOpen')}  />,
                headerStyle: {
                    backgroundColor: '#04963a',
                },
            }
        }
    },
    GroupReview : {screen : GroupReview },
    ViewDashboard: {
      screen: ViewDashboard
    },
    Chat: { screen: Chat }
};

const GroupNav = StackNavigator(GroupRouteStack);

export default (props) => {
    const { screenProps, rootNavigator, ...otherProps } = props;

    return <GroupNav screenProps={{ rootNavigator, ...screenProps, ...otherProps }} />
};
