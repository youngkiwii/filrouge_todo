import React, { useState } from 'react'
import { View, Text, TextInput } from 'react-native'
import { CustomButton } from '../components/CustomButton';
import { styles } from '../components/styles';
import { TokenContext, UsernameContext } from '../Contexte/Context';

export default function SignInScreen ({navigation}) {
    const [password, setPassword] = useState(null);

    return (
        <TokenContext.Consumer>
            {([token, setToken]) => (
                <UsernameContext.Consumer>
                {([username, setUsername]) => 
                    <View style={styles.body}>
                        <Text style={styles.title}>Connexion</Text>
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
                        <CustomButton style={{marginTop: 10}} text='Connexion'/>
                    </View>
                }
                </UsernameContext.Consumer>
            )}
            </TokenContext.Consumer>
    );
}