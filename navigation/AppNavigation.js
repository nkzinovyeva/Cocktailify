import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/FontAwesome5';
import CocktailsScreen from "../screens/CocktailsScreen";
import CoctailDetails from "../screens/CoctailDetails";
import MyBarScreen from "../screens/MyBarScreen";
import DetailsScreen from "../screens/DetailsScreen";
import FavouriteScreen from "../screens/FavouriteScreen";
import UserScreen from "../screens/UserScreen";
import ShopListScreen from "../screens/ShopListScreen";


const CoctailsStack = createStackNavigator();

function CoctailsStackScreen() {
    return (
      <CoctailsStack.Navigator>
        <CoctailsStack.Screen name="Coctails" component={CocktailsScreen} />
        <CoctailsStack.Screen name="CoctailDetails" component={CoctailDetails} />
      </CoctailsStack.Navigator>
    );
}

const MyBarStack = createStackNavigator();

function MyBarStackScreen() {
    return (
      <MyBarStack.Navigator>
        <MyBarStack.Screen name="My Bar" component={MyBarScreen} />
        <MyBarStack.Screen name="Details" component={DetailsScreen} />
      </MyBarStack.Navigator>
    );
}

const FavouriteStack = createStackNavigator();

function FavouriteStackScreen() {
    return (
      <FavouriteStack.Navigator>
        <FavouriteStack.Screen name="Favourites" component={FavouriteScreen} />
        <FavouriteStack.Screen name="Details" component={DetailsScreen} />
      </FavouriteStack.Navigator>
    );
}

const UserStack = createStackNavigator();

function UserStackScreen() {
    return (
      <UserStack.Navigator>
        <UserStack.Screen name="User" component={UserScreen} />
        <UserStack.Screen name="Details" component={DetailsScreen} />
      </UserStack.Navigator>
    );
}

const MainNav = createBottomTabNavigator();

export default function AppNav() {
  return (
    <NavigationContainer>
      <MainNav.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Cocktails') {
              iconName = 'cocktail'
            } else if (route.name === 'My bar') {
              iconName = 'wine-bottle';
            } else if (route.name === 'Favourites') {
              iconName = 'star';
            } else if (route.name === 'Shopping list') {
              iconName = 'receipt';
            } else if (route.name === 'User') {
              iconName = 'user-secret';
            }

            return <Icons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <MainNav.Screen name="Cocktails" component={CoctailsStackScreen} />
        <MainNav.Screen name="My bar" component={MyBarStackScreen} />
        <MainNav.Screen name="Favourites" component={FavouriteStackScreen} />
        <MainNav.Screen name="Shopping list" component={ShopListScreen} />
        <MainNav.Screen name="User" component={UserStackScreen} />
      </MainNav.Navigator>
    </NavigationContainer>
  );

}