import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

class ChatPreview extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            recent: null
        };
    }

    // get most recent message when component mounts
    componentDidMount() {
        this.getRecentMessage();
    }

    // get most recent message when component updates
    componentDidUpdate() {
        this.getRecentMessage();
    }

    getRecentMessage = () => {
        const url = 'https://shufflesound.com/api/directMessage/' + this.props.conversationId;
        var message = ""
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                var last = json[json.length - 1];
                message = last.message;
                if (message != this.state.recent) {
                    //console.log(message)
                    this.setState({recent: message});
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    // render each conversation preview like this:
    // Sender Name
    // Most Recent Message
    render() {
        return(
            <Text numberOfLines={2}>
                <Text style={styles.contact}>{this.props.senderName}</Text>
                {"\n"}
                <Text>{this.state.recent}</Text>
            </Text>
        )
    }
}

const styles = StyleSheet.create({
    contact: {
        fontWeight: 'bold',
        fontSize: 16
    }
});

export default ChatPreview;