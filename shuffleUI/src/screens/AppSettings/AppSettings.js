import React, { Component, useState } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    ScrollView, 
    FlatList,
    TouchableOpacity
} 
    from 'react-native';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { ListItem } from 'react-native-elements/dist/list/ListItem';
import { LongPressGestureHandler } from 'react-native-gesture-handler';
import LoginScreen from '../Login/loginScreen';
import UpdateGenre from './UpdateGenre';
import styles from './styles';

export default function AppSettings({navigation, route}) {
       
        const [options, setOptions] = useState([

            {title: 'Edit Genres', id: 1 },
            {title:'Sign out', id: 2 },
            
        ]);  
       
        const pressHandler = (item) => {
            
            console.log(navigation);
            if (item.id == 1) {
                return (
                    <View key={item.id}>
                        <TouchableOpacity onPress={() => navigation.navigate('UpdateGenre')}>
                            <Text style={styles.item}>{item.title}</Text>
                        </TouchableOpacity>
                    </View>
                )
            } else {
                return (
                 <View key={item.id}>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.item}>{item.title}</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
            
        }
            return (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Settings</Text>
                    </View>
    
                    <ScrollView>
                        {options.map((item) => {
                            return (
                                pressHandler(item)
                            )
                        })}
                    </ScrollView>
                    <View style={styles.footerContainer}>
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Shuffle Sound</Text>
                        </View> 
                    </View>

                </View>
        );
}

