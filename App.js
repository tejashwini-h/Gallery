import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import ExploreScreen from './screens/ExploreScreen';
import HomeScreen from './screens/HomeScreen';
import ImageViewScreen from './screens/ImageViewScreen';
import SearchScreen from './screens/SearchScreen';

import { Provider as PaperProvider } from 'react-native-paper'; // ✅ Needed for Snackbar and UI components

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Stack navigator for Explore
function ExploreStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Explore" 
        component={ExploreScreen} 
        options={{ title: 'Explore Gallery' }}
      />
      <Stack.Screen 
        name="ImageView" 
        component={ImageViewScreen} 
        options={{ title: 'Image Preview' }}
      />
    </Stack.Navigator>
  );
}

// Stack navigator for Search
function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{ title: 'Search Gallery' }}
      />
      <Stack.Screen 
        name="ImageView" 
        component={ImageViewScreen} 
        options={{ title: 'Image Preview' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider> {/* ✅ Wrap in PaperProvider */}
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Explore" component={ExploreStack} />
          <Drawer.Screen name="Search" component={SearchStack} />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
