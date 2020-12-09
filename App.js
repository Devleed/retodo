import React from 'react';
import { Platform, StatusBar, StyleSheet, UIManager, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Provider } from './app/context/todoContext';
import HomeScreen from './app/screens/HomeScreen';
import CreateTodoScreen from './app/screens/CreateTodoScreen';

// const Stack = createSharedElementStackNavigator();
const Stack = createStackNavigator();

const App = () => {
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  return (
    <Provider>
      <View style={styles.appContainer}>
        <StatusBar translucent backgroundColor="transparent" />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="home" component={HomeScreen} />
            <Stack.Screen
              name="create"
              component={CreateTodoScreen}
              options={{
                gestureEnabled: false,
                transitionSpec: {
                  open: { animation: 'timing', config: { duration: 300 } },
                  close: { animation: 'timing', config: { duration: 300 } },
                },
                cardStyleInterpolator: ({ current }) => {
                  return {
                    cardStyle: {
                      opacity: current.progress,
                    },
                  };
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});
