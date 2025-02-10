import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export default function LogOut() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    const logout = async () => {
        setLoading(true);
        await AsyncStorage.removeItem("userId");
        setLoading(false);
        navigation.replace("SignUp");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Are you sure?</Text>
            <Text style={styles.description}>
                Logging out will end your current session.
                You can always log in again with your credentials.
            </Text>

            <TouchableOpacity 
                onPress={logout} 
                style={[styles.button, loading && styles.disabledButton]} 
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Log Out</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelButton} disabled={loading}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = {
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 20,
    },
    heading: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#002244",
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        marginBottom: 25,
        paddingHorizontal: 15,
        lineHeight: 22,
    },
    button: {
        backgroundColor: "#D32F2F",
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: "#B71C1C",
        shadowColor: "#B71C1C",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        alignItems: "center",
    },
    disabledButton: {
        opacity: 0.6,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        letterSpacing: 0.8,
    },
    cancelButton: {
        marginTop: 10,
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: "#002244",
        backgroundColor: '#002244'
    },
    cancelButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
};
