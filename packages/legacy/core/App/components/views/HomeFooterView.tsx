import { CredentialState } from '@credo-ts/core'
import { useCredentialByState } from '@credo-ts/react-hooks'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../../contexts/theme'
import Button, { ButtonType } from '../buttons/Button'
import { useOpenIDCredentials } from '../../modules/openid/context/OpenIDCredentialRecordProvider'
import { AppleCard } from 'react-native-apple-card-views';
import { CredentialStackParams, HomeStackParams, Screens } from '../../types/navigators'

const offset = 25

interface HomeFooterViewProps {
  children?: any
  navigation?: NavigationProp<any>; // Opsiyonel olarak ekledik
}

const HomeFooterView: React.FC<HomeFooterViewProps> = ({ children, navigation }) => {
  const { openIdState } = useOpenIDCredentials()
  const { w3cCredentialRecords } = openIdState
  const credentials = [
    ...useCredentialByState(CredentialState.CredentialReceived),
    ...useCredentialByState(CredentialState.Done),
    ...w3cCredentialRecords,
  ]
  const { HomeTheme, TextTheme, Assets } = useTheme()
  const { t } = useTranslation()
  
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: offset,
      paddingBottom: offset * 3,
    },

    messageContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: offset,
    },

    imageContainer: {
      alignItems: 'center',
      marginTop: 100,
    },
  })

  const displayMessage = (credentialCount: number) => {
    if (typeof credentialCount === 'undefined' && credentialCount >= 0) {
      throw new Error('Credential count cannot be undefined')
    }

    let credentialMsg
    let scanReminder

    if (credentialCount === 1) {
      credentialMsg = (
        <Text>
          {t('Home.YouHave')} <Text style={{ fontWeight: TextTheme.bold.fontWeight }}>{credentialCount}</Text>{' '}
          {t('Home.Credential')} {t('Home.InYourWallet')}
        </Text>
      )
    } else if (credentialCount > 1) {
      credentialMsg = (
        <Text>
          {t('Home.YouHave')} <Text style={{ fontWeight: TextTheme.bold.fontWeight }}>{credentialCount}</Text>{' '}
          {t('Home.Credentials')} {t('Home.InYourWallet')}
        </Text>
      )
    } else {
      credentialMsg = (
        <Text style={[TextTheme.bold]}>
          {t('Home.NoCredentials')}
        </Text>
      )
      scanReminder = (
        <Text>
          {t('Home.ScanOfferAddCard')}
        </Text>
      )
    }

    return (
      <>
        <View style={{
                      marginBottom: 32,
                      paddingTop: 16,
                      paddingBottom: 32,
                      alignItems: 'center',
                      justifyContent: 'center',}}>
                  <AppleCard
                      smallTitle="How do I add my IDs"
                      largeTitle=""
                      footnote=""
                      source={require("../../assets/img/fibon-how-do.png")}
                      backgroundStyle={{
                          height: 200,
                      }}
                      onPress={() => navigation.navigate(Screens.HowDoIAddMyIDs)}
                  />
                  </View>
                  <View
                      style={{
                          paddingTop: 0,
                          marginTop: 'auto',
                          margin: 100,
                      }}
                  >
                      <Button
                          title={'Add Identity Card'}
                          accessibilityLabel={'Get Started'}
                          onPress={() => navigation.navigate(Screens.MrzReader)}
                          buttonType={ButtonType.Primary}
                      />
                  </View>
      </>
    )
  }

  return (
    <View>
      <View style={styles.container}>{displayMessage(credentials.length)}</View>
      {children}
    </View>
  )
}

export default HomeFooterView
