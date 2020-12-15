import  React, { useEffect, useState }  from 'react';
import { Text, View, FlatList, StyleSheet, Image, Pressable, SafeAreaView, TouchableOpacity} from 'react-native';
import { ListItem, Avatar} from 'react-native-elements';
import UserContext from "../navigation/UserContext"
import * as firebase from 'firebase';

export default function ShopListScreen({ navigation }) {
  
  const user = React.useContext(UserContext);
  const [items, setItems] = useState([]);
  const [fullData, setFullData] = useState([]);

  //header bar
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => navigation.navigate("Alko Finder")}>
          <Image 
            source={require('../assets/Alko-logo_nega.png')}
            style={{ width: 40, height: 40, marginRight: 20 }}/>
        </Pressable>
      ),
    });
  }, [navigation]);

  // Load the full build.
  const _ = require("lodash");
  
  useEffect(() => {
    firebase
      .database()
      .ref("shoppings/" + user)
      .on("value", (snapshot) => {
          const data = snapshot.val();
          if (data !== null) {
            const keys = Object.keys(data);
            const values = Object.values(data);
            const result = {};
            keys.forEach((key, i) => result[key] = values[i]);
            setItems(values);
            setFullData(result); 
        } else {
          setItems([]);
          setFullData([]);
        }
      });
  }, []);

  //Delete Item from Shopping List
  const deleteData = (item) => {
    const key = _.findKey(fullData, item);
    firebase.database().ref("shoppings/" + user).child(key).remove();
  };

  //Render Items 
  const Item = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Ingredient Details", item.title)
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

  return (
    <SafeAreaView style={styles.screen}>
      <View style={{ flex: 2, justifyContent: 'center', }}>
        {items.length === 0 &&
          <View>
            <Text style={styles.replacement}> You haven't added anything to your shopping list yet </Text>
            <Text style={{...styles.replacement,...{fontSize: 14, fontWeight: "normal",}}}>To add the items to the shopping list, explore the ingredients and tap the "shopping list" icon. To delete an item, long-press item's name in the list on this page</Text>
          </View>
        }
        <FlatList 
          data={items}
          keyExtractor={(item, index) => item + index} 
          renderItem={({item}) => <Item item = {item}/>}
          ListHeaderComponent={<Text style={styles.header} >My shopping list</Text>}
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
});