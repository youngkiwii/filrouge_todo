import React, {useState} from 'react'
import { View, TextInput, Text } from 'react-native'
import { CustomButton } from '../components/CustomButton';
import { styles } from '../components/styles';

export default function SignUpScreen ({ navigation }) {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPwd, setConfirmPwd] = useState(null);

    return (
        <View style={styles.body}>
            <Text style={styles.title}>Inscription</Text>
            <TextInput
                style={styles.input}
                placeholder="Nom d'utilisateur"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirmer le mot de passe"
                secureTextEntry={true}
                value={confirmPwd}
                onChangeText={setConfirmPwd}
            />
            <CustomButton style={{marginTop: 10}} text="S'inscrire"/>
        </View>
    );
}