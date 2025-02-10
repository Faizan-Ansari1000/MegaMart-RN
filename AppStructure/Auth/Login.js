import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View, ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiInstance from "../config/Apis/ApiInstance";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
    const [model, setModel] = useState({});
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    
    useEffect(() => {
        const checkUserSession = async () => {
            const user = await AsyncStorage.getItem("user");
            if (user) {
                navigation.replace("Home"); 
            }
        };
        checkUserSession();
    }, []);

    const loginUser = async () => {
        if (!model.email || !model.password) {
            return Toast.show({ type: "error", text1: "Validation error", text2: "Please fill all fields" });
        }
        setLoading(true);
        try {
            const res = await ApiInstance.post("/auth/Login", model);
            console.log(res, "logged in");
            Toast.show({ type: "success", text1: "Login", text2: "User logged in successfully" });

            await AsyncStorage.setItem("user", JSON.stringify(res.data)); 
            navigation.replace("Home"); 
        } catch (err) {
            console.log(err, "error");
            Toast.show({ type: "error", text1: "Error", text2: "Login failed. Try again." });
        }
        setLoading(false);
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#777"
                        keyboardType="email-address"
                        onChangeText={(e) => setModel({ ...model, email: e })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#777"
                        secureTextEntry
                        onChangeText={(e) => setModel({ ...model, password: e })}
                    />
                </View>
                <TouchableOpacity
                    style={[styles.button, loading && styles.disabledButton]}
                    onPress={loginUser}
                    disabled={loading}
                >
                    {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
                </TouchableOpacity>
                <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 15 }}>
                    <Text style={styles.loginText}>Account created? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                        <Text style={styles.loginLink}>SignUp</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = {
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f3f4f6",
    },
    container: {
        width: "100%",
        backgroundColor: "#fff",
        padding: 25,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#222",
        textAlign: "center",
    },
    inputContainer: {
        width: "100%",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        padding: 15,
        marginBottom: 15,
        borderBottomWidth: 2,
        borderColor: "#002244",
        color: "#222",
        fontSize: 16,
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
    },
    button: {
        width: "100%",
        padding: 15,
        backgroundColor: "#002244",
        borderRadius: 50,
        alignItems: "center",
        shadowColor: "#002244",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    disabledButton: {
        backgroundColor: "#aaa",
    },
    loginText: {
        fontSize: 16,
        color: "#555",
        textAlign: "center",
    },
    loginLink: {
        color: "#002244",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
    },
};
