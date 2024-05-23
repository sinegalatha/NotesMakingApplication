import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Dashboard from './Dashboard';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Card from './Card';
import AddCard from './AddCard';

export default function App() {
  const Stack = createNativeStackNavigator();


  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Dashboard">
          <Stack.Screen name="Dashboard" component={Dashboard} options={{header: ()=>null}}/>
          <Stack.Screen name="Card" component={Card} options={{ header: () => null }} />
          <Stack.Screen name="AddCard" component={AddCard} options={{ header: () => null }} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
