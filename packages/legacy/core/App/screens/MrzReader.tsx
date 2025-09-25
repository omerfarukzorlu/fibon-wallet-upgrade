import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, Image, View } from 'react-native';
import Button, { ButtonType } from '../components/buttons/Button';
import Identity from '../assets/img/identity.svg'

const MrzReader = ({ navigation }) => {
    const [documentNumber, onChangeSeriNo] = useState<String>();
    const [dateOfExpiry, onChangeDocEx] = useState<String>();
    const [dateOfBirth, onChangeBirthDate] = useState<String>();

    useEffect(() => {
        (async () => {
            console.log('MRZ Okuma İşlemi Başlatıldı...');
            console.log(Date.now());
            console.log(Math.floor(Math.random() * 999999999999) + 1)
        })();
    }, []);


    return (
        <View style={styles.container}>

                <View style={styles.results}>
                    <Text style={styles.title}>MRZ Scan Result</Text>
                    <View style={styles.resultsContainer}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Document Number: </Text>
                            <TextInput
                                style={styles.text}
                                onChangeText={onChangeSeriNo}
                                value={documentNumber} />
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Doc Exp. Date: </Text>
                            <TextInput
                                style={styles.text}
                                onChangeText={onChangeDocEx}
                                value={dateOfExpiry} />
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Birth Date: </Text>
                            <TextInput
                                style={styles.text}
                                onChangeText={onChangeBirthDate}
                                value={dateOfBirth} />
                        </View>
                        <View style={styles.button}>
                            <Button
                                title={'NFC Scan'}
                                onPress={() => {
                                    const dataToSend = {
                                        documentNumber: documentNumber,
                                        dateOfBirth: dateOfBirth,
                                        dateOfExpiry: dateOfExpiry,
                                    };
                                    navigation.navigate('NfcReader', dataToSend);
                                }}
                                buttonType={ButtonType.Primary}
                            />
                        </View> 
                    </View>
                </View>
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

export default MrzReader;
