import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { useSelector } from 'react-redux';
import { addDoc, collection, doc, getDocs } from 'firebase/firestore';

import { database } from '../../firebase/config';

export default function CommentsScreen({ route }) {
  const { postID } = route.params;

  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState([]);

  const { login } = useSelector(state => state.auth);

  useEffect(() => {
    getAllPosts(postID);
  }, []);

  const updateDataInFirestore = async () => {
    try {
      const ref = doc(database, 'posts', postID);

      await addDoc(collection(ref, 'comments'), {
        login,
        comment,
      });

      console.log('comment added');
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getAllPosts = async () => {
    try {
      const array = [];

      const ref = doc(database, 'posts', postID);

      const comments = await getDocs(collection(ref, '/comments'));

      comments.forEach(comment =>
        array.push({ ...comment.data(), id: comment.id })
      );

      setAllComments(array);

      console.log('document updated');
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={allComments}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <Text>{item.login}</Text>
              <Text>{item.comment}</Text>
            </View>
          )}
        />
      </SafeAreaView>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} onChangeText={setComment} />
      </View>
      <TouchableOpacity onPress={updateDataInFirestore} style={styles.sendBtn}>
        <Text style={styles.sendLabel}>add post</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  commentContainer: {
    borderWidth: 1,
    borderColor: '#20b2aa',
    marginHorizontal: 10,
    padding: 10,
    marginBottom: 10,
  },
  sendBtn: {
    marginHorizontal: 30,
    height: 40,
    borderWidth: 2,
    borderColor: '#20b2aa',
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  sendLabel: {
    color: '#20b2aa',
    fontSize: 20,
  },
  inputContainer: {
    marginHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomColor: '#20b2aa',
  },
});
