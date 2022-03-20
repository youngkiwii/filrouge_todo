import React, {useContext} from 'react'
import { Text} from 'react-native'
import { ContainerWhite } from '../components/Container'
import { CustomButton } from '../components/UI/CustomButton'
import { styles } from '../components/styles'
import { TokenContext, UsernameContext } from '../Contexte/Context'
import { Buffer } from 'buffer'

// Écran de "paramètres" (admin a un bouton en plus)
export default function SettingsScreen ({ navigation }) {
    const [token, setToken] = useContext(TokenContext);
    const [username, setUsername] = useContext(UsernameContext);
    const decodedJwt = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('ascii'));

    return (
        <ContainerWhite>
            <Text style={styles.title}>Paramètres</Text>
            {
                decodedJwt.roles.includes("admin") ?
                <CustomButton onPress={() => {navigation.navigate("Admin")}} style={{marginTop: 10}} text="Administration des utilisateurs"/>
                :
                <></>
            }
            <CustomButton style={{marginTop: 10}} onPress={() => {
                setToken(null);
                setUsername(null);
            }}text="Se déconnecter"/>
        </ContainerWhite>
    )
}