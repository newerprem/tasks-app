import { StyleSheet } from 'react-native';
import StackNavigator from './src/navigation/StackNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import AppNavigator from './src/navigation/AppNavigator';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider style={styles.container}>
          {/* <NavigationContainer>
            <StackNavigator />
          </NavigationContainer> */}
          <AppNavigator />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    padding: 12,
    marginBottom: 12,
    marginHorizontal: 12,
    height: 48,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
