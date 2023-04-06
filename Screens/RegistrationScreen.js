import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function RegistrationScreen() {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <ImageBackground
          style={styles.background}
          source={require('../assets/images/background/photo_BG_3x.jpg')}
        >
          <View style={styles.overallWrapper}>
            <KeyboardAvoidingView style={styles.regulatedContainer}>
              <View style={styles.avatar}>
                <TouchableOpacity style={styles.iconWrapper}>
                  <Image
                    style={styles.addIcon}
                    source={require('../assets/images/profile_add/add_3x.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.registration}>
                <Text style={styles.registrationTitle}>Registration</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.registrationInput}
                    placeholder="Login"
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.registrationInput}
                    placeholder="E-Mail"
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.registrationInput}
                    placeholder="Password"
                  />
                  <TouchableOpacity style={styles.revealButton}>
                    <Text>Reveal password</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
            <View style={styles.signUpButtonsWrapper}>
              <TouchableOpacity style={styles.signUpButton}>
                <Text style={styles.signUpButtonTitle}>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.loginForExistedAccount}>
                <Text style={styles.loginForExistedAccountTitle}>
                  Account already exists? Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overallWrapper: {
    width: '100%',
    height: '67%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  regulatedContainer: {
    alignItems: 'center',
  },
  avatar: {
    position: 'relative',
    top: -60,
    width: 120,
    height: 120,
    zIndex: 1,
    borderRadius: 16,
    backgroundColor: '#F6F6F6',
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
  registration: {
    width: '100%',
  },
  registrationTitle: {
    textAlign: 'center',
    marginTop: -28,
  },
  inputWrapper: {
    position: 'relative',
    marginTop: 16,
    marginHorizontal: 16,
  },
  registrationInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    backgroundColor: '#F6F6F6',
    padding: 16,
  },
  revealButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  signUpButtonsWrapper: {
    marginHorizontal: 16,
    marginTop: 43,
    alignItems: 'center',
  },
  signUpButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 100,
    backgroundColor: '#FF6C00',
  },
  signUpButtonTitle: {
    textAlign: 'center',
    color: '#FFFFFF',
  },
  loginForExistedAccount: {
    marginTop: 16,
    padding: 16,
  },
  loginForExistedAccountTitle: {
    color: '#1B4371',
  },
});
