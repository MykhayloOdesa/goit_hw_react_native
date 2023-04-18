import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

import { FontAwesome5, EvilIcons } from '@expo/vector-icons';

export default function PostsScreen({ route, navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts(prevState => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.overallWrapper}>
        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.publicationsWrapper}>
              <Image
                style={{ width: '100%', height: 240 }}
                source={require('../../assets/images/posts_photos/forest_3x.jpg')}
              />

              <Text style={styles.publicationTitle}>Forest</Text>

              <View style={styles.additionalInfoWrapper}>
                <TouchableOpacity
                  style={{ flexDirection: 'row' }}
                  onPress={() => navigation.navigate('Comments')}
                >
                  <FontAwesome5 name="comments" size={24} color="#BDBDBD" />

                  <Text style={styles.publicationComments}>0</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ flexDirection: 'row' }}
                  onPress={() => navigation.navigate('Map')}
                >
                  <EvilIcons name="location" size={24} color="#BDBDBD" />

                  <Text style={styles.publicationLocation}>
                    Ivano-Frankivs'k Region, Ukraine
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
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
    justifyContent: 'flex-start',
    flexDirection: 'column',
    marginTop: 32,
    marginHorizontal: 16,
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
