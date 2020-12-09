import Carousel from 'react-native-snap-carousel';
import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";

const { width } = Dimensions.get("screen");
const height = (width * 100) / 150;

export default function MyCarousel(props) {

const renderRandItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Cocktail Details", item.idDrink) }
      >
        <View style={styles.carousel}>
            <Image source={{uri:item.strDrinkThumb}} style={styles.image}></Image>
            <Text style={styles.text}>{item.strDrink }</Text> 
        </View>
      </TouchableOpacity>
    );
};

return (
    <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
        <Carousel layout={'default'}
                ref={(c) => {_carousel = c; }}
                data={props.data}
                loop={true}
                firstItem={5}
                inactiveSlideOpacity={0.6}
                inactiveSlideScale={0.8}
                renderItem={renderRandItem}
                sliderWidth={width-40}
                lockScrollWhileSnapping={true}
                itemWidth={150}/>
    </View>   
)
}

const styles = StyleSheet.create({
  carousel: {
    backgroundColor: 'white',
    height: height,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  image: { 
    width: width/3, 
    height: width/3, 
    borderRadius: 20, 
    overlayColor: "tomato",  
    opacity: 0.8, 
    resizeMode: "cover", 
},
text: {
  color: "gray",
  fontSize: 14,
  fontWeight: "bold", 
  textAlign: "left",
}
});  
  