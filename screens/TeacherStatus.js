import { View, Text, TextInput, StyleSheet, Pressable, Alert } from "react-native";
import { db } from "../firebasestore";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import {Ionicons} from '@expo/vector-icons';
function TeacherStatus({navigation}) {
  const [tital, settital] = useState("");
  const [description, setdescription] = useState("");
  function titalhandel(tital) {
    settital(tital);
  }
  function descriptionhandel(description) {
    setdescription(description);
  }
  async function Studentstatus() {
    try {
      await addDoc(collection(db, "Studentstatus"), {
        tital: tital,
        description: description
      });
      Alert.alert("Öğrenci durumu başarıyla eklendi");
    } catch (error) {
      Alert.alert("Duyuru ekleme hatası", error.message);
    }
  }
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Pressable style={styles.headericon} onPress={()=>navigation.navigate("adminpanel")}>
          <Ionicons name="arrow-back" color={"#1DB954"} size={28}/>
        </Pressable>
        <Text style={styles.headerText}> Öğrenci Durumu</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Başlık:</Text>
        <TextInput
          value={tital}
          onChangeText={titalhandel}
          style={styles.input}
          placeholder="Öğrenci durumu başlığı girin"
          placeholderTextColor="#A0A0A0" 
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Mesaj:</Text>
        <TextInput
          value={description}
          onChangeText={descriptionhandel}
          style={[styles.input, styles.textArea]}
          multiline={true}
          numberOfLines={4}
          placeholder="Buraya mesaj girin"
          placeholderTextColor="#A0A0A0"
        />
      </View>
      <Pressable style={styles.button} onPress={Studentstatus}>
        <Text style={styles.buttonText}>Onayla</Text>
      </Pressable>
    </View>
  );
}
export default TeacherStatus;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 16,
  },
  header: {
    marginBottom: 20,
    flexDirection:"row",
    marginTop:40
  },
  headerText: {
    color: "#E0E0E0",
    fontSize: 24,
    fontWeight: "600",
    marginLeft:64
  },
  headericon:{
    marginLeft:6
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    color: "#E0E0E0",
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#1C1C1C",
    color: "#E0E0E0",
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    borderColor: "#1DB954",
    borderWidth: 1,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#1DB954",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#E0E0E0",
    fontSize: 18,
    fontWeight: "600",
  },
});