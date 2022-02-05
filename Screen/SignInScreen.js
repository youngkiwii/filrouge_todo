import React, { useState } from 'react'
import { View, Text, TextInput } from 'react-native'
import { CustomButton } from '../components/CustomButton';
import { styles } from '../components/styles';
import { TokenContext, UsernameContext } from '../Contexte/Context';
import { signIn } from '../API/todoAPI';

export default function SignInScreen ({props, navigation}) {
    const [password, setPassword] = useState(null);
    const [login, setLogin] = useState(null);
    const [feedback, setFeedback] = useState(null);
    
    return (
        <TokenContext.Consumer>
            {([token, setToken]) => (
                <UsernameContext.Consumer>
                {([username, setUsername]) => 
                    <View style={styles.body}>
                        <Text style={styles.title}>Connexion</Text>
                        {
                            feedback !== null ? <Text style={{marginTop: 5,color: 'red'}}>{feedback}</Text> : <></>
                        }
                        <TextInput
                            style={styles.input}
                            placeholder="Nom d'utilisateur"
                            value={login}
                            onChangeText={setLogin}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Mot de passe"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <CustomButton onPress={() => {
                            signIn(login, password)
                            .then(token => {
                                setToken(token)
                                setUsername(login)
                                props.navigate('Home')
                            })
                            .catch(err => {
                                setFeedback("Nom d'utilisateur ou mot de passe invalide.")
                            })
                        }} style={{marginTop: 10}} text='Connexion'/>
                    </View>
                }
                </UsernameContext.Consumer>
            )}
            </TokenContext.Consumer>
    );
}