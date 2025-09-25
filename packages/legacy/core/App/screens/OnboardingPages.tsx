import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import { SvgProps } from 'react-native-svg'

import CredentialList from '../assets/img/credential-list.svg'
import ScanShare from '../assets/img/scan-share.svg'
import SecureImage from '../assets/img/selfie.svg'
import IdCard from '../assets/img/id-card.svg'
import Scan from '../assets/img/scan.svg'
import ScanFace from '../assets/img/scan-face.svg'
import Button, { ButtonType } from '../components/buttons/Button'
import { DispatchAction } from '../contexts/reducers/store'
import { useStore } from '../contexts/store'
import { GenericFn } from '../types/fn'
import { OnboardingStackParams, Screens } from '../types/navigators'
import { testIdWithKey } from '../utils/testable'
import { Image, ImageBackground, ImageSourcePropType } from 'react-native';
import { useTheme } from '../contexts/theme'

import { OnboardingStyleSheet } from './Onboarding'

export const createCarouselStyle = (OnboardingTheme: any): OnboardingStyleSheet => {
  return StyleSheet.create({
    container: {
      ...OnboardingTheme.container,
      flex: 1,
      alignItems: 'center',
    },
    carouselContainer: {
      ...OnboardingTheme.carouselContainer,
      flexDirection: 'column',
    },
    pagerContainer: {
      flexShrink: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 30,
    },
    pagerDot: {
      ...OnboardingTheme.pagerDot,
      borderWidth: 1,
      borderStyle: 'solid',
    },
    pagerDotActive: {
      ...OnboardingTheme.pagerDotActive,
    },
    pagerDotInactive: {
      ...OnboardingTheme.pagerDotInactive,
    },
    pagerPosition: {
      position: 'relative',
      top: 0,
    },
    pagerNavigationButton: {
      ...OnboardingTheme.pagerNavigationButton,
    },
  })
}

export const createStyles = (OnboardingTheme: any) => {
  return StyleSheet.create({
    headerText: {
      ...OnboardingTheme.headerText,
    },
    bodyText: {
      ...OnboardingTheme.bodyText,
      flexShrink: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    image_style: {
        opacity: 0.3
    },
    point: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 20,
      marginTop: 10,
      marginRight: 20,
      marginBottom: 10,
    },
    icon: {
      marginRight: 10,
    },
  })
}

const createImageDisplayOptions = (OnboardingTheme: any) => {
  return {
    ...OnboardingTheme.imageDisplayOptions,
    height: 180,
    width: 180,
  }
}

const CustomPages = (onTutorialCompleted: GenericFn, OnboardingTheme: any) => {
  const { Assets } = useTheme()
  const { t } = useTranslation()
  const styles = createStyles(OnboardingTheme)
  const imageDisplayOptions = createImageDisplayOptions(OnboardingTheme)
  return (
    <>
      <ScrollView style={{ padding: 20 }}>
        <View style={{ alignItems: 'center' }}>
          <SecureImage {...imageDisplayOptions} />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.headerText} testID={testIdWithKey('HeaderText')}>
            Take a photo of yourself
          </Text>
          <Text style={[styles.bodyText, { marginTop: 25 }]} testID={testIdWithKey('BodyText')}>
            You'll be asked to take a photo of yourself using your device. This checks the document belongs to you.
          </Text>
        </View>
      </ScrollView>
      <View style={{ marginTop: 'auto', margin: 20 }}>
        <Button
          title={t('Global.GetStarted')}
          accessibilityLabel={t('Global.GetStarted')}
          testID={testIdWithKey('GetStarted')}
          onPress={onTutorialCompleted}
          buttonType={ButtonType.Primary}
        />
      </View>
    </>
  )
}

const guides: Array<{ image: React.FC<SvgProps>; title: string; body: string; devModeListener?: boolean }> = [
  {
          image: IdCard,
          title: 'Verify Your Identity',
          body: 'Use this app to confirm your identity. You\'ll need your passport or national identity cart',
          devModeListener: true,
      },
      {
          image: Scan,
          title: 'Scan your document',
          body: 'You\'ll be asked to scan the personal details on your passport or national identity card.'
      },
      {
          image: ScanShare,
          title: 'Read your document\'s information',
          body: 'You\'ll be asked to place your device on your passport or national identity card.This will check the electronic information stored in it, so we know it\'s genuine.'
      },
      {
          image: ScanFace,
          title: 'Scan your face',
          body: 'You\'ll be asked to scan your face using your phone.This protects your identity.'
      }
]

export const createPageWith = (
  PageImage: React.FC<SvgProps>,
  title: string,
  body: string,
  OnboardingTheme: any,
  devModeListener?: boolean,
  onDevModeTouched?: () => void
) => {
  const styles = createStyles(OnboardingTheme)
  const imageDisplayOptions = createImageDisplayOptions(OnboardingTheme)
  const titleElement = (
    <Text style={styles.headerText} testID={testIdWithKey('HeaderText')}>
      {title}
    </Text>
  )
  return (
    <ScrollView style={{ padding: 20 }}>
      <View style={{ alignItems: 'center' }}>{<PageImage style={imageDisplayOptions} />}</View>
      <View style={{ marginBottom: 20 }}>
        {devModeListener ? (
          <TouchableWithoutFeedback testID={testIdWithKey('DeveloperModeTouch')} onPress={onDevModeTouched}>
            {titleElement}
          </TouchableWithoutFeedback>
        ) : (
          titleElement
        )}
        <Text style={[styles.bodyText, { marginTop: 25 }]} testID={testIdWithKey('BodyText')}>
          {body}
        </Text>
      </View>
    </ScrollView>
  )
}

const OnboardingPages = (onTutorialCompleted: GenericFn, OnboardingTheme: any): Array<Element> => {
  const navigation = useNavigation<StackNavigationProp<OnboardingStackParams>>()
  const [, dispatch] = useStore()
  const onDevModeEnabled = () => {
    dispatch({
      type: DispatchAction.ENABLE_DEVELOPER_MODE,
      payload: [true],
    })
    navigation.getParent()?.navigate(Screens.Developer)
  }
  const developerOptionCount = useRef(0)
  const touchCountToEnableBiometrics = 9

  const incrementDeveloperMenuCounter = () => {
    if (developerOptionCount.current >= touchCountToEnableBiometrics) {
      developerOptionCount.current = 0
      if (onDevModeEnabled) {
        onDevModeEnabled()
      }
      return
    }

    developerOptionCount.current = developerOptionCount.current + 1
  }
  return [
    ...guides.map((g) =>
      createPageWith(
        g.image,
        g.title,
        g.body,
        OnboardingTheme,
        g.devModeListener,
        g.devModeListener ? incrementDeveloperMenuCounter : undefined
      )
    ),
    CustomPages(onTutorialCompleted, OnboardingTheme),
  ]
}

export default OnboardingPages
