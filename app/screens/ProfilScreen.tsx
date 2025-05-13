import { Text, View } from "react-native";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const ProfilScreen = () => {
  const { user } = useContext(AuthContext);
  return (
    <View>
      <Text>Profil</Text>
      <Text>{user?.email}</Text>
    </View>
  );
};

export default ProfilScreen;
