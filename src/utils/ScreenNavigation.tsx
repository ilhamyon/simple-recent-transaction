import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TransactionList, {Transaction} from '../pages/TransactionList';
import TransactionDetails from '../pages/TransactionDetails';

export type StackParamList = {
  Home: undefined;
  Details: {
    data: Transaction;
  };
};

interface Props {
  initial: keyof StackParamList;
}

const ScreenNavigation: React.FC<Props> = ({initial}) => {
  const Stack = createNativeStackNavigator<StackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={initial}>
        <Stack.Screen name="Home" component={TransactionList} />
        <Stack.Screen name="Details" component={TransactionDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ScreenNavigation;