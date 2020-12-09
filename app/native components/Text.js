import React from 'react';
import { Text as NativeText } from 'react-native';

const sizes = {
  h1: 40,
  h2: 35,
  h3: 30,
  h4: 25,
  h5: 20,
  small: 15,
  extraSmall: 11,
};

const Text = (props) => {
  // console.log(Object.keys(props));

  let size = props.h1
    ? sizes.h1
    : props.h2
    ? sizes.h2
    : props.h3
    ? sizes.h3
    : props.h4
    ? sizes.h4
    : props.h5
    ? sizes.h5
    : props.small
    ? sizes.small
    : props.extraSmall
    ? sizes.extraSmall
    : props.size;

  let weight = props.bold
    ? '700'
    : props.bolder
    ? '800'
    : props.boldest
    ? '900'
    : props.weight;

  const textStyle = {
    marginTop: props.mgTop || props.mgVertical || props.mgAround || 0,
    marginBottom: props.mgBottom || props.mgVertical || props.mgAround || 0,
    marginLeft: props.mgLeft || props.mgHorizontal || props.mgAround || 0,
    marginRight: props.mgRight || props.mgHorizontal || props.mgAround || 0,

    paddingTop: props.padTop || props.padVertical || props.padAround || 0,
    paddingBottom: props.padBottom || props.padVertical || props.padAround || 0,
    paddingLeft: props.padLeft || props.padHorizontal || props.padAround || 0,
    paddingRight: props.padRight || props.padHorizontal || props.padAround || 0,

    fontSize: size,
    color: props.color,
    textTransform: props.transform,
    fontWeight: weight,
    textAlign: props.align,
    letterSpacing: props.letterSpacing,
  };

  if (props.lineHeight) textStyle.lineHeight = props.lineHeight;

  return (
    <NativeText {...props} style={[textStyle, { ...props.style }]}>
      {props.children}
    </NativeText>
  );
};

Text.defaultProps = {
  size: 16,
  color: '#464646',
  transform: 'capitalize',
  weight: 'normal',
  align: 'left',
  letterSpacing: 1,
};

export default Text;
