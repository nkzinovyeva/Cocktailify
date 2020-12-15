import Carousel from 'react-native-snap-carousel';
import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";

const { width } = Dimensions.get("screen");

export default function MyCarousel(props) {

//render items in the Carousel
const renderRandItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Cocktail Details", item.idDrink) }
      >
        <View style={styles.carousel}>
            <Image source={{uri:item.strDrinkThumb}} style={styles.image}></Image>
            <Text style={styles.text}>{item.strDrink}</Text> 
        </View>
      </TouchableOpacity>
    );
};

return (
    <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', alignItems: 'center',}}>
        <Carousel 
          layout={'default'}
          ref={(c) => {_carousel = c; }}
          data={props.data}
          loop={true}
          firstItem={5}
          enableSnap={true}
          inactiveSlideOpacity={1}
          inactiveSlideScale={0.7}
          renderItem={renderRandItem}
          sliderWidth={width-20}
          lockScrollWhileSnapping={true}
          itemWidth={width/3}
          slideStyle={{ flex: 1 }}
        />
    </View>   
)
}

const styles = StyleSheet.create({
  carousel: {
    backgroundColor: 'white',
    width: width,
  },
  image: { 
    width: width/3, 
    height: width/3, 
    borderRadius: 20, 
    overlayColor: "white",  
    opacity: 1, 
    resizeMode: "cover", 
},
  text: {
    color: "gray",
    fontSize: 14,
    fontWeight: "bold", 
    textAlign: "left",
  }
});  
  