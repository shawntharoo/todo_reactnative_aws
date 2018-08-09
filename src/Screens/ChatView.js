import React from 'react';
import {
    View,
    StyleSheet,
    Animated,
    Easing,
} from 'react-native';
import {
    Icon
} from 'react-native-elements';
import SideMenuBell from '../Components/BellIcon';
import { GiftedChat } from 'react-native-gifted-chat';
import "prop-types";

const styles = StyleSheet.create({
    mapView: {
        width: 150,
        height: 100,
        borderRadius: 13,
        margin: 3,
    },
});

class Chat extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => console.log(screenProps) || ({
        title: `Viewing`,
        headerRight: <SideMenuBell onPress={() => props.screenProps.rootNavigator.navigate('DrawerOpen')} />,
        headerStyle: {
            backgroundColor: '#04963a',
        },
        headerTintColor: 'black'
    })


    state = {
        messages: []
    }

    constructor(props) {
        super(props);
        this.animate = this.animate.bind(this);
        this.animatedIcon = new Animated.Value(0);

        this.state = {
            loading: false
        }
    }

    renderCustomView = (props) => {
        if (props.currentMessage.location) {
          return (
            <View style={props.containerStyle}>
              <Text> A simple view </Text>
            </View>
          );
        }
        return null
      }

    componentWillMount() {
        this.setState({
            messages: [
                {
                    _id: Math.round(Math.random() * 1000000),
                    text: '#awesome',
                    createdAt: new Date(),
                    user: {
                        _id: 1,
                        name: 'Developer',
                    },
                },
                {
                    _id: Math.round(Math.random() * 1000000),
                    text: 'yes it is',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                    },
                    sent: true,
                    received: true,
                },
                {
                    _id: Math.round(Math.random() * 1000000),
                    text: 'is it available on both ios and android?',
                    createdAt: new Date(),
                    user: {
                        _id: 1,
                        name: 'Developer',
                    },
                },
                {
                    _id: Math.round(Math.random() * 1000000),
                    text: 'Sri Lanka',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                    },
                    sent: true,
                    received: true,
                },
                {
                    _id: Math.round(Math.random() * 1000000),
                    text: 'Where are you?',
                    createdAt: new Date(),
                    user: {
                        _id: 1,
                        name: 'Developer',
                    },
                },
                {
                    _id: Math.round(Math.random() * 1000000),
                    text: 'Yes',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                    },
                    sent: true,
                    received: true
                },
                {
                    _id: Math.round(Math.random() * 1000000),
                    text: 'Are you building a todo app?',
                    createdAt: new Date(),
                    user: {
                        _id: 1,
                        name: 'Developer',
                    },
                },
                {
                    _id: Math.round(Math.random() * 1000000),
                    text: "The start of the chat",
                    createdAt: new Date(),
                    system: true,
                },
            ]
        });
    }

    onSend(messages = []) {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
    }

    componentDidMount() {
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

    render() {
        const { loading } = this.state;
        const spin = this.animatedIcon.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
        });

        return (
            <View style={[{ flex: 1 }]}>

                <GiftedChat
                    messages={this.state.messages}
                    onSend={(messages) => this.onSend(messages)}
                    renderCustomView={this.renderCustomView}
                    user={{
                        _id: 1,
                    }}
                    parsePatterns={linkStyle => [
                        {
                            pattern: /#(\w+)/,
                            style: { ...linkStyle, color: 'lightgreen' },
                            onPress: props => alert(`press on ${props}`),
                        },
                    ]}
                />

            </View>
        );
    }
}



export default Chat;
