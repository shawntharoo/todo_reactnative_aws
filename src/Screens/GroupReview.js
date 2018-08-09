import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Animated,
    Easing
} from 'react-native';
import {
    Button,
    Icon,
    List,
    ListItem
} from 'react-native-elements';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
import { colors } from 'theme';
import { API, Storage } from 'aws-amplify';
import SideMenuBell from '../Components/BellIcon';
import SegmentTab from 'react-native-segment-tab';

let styles = {};

class GroupReview extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => console.log(screenProps) || ({
        title: `Viewing`,
        headerRight: <SideMenuBell onPress={() => props.screenProps.rootNavigator.navigate('DrawerOpen')} />,
        headerStyle: {
            backgroundColor: '#04963a',
        },
        headerTintColor: 'black'
    })

    constructor(props) {
        super(props);
        this.handleRetrievePet = this.handleRetrievePet.bind(this);
        this.animate = this.animate.bind(this);
        this.animatedIcon = new Animated.Value(0);

        this.state = {
            apiResponse: null,
            loading: true,
            selected: 0
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

    openActionSheet = () => {
        this.ActionSheet.show()
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


    renderList() {
        const pet = {
            dob : '12/12/2018'
        }
        const list = [
            {
                name: 'Amy Farha',
                iconLeft: 'list',
                iconRight: 'arrow-right',
                subtitle: 'Vice President',
                rcolor: 'black'
            },
            {
                name: 'Chris Jackson',
                iconLeft: 'eye',
                iconRight: 'arrow-right',
                subtitle: 'Vice Chairman',
                rcolor: 'black'
            },
            {
                name: 'Amy Farha',
                iconLeft: 'list',
                iconRight: 'arrow-right',
                subtitle: 'Vice President',
                rcolor: 'black'
            },
            {
                name: 'Chris Jackson',
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
                                    this.props.navigation.navigate('ViewDashboard', {pet})
                                }}
                            />
                        ))
                    }
                </List>
            </View>
        )
    }

    render() {
        const { loading, apiResponse, selected } = this.state;
        const options = [
            'Cancel',
            <Text style={{ color: 'black' }}>Date</Text>,
            <Text style={{ color: 'black' }}>Status</Text>
        ]
        const spin = this.animatedIcon.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
        });

        return (
            <View style={[{ flex: 1 }]}>

                <ScrollView style={[{ flex: 1, zIndex: 0 }]} contentContainerStyle={[loading && { justifyContent: 'center', alignItems: 'center' }]}>
                    {loading && <Animated.View style={{ transform: [{ rotate: spin }] }}><Icon name='autorenew' color={colors.grayIcon} /></Animated.View>}
                    {
                        !loading &&
                        <View>


                            <View style={styles.titleBar}>
                                <View style={styles.header}>
                                    <Text style={styles.title}> Jira Test Plugin</Text>
                                </View>
                            </View>


                            <View style={styles.container}>
                                <SegmentTab
                                    data={['190 All Active', '120 On Track', '70 Delayed']}
                                    titleSize={10}
                                    selected={this.state.selected}
                                    horizontalWidth={360}
                                    borderRadius={1}
                                    activeColor='#4078bf'
                                    onPress={index => this.setState({ selected: index })}
                                />
                            </View>


                            {selected == 0 && <View >
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
                            </View>}

                            {selected == 1 && <View >
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
                            </View>}

                            {selected == 2 && <View >
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
                            </View>}


                        </View>
                    }

                </ScrollView>
            </View>
        );
    }
}

styles = StyleSheet.create({
    container: {
        padding: 10,
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
    filterButton: {
        width: 340,
        height: 25,
    }
});

export default GroupReview;
