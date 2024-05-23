import React, { useEffect, useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { View, Text, FlatList, StyleSheet } from 'react-native';
const NoColumnComponent = () => {
    const [selectedNumber, setSelectedNumber] = useState(null);
    const noOfColumns = [{
        label:1,
        value:1
    },
        {
            label: 2,
            value: 2
        },
        {
            label: 3,
            value: 3
        }];
    const handleSelection = (value) => {
        setSelectedNumber(value);
    }

    return (
        <View style={styles.container}>
        <RNPickerSelect
            items={noOfColumns}
            onValueChange={(value) => handleSelection(value)}
            value={selectedNumber}
            />

        </View>
    );
};

export default NoColumnComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    }
});