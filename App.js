/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import SmsListener from 'react-native-android-sms-listener'
import {
  Button,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { CeqSupToken, sendSMSAsync } from './lib/cequens';

async function requestReadSmsPermission() {
  try {
    const hasPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      {
        title: "(...)",
        message: "Why you're asking for..."
      }
    );
    // console.log({hasPermission});
    return hasPermission
  } catch (err) {}
}

class App extends Component {
  subscription = null
	constructor(props) {
      super(props);
      this.state= {
        can_send: false,
        start_send: false,
        new_message: false,
        msgID: ''
      }
	}
  
  async componentDidMount() {
    const hasPermission = await requestReadSmsPermission();
    if (hasPermission) {
      console.log('Approve ', {hasPermission});
      await this.setState({can_send: true})
      this.subscription = SmsListener.addListener(message => {
        console.info({message})
        this.setState({new_message : true})
      })
    }
    

  }
	
	componentWillUnmount = () => {
	    this.subscription?.remove()
  }

  render(){
    const {can_send, new_message, msgID, start_send} = this.state

    return (
      <View style={styles.container}>
      <Text>{ !can_send ? "Must agree " : "You Have the permission" } </Text>
      <Text>{ !new_message ? "Waiting for new SMS at device inbox" : "You Have new SMS" } </Text>
      <Button
        onPress={async () => {
          await this.setState({start_send: true})
          const msgid = await sendSMSAsync(
            "Cequens",
            "201003325373",
            "Text text shabana",
            CeqSupToken
          );
          this.setState({msgID})
          console.log(msgid);
          await this.setState({start_send: false})
        }}
        title="Start"
        color="#841584"
        disabled={!can_send || start_send}
      />
      <Text>{msgID}</Text>
      <StatusBar style="auto" />
    </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
