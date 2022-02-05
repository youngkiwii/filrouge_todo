import React, {useState} from 'react'
import { View, TextInput, Text } from 'react-native'
import { signUp } from '../API/todoAPI';
import { CustomButton } from '../components/CustomButton';
import { styles } from '../components/styles';
import { TokenContext, UsernameContext } from '../Contexte/Context';

export default function SignUpScreen ({props,navigation }) {
    const [login, setLogin] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPwd, setConfirmPwd] = useState(null);
    const [feedback, setFeedback] = useState(null);

    const signUpFunc = (setToken, setUsername) => {
        if(password === confirmPwd){
            signUp(login, password)
            .then(token => {
                setToken(token);
                setUsername(login);
                props.navigate('Home');
            })
            .catch(err => {
                setFeedback("Ce nom a déjà été choisi.")
            });
        }else {
            setFeedback("Veuillez confirmer avec le même mot de passe.");
        }
    }

    return (
        <TokenContext.Consumer>
            {([token, setToken]) => (
                <UsernameContext.Consumer>
                    {([username, setUsername]) => 
                        <View style={styles.body}>
                            <Text style={styles.title}>Inscription</Text>
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
                            <TextInput
                                style={styles.input}
                                placeholder="Confirmer le mot de passe"
                                secureTextEntry={true}
                                value={confirmPwd}
                                onChangeText={setConfirmPwd}
                            />
                            <CustomButton 
                                onPress={() => {
                                    signUpFunc(setToken, setUsername);
                                }}
                                style={{marginTop: 10}} 
                                text="S'inscrire"
                            />
                        </View>
                    }
                </UsernameContext.Consumer>
            )}
        </TokenContext.Consumer>
    );
}