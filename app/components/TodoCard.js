import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { color1, color2, color3, color4 } from '../config/colors';

import Reanimated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const CARD_ANIMATED_HEIGHT = SCREEN_HEIGHT * 0.15;

const initialAnimatedValues = {
  height: SCREEN_HEIGHT * 0.3,
  title: 40,
  clock: 1.3,
  top: 20,
  scaleFactor: 1,
};

const TodoCard = (props) => {
  const cardHeight = useSharedValue(initialAnimatedValues.height);
  const cardTitleSize = useSharedValue(initialAnimatedValues.title);
  const cardClock = useSharedValue(initialAnimatedValues.clock);
  const cardTop = useSharedValue(props.index * initialAnimatedValues.top);
  const cardScale = useSharedValue(
    initialAnimatedValues.scaleFactor - Number('0.' + props.index),
  );

  const [animated, setAnimated] = useState(true);

  useEffect(() => {
    animateCard();
  }, [props.animate]);

  const defaultSpringOpts = {
    damping: 14,
    mass: 1,
    stiffness: 100,
  };

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    height: withSpring(cardHeight.value, defaultSpringOpts),
    top: withSpring(cardTop.value, defaultSpringOpts),
    transform: [{ scale: withSpring(cardScale.value, defaultSpringOpts) }],
  }));
  const cardTitleAnimatedStyle = useAnimatedStyle(() => ({
    fontSize: withTiming(cardTitleSize.value, { duration: 200 }),
  }));
  const cardClockAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(cardClock.value, defaultSpringOpts) }],
  }));

  const resetAnimatedStyles = () => {
    cardHeight.value = initialAnimatedValues.height;
    cardTitleSize.value = initialAnimatedValues.title;
    cardClock.value = initialAnimatedValues.clock;
    cardTop.value = initialAnimatedValues.top * props.index;
    cardScale.value =
      initialAnimatedValues.scaleFactor - Number('0.' + props.index);
    setAnimated(false);
  };

  const animateCard = () => {
    if (!animated) {
      cardHeight.value = CARD_ANIMATED_HEIGHT;
      cardTitleSize.value = 20;
      cardClock.value = 1;
      cardTop.value = CARD_ANIMATED_HEIGHT * props.index + props.index * 10;
      cardScale.value = 1;
      setAnimated(true);
    } else {
      resetAnimatedStyles();
    }
  };

  return (
    <Reanimated.View
      style={[
        styles.card,
        cardAnimatedStyle,
        { backgroundColor: [color1, color2, color3, color4][props.index] },
      ]}>
      <Reanimated.Text style={[styles.cardTitle, cardTitleAnimatedStyle]}>
        Prepare Reasearch
      </Reanimated.Text>
      <Reanimated.View style={[styles.cardClock, cardClockAnimatedStyle]} />
    </Reanimated.View>
  );
};

export default TodoCard;

const styles = StyleSheet.create({
  card: {
    width: SCREEN_WIDTH - 40,
    borderRadius: 20,
    padding: 20,
    borderWidth: 0.5,
    borderColor: '#000',
    position: 'absolute',
  },
  cardTitle: {
    color: 'white',
    marginTop: 'auto',
  },
  cardClock: {
    position: 'absolute',
    right: 20,
    top: 20,
    height: 50,
    width: 50,
    backgroundColor: color4,
    borderRadius: 50,
  },
});
