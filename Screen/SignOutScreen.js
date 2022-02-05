import React from 'react'
import { View } from 'react-native'
import { CustomButton } from '../components/CustomButton'
import { styles } from '../components/styles'
import { TokenContext, UsernameContext } from '../Contexte/Context'

export default function SignOutScreen ({ navigation }) {
    return (
        <TokenContext.Consumer>
            {([token, setToken]) => (
                <UsernameContext.Consumer>
                    {([username, setUsername]) => 
                        <View style={styles.body}>
                            <CustomButton style={{marginTop: 20}} onPress={() => {
                                setToken(null);
                                setUsername(null);
                            }}text="Se déconnecter"/>
                        </View>
                    }
                </UsernameContext.Consumer>
        )}
        </TokenContext.Consumer>
    )
}