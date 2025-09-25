import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'

import { useTheme } from '../contexts/theme'
import { Screens, Stacks } from '../types/navigators'

interface WhatIsFibonProps {
  navigation: NavigationProp<ParamListBase>
}

const WhatIsFibon: React.FC<WhatIsFibonProps> = ({ navigation }) => {
  const { ColorPallet, TextTheme } = useTheme()
  const { t } = useTranslation()
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: ColorPallet.brand.primaryBackground,
    },
    title: {
      ...TextTheme.headingTwo,
      marginBottom: 15,
    },
    pageContent: {
      marginTop: 30,
      paddingLeft: 25,
      paddingRight: 25,
    },
    fakeLink: {
      color: ColorPallet.brand.link,
      textDecorationLine: 'underline',
    },
  })

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.pageContent}
        directionalLockEnabled
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
      >
        <Text style={TextTheme.normal}>{t('WhatIsFibon.Preamble')}</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default WhatIsFibon
