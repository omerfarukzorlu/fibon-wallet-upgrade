import * as React from 'react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Toast from 'react-native-toast-message'
import { useNetwork } from '../../contexts/network'
import { ToastType } from '../../components/toast/BaseToast'

const NetInfo: React.FC = () => {
  const { silentAssertConnectedNetwork, assertNetworkReachable } = useNetwork()
  const { t } = useTranslation()
  const [hasShown, setHasShown] = useState(false)

  const isConnected = silentAssertConnectedNetwork()


  return null
}

export default NetInfo
