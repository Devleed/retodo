import React from 'react';
import { View as NativeView } from 'react-native';

const View = (props) => {
  const containerStyles = {
    marginTop: props.mgTop || props.mgVertical || props.mgAround || 0,
    marginBottom: props.mgBottom || props.mgVertical || props.mgAround || 0,
    marginLeft: props.mgLeft || props.mgHorizontal || props.mgAround || 0,
    marginRight: props.mgRight || props.mgHorizontal || props.mgAround || 0,

    paddingTop: props.padTop || props.padVertical || props.padAround || 0,
    paddingBottom: props.padBottom || props.padVertical || props.padAround || 0,
    paddingLeft: props.padLeft || props.padHorizontal || props.padAround || 0,
    paddingRight: props.padRight || props.padHorizontal || props.padAround || 0,

    flexDirection: props.flow,
    alignItems: props.align,
    justifyContent: props.justify,

    backgroundColor: props.color,

    borderWidth: props.border.width,
    borderColor: props.border.color,
    borderRadius: props.border.radius,

    elevation: props.elevation,

    height: props.height,
    width: props.width,

    flex: props.flex,
  };

  return (
    <NativeView style={[containerStyles, props.style]} testID={props.testID}>
      {props.children}
    </NativeView>
  );
};

View.defaultProps = {
  flow: 'column',
  align: 'stretch',
  justify: 'flex-start',
  backgroundColor: '#fff',
  border: {
    width: 0,
    color: '#fff',
    radius: 0,
  },
  elevation: 0,
  height: 'auto',
  width: 'auto',
  flex: 1,
};

export default View;
