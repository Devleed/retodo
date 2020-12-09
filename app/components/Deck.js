import React, { useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Reanimated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import TodoCard from './TodoCard';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const AnimatedTouchableOpacity = Reanimated.createAnimatedComponent(
  TouchableOpacity,
);

const Deck = () => {
  const [animated, setAnimated] = useState(false);
  const deckHeight = useSharedValue(animated ? 0.5 : 0.35);

  const cards = Array(3).fill(null);

  const deckAnimatedStyles = useAnimatedStyle(() => ({
    height: withSpring(SCREEN_HEIGHT * deckHeight.value),
  }));

  return (
    <AnimatedTouchableOpacity
      style={[styles.container, deckAnimatedStyles]}
      activeOpacity={1}
      onPress={() => {
        setAnimated((prevValue) => !prevValue);
        deckHeight.value = 0.5;
      }}>
      {cards
        .map((_, i) => {
          return <TodoCard index={i} animate={animated} key={i} />;
        })
        .reverse()}
    </AnimatedTouchableOpacity>
  );
};

export default Deck;

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
  },
});
