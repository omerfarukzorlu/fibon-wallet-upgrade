import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'

import { InfoBoxType } from '../../components/misc/InfoBox'
import { GenericFn } from '../../types/fn'

import PopupModal from './PopupModal'

interface NetInfoModalProps {
  onSubmit?: GenericFn
  visible: boolean
}

const NetInfoModal: React.FC<NetInfoModalProps> = ({ visible, onSubmit = () => null }) => {
  const { t } = useTranslation()

  return (
    <>
      {visible && (
        <SafeAreaView>

        </SafeAreaView>
      )}
    </>
  )
}

export default NetInfoModal
