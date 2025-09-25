import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { ButtonType } from '../components/buttons/Button-api'
import CheckBoxRow from '../components/inputs/CheckBoxRow'
import HighlightTextBox from '../components/texts/HighlightTextBox'
import InfoTextBox from '../components/texts/InfoTextBox'
import { TOKENS, useServices } from '../container-api'
import { DispatchAction } from '../contexts/reducers/store'
import { useStore } from '../contexts/store'
import { useTheme } from '../contexts/theme'
import { AuthenticateStackParams, Screens } from '../types/navigators'
import { testIdWithKey } from '../utils/testable'
import ScreenLayout from '../layout/ScreenLayout'

export const TermsVersion = true

const Terms: React.FC = () => {
  const [store, dispatch] = useStore()
  const [checked, setChecked] = useState(false)
  const { t } = useTranslation()
  const navigation = useNavigation<StackNavigationProp<AuthenticateStackParams>>()
  const { OnboardingTheme, TextTheme } = useTheme()
  const [Button] = useServices([TOKENS.COMP_BUTTON])
  const agreedToPreviousTerms = store.onboarding.didAgreeToTerms
  const onSubmitPressed = useCallback(() => {
    dispatch({
      type: DispatchAction.DID_AGREE_TO_TERMS,
      payload: [{ DidAgreeToTerms: TermsVersion }],
    })

    if (!agreedToPreviousTerms) {
      navigation.navigate(Screens.CreatePIN)
    } else if (store.onboarding.postAuthScreens.length) {
      const screens: string[] = store.onboarding.postAuthScreens
      screens.shift()
      dispatch({ type: DispatchAction.SET_POST_AUTH_SCREENS, payload: [screens] })
      if (screens.length) {
        navigation.navigate(screens[0] as never)
      } else {
        dispatch({ type: DispatchAction.DID_COMPLETE_ONBOARDING, payload: [true] })
      }
    }
  }, [dispatch, agreedToPreviousTerms, navigation, store.onboarding.postAuthScreens])
  const style = StyleSheet.create({
    container: {
      ...OnboardingTheme.container,
      padding: 20,
    },
    bodyText: {
      ...OnboardingTheme.bodyText,
      flexShrink: 1,
    },
    controlsContainer: {
      marginTop: 'auto',
      marginBottom: 20,
    },
  })
  const onBackPressed = () => {
    //TODO:(jl) goBack() does not unwind the navigation stack but rather goes
    //back to the splash screen. Needs fixing before the following code will
    //work as expected.

    // if (nav.canGoBack()) {
    //   nav.goBack()
    // }

    navigation.navigate(Screens.Onboarding)
  }

  return (
    <ScreenLayout screen={Screens.Terms}>
      <ScrollView style={style.container}>
        <InfoTextBox>Please agree to the terms and conditions below before using this application.</InfoTextBox>
        <Text style={[style.bodyText, { marginTop: 20, marginBottom: 20, textAlign: 'left'}]}>
                          End User Licence Agreement ("Eula") Please Read This Carefully Before Continuing
                          Before Clicking To Start Downloading The Software You Should
                          Carefully Read The Terms And Conditions Of This Licence Agreement.
                          By Downloading You Are Agreeing To Be Legally Bound By The Terms
                          And Conditions Of This Licence Agreement And Agree To Become A
                          Licensee. If You Do Not Agree To All Of The Terms And Conditions Of
                          This Licence Agreement You Should Not Download Or Use The
                          Software.
                </Text>

                      <Text style={[style.bodyText, { marginTop: 20, textAlign: 'left'}]}>
                          When you accept the terms and conditions of this Licence Agreement by downloading or
                          accepting the license terms & conditions, FIBON  whose registered
                          the business address is Al Habtoor Motors Building, Sheik Zayed Road, P.O.Box 282071 - Dubai UAE (the "Licensor") shall immediately
                          grant you (the "Licensee") a limited, non-exclusive, non-transferrable licence to Use the
                          software and any and all accompanying documentation (the "Software") subject to the terms
                          and conditions of this Licence Agreement.
                </Text>
                      <Text style={[style.bodyText, { marginTop: 10, textAlign: 'left'}]}>
                          You warrant and represent to the Licensor that this EULA shall be binding upon you the
                          Licensee, and that the individual agreeing to be bound under the terms and conditions of this
                          EULA is authorized or has been empowered to do so and is more than 18 years of age and
                          is fully able and competent to enter into the terms, conditions, obligations, affirmations,
                          representations, and warranties set forth in this EULA, and to abide by and comply with the
                          terms and conditions contained here in.
                </Text>
                      <Text style={[style.bodyText, { marginTop: 10, textAlign: 'left'}]}>
                          When you use the Software, the Licensor may collect certain information about your
                          computer to facilitate, evaluate and verify your use of the Software, which may be sent to a
                          computer designated by the Licensor for its own internal use and shall not be shared with
                          any third parties. This information is collected in the aggregate form, without identifying any
                          user individually, for the purpose of performance and error diagnostics and for improving the
                          Software to providing you with a better service and more relevant experience. As indicated
                          above, if you do not desire to accept this EULA or agree to the terms and conditions of this
                          EULA, you should not download or use the software. The software will continue to work even
                          if your computer is not connected to the Internet or if your firewall policies do not allow such
                          information to be sent to the Licensor's computer.
                      </Text>
                      <Text style={[style.bodyText, { marginTop: 10, textAlign: 'left'}]}>
                          You acknowledge and agree that you are not an owner of the Software or any copies of the
                          Software; that you have no right to further transfer or distribute the Software or any copies of
                          the Software or provide access to the Software in any manner without the Licensor's prior
                          written consent. You further agree not to challenge the enforceability or validity of this EULA
                          or to initiate any proceedings inconsistent with the terms and conditions of this EULA.
                          This EULA has been prepared in the English language and the interpretation of this EULA
                          shall be based on the English language. Any non-English version of this EULA is solely for
                          accommodation purposes.
                      </Text>
                      <View style={style.paragraph}>
                          <Text style={[style.enumeration]}>1</Text>
                          <Text style={[style.bodyText]}>
                              <Text style={[style.titleText]}>Use of the Software</Text>
                              &nbsp;1.1 In this Licence Agreement, "Use" shall be defined as including the installation
                              of the Software by copying, transmitting, or loading it into the permanent
                              memory of a computer or other device (each a "Computer") for the processing
                              of the system instructions or statements contained in the Software. "Use"
                              FIBON - GEMINI EULA 2
                              shall also include copying the Software in machine-readable form for the
                              purposes of understanding the contents of such machine-readable material
                              (which may be known as reverse-engineering).
                              1.2 A maximum of ONE copy of the Software may be made for back-up and/or
                              disaster recovery purposes only.
                          </Text>
                      </View>
                      <View style={style.paragraph}>
                          <Text style={[style.enumeration]}>2</Text>
                          <Text style={[style.bodyText]}>
                              <Text style={[style.titleText]}>Nature of the Software</Text>
                              &nbsp;The Software is commercially licensed software. It is not open-source, freeware or
                              shareware. The Licensor may demand a licence fee for Use of the Software in
                              accordance with this Licence Agreement and only the Licensor may waive payment
                              for the software.
                          </Text>
                      </View>
                      <View style={style.paragraph}>
                          <Text style={[style.enumeration]}>3</Text>
                          <Text style={[style.bodyText]}>
                              <Text style={[style.titleText]}>Licensee's Undertakings</Text>
                              &nbsp;By accepting the terms and conditions of this Licence Agreement you hereby
                              undertake:
                              3.1 Not to copy the Software except as permitted by sub-Clause 1.2;
                              3.2 Not to disassemble, decompile or otherwise reverse-engineer the Software;
                              3.3 Not to install the Software on more than ONE Computer(s) at any one time in
                              violation of this Licence Agreement without the Licensor's explicit written
                              consent;
                              3.4 To ensure that your employees, agents, and other parties under your control
                              who will use the Software do so in accordance with the terms and conditions
                              of this Licence Agreement and are accordingly notified of the same;
                              3.5 To reproduce and include any and all copyright notices of the Licensor as they
                              appear in or on the Software and any and all copies thereof;
                              3.6 Not to create any derivative or competing product based upon this software;
                              3.7 Not to permit or facilitate the Use of the Software in any manner which would
                              constitute a breach of the terms and conditions of this Licence Agreement;
                              3.8 Not to place or distribute the Software on any website, ftp server or similar
                              location without the express prior written consent of the Licensor;
                              3.9 Not to Use the Software for any purpose which may be deemed immoral,
                              illegal, offensive, threatening, abusive or otherwise harmful; and
                              3.10 Not to remove or otherwise obscure any copyright notices of the Licensor
                              displayed within the software.
                          </Text>
                      </View>
                      <View style={style.paragraph}>
                          <Text style={[style.enumeration]}>4</Text>
                          <Text style={[style.bodyText]}>
                              <Text style={[style.titleText]}>Transferring the Software</Text>
                              &nbsp;4.1 The Software is licensed only to you the Licensee. You may not rent, lease,
                              sub-licence, sell, assign, pledge, transfer or otherwise dispose of the
                              Software, on a temporary or permanent basis, without the prior written consent
                              of the Licensor.
                          </Text>
                      </View>
                      <View style={style.paragraph}>
                          <Text style={[style.enumeration]}>5</Text>
                          <Text style={[style.bodyText]}>
                              <Text style={[style.titleText]}>Limited Warranty</Text>
                              &nbsp;5.1 The Software and any 3rd Party software sold by or through the Licensor is
                              provided "as is" without any warranty of any kind, whether express or implied,
                              including but not limited to the implied warranties of merchantability, fitness for
                              a particular purpose, title and non-infringement. YOU EXPRESSLY
                              ACKNOWLEDGE AND AGREE THAT USE OF THE LICENSED SOFTWARE
                              AND ANY 3
                              rd PARTY ADD-ON FUNCTIONALITY IS AT YOUR SOLE RISK.
                              FIBON - GEMINI EULA 3
                              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE
                              LICENSED APPLICATION AND ANY SERVICES PERFORMED OR
                              PROVIDED BY THE LICENSED APPLICATION ARE PROVIDED "AS IS"
                              AND "AS AVAILABLE," WITH ALL FAULTS AND WITHOUT WARRANTY OF
                              ANY KIND, AND LICENSOR HEREBY DISCLAIMS ALL WARRANTIES AND
                              CONDITIONS WITH RESPECT TO THE LICENSED APPLICATION AND
                              ANY SERVICES, EITHER EXPRESS, IMPLIED, OR STATUTORY,
                              INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES AND/OR
                              CONDITIONS OF MERCHANTABILITY, OF SATISFACTORY QUALITY, OF
                              FITNESS FOR A PARTICULAR PURPOSE, OF ACCURACY, OF QUIET
                              ENJOYMENT, AND OF NONINFRINGEMENT OF THIRD-PARTY RIGHTS.
                              NO ORAL OR WRITTEN INFORMATION OR ADVICE GIVEN BY LICENSOR
                              OR ITS AUTHORIZED REPRESENTATIVE SHALL CREATE A WARRANTY.
                              SHOULD THE LICENSED APPLICATION OR SERVICES PROVE
                              DEFECTIVE, YOU ASSUME THE ENTIRE COST OF ALL NECESSARY
                              SERVICING, REPAIR, OR CORRECTION. SOME JURISDICTIONS DO NOT
                              ALLOW THE EXCLUSION OF IMPLIED WARRANTIES OR LIMITATIONS
                              ON APPLICABLE STATUTORY RIGHTS OF A CONSUMER, SO THE
                              ABOVE EXCLUSION AND LIMITATIONS MAY NOT APPLY TO YOU.
                              5.2 Limitation of Liability. TO THE EXTENT NOT PROHIBITED BY LAW, IN NO
                              EVENT SHALL LICENSOR BE LIABLE FOR PERSONAL INJURY OR ANY
                              INCIDENTAL, SPECIAL, INDIRECT, OR CONSEQUENTIAL DAMAGES
                              WHATSOEVER, INCLUDING, WITHOUT LIMITATION, DAMAGES FOR
                              LOSS OF PROFITS, LOSS OF DATA, BUSINESS INTERRUPTION, OR ANY
                              OTHER COMMERCIAL DAMAGES OR LOSSES, ARISING OUT OF OR
                              RELATED TO YOUR USE OF OR INABILITY TO USE THE LICENSED
                              APPLICATION OR ANY 3rd PARTY APPLICATION DESIGNED TO WORK
                              WITH IT, HOWEVER, CAUSED, REGARDLESS OF THE THEORY OF
                              LIABILITY (CONTRACT, TORT, OR OTHERWISE) AND EVEN IF LICENSOR
                              HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. SOME
                              JURISDICTIONS DO NOT ALLOW THE LIMITATION OF LIABILITY FOR
                              PERSONAL INJURY, OR OF INCIDENTAL OR CONSEQUENTIAL
                              DAMAGES, SO THIS LIMITATION MAY NOT APPLY TO YOU. In no event
                              shall Licensor's total liability to you for all damages (other than as may be
                              required by applicable law in cases involving personal injury) exceed the
                              amount of fifty US dollars ($50.00). The foregoing limitations will apply even if
                              the above-stated remedy fails of its essential purpose.
                              5.3 You acknowledge that any Trial or Free version of the software may have
                              limited features, function for a limited time, have other limitations or include
                              features not present in a non-trial or paid for version of the software.
                              5.4 The Licensor does not warrant that the Software will be error-free or that such
                              errors will be corrected and the Licensee is solely responsible for all costs and
                              expenses associated with the rectification, repair, or damage caused by such
                              errors.
                              5.5 The Licensor shall not be liable if the Software fails to operate in accordance
                              with the limited warranty set out in sub-Clause 5.1 as a result of any
                              modification, variation, or addition to the Software not performed by the
                              Licensor or caused by any abuse, corruption or incorrect use of the Software,
                              including use of the Software with equipment or other software which is
                              incompatible.
                              5.6 In the event that the Licensor incurs any liability of any kind, that liability shall
                              be limited to fifty US dollars ($50.00). Nothing in this Clause 5 nor in the
                              FIBON - GEMINI EULA 4
                              remainder of this Licence Agreement shall limit or exclude the Licensor's
                              liability for death or personal injury arising out of the Licensor's negligence nor
                              for fraudulent misrepresentation.
                              5.7 The Software may contain libraries, utilities or other binary executable files
                              belonging to third parties. Any illegal re-use of redistributable libraries, utilities
                              or other binary executable files belonging to 3rd parties shall leave you the
                              Licensee solely liable for damages and breach of third party software license
                              agreements.
                              5.8 You agree to defend, indemnify and hold Licensor, its affiliates, subsidiaries,
                              officers, directors, employees, consultants, agents, suppliers, licensors and
                              resellers from any and all third party claims, whether foreign or domestic, and
                              any and all liability, damages and/or costs including, but not limited to,
                              reasonable attorney fees, arising from your Use of the Software and the
                              distribution of the same.
                          </Text>
                      </View>
                      <View style={style.paragraph}>
                          <Text style={[style.enumeration]}>6</Text>
                          <Text style={[style.bodyText]}>
                              <Text style={[style.titleText]}>Your Statutory Rights</Text>
                              &nbsp;This Licence Agreement gives you specific legal rights and you may also have other
                              rights that vary from one country to another. Some jurisdictions do not allow the
                              exclusion of implied warranties, or certain kinds of limitations or exclusions of liability,
                              so the limitations and exclusions included in this Licence Agreement may not apply to
                              you. Other jurisdictions do allow limitations and exclusions subject to certain
                              conditions. In either case the limitations and exclusions included in this Licence
                              Agreement shall apply to the fullest extent permitted by the laws of such applicable
                              jurisdictions. If any part of the limitations or exclusions in this Licence Agreement is
                              held to be void or unenforceable, such part shall be deemed to be deleted from this
                              Licence Agreement and the remainder of the limitation or exclusion shall continue in
                              full force and effect. Any rights that you may have as a consumer (i.e. a purchaser for
                              private as opposed to business, academic or government use) are not affected.
                          </Text>
                      </View>
                      <View style={style.paragraph}>
                          <Text style={[style.enumeration]}>7</Text>
                          <Text style={[style.bodyText]}>
                              <Text style={[style.titleText]}>Intellectual Property Rights</Text>
                              &nbsp;The Software and related documentation are copyright works of authorship and are
                              also protected under applicable database laws. The Licensor retains ownership of
                              the Software, all subsequent copies of the Software and all intellectual property rights
                              subsisting therein, regardless of the form in which such copies may exist. This
                              Licence Agreement is not a sale of the original Software or any copies thereof.
                          </Text>
                      </View>
                      <View style={style.paragraph}>
                          <Text style={[style.enumeration]}>8</Text>
                          <Text style={[style.bodyText]}>
                              <Text style={[style.titleText]}>Term and Termination</Text>
                              &nbsp;8.1 This Licence Agreement is effective until terminated. Purchasers of the
                              software for installation on their own servers may terminate it at any time by
                              destroying the Software together with all copies in any form and notifying the
                              Licensor of the decision to terminate. Users of Fibon's on-demand
                              service may terminate at any time by giving one week's notice of the intent to
                              terminate in writing. If you use the Fibon on-demand service you are
                              required to pay the whole month amount for any month in which you terminate
                              the service. You accept that as a user of Fibon's on-demand service,
                              your application data will be irrecoverably deleted from Fibon's hosting
                              environment within 24 hours of termination, such data to be cycled out of
                              existence within Fibon's normal backup cycle.
                              8.2 This Licence Agreement shall also terminate upon conditions set out
                              elsewhere in this Licence Agreement or if you fail to comply with any of the
                              terms and conditions of this Licence Agreement.
                              8.3 You agree that, upon such termination, you will destroy the Software including
                              FIBON - GEMINI EULA 5
                              and any copies in whatever form.
                              8.4 Refunds full or partial are not provided. You are requested to fully evaluate the
                              Software before purchasing it or using it in what can be construed as a Live,
                              Production, or Operational environment with all the Use Cases you envisage.
                              8.5 Users of Fibon's on-demand service must notify Fibon by emailing
                              contact@fibon.io if they wish to reduce or increase the user count
                              following an initial purchase. No mechanism exists within the software to alter
                              the billing amount or billing cycle, both of which can only be changed by
                              Fibon at the customer's express, written request. Customers should
                              note that inactivating users in the software does not affect the billing, which is
                              based on the total potential number of users allowed by the active license.
                              8.6 We may terminate this Licence Agreement immediately and without notice if
                              we reasonably suspect that you are using the Software for any purpose which
                              contravenes the laws of the country of registration of the Licensor, we
                              determine that you are abusing the fair use limits of our hosting services, or
                              we determine that in any other way, your actions can be construed as gaming
                              the system (for example repeatedly altering user counts in our billing cycle to
                              avoid paying the true price of your hosted service).
                          </Text>
                      </View>
                      <View style={style.paragraph}>
                          <Text style={[style.enumeration]}>9</Text>
                          <Text style={[style.bodyText]}>
                              <Text style={[style.titleText]}>General</Text>
                              &nbsp;9.1 Each party irrevocably agrees that the courts of the country of registration of
                              the Licensor, its subsidiary office, or the reseller which issues an invoice for the
                              Software, shall have exclusive jurisdiction to resolve any controversy or claim
                              of whatever nature arising out of or in relation to this Licence Agreement and
                              the place of performance of this Licence Agreement shall be that country and
                              the laws of that country shall govern such controversy or claim.
                              9.2 This Licence Agreement constitutes the complete and exclusive statement of
                              the Licence Agreement between the Licensor and you with respect to the
                              subject matter of this Licence Agreement and supersedes all proposals,
                              representations, understandings, and prior agreements, whether oral or
                              written, and all other communications between us relating to that subject
                              matter.
                              9.3 Any Clause in this Licence Agreement that is found to be invalid or
                              unenforceable shall be deemed deleted and the remainder of this Licence
                              Agreement shall not be affected by that deletion.
                              9.4 Failure or neglect by either party to exercise any of its rights or remedies
                              under this Licence agreement will not be construed as a waiver of that party's
                              rights nor in any way affect the validity off the whole or part of this Licence
                              Agreement nor prejudice that party's right to take subsequent action.
                              9.5 This Licence Agreement is personal to you and [subject to Clause 4] you may
                              not assign, transfer, sub-contract, or otherwise part with this Licence
                              Agreement or any right or obligation under it without the Licensor's prior
                              written consent.
                          </Text>
                      </View>
                      <View style={style.paragraph}>
                          <Text style={[style.enumeration]}>10</Text>
                          <Text style={[style.bodyText]}>
                              <Text style={[style.titleText]}>Revisions to Licensing Terms</Text>
                              &nbsp;We reserve the right to revise the terms of this License by updating the License on
                              our website or informing you via email. It is strongly recommended that you routinely
                              check the following website link to the up-to-date license agreement:
                              http://www.Fibon.io/eula.pdf
                              FIBON - GEMINI EULA 6
                              Your Use of the Software shall be deemed to constitute acceptance of any revised
                              terms.
                          </Text>
                      </View>
                      <View style={style.paragraph}>
                          <Text style={[style.enumeration]}>11</Text>
                          <Text style={[style.bodyText]}>
                              <Text style={[style.titleText]}>Software Support</Text>
                              &nbsp;All versions of the Software purchased directly from the Licensor are provided with 12
                              months of support via email and free access to the Licensor's documentation and other
                              Software support websites, such as an online helpdesk ("Product Support").
                              Regardless of whether the Software has been purchased directly from the Licensor or
                              a reseller, customers must renew their annual support and maintenance agreement
                              after the initial 12 month period to continue to be entitled to Product Support.
                              Customers who have purchased the Software and are entitled to Product Support will
                              also be entitled to upgrades and new releases of the package they purchased at no
                              additional cost.
                              Product Support for different versions
                              All customers who purchase a license are entitled to free email support where the
                              Licensor will endeavour to respond to emails within 1 working day.
                              Enterprise package customers who have active licenses for 100 or more users are
                              entitled to free email and Zoom support (telephone support is no longer
                              available). The Licensor will endeavour to respond to emails within 1 working day.
                              Zoom support will be delivered at mutually agreed times and will be limited to
                              a maximum of two sessions per calendar month with a maximum duration of one hour
                              per session. Zoom support is not free for consulting or training purposes and
                              is given only for technical support where Gemini is reporting errors or there is a
                              system outage.
                              We reserve the right to withdraw or refuse GotoMeeting support without notice.
                              You accept that, although we will use reasonable endeavours to solve problems
                              identified by purchasers of the Software, the nature of software is such that no
                              guarantee can be provided that any particular problem will be solved.
                              Renewal of license is required within 3 months of expiry. Failure to renew within 3
                              months of expiry means the Licensee forgoes any entitlement to renew the expired
                              license and would be required by the Licensor to purchase a new license to obtain
                              Product Support.
                          </Text>
                      </View>
                      <View style={style.paragraph}>
                          <Text style={[style.enumeration]}>12</Text>
                          <Text style={[style.bodyText]}>
                              <Text style={[style.titleText]}>Privacy and Data Collection</Text>
                              &nbsp;We may contact you to inform you of product updates or new products and you
                              consent to such use of your personal data. Your contact details (email address) will
                              never be disclosed to any other party.
                              We do not expose any data held within the SOFTWARE to any external sources.
                              We reserve the right if we sell the assets of our business to transfer personal data to
                              the new owners or where required by law so to do.
                              We do not sell or otherwise disclose your email address.
                              FIBON - GEMINI EULA 7
                              We reserve the right the display your corporate logo on our website solely for
                              demonstrating our client credentials. At your written request we will remove any such
                              logo used on our website within 28 days.
                          </Text>
                      </View>
                      <View style={style.paragraph}>
                          <Text style={[style.enumeration]}>13</Text>
                          <Text style={[style.bodyText]}>
                              <Text style={[style.titleText]}>Software Usage Tracking</Text>
                              &nbsp;We may collect software usage metrics for the sole purposes of product research and
                              development. Purchasers of the Software can opt out of software usage metrics by
                              requesting removal via contact@fibon.io
                          </Text>
                      </View>
                      <View style={style.paragraph}>
                          <Text style={[style.enumeration]}>14</Text>
                          <Text style={[style.bodyText]}>
                              <Text style={[style.titleText]}>Acceptance of Licence</Text>
                              &nbsp;You will be deemed to have accepted the terms of the Licence by downloading,
                              installing or using the Software on any computer or by clicking the 'I Accept' button.
                              Any questions concerning this Licence Agreement or the Software should be directed to the
                              Licensor. Contact details are available from http://www.fibon.io
                          </Text>
                      </View>
        <View style={style.controlsContainer}>
          {!agreedToPreviousTerms && (
            <CheckBoxRow
              title={t('Terms.Attestation')}
              accessibilityLabel={t('Terms.IAgree')}
              testID={testIdWithKey('IAgree')}
              checked={checked}
              onPress={() => setChecked(!checked)}
            />
          )}
          <View style={{ paddingTop: 10 }}>
            <Button
              title={agreedToPreviousTerms ? t('Global.Accept') : t('Global.Continue')}
              accessibilityLabel={agreedToPreviousTerms ? t('Global.Accept') : t('Global.Continue')}
              testID={agreedToPreviousTerms ? testIdWithKey('Accept') : testIdWithKey('Continue')}
              disabled={!checked && !agreedToPreviousTerms}
              onPress={onSubmitPressed}
              buttonType={ButtonType.Primary}
            />
          </View>
          {!agreedToPreviousTerms && (
            <View style={{ paddingTop: 10, marginBottom: 20 }}>
              <Button
                title={t('Global.Back')}
                accessibilityLabel={t('Global.Back')}
                testID={testIdWithKey('Back')}
                onPress={onBackPressed}
                buttonType={ButtonType.Secondary}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenLayout>
  )
}

export default Terms
