import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert, TouchableOpacity ,Text} from "react-native";
import { auth, db } from "../firebaseConfig";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore"; 

const AddEditEventScreen = ({ navigation, route }) => {
  const { event } = route.params || {};
  const [eventName, setEventName] = useState(event?.eventName || "");
  const [eventDescription, setEventDescription] = useState(event?.eventDescription || "");
  const [eventDate, setEventDate] = useState(event?.eventDate || "");
  const [eventLocation, setEventLocation] = useState(event?.eventLocation || "");

  const handleSave = async () => {
    if (!eventName || !eventDescription || !eventDate || !eventLocation) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(eventDate);
    if (!isValidDate) {
      Alert.alert("Error", "Invalid date format. Use YYYY-MM-DD.");
      return;
    }

    const eventData = {
      eventName,
      eventDescription,
      eventDate,
      eventLocation,
      createdBy: auth.currentUser.email,
      creatorId: auth.currentUser.uid,
    };

    try {
      if (event) {
        const eventDoc = doc(db, "events", event.id);
        await updateDoc(eventDoc, eventData);
        Alert.alert("Success", "Event updated!");
      } else {
        await addDoc(collection(db, "events"), eventData);
        Alert.alert("Success", "Event added!");
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Event Name"
        value={eventName}
        onChangeText={setEventName}
      />
      <TextInput
        style={styles.input}
        placeholder="Event Description"
        value={eventDescription}
        onChangeText={setEventDescription}
        multiline
        numberOfLines={4}
      />
      <TextInput
        style={styles.input}
        placeholder="Event Date (YYYY-MM-DD)"
        value={eventDate}
        onChangeText={setEventDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Event Location"
        value={eventLocation}
        onChangeText={setEventLocation}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Event</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7f7f7",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AddEditEventScreen;
