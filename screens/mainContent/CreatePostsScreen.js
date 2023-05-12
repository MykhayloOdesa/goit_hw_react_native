import React, { useState } from 'react';
import {
  StyleSheet,
  Keyboard,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';

import { Camera, CameraType } from 'expo-camera';
import * as Location from 'expo-location';

import { collection, addDoc } from 'firebase/firestore';
import { database } from '../../firebase/config';

import { Fontisto, EvilIcons, AntDesign } from '@expo/vector-icons';

export default function CreatePostsScreen({ navigation }) {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [, setIsKeyboardShown] = useState(false);

  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const toggleCameraType = () => {
    setType(current =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    console.log('latitude', location.coords.latitude);
    console.log('longitude', location.coords.longitude);
    setPhoto(photo.uri);
  };

  // Add a new document with a generated id.
  const writeDataToFirestore = async () => {
    try {
      const docRef = await addDoc(collection(database, 'posts'), photo);

      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
      throw error;
    }
  };

  const sendPhoto = async () => {
    await writeDataToFirestore();

    setIsKeyboardShown(false);
    Keyboard.dismiss();

    navigation.navigate('Posts', { photo });
  };

  return (
    <View style={styles.container}>
      <View style={styles.overallWrapper}>
        <View style={styles.cameraWrapper}>
          <Camera style={styles.camera} ref={setCamera} type={type}>
            {photo && (
              <TouchableOpacity
                style={styles.takePhotoContainer}
                onPress={toggleCameraType}
              >
                <Image
                  source={{ uri: photo }}
                  style={{ width: 120, height: 90 }}
                />
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={takePhoto}>
              <Fontisto name="camera" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </Camera>
        </View>

        <Text style={styles.uploadTitle}>
          {photo ? 'Edit photo' : 'Take photo'}
        </Text>

        <View>
          <TextInput
            style={styles.input}
            placeholder="Title..."
            placeholderTextColor={'#BDBDBD'}
            value={photo.title}
            onFocus={() => setIsKeyboardShown(true)}
            onChangeText={value => {
              setPhoto(prevState => ({
                ...prevState,
                title: value,
              }));
            }}
          />
        </View>

        <View style={{ position: 'relative' }}>
          <View style={styles.locationIcon}>
            <EvilIcons name="location" size={24} color="#BDBDBD" />
          </View>

          <TextInput
            style={[styles.input, { paddingLeft: 24 }]}
            placeholder="Location..."
            placeholderTextColor={'#BDBDBD'}
            value={photo.location}
            onFocus={() => setIsKeyboardShown(true)}
            onChangeText={value => {
              setPhoto(prevState => ({
                ...prevState,
                location: value,
              }));
            }}
          />
        </View>

        <TouchableOpacity
          style={
            photo
              ? { ...styles.button, backgroundColor: '#FF6C00' }
              : styles.button
          }
          onPress={sendPhoto}
        >
          <Text
            style={
              photo
                ? { ...styles.buttonLabel, backgroundColor: '#FFFFFF' }
                : styles.buttonLabel
            }
          >
            Publish
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteIcon}
          onPress={() => setPhoto(null)}
        >
          <AntDesign name="delete" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
  },
  overallWrapper: {
    flex: 1,
    marginHorizontal: 16,
  },
  cameraWrapper: {
    position: 'relative',
    width: '100%',
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#E8E8E8',
  },
  camera: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  takePhotoContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  uploadTitle: {
    marginTop: 8,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#E8E8E8',
    backgroundColor: 'transparent',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
    marginTop: 32,
  },
  locationIcon: {
    position: 'absolute',
    bottom: 15,
    left: 0,
  },
  button: {
    height: 50,
    marginTop: 32,
    borderRadius: 100,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
  },
  deleteIcon: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10,
  },
});
