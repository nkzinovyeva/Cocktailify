import  React, { useEffect, useState }  from 'react';
import { Text, View, FlatList, StyleSheet, Pressable, Image, Modal, Vibration, SafeAreaView, TouchableOpacity} from 'react-native';
import { ListItem, Avatar} from 'react-native-elements';
import {firebaseConfig} from './keys.js';
import * as firebase from 'firebase';
import {keyapi} from './keys.js';

const config = firebaseConfig() ;
  
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
export default function FavouriteScreen({ navigation }) {

  const [items, setItems] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [oneRandCocktail, setOneRandCocktail] = useState([]);
  const key = keyapi(); 

  //header component
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => {
          setModalVisible(true); 
          getOneRandomCocktail()
          Vibration.vibrate()}}>
            <Image 
              source={require('../components/shaker_2.png')}
              //Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
              style={{ width: 35, height: 35, marginRight: 20, }}/>
        </Pressable>
      ),
    });
  }, [navigation]);
  
  // Load the full build.
  const _ = require("lodash");
  
  useEffect(() => {
      firebase
        .database()
        .ref("favourites/")
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
    firebase.database().ref("favourites").child(key).remove();
  };

  // get 1 random cocktail
  const getOneRandomCocktail = () => {
    const url = 'https://www.thecocktaildb.com/api/json/'+ key+ '/random.php';
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
        }}
      >
        <Text style={{...styles.header,...{color: "tomato", fontSize: 25, textAlign: "center"} }}>{item.strDrink}</Text>
        <Image
            source={{uri: item.strDrinkThumb}}
            style={{ width: 200, height: 200, alignSelf: "center", margin: 10 }}
          />
      </TouchableOpacity>
    );
  } 

  return (
    <SafeAreaView style={styles.screen}>
          {items.length === 0 &&
          <Text style={styles.replacement}> You don't have any favorite cocktails yet!</Text>
          }
          <View style={{ flex: 2, justifyContent: 'center', }}>
            <FlatList 
              data={items}
              keyExtractor={(item) => item.id} 
              renderItem={({item}) => <Item item = {item}/>}
              ListHeaderComponent={<Text style={styles.header}>Favourite cocktails</Text>}
              ListFooterComponent={
                <View style={styles.centeredView}>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}>
                    <View style={styles.modalView}>
                      <FlatList 
                        data={oneRandCocktail}
                        keyExtractor={(item) => item.idDrink} 
                        renderItem={({item}) => <ItemMod item = {item}/>}
                        />
                        <Pressable onPress={() => setModalVisible(false)}>
                            <Text style={{...styles.replacement, ...{textAlign: "right"}}}>Close</Text>
                        </Pressable>
                    </View>
                  </Modal>
              </View>  
              }
              />  
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
    padding: 10
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
    fontWeight: "bold", 
    textAlign: "center",
    fontWeight: "bold",
    margin:5
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    marginTop: 250,
    margin: 20,
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