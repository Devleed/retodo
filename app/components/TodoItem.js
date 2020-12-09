import React, { useState } from 'react';
import {
  Dimensions,
  LayoutAnimation,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Reanimated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';

import { color1 } from '../config/colors';
import { Text } from '../native components';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const TodoItem = (props) => {
  const itemTranslateX = useSharedValue(0);
  const itemScale = useSharedValue(1);
  const itemTitleLineThrough = useSharedValue(0);

  const [todoOpts, setTodoOpts] = useState({
    deleted: false,
    undo: false,
  });
  const [deleteTimeout, setDeleteTimeout] = useState(null);

  const deleteFromDisplay = () => {
    LayoutAnimation.easeInEaseOut();
    setTodoOpts((prevValue) => ({ ...prevValue, undo: true }));

    setDeleteTimeout(
      setTimeout(() => {
        setTodoOpts({ undo: false, deleted: true });
        props.delete();
      }, 5000),
    );
  };

  const gestureHandler = useAnimatedGestureHandler(
    {
      onStart: (event, ctx) => {
        ctx.startX = itemTranslateX.value;
      },
      onActive: (event, ctx) => {
        if (ctx.startX + event.translationX <= -150) {
          itemTranslateX.value = withTiming(-SCREEN_WIDTH, { duration: 500 });
        } else {
          itemTranslateX.value =
            event.translationX < 0
              ? ctx.startX + event.translationX
              : ctx.startX;
        }
      },
      onEnd: (event, ctx) => {
        if (ctx.startX + event.translationX <= -150) {
          itemTranslateX.value = withTiming(-SCREEN_WIDTH, { duration: 500 });
          runOnJS(deleteFromDisplay)();
        } else {
          const value =
            event.translationX <= -20 && itemTranslateX.value !== -90 ? -90 : 0;
          itemTranslateX.value = withSpring(value);
        }
      },
    },
    [],
  );

  const btnAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: itemTranslateX.value }],
    };
  });
  const itemAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: itemScale.value }],
    };
  });
  const itemTitleAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: itemTitleLineThrough.value,
    };
  });

  const handleUndo = () => {
    if (deleteTimeout) {
      clearTimeout(deleteTimeout);
      setDeleteTimeout(null);
      LayoutAnimation.easeInEaseOut();
      itemTranslateX.value = withSpring(0);
      setTodoOpts({ deleted: false, undo: false });
    }
  };
  const handleDelete = () => {
    itemTranslateX.value = withTiming(-SCREEN_WIDTH, { duration: 500 });
    deleteFromDisplay();
  };
  const markTodoComplete = () => {
    itemTitleLineThrough.value = withTiming(200, { duration: 800 });
    props.done();
  };

  return (
    <Reanimated.View style={[styles.item, itemAnimatedStyle]}>
      {todoOpts.undo ? (
        <Text h5 bold mgTop={5} style={styles.todoOptsText}>
          Todo was deleted
        </Text>
      ) : null}
      <TouchableOpacity
        style={[
          styles.itemBtn,
          todoOpts.undo ? styles.undoBtn : styles.itemActions,
        ]}
        onPress={todoOpts.undo ? handleUndo : handleDelete}>
        {todoOpts.undo ? (
          <Text h5 color="#ad0000">
            Undo
          </Text>
        ) : (
          <Text h5 color="white">
            Delete
          </Text>
        )}
      </TouchableOpacity>
      <PanGestureHandler onGestureEvent={gestureHandler} maxPointers={1}>
        <Reanimated.View style={[styles.itemContentContiner, btnAnimatedStyle]}>
          <TouchableOpacity
            style={styles.itemContent}
            activeOpacity={1}
            onPressIn={() =>
              (itemScale.value = withTiming(0.95, { duration: 100 }))
            }
            onPressOut={() =>
              (itemScale.value = withTiming(1, { duration: 100 }))
            }
            onPress={markTodoComplete}>
            <View style={styles.indicator}>
              {props.todo.done ? (
                <MaterialIcons name="check" color="#fff" />
              ) : null}
            </View>
            <View style={styles.itemTitleContainer}>
              <Text h5 color="#fff">
                {props.todo.title}
              </Text>
              <Reanimated.View
                style={[styles.itemTitleLineThrough, itemTitleAnimatedStyle]}
              />
            </View>
          </TouchableOpacity>
        </Reanimated.View>
      </PanGestureHandler>
    </Reanimated.View>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  item: {
    width: SCREEN_WIDTH - 40,
    height: 50,
    flexDirection: 'row',
    marginTop: 10,
  },
  itemContentContiner: {
    flex: 1,
  },
  itemContent: {
    backgroundColor: color1,
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  itemBtn: {
    position: 'absolute',
    top: 0,
    height: '100%',
    right: 0,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    zIndex: -1,
  },
  itemActions: {
    backgroundColor: '#ad0000',
    width: '40%',
    alignItems: 'flex-end',
  },
  undoBtn: {
    borderWidth: 2,
    borderColor: '#ad0000',
    width: '30%',
    alignItems: 'center',
  },
  indicator: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
  },
  todoOptsText: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    padding: 10,
    zIndex: -1,
  },
  itemTitleContainer: {
    overflow: 'hidden',
  },
  itemTitleLineThrough: {
    backgroundColor: '#fff',
    top: 14,
    height: 3,
    position: 'absolute',
  },
});
