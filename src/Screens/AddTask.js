import React from 'react';
import {
  View,
  Text,
  CameraRoll,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  Dimensions,
  Image,
  ScrollView,
  ImageStore,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {
  FormLabel,
  FormInput,
  Button,
  Icon,
} from 'react-native-elements';
import { colors } from 'theme';
import { StackNavigator } from 'react-navigation';
import DatePicker from '../Components/DatePicker';
import SideMenuBell from '../Components/BellIcon';
import Contacts from 'react-native-contacts';
import { API, Storage } from '../../node_modules/aws-amplify';

import RNFetchBlob from 'react-native-fetch-blob';
import uuid from 'react-native-uuid';
import mime from 'mime-types';
import files from '../Utils/files';
import UploadPhoto from '../Components/UploadPhoto';


const { width, height } = Dimensions.get('window');
let styles = {};

class AddTask extends React.Component {

  state = {
    selectedImage: {},
    selectedImageIndex: null,
    images: [],
    modalVisible: false,
    input: {
      title: '',
      description: '',
      assignUser: '',
      dueDate: null,
      assignGroup: '',
    },
    showActivityIndicator: false,
  }

  getPhotos = () => {
    CameraRoll
      .getPhotos({
        first: 4,
      })
      .then(res => {
        this.setState({ images: res.edges })
        this.props.navigation.navigate('UploadPhoto', { data: this.state, updateSelectedImage: this.updateSelectedImage })
      })
      .catch(err => console.log('error getting photos...:', err))
  }

  readImage(imageNode = null) {
    if (imageNode === null) {
      return Promise.resolve();
    }

    const { image } = imageNode;
    const result = {};

    if (Platform.OS === 'ios') {
      result.type = mime.lookup(image.filename);
    } else {
      result.type = imageNode.type;
    }

    const extension = mime.extension(result.type);
    const imagePath = image.uri;
    const picName = `${uuid.v1()}.${extension}`;
    const key = `${picName}`;

    return files.readFile(imagePath)
      .then(buffer => Storage.put(key, buffer, { level: 'private', contentType: result.type }))
      .then(fileInfo => ({ key: fileInfo.key }))
      .then(x => console.log('SAVED', x) || x);
  }

  updateSelectedImage = (selectedImage, selectedImageIndex) => {
    if (selectedImageIndex === this.state.selectedImageIndex) {
      this.setState({
        selectedImageIndex: null,
        selectedImage: {}
      })
    } else {
      this.setState({
        selectedImageIndex,
        selectedImage,
      });
    }
  }





  componentDidMount() {
    Contacts.getAll((err, contacts) => {
      if (err) {
        console.log(err);
        throw err
      };

      console.log(contacts)
    })
  }

  AddTask = async () => {
    const taskInfo = this.state.input;
    // const { node: imageNode } = this.state.selectedImage;
    // this.readImage(imageNode)
    // .then(fileInfo => {
    //   console.log(fileInfo);
    // })

    this.setState({ showActivityIndicator: true });

    await API.post('todo', '/items/addTask', { body: taskInfo })
      .then(data => {
        console.log(data);
        this.setState({ showActivityIndicator: false });
        this.props.screenProps.handleRetrieveTask();
        this.props.screenProps.toggleModal();
      })
      .catch(err => {
        console.log('error saving task...', err);
        this.setState({ showActivityIndicator: false });
      });
  }

  updateInput = (key, value) => {
    this.setState((state) => ({
      input: {
        ...state.input,
        [key]: value,
      }
    }))
  }

  toggleModal = () => {
    this.setState(() => ({ modalVisible: !this.state.modalVisible }))
  }

  render() {
    const { selectedImageIndex, selectedImage } = this.state;
    return (
      <View>
        <ScrollView>

          <View style={styles.titleBar}>
            <View style={styles.header}>
              <Icon name="wrench" type="font-awesome" size={20} />
              <Text style={styles.title}> New Task</Text>
            </View>
          </View>


          {/* <TouchableWithoutFeedback
            onPress={this.getPhotos}
          >
            {
              selectedImageIndex === null ? (
                <View style={styles.addImageContainer}>
                  <Icon size={34} name='camera-roll' color={colors.grayIcon} />
                  <Text style={styles.addImageTitle}>Upload Photo</Text>
                </View>
              ) : (
                  <Image
                    style={styles.addImageContainer}
                    source={{ uri: selectedImage.node.image.uri }}
                  />
                )
            }
          </TouchableWithoutFeedback> */}


          <FormLabel>Task Name</FormLabel>
          <FormInput
            inputStyle={styles.input}
            selectionColor={colors.primary}
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="transparent"
            editable={true}
            placeholder="Please enter the task title"
            returnKeyType="next"
            ref="title"
            textInputRef="titleInput"
            onChangeText={(title) => this.updateInput('title', title)}
            value={this.state.input.title}
          />

          <FormLabel>Task Description</FormLabel>
          <FormInput
            inputStyle={styles.input}
            selectionColor={colors.primary}
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="transparent"
            editable={true}
            placeholder="Please enter a description"
            returnKeyType="next"
            ref="description"
            multiline={true}
            numberOfLines={4}
            textInputRef="descriptionInput"
            onChangeText={(description) => this.updateInput('description', description)}
            value={this.state.input.description}
          />

          <FormLabel>Assigned User</FormLabel>
          <FormInput
            inputStyle={styles.input}
            selectionColor={colors.primary}
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="transparent"
            editable={true}
            placeholder="Please enter a assign user"
            returnKeyType="next"
            ref="assignUser"
            textInputRef="assuserInput"
            onChangeText={(assignUser) => this.updateInput('assignUser', assignUser)}
            value={this.state.input.assignUser}
          />

          <FormLabel>Due Date</FormLabel>
          <DatePicker
            inputStyle={styles.input}
            selectionColor={colors.primary}
            value={this.state.input.dueDate}
            ref="datepicker"
            onDateChange={date => this.updateInput('dueDate', date)}>
          </DatePicker>

          <FormLabel>Assign Group</FormLabel>
          <FormInput
            inputStyle={styles.input}
            selectionColor={colors.primary}
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="transparent"
            editable={true}
            placeholder="Please enter a assign group"
            returnKeyType="next"
            ref="assignGroup"
            textInputRef="assgroupInput"
            onChangeText={(assignGroup) => this.updateInput('assignGroup', assignGroup)}
            value={this.state.input.assignGroup}
          />
          <Button
            fontFamily='lato'
            containerViewStyle={{ marginTop: 20 }}
            backgroundColor={colors.red}
            large
            title="Add Task"
            onPress={this.AddTask}
            buttonStyle={styles.addTaskButton}
          />
          <Text
            onPress={this.props.screenProps.toggleModal}
            style={styles.closeModal}>Dismiss</Text>
        </ScrollView>
        <Modal
          visible={this.state.showActivityIndicator}
          onRequestClose={() => null}
        >
          <ActivityIndicator
            style={styles.activityIndicator}
            size="large"
          />
        </Modal>
      </View>
    );
  }
}

styles = StyleSheet.create({
  closeModal: {
    color: colors.darkGray,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
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
  activityIndicator: {
    backgroundColor: colors.mask,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  addImageContainer: {
    width: 120,
    height: 120,
    backgroundColor: colors.lightGray,
    borderColor: colors.mediumGray,
    borderWidth: 1.5,
    marginVertical: 14,
    borderRadius: 60,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});


const AddPetRouteStack = {
  AddTask: {
    screen: (props) => {
      const { screenProps, ...otherProps } = props;
      return <AddTask screenProps={{ ...props.screenProps }} {...otherProps} />
    },
    navigationOptions: (props) => {
      return {
        title: 'Add Tasks',
        headerRight: <SideMenuBell onPress={() => props.screenProps.rootNavigator.navigate('DrawerOpen')} />,
        headerStyle: {
          backgroundColor: '#04963a'
        },
        headerTintColor: 'black'
      }
    }
  },
  UploadPhoto: { screen: UploadPhoto }
};

const AddTaskNav = StackNavigator(AddPetRouteStack);
export default AddTaskNav;
