import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.overallWrapper}>
        <View style={styles.user}>
          <Image
            style={styles.avatar}
            source={require('../../assets/images/user_photos/profile_user_3x.jpg')}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Natali Romanova</Text>
            <Text style={styles.userMail}>e-mail@example.com</Text>
          </View>
        </View>
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
    marginLeft: 16,
    marginRight: 16,
  },
  user: {
    flexDirection: 'row',
  },
  avatar: {
    width: 60,
    height: 60,
  },
  userInfo: {
    justifyContent: 'center',
    marginLeft: 8,
  },
  userName: {
    fontFamily: 'Roboto-Bold',
    fontSize: 13,
    lineHeight: 15,
    color: '#212121',
  },
  userMail: {
    fontFamily: 'Roboto-Regular',
    fontSize: 11,
    lineHeight: 13,
    color: 'rgba(33, 33, 33, 0.8)',
  },
});
