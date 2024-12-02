import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { auth, db } from "../firebaseConfig";
import { doc, deleteDoc, collection, addDoc, query, where, getDocs } from "firebase/firestore";

const EventDetailScreen = ({ route, navigation }) => {
  const { event } = route.params;

  const handleDelete = async () => {
    try {
      if (auth.currentUser.email === event.createdBy) {
        await deleteDoc(doc(db, "events", event.id));
        Alert.alert("Success", "Event deleted!");
        navigation.goBack();
      } else {
        Alert.alert("Error", "You can only delete your own events!");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleAddToFavorites = async () => {
    try {
      const favoritesQuery = query(
        collection(db, "favorites"),
        where("userId", "==", auth.currentUser.uid),
        where("eventId", "==", event.id)
      );

      const favoritesSnapshot = await getDocs(favoritesQuery);

      if (!favoritesSnapshot.empty) {
        Alert.alert("Error", "Event is already in your favorites!");
        return;
      }

      await addDoc(collection(db, "favorites"), {
        userId: auth.currentUser.uid,
        eventId: event.id,
      });
      Alert.alert("Success", "Event added to favorites!");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.eventName}</Text>
      <Text style={styles.description}>{event.eventDescription}</Text>
      <Text style={styles.location}>Location: {event.eventLocation}</Text>
      <Text style={styles.date}>Date: {new Date(event.eventDate).toLocaleString()}</Text>
      <TouchableOpacity style={styles.button} onPress={handleAddToFavorites}>
        <Text style={styles.buttonText}>Add to Favorites</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AddEditEvent", { event })}>
        <Text style={styles.buttonText}>Edit Event</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonDelete} onPress={handleDelete}>
        <Text style={styles.buttonText}>Delete Event</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#f0f4f8",
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#2c3e50",
      marginBottom: 10,
    },
    description: {
      fontSize: 16,
      color: "#7f8c8d",
      marginBottom: 20,
      lineHeight: 22,
    },
    location: {
      fontSize: 18,
      color: "#34495e",
      marginBottom: 10,
    },
    date: {
      fontSize: 16,
      color: "#95a5a6",
      marginBottom: 20,
    },
    button: {
      backgroundColor: "#3498db",
      paddingVertical: 14,
      borderRadius: 8,
      marginBottom: 15,
      alignItems: "center",
    },
    buttonDelete: {
      backgroundColor: "#e74c3c",
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: "center",
    },
    buttonText: {
      color: "#ffffff",
      fontSize: 16,
      fontWeight: "600",
    },
  });
  

export default EventDetailScreen;
