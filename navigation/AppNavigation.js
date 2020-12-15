import React, {useState} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator} from '@react-navigation/stack';
import Icons from 'react-native-vector-icons/FontAwesome5';
import CocktailsScreen from "../screens/CocktailsScreen";
import CocktailDetails from "../screens/CocktailDetails";
import MyBarScreen from "../screens/MyBarScreen";
import IngredientDetails from "../screens/IngredientDetails";
import BarCocktail from "../screens/BarCocktail";
import FavouriteScreen from "../screens/FavouriteScreen";
import SearchScreen from "../screens/SearchScreen";
import ShopListScreen from "../screens/ShopListScreen";
import AlkoFinder from "../screens/AlkoFinder";
//import UserContext from "./UserContext"
//import * as firebase from 'firebase';

const defaultNavOptions =  {
  headerStyle: {
    backgroundColor: 'tomato',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  headerBackTitleStyle: {
  }
}

const CocktailsStack = createStackNavigator();

function CocktailsStackScreen() {
    return (
      <CocktailsStack.Navigator screenOptions={() => (defaultNavOptions)}  >
        <CocktailsStack.Screen name="Cocktails" component={CocktailsScreen} />
        <CocktailsStack.Screen name="Cocktail Details" component={CocktailDetails} />
        <CocktailsStack.Screen name="Ingredient Details" component={IngredientDetails} />
      </CocktailsStack.Navigator>
    );
}

const MyBarStack = createStackNavigator();

function MyBarStackScreen() {
    return (
      <MyBarStack.Navigator screenOptions={() => (defaultNavOptions)}>
        <MyBarStack.Screen name="My Bar" component={MyBarScreen} />
        <MyBarStack.Screen name="Ingredient Details" component={IngredientDetails} />
        <MyBarStack.Screen name="Cocktail Details" component={CocktailDetails} />
        <MyBarStack.Screen name="Cocktailify" component={BarCocktail} />
      </MyBarStack.Navigator>
    );
}

const FavouriteStack = createStackNavigator();

function FavouriteStackScreen() {
    return (
      <FavouriteStack.Navigator screenOptions={() => (defaultNavOptions)}>
        <FavouriteStack.Screen name="Favourite Cocktails" component={FavouriteScreen} />
        <FavouriteStack.Screen name="Cocktail Details" component={CocktailDetails} />
        <FavouriteStack.Screen name="Ingredient Details" component={IngredientDetails} />
      </FavouriteStack.Navigator>
    );
}

const ShopStack = createStackNavigator();

function ShopStackScreen() {
    return (
      <ShopStack.Navigator screenOptions={() => (defaultNavOptions)}>
        <ShopStack.Screen name="Shopping List" component={ShopListScreen} />
        <ShopStack.Screen name="Ingredient Details" component={IngredientDetails} />
        <ShopStack.Screen name="Cocktail Details" component={CocktailDetails} />
        <ShopStack.Screen name="Alko Finder" component={AlkoFinder} />
      </ShopStack.Navigator>
    );
}

const SearchStack = createStackNavigator();

function SearchStackScreen() {
    return (
      <SearchStack.Navigator screenOptions={() => (defaultNavOptions)}>
        <SearchStack.Screen name="Search" component={SearchScreen} />
        <SearchStack.Screen name="Cocktail Details" component={CocktailDetails} />
        <SearchStack.Screen name="Ingredient Details" component={IngredientDetails} />
      </SearchStack.Navigator>
    );
}

const MainNav = createBottomTabNavigator();

export default function AppNav() {

  /*
  const [user, setUser] = useState('');
  
  //Get logged user's uid
  firebase.auth().onAuthStateChanged(user => {
    let uid = user.uid;
    setUser(user.uid);
  });
  */

  return (
    //<UserContext.Provider value={user}>
      <MainNav.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Cocktails') {
              iconName = 'cocktail'
            } else if (route.name === 'My bar') {
              iconName = 'wine-bottle';
            } else if (route.name === 'Search') {
              iconName = 'search';
            } else if (route.name === 'Favourites') {
              iconName = 'star';
            } else if (route.name === 'Shopping list') {
              iconName = 'receipt';
            } else if (route.name === 'Search') {
              iconName = 'search';
            }

            return <Icons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <MainNav.Screen key="1" name="Cocktails" component={CocktailsStackScreen} />
        <MainNav.Screen key="2" name="My bar" component={MyBarStackScreen} />
        <MainNav.Screen key="3" name="Search" component={SearchStackScreen}  />
        <MainNav.Screen key="4" name="Favourites" component={FavouriteStackScreen} />
        <MainNav.Screen key="5" name="Shopping list" component={ShopStackScreen} />
        
      </MainNav.Navigator>
    //</UserContext.Provider>
  );

}