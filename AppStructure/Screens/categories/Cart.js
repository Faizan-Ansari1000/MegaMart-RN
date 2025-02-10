import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View, Image, StyleSheet } from "react-native";

export default function Cart() {
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

    const removeFromCart = async (id) => {
        const updatedCart = cart.filter((item) => item.id !== id);
        setCart(updatedCart);
        await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Your Cart</Text>
            {cart.length === 0 ? <Text style={styles.emptyText}>Cart is empty</Text> : null}

            <FlatList
                data={cart}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <View style={styles.detailsContainer}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.price}>{item.price}</Text>
                            <TouchableOpacity
                                onPress={() => removeFromCart(item.id)}
                                style={styles.removeButton}
                            >
                                <Text style={styles.removeText}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: "#F5F5F5",
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "flex-end",
        color: "#333",
    },
    emptyText: {
        textAlign: "center",
        fontSize: 18,
        marginTop: 30,
        color: "#888",
    },
    card: {
        backgroundColor: "white",
        borderRadius: 12,
        padding: 15,
        marginBottom: 12,
        width: "100%",
        flexDirection: "row",
        alignItems: "flex-end",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 10,
        marginRight: 15,
    },
    detailsContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 4,
        textAlign: 'right',
    },
    price: {
        fontSize: 15,
        color: "#007BFF",
        fontWeight: "bold",
        marginBottom: 5,
        textAlign: 'right'
    },
    removeButton: {
        backgroundColor: "red",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
        alignSelf: "flex-end",
    },
    removeText: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
    },
});
