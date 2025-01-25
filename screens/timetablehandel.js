import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../firebasestore"; // Firestore bağlantınızı içeren dosya
import { addDoc, collection } from "firebase/firestore";

function Timetable() {
  const [subjects, setSubjects] = useState([]); 
  const [className, setClassName] = useState(""); // Sınıf adı için state

  const addNewSubject = () => {
    setSubjects([...subjects, { name: "", startTime: "", endTime: "" }]);
  };

  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][field] = value; 
    setSubjects(updatedSubjects);
  };

  const saveTimetableToFirestore = async () => {
    if (!className || subjects.length === 0) {
      Alert.alert("Hata", "Lütfen sınıf adı ve en az bir konu girin.");
      return;
    }

    try {
      await addDoc(collection(db, "timetable"), {
        className: className,
        subjects: subjects,
      });
      Alert.alert("Başarılı", "Zaman tablosu Firestore'a kaydedildi!");
      setClassName("");
      setSubjects([]);
    } catch (error) {
      Alert.alert("Hata", "Veriler kaydedilirken bir hata oluştu: " + error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={addNewSubject}>
          <Ionicons style={styles.iconStyle} name="add" size={26} color="#1DB954" />
        </Pressable>
        <Text style={styles.headerText}>Konu Ekle</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.Textstyle}>Yaş grubu girin:</Text>
        <TextInput
          style={styles.classStyle}
          placeholder="Sınıf adını girin"
          value={className}
          onChangeText={(text) => setClassName(text)}
        />
      </View>

      {subjects.map((subject, index) => (
        <View key={index} style={styles.addSubjectContainer}>
          <Text style={styles.Textstyle}>Konu ismi:</Text>
          <TextInput
            style={styles.classStyle}
            placeholder="Konu ismi girin"
            value={subject.name}
            onChangeText={(text) => handleSubjectChange(index, "name", text)}
          />

          <Text style={styles.Textstyle}>Başlangıç zamanı:</Text>
          <TextInput
            style={styles.classStyle}
            placeholder="Başlangıç zamanı girin"
            value={subject.startTime}
            onChangeText={(text) => handleSubjectChange(index, "startTime", text)}
          />

          <Text style={styles.Textstyle}>Bitiş zamanı:</Text>
          <TextInput
            style={styles.classStyle}
            placeholder="Bitiş zamanı girin"
            value={subject.endTime}
            onChangeText={(text) => handleSubjectChange(index, "endTime", text)}
          />
        </View>
      ))}

      <Pressable style={styles.saveButton} onPress={saveTimetableToFirestore}>
        <Text style={styles.saveButtonText}>Zaman Tablosunu Kaydet</Text>
      </Pressable>
    </ScrollView>
  );
}

export default Timetable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#121212",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconStyle: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    color: "#1DB954",
    fontWeight: "bold",
  },
  inputContainer: {
    marginBottom: 16,
  },
  classStyle: {
    borderWidth: 1,
    borderColor: "#1DB954",
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    color: "#E0E0E0",
  },
  addSubjectContainer: {
    backgroundColor: "#1C1C1C",
    padding: 12,
    borderRadius: 8,
    borderColor: "#1DB954",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 10,
  },
  Textstyle: {
    color: "#E0E0E0",
  },
  saveButton: {
    backgroundColor: "#1DB954",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
