import { NativeBaseProvider, StatusBar } from "native-base";
import { Provider } from 'react-redux';
import AppNavigators from '../src/navigators/StackNavigators';
import store from '../src/redux/store';

export default function Index() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
          <StatusBar backgroundColor="white" barStyle="dark-content"/>
        <AppNavigators/>
      </NativeBaseProvider>
    </Provider>
  );
}

