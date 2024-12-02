import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { auth, db } from "../firebaseConfig";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore"; // New imports
import EventCard from "../components/EventCard";

const FavoritesScreen = ({ navigation }) => {
  const [favoriteEvents, setFavoriteEvents] = useState([]);
  
  useEffect(() => {
    const fetchFavoriteEvents = async () => {
      if (!auth.currentUser) {
        console.error("User not authenticated");
        return; 
      }
      
      try {
        const q = query(
          collection(db, "favorites"),
          where("userId", "==", auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);

        const favoriteIds = querySnapshot.docs.map((doc) => doc.data().eventId);
        const eventPromises = favoriteIds.map((id) => getDoc(doc(db, "events", id)));
        const eventSnapshots = await Promise.all(eventPromises);

        const events = eventSnapshots.map((snapshot) => ({ id: snapshot.id, ...snapshot.data() }));
        setFavoriteEvents(events);
      } catch (error) {
        console.error("Error fetching favorite events:", error);
      }
    };

    fetchFavoriteEvents();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            onPress={() => navigation.navigate("EventDetail", { event: item })}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f0f4f8",
      padding: 15,
    },
  });
  

export default FavoritesScreen;
