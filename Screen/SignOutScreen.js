import React from 'react'
import { View } from 'react-native'
import { ContainerWhite } from '../components/Container'
import { CustomButton } from '../components/CustomButton'
import { styles } from '../components/styles'
import { TokenContext, UsernameContext } from '../Contexte/Context'

export default function SignOutScreen ({ navigation }) {
    return (
        <TokenContext.Consumer>
            {([token, setToken]) => (
                <UsernameContext.Consumer>
                    {([username, setUsername]) => 
                        <ContainerWhite>
                            <CustomButton style={{marginTop: 20}} onPress={() => {
                                setToken(null);
                                setUsername(null);
                            }}text="Se déconnecter"/>
                        </ContainerWhite>
                    }
                </UsernameContext.Consumer>
        )}
        </TokenContext.Consumer>
    )
}