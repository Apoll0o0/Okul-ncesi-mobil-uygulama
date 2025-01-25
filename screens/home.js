import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { Authcontext } from "../contextstore";
import { useContext, useEffect, useState } from "react";
import { db } from "../firebasestore";
import { getDoc, doc, getDocs, collection } from "firebase/firestore";

function Home({ navigation }) {
  const [studentdata, setstudentdata] = useState("");
  const [timetable, settimetable] = useState([]);
  const authctx = useContext(Authcontext);
  const [id, setid] = useState("");

  useEffect(() => {

    if (authctx.studentid) {
      console.log("Student ID set:", authctx.studentid);
      setid(authctx.studentid);
    } else {
      console.log("Student ID henüz mevcut değil.");
    }
  }, [authctx.studentid]);

  useEffect(() => {
    console.log("ID mevcut muuuuu?", id);
    gettingstudentinfo();
  }, [id]); // id değiştiğinde çalışacak

  useEffect(() => {
    fetchingtimetable();
  }, [studentdata]); // id değiştiğinde çalışacak

  function logout() {
    authctx.logout("");
  }

  async function gettingstudentinfo() {
    try {
      if (id) {
        const docref = doc(db, "studentinfo", id);
        const docsnap = await getDoc(docref);
        const { email, gender, name, stdclass, phonenumber } = docsnap.data();
        setstudentdata({ email, gender, name, stdclass, phonenumber });
      }
    } catch (error) {
      Alert.alert("Data not found", error);
    }
  }

  async function fetchingtimetable() {
    try {
      if (studentdata && studentdata.stdclass) {
        console.log("Sınıf:", studentdata.stdclass); // Öğrenci sınıfını kontrol et
        // Firebase'deki "timetables" koleksiyonunu alıyoruz
        const querySnapshot = await getDocs(collection(db, "timetables"));

        let classDocId = "";

        // Koleksiyondaki tüm dokümanları tarıyoruz
        querySnapshot.forEach((doc) => {
          const timetableData = doc.data();
          console.log("Doküman Verisi:", timetableData); // Veriyi kontrol et
          console.log("Öğrenci Sınıfı:", studentdata.stdclass); // Öğrencinin sınıfını kontrol et
          if (timetableData.className === studentdata.stdclass) {
            classDocId = doc.id; // Eşleşen dokümanın ID'sini alıyoruz
          }
        });

        // Eğer eşleşen doküman bulunamazsa, kullanıcıya uyarı veriyoruz
        if (!classDocId) {
          Alert.alert("Veri Bulunamadı", "Ders programı mevcut değil.");
          return;
        }

        const docref = doc(db, "timetables", classDocId);
        const docsnap = await getDoc(docref);
        console.log("Ders Programı Verisi Mevcut mu?:", docsnap.exists()); // Exists kontrolü

        if (docsnap.exists()) {
          const timetableData = docsnap.data();
          console.log("Ders Programı Verisi:", timetableData);
          const processedTimetable = timetableData.subjects.map((subject) => ({
            subject: subject.name,
            start: subject.startTime || "Bilinmiyor",
            end: subject.endTime || "Bilinmiyor",
          }));
          settimetable(processedTimetable);
        } else {
          Alert.alert("Veri Bulunamadı", "Ders programı mevcut değil.");
        }
      }
    } catch (error) {
      Alert.alert("Hata", "Ders programı alınırken bir hata oluştu.");
    } 
  }

  if (!studentdata||!timetable) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1DB954" />
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.maincontainer}>
      <View style={styles.header}>
        <Text style={styles.headertext}>Anasayfa</Text>
        <Pressable onPress={logout}>
          <Ionicons name="exit-outline" size={28} color="#FF6F61" />
        </Pressable>
      </View>

      <View style={styles.profileSection}>
        <Image
          style={styles.profileImage}
          source={
            studentdata.gender === "Male"
              ? require("../assets/character.png")
              : require("../assets/fcharacter.png")
          }
        />
        <View style={styles.profileInfo}>
          <View style={styles.profileRow}>
            <Ionicons name="person-outline" size={18} color="#1DB954" />
            <Text style={styles.profileText}>Ad Soyad: {studentdata.name}</Text>
          </View>
          <View style={styles.profileRow}>
            <Ionicons name="mail-outline" size={18} color="#1DB954" />
            <Text style={styles.profileText}>Mail: {studentdata.email}</Text>
          </View>
          <View style={styles.profileRow}>
            <Ionicons name="school-outline" size={18} color="#1DB954" />
            <Text style={styles.profileText}>Yaş Grubu: {studentdata.stdclass}</Text>
          </View>
          <View style={styles.profileRow}>
            <Ionicons name="call-outline" size={18} color="#1DB954" />
            <Text style={styles.profileText}>
              Telefon Numarası: {studentdata.phonenumber}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.leftContainer}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <MaterialIcons name="schedule" size={24} color="#1DB954" />
              <Text style={styles.cardTitle}>Ders Programı</Text>
            </View>

            <View style={styles.cardContent}>
              {timetable.length > 0 ? (
                timetable.map((item, index) => (
                  <View key={index} style={styles.timetableItem}>
                    <Text style={styles.subjectTitle}>{item.subject}</Text>
                    <View style={styles.timeRow}>
                      <Text style={styles.timeLabel}>Başlangıç:</Text>
                      <Text style={styles.timeValue}>{item.start}</Text>
                    </View>
                    <View style={styles.timeRow}>
                      <Text style={styles.timeLabel}>Bitiş:</Text>
                      <Text style={styles.timeValue}>{item.end}</Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={styles.subjectTitle}>
                  Ders programı yüklenemedi.
                </Text>
              )}
            </View>
          </View>
        </View>

        <View style={styles.rightContainer}>
          <Pressable
            style={[styles.card, styles.resultCard]}
            onPress={() => navigation.navigate("Result")}
          >
            <View style={styles.cardHeader}>
              <Ionicons name="analytics-outline" size={24} color="#1DB954" />
              <Text style={styles.cardTitle}>Akademik Performans</Text>
            </View>
            <View style={styles.resultContent}>
              <View style={styles.resultRow}>
                <Text style={styles.resultMonth}>
                  {" "}
                     Çocuğunuzun notları için tıklayın
                </Text>
              </View>
            </View>
          </Pressable>

                    <View style={[styles.card, styles.attendanceCard]}>
            <Pressable onPress={() => navigation.navigate("studentStatus")}>
                <View style={styles.cardHeader}>
                <FontAwesome5 name="clipboard-list" size={24} color="#1DB954" />
                <Text style={styles.cardTitle}>Öğrenci Davranışları</Text>
                </View>
                <View style={styles.resultContent}>
                <View style={styles.resultRow}>
                    <Text style={styles.resultMonth}>Pazartesi:</Text>
                    <Text style={styles.resultPercentage}>İzleme</Text>
                </View>
                </View>
            </Pressable>
            </View>
        </View>
      </View>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 32,
  },
  headertext: {
    fontSize: 24,
    color: "#1DB954",
    fontWeight: "bold",
    marginLeft: 150,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#1C1C1C",
    borderRadius: 16,
    marginBottom: 24,
    elevation: 4,
    marginTop: 18,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    marginLeft: 16,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  profileText: {
    color: "#E0E0E0",
    fontSize: 15,
    marginLeft: 8,
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },
  leftContainer: {
    flex: 1,
    marginRight: 10,
  },
  rightContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: "#1C1C1C",
    padding: 16,
    borderRadius: 16,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    color: "#1DB954",
    fontWeight: "bold",
    marginLeft: 6,
  },
  cardContent: {
    padding: 12,
  },
  timetableItem: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#2C2C2C",
    borderRadius: 8,
    marginTop: 8,
  },
  subjectTitle: {
    fontSize: 18,
    color: "#E0E0E0",
    fontWeight: "bold",
  },
  timeText: {
    fontSize: 16,
    color: "#A0A0A0",
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  timeLabel: {
    fontSize: 14,
    color: "#A0A0A0",
  },
  timeValue: {
    fontSize: 14,
    color: "#E0E0E0",
    fontWeight: "500",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  loadingText: {
    fontSize: 18,
    color: "#E0E0E0",
    marginTop: 12,
  },
  resultCard: {
    backgroundColor: "#1C1C1C",
    marginBottom: 16,
  },
  resultContent: {
    marginTop: 8,
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  resultMonth: {
    fontSize: 18,
    color: "#E0E0E0",
  },
  resultPercentage: {
    fontSize: 16,
    color: "#A0A0A0",
  },
  attendanceCard: {
    marginTop: 16,
  },
});
