import { Text, View } from "react-native";
import {useContext} from "react";
import AuthContext from "../context/AuthContext";
import {Button} from "react-native-paper";
import {useAuth} from "../hooks/useAuth";

const ProfilScreen = () => {
    const user = useContext(AuthContext);
    console.log(user);
    const { signout } = useAuth();

    const handleSignOut = async () => {
        await signout();
        alert("Vous avez été déconnecté.");
    };

    return (
    <View>
      <Text>Profil</Text>
        {user}
        <Text>{user?.email}</Text>
        <Button mode="contained" onPress={handleSignOut}>
            Sign Out
        </Button>
    </View>
  );
};

export default ProfilScreen;
