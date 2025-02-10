import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet, Image, Modal } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";


export default function Home() {
    const navigation = useNavigation();
    const [selectedId, setSelectedId] = useState(null);
    const [searchText, setSearchText] = useState("");


    const categories = [
        { id: "1", name: "Mobiles", screen: "Mobiles" },
        { id: "2", name: "Laptops", screen: "Laptops" },
        { id: "3", name: "Cosmetics", screen: "Cosmetics" },
        { id: "4", name: "Stationary", screen: "Stationary" },
        { id: "5", name: "Ladies Cloth", screen: "LadiesClothes" },
        { id: "6", name: "Gents Cloth", screen: "GentsCloth" },
        { id: "7", name: "Jackets", screen: "Jackets" },
        { id: "8", name: "Watch", screen: "Watch" },
    ];

    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const sortedCategories = [
        ...filteredCategories,
        ...categories.filter(cat => !filteredCategories.includes(cat))
    ];

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="What are you looking for?"
                    placeholderTextColor="#777"
                    value={searchText}
                    onChangeText={setSearchText}
                />
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Icon style={styles.buttonIcon} name="settings" size={28} />
                </TouchableOpacity>
            </View>

            <View>
                <Text style={styles.favorite}>✨ Your Favorite Categories ✨</Text>
                <Text style={styles.enjoy}>Explore all categories & enjoy the app! 🚀</Text>
            </View>
            <View style={styles.offerCard}>
                <View style={styles.offerTextContainer}>
                    <Text style={styles.offerTitle}>Shop with us</Text>
                    <Text style={styles.offerDiscount}>Get 40% Off for</Text>
                    <Text style={styles.offerItems}>all items</Text>
                </View>
                <Image
                    source={{ uri: "https://i.pinimg.com/736x/e8/b9/8d/e8b98d4534f1f599caef7872ad842da2.jpg" }}
                    style={styles.offerImage}
                    resizeMode="contain"
                />
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
                {sortedCategories.map(cat => (
                    <TouchableOpacity
                        key={cat.id}
                        style={[styles.cart, searchText && filteredCategories.includes(cat) ? styles.selectedCart : null]}
                        onPress={() => { setSelectedId(cat.id); navigation.navigate(cat.screen); }}>
                        <Text style={styles.cartText}>{cat.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <Text style={styles.productHeader}>🔥 Top Deals 🔥</Text>
            <View style={styles.productsContainer}>
                <View style={styles.productCard}>
                    <TouchableOpacity>
                        <Image source={{ uri: "https://i.guim.co.uk/img/media/2ce8db064eabb9e22a69cc45a9b6d4e10d595f06/392_612_4171_2503/master/4171.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=45b5856ba8cd83e6656fbe5c166951a4" }} style={styles.productImage} resizeMode="contain" />
                        <Text style={styles.productName}>Smartphone</Text>
                        <Text style={styles.productPrice}>$499</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.productCard}>
                    <TouchableOpacity>
                        <Image source={{ uri: "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wJTIwY29tcHV0ZXJ8ZW58MHx8MHx8fDA%3D" }} style={styles.productImage} resizeMode="contain" />
                        <Text style={styles.productName}>Laptop</Text>
                        <Text style={styles.productPrice}>$999</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.productCard}>
                    <TouchableOpacity>
                        <Image source={{ uri: "https://m.media-amazon.com/images/I/51bkqdqyvWL._AC_UF1000,1000_QL80_.jpg" }} style={styles.productImage} resizeMode="contain" />
                        <Text style={styles.productName}>Cable</Text>
                        <Text style={styles.productPrice}>$199</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.productCard}>
                    <TouchableOpacity>
                        <Image source={{ uri: "https://profit.pakistantoday.com.pk/wp-content/uploads/2023/03/AdobeStock_315280828-696x358.jpeg" }} style={styles.productImage} resizeMode="contain" />
                        <Text style={styles.productName}>MakeUp</Text>
                        <Text style={styles.productPrice}>$249</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.productCard}>
                    <TouchableOpacity>
                        <Image source={{ uri: "https://applepakistan.com.pk/wp-content/uploads/2023/09/Group-8-3.png" }} style={styles.productImage} resizeMode="contain" />
                        <Text style={styles.productName}>Smart Watch</Text>
                        <Text style={styles.productPrice}>$199</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.productCard}>
                    <TouchableOpacity>
                        <Image source={{ uri: "https://techterms.com/img/lg/lcd_81-2.png" }} style={styles.productImage} resizeMode="contain" />
                        <Text style={styles.productName}>LCD</Text>
                        <Text style={styles.productPrice}>$149</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.productCard}>
                    <TouchableOpacity>
                        <Image source={{ uri: "https://m.media-amazon.com/images/I/71SNwM2a7hL._AC_SL1500_.jpg" }} style={styles.productImage} resizeMode="contain" />
                        <Text style={styles.productName}>Latest Keyboard</Text>
                        <Text style={styles.productPrice}>$199</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.productCard}>
                    <TouchableOpacity>
                        <Image source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/2/22/3-Tasten-Maus_Microsoft.jpg" }} style={styles.productImage} resizeMode="contain" />
                        <Text style={styles.productName}>Mouse</Text>
                        <Text style={styles.productPrice}>$10</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 12,
        paddingHorizontal: 10,
        backgroundColor: "#F4F6FF",
    },
       searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FEFAF6",
        borderRadius: 50,
        paddingHorizontal: 15,
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        flex: 1,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#222",
        paddingVertical: 8,
    },
    button: {
        backgroundColor: "#002244",
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 50,
        alignItems: "center",
    },
    buttonIcon: {
        backgroundColor: "white",
        borderRadius: 50,
        color: '#002244',
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    favorite: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#002244",
        textAlign: "center",
        marginTop: 30,
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    enjoy: {
        fontSize: 16,
        color: "#555",
        textAlign: "center",
        marginTop: 5,
        marginBottom: 20,
        fontStyle: "italic",
    },
    scrollContainer: {
        paddingTop: 12,
        paddingHorizontal: 10,
        paddingBottom: 80,
    },
    settingsIcon: {
        marginLeft: 10,
        padding: 10,
    },
    enjoy: {
        fontSize: 16,
        color: "#555",
        textAlign: "center",
        marginTop: 5,
        marginBottom: 20,
        fontStyle: "italic",
    },
    offerCard: {
        backgroundColor: "#FEFAF6",
        padding: 20,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 8,
        marginHorizontal: 10,
        width: "95%",
        alignSelf: "center",
        height: 180,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    offerTextContainer: {
        flex: 1,
    },

    offerTitle: {
        fontSize: 28,
        fontWeight: 900,
        color: "#333",
    },

    offerDiscount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "#666",
    },

    offerItems: {
        fontSize: 14,
        color: "#999",
    },

    offerImage: {
        width: 100,
        height: 100,
    },
    cart: {
        elevation: 10,
        backgroundColor: "#FEFAF6",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginRight: 10,
        marginTop: 7,
        marginBottom: 7,
    },
    cartText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
    },
    selectedCart: {
        backgroundColor: "orange"
    },

    profileSection: {
        marginTop: 15,
        marginRight: 60,
        marginLeft: 60,
        textAlign: 'center',

    },
    profileText: {
        padding: 7,
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
        fontStyle: 'italic',
        backgroundColor: '#002244',
        color: 'white',
        borderRadius: 30,
    },
    productHeader: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#002244",
        textAlign: "center",
        marginTop: 25,
        marginBottom: 10,
    },

    productsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        marginBottom: 20
    },

    productCard: {
        backgroundColor: "#FEFAF6",
        width: "48%",
        borderRadius: 15,
        padding: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        marginBottom: 15,
    },

    productImage: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },

    productName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
    },

    productPrice: {
        fontSize: 14,
        color: "#666",
        fontWeight: "bold",
        marginTop: 5,
        textAlign: 'center'
    },
});







