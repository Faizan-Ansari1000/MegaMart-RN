import { useEffect, useState } from "react";
import { Text, View, ActivityIndicator, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiInstance from "../config/Apis/ApiInstance";
import { useNavigation } from "@react-navigation/native";
export default function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();


    useEffect(() => {
        const fetchProfile = async () => {
            const userId = await AsyncStorage.getItem("userId");
            if (!userId) return;
            try {
                const res = await ApiInstance.get(`/auth/profile/${userId}`);
                if (res.data.isSuccessfully) {
                    setUser(res.data.data);
                }
            } catch (error) {
                console.log("Error fetching profile", error);
            }
            setLoading(false);
        };
        fetchProfile();
    }, []);

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#002244" />
                <Text style={styles.loadingText}>Loading Profile...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Profile Header */}
            <View style={styles.header}>
                <Image
                    source={{ uri: user?.profilePic || "https://via.placeholder.com/150" }}
                    style={styles.profileImage}
                />
                <Text style={styles.userName}>{user?.name}</Text>
                <Text style={styles.userEmail}>{user?.email}</Text>
            </View>

            {/* Profile Details */}
            <View style={styles.detailsContainer}>
                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>150</Text>
                    <Text style={styles.statLabel}>Posts</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>2.5K</Text>
                    <Text style={styles.statLabel}>Followers</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>500</Text>
                    <Text style={styles.statLabel}>Following</Text>
                </View>
            </View>

            {/* Edit Profile Button */}
            <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('LogOut')}>
                <Text style={styles.editButtonText}>Account Deleted</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = {
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
        paddingTop: 50,
    },
    header: {
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 20,
        width: "90%",
        borderRadius: 15,
        elevation: 5,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: "#002244",
    },
    userName: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#002244",
        marginTop: 10,
    },
    userEmail: {
        fontSize: 16,
        color: "#555",
    },
    detailsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        marginTop: 20,
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 15,
        elevation: 5,
    },
    statBox: {
        alignItems: "center",
        flex: 1,
    },
    statNumber: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#002244",
    },
    statLabel: {
        fontSize: 14,
        color: "#777",
    },
    editButton: {
        backgroundColor: "#002244",
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginTop: 20,
        elevation: 5,
    },
    editButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#002244",
    },
    loadingText: {
        fontSize: 16,
        marginTop: 10,
        color: "#fff",
    }
};