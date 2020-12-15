import  React, { useEffect, useState }  from 'react';
import { Text, View, FlatList, StyleSheet, Pressable, Image, Modal, Vibration, SafeAreaView, TouchableOpacity, Dimensions} from 'react-native';
import { ListItem, Avatar} from 'react-native-elements';
import UserContext from "../navigation/UserContext";
import * as firebase from 'firebase';
import {keyapi} from './keys.js';
import { Accelerometer } from "expo-sensors";

const { width } = Dimensions.get("screen");

export default function FavouriteScreen({ navigation }) {

  const user = React.useContext(UserContext);
  const [items, setItems] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [oneRandCocktail, setOneRandCocktail] = useState([]);
  const key = keyapi(); 


  const configureShake = onShake => {
    // update value every 100ms faster (20ms) or slower shakes (500ms)
    Accelerometer.setUpdateInterval(400);

    const onUpdate = ({ x, y, z }) => {
      const acceleration = Math.sqrt(x * x + y * y + z * z);

      // Adjust sensibility
      const sensibility = 8;

      if (acceleration >= sensibility) {
        onShake(acceleration);
      }
    };
    Accelerometer.addListener(onUpdate);
  };

  //header component
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => {
          setModalVisible(true); 
          getOneRandomCocktail();
          Vibration.vibrate();
          const subscription = configureShake(acceleration => {
            getOneRandomCocktail();;
          });
        }}
        >
          <Image 
            source={require('../assets/shaker_2.png')}
            //Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
            style={{ width: 35, height: 35, marginRight: 20, }}
          />
        </Pressable>
      ),
    });
  }, [navigation]);
  
  // Load the full build.
  const _ = require("lodash");
  
  useEffect(() => {
    firebase
      .database()
      .ref("favourites/" + user)
      .on("value", (snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
          const keys = Object.keys(data);
          const values = Object.values(data);
          const result = {};
          keys.forEach((key, i) => result[key] = values[i]);
          setItems(values);
          setFullData(result)
        } else {
          setItems([]);
          setFullData([]);
        }
      });
  }, []);

  //Delete Cocktail from DB
  const deleteData = (item) => {
    const key = _.findKey(fullData, item);
    firebase.database().ref("favourites/" + user).child(key).remove();
  };

  // get 1 random cocktail
  const getOneRandomCocktail = () => {
    const url = 'https://www.thecocktaildb.com/api/json/' + key + '/random.php';
    fetch(url)
    .then((response) => response.json())
    .then((jsondata) => { 
      setOneRandCocktail(jsondata.drinks);
    })
    .catch((error) => { 
        Alert.alert('Error', error); 
    }); 
  };

  //Render Items 
  const Item = ({ item }) => {
    return (
      <TouchableOpacity
      onPress={() =>
        navigation.navigate("Cocktail Details", item.id)
      }
        onLongPress={() => {deleteData(item)}}
      >
        <ListItem bottomDivider>
          <Avatar source={{uri: item.pic}} />
          <ListItem.Content>
            <ListItem.Title>{item.title}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </TouchableOpacity>
    );
  }

  //Render Modal 
  const ItemMod = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Cocktail Details", item.idDrink);
          setModalVisible(false);
          Accelerometer.removeAllListeners();
        }}
      >
        <Text style={{...styles.header,...{color: "tomato", fontSize: 25, textAlign: "center"} }}>{item.strDrink}</Text>
        <Image
            source={{uri: item.strDrinkThumb}}
            style={{ width: width/2, height: width/2, alignSelf: "center", margin: 10 }}
        />
      </TouchableOpacity>
    );
  } 

  return (
    <SafeAreaView style={styles.screen}>
      {items.length === 0 &&
      <View>
        <Text style={styles.replacement}> You don't have any favorite cocktails yet!</Text>
        <Text style={{...styles.replacement,...{fontSize: 14, fontWeight: "normal",}}}>To add your favorite cocktail here, explore the cocktails and tap the "favorites" star. To delete a cocktail, long-press cocktail's name in the list on this page</Text>
      </View>
      }
      <View style={styles.screen}>
        <FlatList 
          data={items}
          keyExtractor={(item, index) => item.id+index} 
          renderItem={({item}) => <Item item = {item}/>}
          ListHeaderComponent={<Text style={styles.header}>Favourite cocktails</Text>}
        />
        <View style={styles.centeredView}> 
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <FlatList 
                  data={oneRandCocktail}
                  keyExtractor={(item, index) => item.idDrink+index} 
                  renderItem={({item}) => <ItemMod item = {item}/>}
                  />
                  <Pressable onPress={() => setModalVisible(false)}>
                      <Text style={{...styles.replacement,...{fontSize: 14, fontWeight: "normal",}}}>Give your phone a good shake to mix another cocktail!</Text>
                      <Text style={{...styles.replacement, ...{textAlign: "right"}}}>Close</Text>
                  </Pressable>
              </View>
            </View>
          </Modal>
        </View>  
      </View>
    </SafeAreaView> 
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor:'white',
  },
  header: { 
    color: "gray",
    fontSize: 20,
    fontWeight: "bold", 
    textAlign: "left",
    fontWeight: "bold",
    padding: 10
  },
  replacement: {
    color: "lightgray",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    margin:5
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 22
  },
  modalView: {
    margin: 30,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    shadowColor: "tomato",
    shadowOffset: {
      width: 2,
      height: 4
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5
  }, 
});