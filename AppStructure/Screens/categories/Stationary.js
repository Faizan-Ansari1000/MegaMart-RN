import { useCallback, useEffect, useState } from "react";
import ApiInstance from "../../config/Apis/ApiInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList, Text, TouchableOpacity, View, Image, StyleSheet } from "react-native";

export default function Stationary({ navigation }) {
    const [postData, setPostData] = useState([]);
    const [loader, setLoader] = useState(false);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const loadCart = async () => {
            const savedCart = await AsyncStorage.getItem("cart");
            if (savedCart) {
                setCart(JSON.parse(savedCart));
            }
        };
        loadCart();
    }, []);

    const getData = useCallback(async () => {
        try {
            setLoader(true);
            const res = await ApiInstance.get('/product/stationary');
            setPostData(res.data.data);
            setLoader(false);
        } catch (err) {
            console.log(err, 'error');
        }
    }, []);

    useEffect(() => {
        getData();
    }, []);

    const toggleCart = async (item) => {
        let updatedCart;
        if (cart.some((cartItem) => cartItem.id === item.id)) {
            updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
        } else {
            updatedCart = [...cart, item];
        }
        setCart(updatedCart);
        await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Stationary</Text>
            {loader ? (
                <View style={styles.loaderContainer}>
                    <Image source={{ uri: 'https://i.sstatic.net/h6viz.gif' }} style={styles.loader} />
                </View>
            ) : null}

            <FlatList
                data={postData}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                contentContainerStyle={{ paddingBottom: 60 }}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.price}>{item.price}</Text>
                        <TouchableOpacity
                            onPress={() => toggleCart(item)}
                            style={{
                                backgroundColor: cart.some((cartItem) => cartItem.id === item.id) ? "red" : "#002244",
                                padding: 8,
                                borderRadius: 5,
                                marginTop: 5,
                            }}
                        >
                            <Text style={{ color: "white" }}>
                                {cart.some((cartItem) => cartItem.id === item.id) ? "Remove from Cart" : "Add to Cart"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            {/* Navigation bar */}
            <View style={styles.navbar}>
                <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("Cart")}>
                    <Text style={styles.navText}>Cart ({cart.length})</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton}>
                    <Text style={styles.navText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton}>
                    <Text style={styles.navText}>Back</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#F5F5F5",
    },
    heading: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
        color: "#333",
    },
    loaderContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        zIndex: 999,
    },
    loader: {
        width: 50,
        height: 50,
    },
    card: {
        backgroundColor: "white",
        borderRadius: 15,
        padding: 12,
        marginBottom: 12,
        width: "48%",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
    },
    image: {
        width: "100%",
        height: 140,
        borderRadius: 12,
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 8,
        textAlign: "center",
        color: "#333",
    },
    price: {
        fontSize: 16,
        color: "#007BFF",
        fontWeight: "bold",
        marginTop: 4,
        textAlign: "center",
    },
    navbar: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#002244",
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-around",
        elevation: 5,
    },
    navButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    navText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "white",
    },
});
