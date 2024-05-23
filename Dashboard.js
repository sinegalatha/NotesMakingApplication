import {React, useEffect, useState, useMemo} from 'react';
import { View, StyleSheet, Text, Image, ScrollView, FlatList, TextInput, TouchableHighlight, SafeAreaView, TouchableOpacity } from 'react-native';
import Card from './Card';
import Icon from 'react-native-vector-icons/FontAwesome';
import filter from 'lodash.filter';
import RNPickerSelect from 'react-native-picker-select';
const Dashboard = ({ navigation, route }) => {
    const initialData = useMemo(() => {
        return route.params && route.params.fulldata ? route.params.fulldata : [
            { id: 1, title: "card 1", date: "2024/05/25", time: "01:05", content: "Hi this is card1" },
            { id: 2, title: "card 2", date: "7th July", time: "01:05", content: "Hi this is card2" },
            { id: 3, title: "card 3", date: "8th July", time: "01:05", content: "Hi this is card3" },
            { id: 4, title: "card 4", date: "9th July", time: "01:05", content: "Hi this is card4" },
            { id: 5, title: "card 5", date: "10th July", time: "01:05", content: "Hi this is card5" },
            { id: 6, title: "card 6", date: "11th July", time: "01:05", content: "Hi this is card6" },
            { id: 7, title: "card 7", date: "12th July", time: "01:05", content: "Hi this is card7" },
            { id: 8, title: "card 8", date: "13th July", time: "01:05", content: "Hi this is card8" },
            { id: 9, title: "card 9", date: "14th July", time: "01:05", content: "Hi this is card9" },
            { id: 10, title: "card 10", date: "15th July", time: "01:05", content: "Hi this is card10" },
            { id: 11, title: "card 11", date: "16th July", time: "01:05", content: "Hi this is card11" },
        ];
    }, [route.params]);
    const noOfColumns = [{
        label: 1,
        value: 1
    },
    {
        label: 2,
        value: 2
    },
    {
        label: 3,
        value: 3
    }];
    const noOfComponents = [{
        label : "5",
        value : 5
    },
    {
        label : "10",
        value: 10
    },
    {
        label:"15",
        value:15
    }

    ]
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchData, setSearchData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedNumber, setSelectedNumber] = useState(null);
    const [selectedNumberOfComponents, setSelectedNumberOfComponents] = useState(null);
    const [componentsData, setComponentsData] = useState(null);
    useEffect(() => {
        setSearchData(initialData);
    }, [initialData]);
    useEffect(() => {
        setComponentsData(searchData);
    }, [searchData]);
    
    useEffect(() => {
        sortData(sortOrder);
    }, [sortOrder]);

    const sortData = (order) => {
        const sortedData = [...initialData].sort((a, b) => {
            if (order === 'asc') {
                return a.title.localeCompare(b.title);
            } else {
                return b.title.localeCompare(a.title);
            }
        });
        setSearchData(sortedData);
    };

    const toggleSortOrder = () => {
        setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
    };
    const onPressHandler = () => {
        navigation.navigate("AddCard",{
            fulldata: initialData,
            title: null,
            date: null,
            content: null,
            type:"add",
            id: initialData[initialData.length - 1].id + 1
        });
    }
    const handleSearch = (query) => {
        setSearchQuery(query);
        const formattedQuery = query.toLowerCase();
        const filteredData = filter(initialData, (item) => contains(item.title, formattedQuery));
        setSearchData(filteredData);
    };

    const handleSelection = (value) => {
        setSelectedNumber(value);
    }

    const handleSelectionComponents = (value) => {
            setSelectedNumberOfComponents(value);
            setComponentsData(searchData.slice(0, value));
    }

    const contains = (title, query) => {
        return title.toLowerCase().includes(query);
    };
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={{ uri:'https://cdn.iconscout.com/icon/premium/png-512-thumb/taking-notes-6811517-5590639.png?f=webp&w=512'}} />
                </View>
                <View style={styles.titleTextContainer}>
                    <Text style={styles.titleText}>
                        Notes App
                    </Text>
                </View>
                <View style={styles.logoContainer}>
                    <TouchableOpacity onPress={toggleSortOrder}>
                        {(sortOrder === 'asc') ? (<Icon name={"sort-amount-desc"} size={24} color={"black"} />) : (<Icon name={"sort-amount-asc"} size={24} color={"black"} />) }
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.searchContainer}>
                <View style={styles.searchBox}>
                    <View style={styles.searchIcon}>
                        <Icon name='search' size ={25}></Icon>
                    </View>
                    <View style={styles.searchInput}>
                        <TextInput placeholder='Search here' clearButtonMode='always' autoCapitalize='none' autoCorrect={false} value={searchQuery} onChangeText={(query) => handleSearch(query)} style={styles.searchInputText}></TextInput>
                    </View>
                </View>
            </View>
                <View style={{ backgroundColor:"#BFF9DF",width:"40%",height:"5%", borderWidth:1,}}>
                    <RNPickerSelect
                        items={noOfColumns}
                    onValueChange={(value) => handleSelection(value)}
                        value={selectedNumber}
                        placeholder={{label:"columns" , value:null}}
                    />
                </View>
            <FlatList 
                data={componentsData}
                keyExtractor={(item) => item.id}
                key={selectedNumber}
                numColumns={selectedNumber}
                renderItem={({ item, index }) => {
                    let color;
                    if (selectedNumber === 1) {
                        color = index % 2 === 0 ? "lightblue" : "lightgreen";
                    } else if (selectedNumber === 2) {
                        let pattern = ["lightblue", "lightgreen", "lightgreen", "lightblue"]
                        color = pattern[index%4];
                    } else {
                        color = index % 2 === 0 ? "lightblue" : "lightgreen";
                    }

                    return (
                        <Card
                            id={item.id}
                            title={item.title}
                            content={item.content}
                            fulldata={initialData}
                            date={item.date}
                            time={item.time}
                            navigation={navigation}
                            color={color}
                        />
                    );
                }} 
                />
            <View style={{ backgroundColor: "#BFF9DF", width: "40%", height: "5%", borderWidth: 1, }}>
                <RNPickerSelect
                    items={noOfComponents}
                    onValueChange={(value) => handleSelectionComponents(value)}
                    key={selectedNumberOfComponents}
                    value={selectedNumberOfComponents}
                    placeholder={{ label: "page", value: null }}
                />
            </View>
            <View>
                <TouchableOpacity  onPress={onPressHandler} activeOpacity={0.1} >
                    <View style={[styles.addCardSymbol]}>
                        <Icon name="plus-circle" size={70} color={"black"}></Icon>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Dashboard;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        height:"100%",
        width:"100%",
        borderColor: "#BFF9DF",
        borderWidth:3,
        backgroundColor:"white"
    },
    titleContainer: {
        height: "10%",
        width: "100%",
        backgroundColor: "#BFF9DF",
        marginTop: "10%",
        justifyContent: "center",
        flexDirection:"row",
        borderWidth:2,

    },
    logoContainer:{
        flex: 1,
        alignItems:"center",
        justifyContent :"center"
    },
    logo : {
        width: "50%",
        height:"50%",
    },
    titleTextContainer : {
        flex: 3,
        alignItems: "center",
        justifyContent: "center",
    },
    titleText: {
        color: "black",
        fontWeight: "900",
        textAlign: "center",
        fontSize: 22,
    },
    searchContainer : {
        height: "7%",
        alignItems:"center",
        justifyContent: "center",
        margin:"3%"
    },
    searchBox : {
        width:"80%",
        height:"80%",
        borderRadius:80,
        borderWidth: 2,
        backgroundColor: "#BFF9DF",
        flexDirection:"row",
        flex:1
    },
    searchIcon:{
        size: 40,
        paddingLeft:"7%",
        color:"black",
        flex:1,
        alignItems: "flex-start",
        justifyContent: "center",
    },
    searchInput : {
        alignItems:"flex-start",
        justifyContent:"center",
        flex:6,
        borderLeftWidth:1
       
    },
    searchInputText : {
        fontSize: 17,
        paddingLeft:"5%"
    },
    cardContainer: {

        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: 10,
        marginBottom: 10,
        backgroundColor:"yellow"
    },
    cardWrapper: {
        width: "50%",
        height: "40%",
        backgroundColor:"black"
    },
    cardScroll : {
        width: "100%",
        height:"80%",
        backgroundColor: "black",
        borderWidth:2,
        borderRadius:40,
        borderColor: "#BFF9DF",
    },
    flatListContentContainer: {
        paddingHorizontal: 10,
        height:"100%"
    },
    flatList : {
        width:"96%",
        height:"100%",
        marginLeft:9,
        flexDirection:"row",
        flexWrap:"wrap"
    },
    addCardSymbol : {
        position: "fixed",
        bottom:20,
        left:300
    },
});
