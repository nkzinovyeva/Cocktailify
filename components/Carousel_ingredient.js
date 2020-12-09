import Carousel from 'react-native-snap-carousel';
import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";

const { width } = Dimensions.get("screen");

export default function MyCarousel(props) {

//render items in the Carousel
const renderItem = ({item}) => {
  const url = 'https://www.thecocktaildb.com/images/ingredients/' + item.name + '.png'
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("Ingredient Details", item.name)
    }
      onLongPress={() => {props.deleteData(item)}}
    >
        <View style={{alignItems: 'center'}}>
            <Image source={{uri: url}} style={styles.image}></Image>
            <View >
              <Text style={styles.text}>{item.name}</Text> 
            </View>
        </View>
    </TouchableOpacity>
  );
};


return (
    <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
        <Carousel layout={'default'}
                ref={(c) => {_carousel = c;}}
                data={props.data}
                keyExtractor={(item) => item.id}
                firstItem={3}
                inactiveSlideOpacity={0.6}
                inactiveSlideScale={0.8}
                renderItem={renderItem}
                sliderWidth={width-40}
                itemWidth={120}/>
    </View>   
)
}

const styles = StyleSheet.create({
  carousel: {
    backgroundColor: 'white',
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  image: { 
    width: width/3, 
    height: width/3,  
    borderRadius: 5, 
    overlayColor: "tomato",  
    opacity: 0.8, 
    resizeMode: "cover", 
},
  text: {
    color: "gray",
    fontSize: 14,
    fontWeight: "bold", 
    textAlign: "left",
    padding: 5
  }
});  
  