/*
import React, { useState, useEffect, useRef } from 'react';
import { Alert, StyleSheet, Text, View, Modal, TouchableHighlight, FlatList} from 'react-native';
import { Accelerometer } from "expo-sensors";
import * as Permissions from 'expo-permissions';
import MyCarousel from '../components/Carousel_cocktail'



//const[hasAccPermission, setPermission] = useState(null);
const [latestCocktails, setLatestCocktails] = useState([]);
const [popCocktails, setPopCocktails] = useState([]);
const [randCocktails, setRandCocktails] = useState([]);
const [oneRandCocktail, setOneRandCocktail] = useState({});

//const accelerometer = useRef(null);

useEffect(() => {
  getRandomCocktails();
  getPopCocktails();
  getLatestCocktails();
}, []); 
/*
useEffect(() => {askAccPermission();}, []);

const askAccPermission = async()  => {
  const{status} = await Accelerometer.requestPermissionsAsync();
  setPermission( status == 'granted');
}
useEffect(() => {
  _toggle();
}, []);

useEffect(() => {
  return () => {
    _unsubscribe();
  };
}, []);

const _toggle = () => {
  if (this._subscription) {
    _unsubscribe();
  } else {
    _subscribe();
  }
};



const _subscribe = () => {
  this._subscription = Accelerometer.addListener(accelerometerData => {
    
    getOneRandomCocktail();
    console.log(oneRandCocktail);
  });
};

const _unsubscribe = () => {
  this._subscription && this._subscription.remove();
  this._subscription = null;
};
*/
/*
//getOneRandomCocktail();
    //console.log(oneRandCocktail)

const configureShake = onShake => {
  // update value every 100ms.
  // Adjust this interval to detect
  // faster (20ms) or slower shakes (500ms)
  Accelerometer.setUpdateInterval(300);

  // at each update, we have acceleration registered on 3 axis
  // 1 = no device movement, only acceleration caused by gravity
  const onUpdate = ({ x, y, z }) => {

    // compute a total acceleration value, here with a square sum
    // you can eventually change the formula
    // if you want to prioritize an axis
    const acceleration = Math.sqrt(x * x + y * y + z * z);

    // Adjust sensibility, because it can depend of usage (& devices)
    const sensibility = 9;
    if (acceleration >= sensibility) {
      onShake(acceleration);
    }
  };
  Accelerometer.addListener(onUpdate);
};

useEffect(() => {
  const subscription = configureShake(acceleration => {
    getOneRandomCocktail();
    setModalVisible(true);
  });
  return () => {
    Accelerometer.removeAllListeners();
  }
}, []); 

const [modalVisible, setModalVisible] = useState(false);


// get 10 random cocktails for carousel
const getRandomCocktails = () => {
  const url = 'https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php';
  fetch(url)
  .then((response) => response.json())
  .then((jsondata) => { 
    setRandCocktails(jsondata.drinks);
  })
  .catch((error) => { 
      Alert.alert('Error', error); 
  }); 
};

// get popular cocktails
const getPopCocktails = () => {
  const url = 'https://www.thecocktaildb.com/api/json/v2/9973533/popular.php';
  fetch(url)
  .then((response) => response.json())
  .then((jsondata) => { 
    setPopCocktails(jsondata.drinks);
  })
  .catch((error) => { 
      Alert.alert('Error', error); 
  }); 
};

// get latest cocktails
const getLatestCocktails = () => {
  const url = 'https://www.thecocktaildb.com/api/json/v2/9973533/latest.php';
  fetch(url)
  .then((response) => response.json())
  .then((jsondata) => { 
    setLatestCocktails(jsondata.drinks);
  })
  .catch((error) => { 
      Alert.alert('Error', error); 
  }); 
};

/*
// get 1 random cocktail
const getOneRandomCocktail = () => {
  const url = 'https://www.thecocktaildb.com/api/json/v2/9973533/random.php';
  fetch(url)
  .then((response) => response.json())
  .then((jsondata) => { 
    setOneRandCocktail(jsondata.drinks);
  })
  .catch((error) => { 
      Alert.alert('Error', error); 
  }); 
};

const Item = ({ item }) => {
  return (
      <Text>{item.strDrink}</Text>
  );
} 

return (
  <View style={{flex: 1, backgroundColor:'white', padding: 10, }} >
      <Text style={styles.text}>Random cocktails</Text>
        <MyCarousel data = {randCocktails} navigation= {navigation}/>
      <Text style={styles.text}>Now in trends</Text>
        <MyCarousel data = {popCocktails} navigation= {navigation}/>
      <Text style={styles.text}>Latest cocktails</Text>
        <MyCarousel data = {latestCocktails} navigation= {navigation}/>  
  </View> 
);
}

const styles = StyleSheet.create({
text: {
color: "tomato",
fontSize: 20,
fontWeight: "bold", 
textAlign: "left",
fontWeight: "bold",
},
centeredView: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
marginTop: 22,
},
modalView: {
margin: 20,
backgroundColor: 'white',
borderRadius: 20,
padding: 35,
alignItems: 'center',
shadowColor: '#000',
shadowOffset: {
  width: 0,
  height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,
elevation: 5,
},
openButton: {
backgroundColor: '#F194FF',
borderRadius: 20,
padding: 10,
elevation: 2,
},
textStyle: {
color: 'white',
fontWeight: 'bold',
textAlign: 'center',
},
modalText: {
marginBottom: 15,
textAlign: 'center',
},
});  

/*

<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <FlatList 
                  data={oneRandCocktail}
                  keyExtractor={(item) => item.idDrink} 
                  renderItem={({item}) => <Item item = {item}/>}
                  />
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
              onPress={() => {
                setModalVisible(!modalVisible);
                setOneRandCocktail({});
              }}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
<View style={{ flex: 2,  }}>
        <Text style={{color: "gray",
                      fontSize: 20,
                      fontWeight: "bold", 
                      textAlign: "left",
                      fontWeight: "bold",
                    }} 
        >Now in trends</Text>
        <FlatList //style={styles.results}
                  data={popCocktails} 
                  keyExtractor={item => item.idDrink} 
                  renderItem={({item}) => <Item item = {item}/>}
                  numColumns={2} />  
      </View>


return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Coctails screen</Text>
          <Button
            title="Go to Details"
            onPress={() => navigation.navigate('Details')}
          />
        </View>
      );
} 

<View style={{ flex: 0.5, flexDirection: "row", justifyContent: "flex-start" }}>
        <Input placeholder='BASIC INPUT' value={name} 
        placeholder="find your cocktail" 
        onChangeText={(name) => setName(name)}/>
      <Button title="Find" onPress={getCoctail} />
      <Button title="Cancel" onPress={getAllCocktails} />
      </View>
*/

