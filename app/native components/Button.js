import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = (props) => {
  let btnStyle = {
    ...styles.btn,
    ...props.btnStyle,
    backgroundColor: props.mainColor,
  };
  let btnTextStyle = {
    ...styles.btnText,
    ...props.textStyle,
    color: props.textColor,
  };

  if (props.hollow) {
    btnStyle.backgroundColor = 'transparent';
    btnTextStyle.color = 'white';
    btnStyle.borderWidth = 3;
    btnStyle.borderColor = 'white';
  }
  if (props.icon) {
    btnTextStyle.marginLeft = 5;
  }
  if (props.rounded) {
    btnStyle.borderRadius = 30;
  }

  return (
    <TouchableOpacity style={btnStyle} {...props}>
      {props.icon}
      <Text style={btnTextStyle}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

Button.defaultProps = {
  mainColor: 'white',
  textColor: 'black',
};

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 16,
    color: '#ff6476',
  },
});
