import { StyleSheet, View, Text, TextInput, Pressable, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useContext, useState } from "react";
import { Ionicons } from '@expo/vector-icons'; 
import { Createuser } from "../fireauth";
import { db } from "../firebasestore";
import { collection, addDoc } from "firebase/firestore";
import { Authcontext } from "../contextstore";

function Signupscreen({ navigation }) {
  const authctx = useContext(Authcontext);
  const [selectgender, setselectgender] = useState("Male");
  const [selectclass, setselectclass] = useState("9th");
  const [pickervisible, setpickervisible] = useState(false);
  const [pickerclass, setpickerclass] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");

  function pickerhandel() {
    setpickervisible(!pickervisible);
  }

  function pickerclasshandel() {
    setpickerclass(!pickerclass);
  }

  function backarrowhandel1() {
    navigation.navigate("Welcome");
  }

  function backarrowhandel() {
    navigation.navigate("Login");
  }

  function namehandel(name) {
    setname(name);
  }

  function phonenumberhandel(number) {
    setphonenumber(number);
  }

  function emailhandel(email) {
    setemail(email);
  }

  function passwordhandel(password) {
    setpassword(password);
  }

  function confirmpasswordhandel(confirmpassword) {
    setconfirmpassword(confirmpassword);
  }

  function registerbutton() {
    if (name && email && phonenumber && selectclass && selectgender && password === confirmpassword) {
      const studentdata = {
        name: name,
        email: email,
        phonenumber: phonenumber,
        password: password,
        class: selectclass,
        gender: selectgender
      };
      console.log(studentdata);
      Createuser(email, confirmpassword);
      async function studentinfo() {
        try {
          const studentRef = await addDoc(collection(db, "studentinfo"), {
            name: name,
            email: email,
            phonenumber: phonenumber,
            password: password,
            stdclass: selectclass,
            gender: selectgender
          });
          authctx.studentidtaker(studentRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
      studentinfo();
      Alert.alert("Kayıt Başarılı");
      setemail("");
      setname("");
      setphonenumber("");
      setpassword("");
      setconfirmpassword("");
    } else {
      Alert.alert("Please fill all input fields!", "Check that your password matches the confirm password.");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={backarrowhandel1}>
          <Ionicons name="arrow-back" size={24} color="#1DB954" />
        </Pressable>
        <Text style={styles.signuptexthead}>Kaydolun</Text>
      </View>
      <View style={styles.containerInner}>
        <Text style={styles.headtext}>Kaydolun:</Text>
        <View>
          <Text style={styles.textstyle}>Ad Soyad:</Text>
          <View style={styles.inputbox}>
            <TextInput style={styles.inputtext} value={name} onChangeText={namehandel} placeholder="Adınız Soyadınız" placeholderTextColor="#A0A0A0" />
          </View>
          <View>
            <Text style={styles.textstyle}>Mail:</Text>
            <View style={styles.inputbox}>
              <TextInput style={styles.inputtext} value={email} onChangeText={emailhandel} placeholder="Mail" placeholderTextColor="#A0A0A0" />
            </View>
          </View>
          <View>
            <Text style={styles.textstyle}>Telefon Numarası:</Text>
            <View style={styles.inputbox}>
              <TextInput style={styles.inputtext} value={phonenumber} onChangeText={phonenumberhandel} keyboardType="decimal-pad" placeholder="Telefon Numarası" placeholderTextColor="#A0A0A0" />
            </View>
          </View>
          <View>
            <View style={styles.pickerbox}>
              <Text style={styles.textstyle}>Cinsiyet:</Text>
              <Pressable onPress={pickerhandel}>
                <Ionicons name={pickervisible ? "chevron-up" : "chevron-down"} size={24} color="#E0E0E0" />
              </Pressable>
            </View>
            {pickervisible && (
              <Picker selectedValue={selectgender} onValueChange={(itemvalue) => setselectgender(itemvalue)} style={styles.picker}>
                <Picker.Item label="Erkek" value="Erkek" />
                <Picker.Item label="Kadın" value="Kadın" />
              </Picker>
            )}
          </View>
          <View style={styles.pickerspace}>
            <View style={styles.pickerbox}>
              <Text style={styles.textstyle}>Yaş Aralığı</Text>
              <Pressable onPress={pickerclasshandel}>
                <Ionicons name={pickerclass ? "chevron-up" : "chevron-down"} size={24} color="#E0E0E0" />
              </Pressable>
            </View>
            {pickerclass && (
              <Picker selectedValue={selectclass} onValueChange={(itemvalue) => setselectclass(itemvalue)} style={styles.picker}>
                <Picker.Item label="48-60 Aylik" value="48-60 Aylik" />
                <Picker.Item label="60-72 Aylik" value="60-72 Aylik" />
              </Picker>
            )}
          </View>
          <View>
            <Text style={styles.textstyle}>Şifre:</Text>
            <View style={styles.inputbox}>
              <TextInput style={styles.inputtext} value={password} onChangeText={passwordhandel} placeholder="Şifre" placeholderTextColor="#A0A0A0" />
            </View>
          </View>
          <View>
            <Text style={styles.textstyle}>Şifreyi Onayla:</Text>
            <View style={styles.inputbox}>
              <TextInput style={styles.inputtext} value={confirmpassword} onChangeText={confirmpasswordhandel} placeholder="Şifreyi Onayla" placeholderTextColor="#A0A0A0" />
            </View>
          </View>
        </View>
        <View>
          <Pressable style={styles.buttonstyle} onPress={registerbutton}>
            <Text style={styles.buttontext}>Kayıt Olun</Text>
          </Pressable>
        </View>
        <View style={styles.fotterstyle}>
          <Text style={styles.textstyle}>Hesabınız var mı? </Text>
          <Pressable onPress={backarrowhandel}>
            <Text style={[styles.textstyle, styles.logintext]}>Giriş</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default Signupscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", 
    padding: 20,
  },
  containerInner: {
    marginTop: 12,
  },
  pickerbox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pickerspace: {
    marginTop: 12,
  },
  picker: {
    color: "#E0E0E0",
  },
  header: {
    flexDirection: "row",
    marginTop: 50,
  },
  signuptexthead: {
    marginLeft: 115,
    fontSize: 22,
    fontWeight: "500",
    color: "#1DB954",
  },
  headtext: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 16,
    color: "#E0E0E0", 
  },
  textstyle: {
    fontSize: 17,
    marginBottom: 12,
    color: "#E0E0E0", 
  },
  fotterstyle: {
    flexDirection: "row",
    justifyContent: "center",
  },
  inputbox: {
    marginBottom: 12,
    borderWidth: 0.5,
    borderColor: "#A0A0A0", 
    padding: 6,
    borderRadius: 8,
  },
  inputtext: {
    marginLeft: 8,
    color: "#E0E0E0", 
  },
  buttonstyle: {
    backgroundColor: "#1DB954", 
    borderRadius: 18,
    padding: 10,
    width: 320,
    marginLeft: 12,
    marginTop: 16,
    marginBottom: 42,
  },
  buttontext: {
    color: "#E0E0E0",
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
  },
  logintext: {
    color: "#1DB954", 
    fontSize: 19,
    fontWeight: "500",
  },
});