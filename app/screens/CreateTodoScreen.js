import React, { useContext, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import { Button, Spacer, Text, TextInput } from '../native components';
import { color1 } from '../config/colors';
import { Context } from '../context/todoContext';

const CreateTodoScreen = (props) => {
  const [value, setValue] = useState('');
  const { addTodo } = useContext(Context);

  const createTodo = () => {
    console.log('adding a todo');
    addTodo(
      {
        id: Math.floor(Math.random() * 1000),
        title: value,
        done: false,
      },
      () => props.navigation.goBack(),
    );
  };

  return (
    <View style={styles.container}>
      <Spacer around={20} top={250} style={styles.content}>
        <Text h2 bold color="black">
          Create your todo.
        </Text>
        <Spacer vertical={20}>
          <TextInput
            bordered
            value={value}
            onChangeText={(val) => setValue(val)}
          />
        </Spacer>
        <Button
          title="create todo"
          btnStyle={styles.createBtn}
          textStyle={{ textTransform: 'capitalize' }}
          mainColor={color1}
          textColor="#fff"
          onPress={createTodo}
        />
      </Spacer>
    </View>
  );
};

export default CreateTodoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight,
    alignItems: 'center',
  },
  createBtnContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  createBtn: {
    width: 120,
    height: 40,
  },
  content: {
    height: 160,
  },
});
