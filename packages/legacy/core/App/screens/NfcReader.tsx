import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, Image, View } from 'react-native';
import Button, { ButtonType } from '../components/buttons/Button';
import nfc  from '../utils/nfc';
import { CredentialStackParams, Screens, HomeStackParams } from '../types/navigators'
import { ProgressDialog } from 'react-native-simple-dialogs';
import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import NfcManager from 'react-native-nfc-manager';
import { useTranslation } from 'react-i18next'
import { useRoute } from '@react-navigation/native';
import { NFCProperties } from 'types/nfc_prop';
import { connectFromInvitation, receiveMessageFromUrlRedirect } from '../utils/helpers'
import { Stacks } from '../types/navigators'
import { useAgent } from '@credo-ts/react-hooks'
import { BifoldError } from '../types/error'

const NfcReader = ({ navigation }) => {
    const route = useRoute();
    const { t } = useTranslation()
    const navigations = useNavigation<StackNavigationProp<CredentialStackParams>>()
    const navigationHome = useNavigation<StackNavigationProp<HomeStackParams>>()
    const { agent } = useAgent()
    const [idData, setIdData] = useState<NFCProperties>();
    const [isSuccessData, setIsSucessData] = useState(false);
    const [loading, setLoading] = useState(false);
    var { documentNumber, dateOfBirth, dateOfExpiry } = route.params;
    const [alias, setAlias] = useState<any>();
    const [isMasterConnectionUrl, setIsMasterConnectionUrl] = useState(false);
    const [connectionId, setConnectionId] = useState("");

    useEffect(() => {
        return () => {
            NfcManager.start();
        };
    }, []);

    useEffect(() => {
        if (connectionId != "") {
            postMasterCred(connectionId);
        }

    }, [connectionId]);

    const postMasterCred = async (connectionId: any) => {
      
        try {

            var raw = JSON.stringify({
                "schemaId": "V4SGRU86Z58d6TV7PBUe6f:2:fibon-mc:1.6",
                "connectionId": connectionId,
                "attributes": [
                    {
                        "name": "name",
                        "value": idData.name
                    },
                    {
                        "name": "surname",
                        "value": idData.surname
                    },
                    {
                        "name": "id",
                        "value": idData.id_number
                    },
                    {
                        "name": "gender",
                        "value": idData.gender
                    },
                    {
                        "name": "expirydate",
                        "value": idData.expiry_date
                    },
                    {
                        "name": "documentnumber",
                        "value": idData.document_number
                    },
                    {
                        "name": "birthdate",
                        "value": idData.birth_date
                    }
                ]
            });

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                timeoutInterval: 10000,
                body: raw,
            }


            await fetch('http://104.247.166.58:8080/api/issue-credential', options)
                .then(response => response.text())
                .then(responseData => {
                    console.log("postMasterCred dönen cevap ", responseData)
                    setConnectionId("")
                    if (responseData == null || responseData !== undefined) {
                        console.log("response boş değil", responseData)
                    }
                    else {
                        console.log("postMasterCred için değer yok" + responseData)
                    }

                })
                .catch(error =>
                    console.log("error var ", error),
                );
            console.log('postMasterCred atıldı giden connctionId: ', connectionId);

        } catch (err) {
            console.log("hata", err);
        }

    };

    const getConnectionId = async (alias: any) => {
        console.log("getConnectionId isteği atıldı.",);

        try {

            var requestOptions = {
                method: 'GET',
                timeoutInterval: 10000,
            };


            await fetch('http://104.247.166.58:8080/api/get-connection-id-with-alias?alias=' + alias, requestOptions)
                .then(response => response.text())
                .then(responseData => {
                    console.log("getConnectionId dönen cevap ", responseData)
                    setConnectionId(responseData)
                    if (responseData == null || responseData !== undefined) {
                        console.log("response boş değil", responseData)
                    }
                    else {
                        console.log("getConnectionId için değer yok" + responseData)
                    }

                })
                .catch(error =>
                    console.log("error var ", error),
                );
            console.log('getConnectionId atıldı giden alias: ', alias);

        } catch (err) {
            console.log("hata", err);
        }

    };

    const MasterAcceptUrl = async (MasterConnectionUrl: string) => {
        try {
            console.log("DFMconnectionUrl usestate=", MasterConnectionUrl)
            const connectionRecord = await connectFromInvitation(MasterConnectionUrl, agent)
            console.log("scan sayfası connectionRecord==", connectionRecord.id)
            navigations.getParent()?.navigate(Stacks.ConnectionStack, {
                screen: Screens.Connection,
                params: { connectionId: connectionRecord.id },
            })
            console.log("DFMconnectionUrl kabul edildi")

        } catch (err: unknown) {
            try {
                const message = await receiveMessageFromUrlRedirect(MasterConnectionUrl, agent)
                navigations.getParent()?.navigate(Stacks.ConnectionStack, {
                    screen: Screens.Connection,
                    params: { threadId: message['@id'] },
                })
            } catch (err: unknown) {
                const error = new BifoldError(t('Error.Title1031'), t('Error.Message1031'), (err as Error).message, 1031)
                throw error
            }
        }
    }

    const stepConnectionId = async (alias: any, MasterConnectionUrl: string) => {

        await MasterAcceptUrl(MasterConnectionUrl)
        await getConnectionId(alias)
        setIsMasterConnectionUrl(true)

    }

    const createConnection = async (alias: any) => {
        console.log("createConnection isteği atıldı.",);

        try {

            var requestOptions = {
                method: 'GET',
                timeoutInterval: 10000,
            };

            await fetch('http://104.247.166.58:8080/api/createConnection?alias=' + alias, requestOptions)
                .then(response => response.text())
                .then(responseData => {
                    console.log("createConnection dönen cevap ", responseData)
                    stepConnectionId(alias, responseData)
                    if (responseData == null || responseData !== undefined) {
                        console.log("response data boş değil", responseData)
                    }
                    else {
                        console.log("createConnection için değer yok" + responseData)
                    }


                })
                .catch(error =>
                    console.log("error var ", error),
                );
            console.log('createConnection çağrıldı giden alias: ', alias);

        } catch (err) {
            console.log("hata", err);
        }

    };



    const handleInvitation = async (): Promise<void> => {
        console.log("date now nedir==", Date.now())
        var alias = Date.now()
        console.log("alias nedir=", alias)
        await createConnection(alias)
        setAlias(alias)
    }

   async function scan() {
       setLoading(true);
       console.log('=== NFC SCAN STARTED ===');
       console.log('Document Number:', documentNumber);
       console.log('Date of Birth:', dateOfBirth);
       console.log('Date of Expiry:', dateOfExpiry);

       try {
           // Validate input data before starting NFC
           const isValidFormat = nfc.validateMRZFormat(documentNumber, dateOfBirth, dateOfExpiry);
           if (!isValidFormat) {
               console.error('Invalid MRZ format');
               setIsSucessData(false);
               setLoading(false);
               return;
           }

           // Start NFC reading with the new function
           const result = await nfc.startReading(
               documentNumber,
               dateOfBirth,
               dateOfExpiry
           );

           console.log('NFC Result:', result);

           if (result.success) {
               console.log('✅ NFC Reading Success');
               console.log('Personal Data:', result.personalData);

               // Set the ID data with the new format
               setIdData({
                   isSuccess: true,
                   documentNumber: result.documentNumber,
                   birthDate: result.birthDate,
                   expiryDate: result.expiryDate,
                   personalData: result.personalData,
                   photo: result.photo,
                   data: result.data
               });

               setIsSucessData(true);
           } else {
               console.log('❌ NFC Reading Failed');
               console.error('Error:', result.error);

               // Set error data
               setIdData({
                   isSuccess: false,
                   error: result.error || 'Unknown error occurred'
               });

               setIsSucessData(false);
           }

       } catch (error) {
           console.error('=== NFC SCAN EXCEPTION ===');
           console.error('Exception:', error);

           // Handle exceptions
           setIdData({
               isSuccess: false,
               error: error instanceof Error ? error.message : 'Unexpected error occurred'
           });

           setIsSucessData(false);
       } finally {
           setLoading(false);
           console.log('=== NFC SCAN COMPLETED ===');
       }
   }

    useEffect(() => {
        if (route.params) {
            console.log(route.params);
            console.log(documentNumber);
            console.log(dateOfBirth);
            console.log(dateOfExpiry);
            scan();
        }
    }, [route.params]);

    return (
        <View style={styles.container}>
            {
               isSuccessData ? (
                    <View>
                        <Image
                            style={{
                                height: 150,
                                width: 125,
                                borderWidth: 1,
                                alignSelf: 'center',
                                marginVertical: 20
                            }}
                            source={{
                                uri: `data:image;base64,${idData.base64_image}`,
                            }} />
                        <Text style={{ textAlign: 'center', fontSize: 20, marginHorizontal: 50 }}>{idData.name}</Text>
                        <Text style={{ textAlign: 'center', fontSize: 20, marginHorizontal: 50 }}>{idData.surname}</Text>
                        <Text style={{ textAlign: 'center', fontSize: 20, marginHorizontal: 50 }}>{idData.id_number}</Text>
                        <Text style={{ textAlign: 'center', fontSize: 20, marginHorizontal: 50 }}>{idData.document_number}</Text>
                        <Text style={{ textAlign: 'center', fontSize: 20, marginHorizontal: 50 }}>{idData.birth_date}</Text>
                        <Text style={{ textAlign: 'center', fontSize: 20, marginHorizontal: 50 }}>{idData.expiry_date}</Text>
                        <Text style={{ textAlign: 'center', fontSize: 20, marginHorizontal: 50 }}>{idData.gender}</Text>
                        <View style={styles.button}>
                            <Button
                                title={'Master Credential'}
                                onPress={handleInvitation}
                                buttonType={ButtonType.Primary}
                            />
                        </View>
                    </View >
                ) : undefined
            }
            {!isSuccessData ? (
                
                <View style={styles.button}>
                        <Button
                            title={'NFC Tarama'}
                            onPress={() => {
                                scan();
                            }}
                            buttonType={ButtonType.Primary}
                        />
                    </View>
                    
            ) : undefined}
            <ProgressDialog
                visible={loading}
                title="Scanning your Identity Card"
                message="Please, wait..." />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    results: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    resultsContainer: {
        width: '100%',
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 16,
        paddingVertical: 5,
    },
    textMRZ: {
        fontSize: 19,
        paddingVertical: 20
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingVertical: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowMRZ: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    column: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    rowImage: {
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10
    },
    button: {
        alignItems: 'center',
        padding: 20,
    },
});

export default NfcReader;
