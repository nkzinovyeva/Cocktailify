import  React, { useEffect, useState }  from 'react';
import { Text, View, FlatList} from 'react-native';
import {firebaseConfig} from './keys.js';
import * as firebase from 'firebase';
import { Button, ListItem } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";

export default function FavouriteScreen({ navigation }) {
  const [items, setItems] = useState([]);

  
  // Initialize Firebase
  const config = firebaseConfig() ;
  // Initialize Firebase
    firebase.initializeApp(config);

    useEffect(() => {
      firebase
        .database()
        .ref("items/")
        .on("value", (snapshot) => {
          const data = snapshot.val();
          const prods = Object.values(data);
  
          setItems(prods);
        });
    }, []);
  
    const deleteData = (props) => {
      firebase
        .database()
        .ref("items/")
        .once("value")
        .then((snapshot) => {
          snapshot.forEach((item) => {
            return firebase.database().ref("items").child(item.key).remove();
          });
        });
    };

    const renderItem = ({ item }) => (
      <View>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate({
              routeName: "Recipe",
              //use data in new screen
              params: { recipeId: item.title },
            })
          }
        >
          <ListItem
            title={item.title}
            bottomDivider
            chevron={{ color: "grey" }}
          />
        </TouchableOpacity>
        <Button
          type="solid"
          buttonStyle = {{backgroundColor: Colors.accentColor , marginBottom: 10, size: ""}}
          icon={<Icon name="trash" size={20} color="white" />}
          onPress={(item) => deleteData(item)}
        />
      </View>
    );

    return (
      <View style={styles.screen}>
        <Text style={styles.title}>My favorite recipes</Text>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          data={items}
        />
      </View>
    );
  }
  


/*
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Favourites screen</Text>
          <Button
            title="Go to Details"
            onPress={() => navigation.navigate('Details')}
          />
        </View>
      );
} */