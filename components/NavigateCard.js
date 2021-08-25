import React from "react"
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import tw from "tailwind-react-native-classnames"
import { GOOGLE_MAPS_APIKEY } from "@env"
import { setDestination } from "../slices/navSlice"
import { useDispatch } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import RideOptions from "./RideOptions"
import NavFavorites from "./NavFavorites"
import { Icon } from "react-native-elements/dist/icons/Icon"

const NavigateCard = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>GOOD DAY!!!</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            placeholder="Where To Boss?"
            styles={toInputBoxStyles}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              )
              navigation.navigate("RideOptions")
            }}
            fetchDetails={true}
            returnKeyType={"search"}
            enablePoweredByContainer={false}
            minLength={2}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en",
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
          />
        </View>
        <NavFavorites />
      </View>
      <View
        style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("RideOptions")}
          style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
        >
          <Icon name="car" type="font-awesome" color="white" size={16} />
          <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}
        >
          <Icon
            name="fast-food-outline"
            type="ionicon"
            color="black"
            size={16}
          />
          <Text style={tw`text-black text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
})
