import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Toast from "react-native-toast-message";
import SignUp from "../../Auth/SignUp";
import Login from "../../Auth/Login";
import Home from "../../Screens/Home";
import { TouchableOpacity, View } from "react-native";
import { openCamera } from "../functions/AllFunctions";
import Profile from "../../Screens/Profile";
import Mobiles from "../../Screens/categories/Mobiles";
import Laptops from "../../Screens/categories/Laptops";
import Cosmetics from "../../Screens/categories/Cosmetics";
import Stationary from "../../Screens/categories/Stationary";
import Cart from "../../Screens/categories/Cart";
import Watch from "../../Screens/categories/Watch";
import Icon from "react-native-vector-icons/MaterialIcons";
import GentsCloth from "../../Screens/categories/GentsCloth";
import Jackets from "../../Screens/categories/Jackets";
import LadiesClothes from "../../Screens/categories/LadiesClothes";
import LogOut from "../../Auth/LogOut";


export default function AppNavigation() {

    const Stack = createNativeStackNavigator();

    return (
        <>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="SignUp">
                    <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUp} />
                    <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
                    <Stack.Screen name="Home"
                        options={{
                            headerRight: () =>
                                <View style={{ marginEnd: 1 }}>
                                    <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Icon name="settings-accessibility" size={28} color="black" />
                                    </TouchableOpacity>
                                </View>
                        }} component={Home} />
                    <Stack.Screen name="Mobiles" options={{ headerRight: () => <View><TouchableOpacity onPress={openCamera}><Icon name="add-a-photo" size={20} color="black" /></TouchableOpacity></View> }} component={Mobiles} />
                    <Stack.Screen name="Profile" component={Profile} />
                    <Stack.Screen name="Laptops" component={Laptops} />
                    <Stack.Screen name="Cosmetics" component={Cosmetics} />
                    <Stack.Screen name="Stationary" component={Stationary} />
                    <Stack.Screen name="LadiesClothes" component={LadiesClothes} />
                    <Stack.Screen name="GentsCloth" component={GentsCloth} />
                    <Stack.Screen name="Jackets" component={Jackets} />
                    <Stack.Screen name="Cart" component={Cart} />
                    <Stack.Screen name="Watch" component={Watch} />
                    <Stack.Screen name="LogOut" options={{ headerShown: false }} component={LogOut} />
                </Stack.Navigator>
                <Toast />
            </NavigationContainer>
        </>
    )
}