import React, { useState } from 'react'
import { View, Text, TextInput, ActivityIndicator } from 'react-native'
import { CustomButton } from '../components/CustomButton';
import { styles } from '../components/styles';
import { TokenContext, UsernameContext } from '../Contexte/Context';
import { signIn } from '../API/todoAPI';

export default function SignInScreen ({props, navigation}) {
    const [password, setPassword] = useState(null);
    const [login, setLogin] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const [loading, setLoading] = useState(false);

    const doLogin = (setToken, setUsername) => {
        setLoading(true);
        signIn(login, password)
        .then(token => {
            setToken(token)
            setUsername(login)
            props.navigate('Home')
            setLoading(false);
        })
        .catch(err => {
            setFeedback("Nom d'utilisateur ou mot de passe invalide.")
            setLoading(false);
        })
    };
    
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
                            onSubmitEditing={() => {doLogin(setToken, setUsername)}}
                        />
                        <CustomButton onPress={() => { doLogin(setToken, setUsername)}} style={{marginTop: 10}} text='Connexion'/>
                        {
                            loading ?
                            <ActivityIndicator color="midnightblue" size='large'/>
                            :
                            <></>
                        }
                    </View>
                }
                </UsernameContext.Consumer>
            )}
            </TokenContext.Consumer>
    );
}