//render all coctails
/*const Item = ({ item }) => {
  const url = 'https://www.thecocktaildb.com/images/ingredients/' + item.strIngredient1 + '.png'
  return (
    <TouchableOpacity
      style={styles.grid}
      onPress={() =>
          navigation.navigate("Coctail Details", item.idDrink)
      }
    >
    <View style={{ ...styles.container, ...{ backgroundColor: "white" } }}>
      <Image source={{uri:item.strDrinkThumb}}  style={{width:150, height:125, marginTop: 0, borderRadius:10, opacity: 0.9}} />
        <View style={{alignItems:"center",flex:1}}>
            <Text style={styles.text}>{item.strDrink}</Text>
        </View>
      </View>
   </TouchableOpacity>
  );
};*/

/*

<SectionList 
                    horizontal={true}
                    sections={[ 
                        { data: ingredients, renderItem: ({ item, index, section: { data } }) => <Text>{item.name}</Text> }, 
                        { data: measurements, renderItem: ({ item, index, section: { data } }) => <Text>{item.dose}</Text>}, 
                        ]} 
                    keyExtractor={(item, index) => item.name + index} 
                    />
<View style={styles.servings}>
 const createServ = () => {
        //console.log(ingredients);
        let merge = Object.assign({}, ingredients, measurements);
        console.log(merge);
    }
                            */
