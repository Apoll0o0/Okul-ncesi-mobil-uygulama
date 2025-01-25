import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';

function Adminpanel({navigation}) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Öğretmen Paneli</Text>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Pressable onPress={()=>navigation.navigate("allstudent")}>
          <Ionicons name="people-outline" size={40} color="#1DB954" />
          <Text style={styles.statText}>Öğrenciler</Text>
          </Pressable>
        </View>
        <View style={styles.statCard}>
          <Pressable onPress={()=>navigation.navigate("teacherStatus")}>
          <Ionicons name="book-outline" size={40} color="#BB86FC" />
          <Text style={styles.statText}>Öğrenci durumu</Text>
          </Pressable> 
        </View>
      </View>
      <View style={styles.navContainer}>
        <Pressable style={styles.navButton} onPress={()=>navigation.navigate("timetable")}>
          <Ionicons name="settings-outline" size={24} color="#E0E0E0" />
          <Text style={styles.navText}>Ders Programı</Text>
        </Pressable>
        <Pressable style={styles.navButton} onPress={()=>navigation.navigate("addresult")}>
          <Ionicons name="analytics-outline" size={24} color="#E0E0E0" />
          <Text style={styles.navText}>Sonuçlar</Text>
        </Pressable>
        <Pressable style={styles.navButton} onPress={()=>navigation.navigate("addnotification")}>
          <Ionicons name="notifications-outline" size={24} color="#E0E0E0" />
          <Text style={styles.navText}>Bildirimler</Text>
        </Pressable>
      
      </View>
      <View style={styles.logoutContainer}>
                <Pressable style={styles.logoutButton} onPress={()=>navigation.navigate("adminlogin")}>
                    <Text style={styles.logoutText}>Çıkış</Text>
                </Pressable>
            </View>
        <View style={styles.activityContainer}>
        
      </View>
    </ScrollView>
  );
}
export default Adminpanel;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", 
    paddingHorizontal: 16,
    
    position:"relative"
  },
  header: {
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "#A0A0A0", 
    marginTop:24
  },
  headerTitle: {
    color: "#E0E0E0", 
    fontSize: 24,
    fontWeight: "600",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  statCard: {
    backgroundColor: "#1C1C1C", 
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  statText: {
    color: "#E0E0E0", 
    fontSize: 16,
    marginVertical: 8,
  },
  statNumber: {
    color: "#1DB954", 
    fontSize: 22,
    fontWeight: "bold",
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  navButton: {
    backgroundColor: "#1C1C1C",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    width: "30%",
  },
  navText: {
    color: "#E0E0E0",
    marginTop: 8,
    fontSize: 14,
  },
  activityContainer: {
    marginVertical: 20,
  },
  activityTitle: {
    color: "#E0E0E0",
    fontSize: 18,
    marginBottom: 12,
  },
  activityPlaceholder: {
    backgroundColor: "#1C1C1C",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  activityText: {
    color: "#A0A0A0", 
    fontSize: 16,
  },
  logoutContainer: {
    
    alignItems: "center",
},
logoutButton: {
    backgroundColor: "#FF6F61",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5,
    marginTop:38
},
logoutText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
},
});