import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  // ScrollView,
  FlatList,
  // Dimensions,
} from 'react-native';

import { Feather, EvilIcons, FontAwesome5, Entypo } from '@expo/vector-icons';

import { useDispatch, useSelector } from 'react-redux';
import { collection, getDocs, query, where } from 'firebase/firestore';

import { authSignOutUser } from '../../redux/auth/authOperations';
import { database } from '../../firebase/config';

export default function ProfileScreen({ navigation }) {
  const [userPosts, setUserPosts] = useState([]);
  // const [dimensions, setDimensions] = useState(
  //   Dimensions.get('window').width - 16 * 2
  // );

  const { login, userID } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    getUserPosts();
  }, []);

  // useEffect(() => {
  //   const onChange = () => {
  //     const width = Dimensions.get('window').width - 16 * 2;
  //     setDimensions(width);
  //   };

  //   Dimensions.addEventListener('change', onChange);

  //   return () => {
  //     Dimensions.removeEventListener('change', onChange);
  //   };
  // }, []);

  const getUserPosts = async () => {
    try {
      const array = [];

      const ref = collection(database, 'posts');

      // Create a query against the collection.
      const q = query(ref, where('userID', '==', userID));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(post =>
        array.push({ ...post.data(), id: post.id })
      );

      setUserPosts(array);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <View style={{ ...styles.container }}>
      {/* <ScrollView
        contentContainerStyle={styles.keyboardWrappper}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      > */}
      <Image
        style={styles.background}
        source={require('../../assets/images/background/photo_BG_3x.jpg')}
      />

      <View
        style={{
          ...styles.overallWrapper,
          // width: dimensions + 16 * 2,
        }}
      >
        <View style={styles.avatar}>
          <View style={styles.userPhotoWrapper}>
            <Image
              style={styles.userPhoto}
              source={require('../../assets/images/user_photos/profile_user_3x.jpg')}
            />
          </View>

          <TouchableOpacity style={styles.iconWrapper} activeOpacity={0.8}>
            <Image
              style={styles.addIcon}
              source={require('../../assets/images/profile_add/add_3x.png')}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.logOutBtn}
          onPress={() => {
            dispatch(authSignOutUser());
            navigation.navigate('Login');
          }}
        >
          <Feather name="log-out" size={24} color={'#BDBDBD'} />
        </TouchableOpacity>

        <Text
          style={{
            ...styles.title,
          }}
        >
          {login}
        </Text>

        <FlatList
          data={userPosts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.publicationsWrapper}>
              <Image
                style={{ width: '100%', height: 240 }}
                source={{ uri: item.photo }}
              />

              <Text style={styles.publicationTitle}>{item.postTitle}</Text>

              <View style={styles.additionalInfoWrapper}>
                <TouchableOpacity
                  style={{ flexDirection: 'row' }}
                  onPress={() =>
                    navigation.navigate('Comments', { postID: item.id })
                  }
                >
                  <FontAwesome5 name="comments" size={24} color="#BDBDBD" />

                  <Text style={styles.publicationComments}>0</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ flexDirection: 'row' }}
                  onPress={() =>
                    navigation.navigate('Map', { location: item.location })
                  }
                >
                  <EvilIcons name="location" size={24} color="#BDBDBD" />

                  <Text style={styles.publicationLocation}>
                    {item.location.coords}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
      {/* </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    resizeMode: 'cover',
  },
  keyboardWrappper: {
    alignItems: 'center',
  },
  overallWrapper: {
    width: '100%',
    height: '67%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
    overflow: 'hidden',
  },
  userPhotoWrapper: {
    width: 120,
    height: 120,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#F6F6F6',
  },
  userPhoto: {
    width: '100%',
    height: '100%',
  },
  iconWrapper: {
    position: 'absolute',
    right: -13,
    bottom: 14,
  },
  addIcon: {
    width: 25,
    height: 25,
  },
  logOutBtn: {
    position: 'absolute',
    top: 25,
    right: 25,
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
    color: '#212121',
  },
  publicationsWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  publicationTitle: {
    marginTop: 8,
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },
  additionalInfoWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  publicationComments: {
    marginLeft: 9,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
  },
  publicationLocation: {
    marginLeft: 9,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },
});
