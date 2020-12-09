import React, { useEffect, useState, useContext } from 'react';
import { StatusBar, StyleSheet, View, LayoutAnimation } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';

import { Context } from '../context/todoContext';
import { Button, Spacer, Text } from '../native components';
import Deck from '../components/Deck';
import TodoItem from '../components/TodoItem';
import { color1 } from '../config/colors';
import { SharedElement } from 'react-navigation-shared-element';

const HomeScreen = (props) => {
  const { state, deleteTodo, todoDone } = useContext(Context);

  const onDelete = (key) => {
    LayoutAnimation.easeInEaseOut();
    deleteTodo(key);
  };

  return (
    <View style={styles.container}>
      <Spacer around={30} style={styles.header}>
        <Text h1 bold>
          Hello.
        </Text>
        <View style={styles.iconStack}>
          <MaterialIcons
            name="search"
            color={color1}
            size={28}
            style={{ marginRight: 10 }}
          />
          <MaterialIcons name="calendar-today" color={color1} size={23} />
        </View>
      </Spacer>
      <Deck />

      <View style={styles.todoItems}>
        {state.todos
          .map((todo, i) => {
            return (
              <TodoItem
                key={todo.id}
                todo={todo}
                delete={() => onDelete(todo.id)}
                done={() => todoDone(todo.id)}
                index={i}
              />
            );
          })
          .reverse()}
      </View>

      <Button
        title="create todo"
        btnStyle={styles.createBtn}
        textStyle={{ textTransform: 'capitalize' }}
        mainColor="#535353"
        textColor="#fff"
        onPress={() => props.navigation.navigate('create')}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#d5dedd',
  },
  todoItems: {
    marginHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconStack: {
    flexDirection: 'row',
  },
  createBtn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 120,
    height: 40,
  },
});
