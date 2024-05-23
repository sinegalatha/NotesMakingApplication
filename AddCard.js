import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput,Text, TouchableOpacity, Modal, Button, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from "react-native-modern-datepicker";
import * as Permissions from 'expo-permissions';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Audio } from 'expo-av';

const AddCard = ({ navigation,route}) => {
    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    };

    const [data, setData] = useState({
        title: route.params.title || '',
        date: route.params.date || formatDate(new Date()),
        time: route.params.time || '00:00',
        content: route.params.content || '',
        fulldata: route.params.fulldata,
        type: route.params.type,
        id: route.params.id
    });
    const [show, setShow] = useState(false);
    const [recording, setRecording] = useState(null);
    const [recordedUri, setRecordedUri] = useState(null);
    const showDatePicker =()=>{
        setShow(true);
    }   
    const handleInputChange = (field, value) => {
        setData(prevData => ({ ...prevData, [field]: value }));
    };
    const onPressEdit =()=>{
        const updatedFullData = data.fulldata.map(item => {
            if (item.id === data.id) {
                return {
                    ...item,
                   title:data.title,
                   content: data.content,
                   date : data.date,
                   time: data.time
                };
            } else {
                return item;
            }
        });
        navigation.navigate("Dashboard", {
            fulldata: updatedFullData
        })
    };
    const onPressAdd = () => {
        const newCard = { id: data.id, title:data.title, date:data.date, content:data.content };
        updatedFullData = [...data.fulldata, newCard];
        navigation.navigate("Dashboard",{
            fulldata: updatedFullData
        })
    };
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{data.type === "edit" ? "Edit Notes " : "Add Notes "}</Text>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{data.type === "edit" ? "Edit Title : " : "Add Title : "}</Text>
                <TextInput placeholder='Add the title of your task' style={styles.inputText} onChangeText={(text) => handleInputChange('title', text)} >{data.title}</TextInput>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{data.type === "edit" ? "Edit Date : " : "Add Date : "}</Text>
                <TouchableOpacity onPress={showDatePicker}>
                    <Icon name="calendar" size={25} color={"black"} style={styles.calenderIcon} />
                </TouchableOpacity>
                {show && (
                    <Modal
                        transparent={true}
                        animationType="slide"
                        visible={show}
                        onRequestClose={() => setShow(false)}
                    >
                        <View style={{ backgroundColor: "white", height: "45%", width: "70%", position:"absolute", top:200, left:80 }}>
                                <DatePicker
                                mode="datepicker"
                                minimumDate={new Date()}
                                    onDateChange={(selectedDate) => {
                                        handleInputChange('date', selectedDate)
                                        setShow(false);
                                    }}
                                    onTimeChange={
                                        (selectedTime) => {
                                            handleInputChange('time', selectedTime)
                                           
                                    }}
                                    selected={data.date}
                                    options={{
                                        backgroundColor: "white",
                                        textHeaderColor: "black",
                                        textDefaultColor: "green",
                                        selectedTextColor: "white",
                                        mainColor: "blue",
                                        textSecondaryColor: "green",
                                        borderColor: "gray",
                                    }}
                                    style={{position:"absolute", top:40, botton:30}}
                                />
                        </View>
                    </Modal>
                )}
                <Text style={styles.inputText}>{data.date} {data.time}</Text>
            </View>
            
            <View style={styles.descriptionContainer}>
                <Text style={[styles.inputLabel, { paddingTop: 20 }]}>{data.type === "edit" ? "Edit Description" : "Add Description"}</Text>
                <TextInput placeholder='Write Notes' multiline={true} style={[styles.inputText, styles.multilineInput, { paddingTop: 20 }]} onChangeText={(text) => handleInputChange('content', text)}>{data.content}</TextInput>
            </View>
            <View style={styles.addContainer}>
                <TouchableOpacity onPress={data.type === 'edit'? onPressEdit : onPressAdd}>  
                    <View style={styles.addButton}>
                        <Text style={{fontSize: 22, fontWeight:500, paddingTop:15}}>{data.type === "edit"?"SAVE":"ADD"}</Text>
                    </View>
                </TouchableOpacity>
            </View>  

        </View>
    );
};

export default AddCard;

const styles = StyleSheet.create({
    container :{
        width:"100%",
        height:"100%",
        flex:1,
        backgroundColor:"black",
        borderWidth: 3,
        borderColor: "#BFF9DF"
    },
    titleContainer : {
        height:"7%",
        width:"100%",
        backgroundColor: "#BFF9DF",
        borderWidth: 2,
        marginTop:"10%",
        justifyContent:"center"
    },
    titleText: {
        color: "black",
        fontWeight: "900", // Changed from a number to a string
        textAlign: "left",
        fontSize: 22,
        marginLeft:"7%"
    },
    inputContainer : {
        height:"10%",
        flexDirection:"row",
        JustifyContent:"center",
        alignItems:"center",
        backgroundColor: "#BFF9DF",
        borderRadius:40,
        margin:10
    },
    inputLabel: {
        fontSize:22,
        paddingLeft: "2%",
        paddingRight:"3%",
        fontWeight:"500"
    },
    inputText : {
        fontSize: 22,
    },
    calenderIcon : {
        margin:"2%"
    },
    multilineInput: {
        paddingTop: 20,
        height: "100%",
        textAlignVertical: "top"
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        height:"50%",
        width:"50%"
    },
    descriptionContainer : {
        height:"50%",
        width:"96%",
        backgroundColor: "#BFF9DF",
        flexDirection: "row",
        alignItems:"flex-start",
        paddingLeft:10,
        borderRadius: 40,
        margin:10,
        marginRight:10,
        // flex: 1, 
        flexWrap: 'wrap'
    },
    addContainer:{
        height: "30%",
        width: "100%",
        JustifyContent: "center",
        backgroundColor: "black"
    },
    addButton : {
        height:"50%",
        width:"50%",
        alignItems:"center",
        backgroundColor:"white",
        marginLeft:100,
        borderRadius:40,
        backgroundColor: "#BFF9DF"

    }
})