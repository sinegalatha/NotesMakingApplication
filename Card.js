import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const Card = ({navigation, fulldata, id, title, date, content, color, time}) => {
    const onEditPressHandler = () => {
        console.log("reading edit");
        navigation.navigate("AddCard", {
            fulldata: fulldata,
            id: id,
            title: title,
            date: date,
            time: time,
            content: content,
            type: "edit"});
    }
    return (
        <View style={[styles.container,{backgroundColor:color}]}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>
                    {title}
                </Text>
            </View>
            <View style={styles.dateContainer}>
                <Text style={styles.dateText}>
                    {date} {time}
                </Text>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.contentText}>
                    {content.substring(0, 13)}........
                </Text>
            </View>
            
                <View style={styles.editIconContainer}>
                <TouchableOpacity onPress={() => onEditPressHandler()}>
                    <Icon name="edit" size={20} color={"black"} />
            </TouchableOpacity>
                </View>
        </View>
    );
};

export default Card;
const styles = StyleSheet.create({
    container : {
        width : "80%",
        flex:1,
        borderWidth:1,
        borderRadius:25,
        margin:5,
        marginLeft:20,
        marginRight:20,
        alignItems:"center",
        justifyContent:"center"
    },
    titleContainer : {
        width: "96%",
        paddingLeft: 10,
        alignItems:"flex-start",
        justifyContent:"center",
        backgroundColor:"black",
        borderRadius:25
    },
    titleText : {
        fontSize:15,
        fontWeight: "500",
        textAlign:"center",
        color:"white"
    },
    dateContainer : {
        width: "100%",
        alignItems: "flex-end",
        justifyContent: "center",
        paddingRight:10,
    },
    dateText : {
        fontSize: 15,
        fontWeight: "500",
        textAlign: "center"
    },
    contentContainer : {
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop:10
    },
    contentText :{
        fontSize: 13,
        fontWeight: "500",
        textAlign: "center"
    },
    editIconContainer : {
        width: "100%",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        padding:5,
        paddingBottom:15,
    }
})
