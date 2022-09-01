import {StyleSheet, Dimensions} from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#161c20',
        paddingTop: 40,
        paddingHorizontal: 20,
        //alignItems: 'center',
        //justifyContent: 'center',
    },
    header: {
        backgroundColor: '#161c20',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontWeight: 'bold',
        color: '#fbfdf9',
    },
    item: {
        marginTop: 24,
        padding: 30,
        backgroundColor: '#1b2328',
        //textAlign: 'center',
        fontWeight: 'bold',
        color: '#fbfdf9',
    },
    footerContainer: {
        flex: 1,
        backgroundColor: '#161c20',
        paddingTop: 330,
        //paddingHorizontal: 20,
    },
    footer: {
        backgroundColor: '#161c20',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerText: { 
        fontWeight: 'bold',
        color: '#fbfdf9',
    },
});

export default styles;
