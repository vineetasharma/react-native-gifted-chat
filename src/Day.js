import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import moment from 'moment/min/moment-with-locales.min';

import { isSameDay, isSameUser, warnDeprecated } from './utils';

export default class Day extends React.Component {
    getDay(time) {
        const day=moment(time).locale(this.context.getLocale()).format('ll').toUpperCase();
        const today=moment(new Date()).locale(this.context.getLocale()).format('ll').toUpperCase();
        const yesterday=moment(new Date()).subtract(1, 'days').locale(this.context.getLocale()).format('ll').toUpperCase();
        if(day==today){
           return 'Today';
        }
        else if(day==yesterday){
          return 'Yesterday';
        }
        else{
          return day;
        }
    };
    render() {
        if (!isSameDay(this.props.currentMessage, this.props.previousMessage)) {
            return (
                <View style={[styles.container, this.props.containerStyle]}>
                  <View style={[styles.wrapper]}>
                    <View style={styles.horizontalLine} />
                  </View>
                  <View style={[styles.wrapper]}>
                    <Text style={[styles.text, this.props.textStyle]}>
                        {this.getDay(this.props.currentMessage.createdAt)}
                    </Text>
                  </View>
                  <View style={[styles.wrapper, this.props.wrapperStyle]}>
                    <View style={styles.horizontalLine} />
                  </View>
                </View>
            );
        }
        return null;
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 10,
        flexDirection: "row",
    },
    horizontalLine:{
        backgroundColor: '#9f9fa3',
        height:2,
    },
    wrapper: {
        flex:1,
        justifyContent: 'center',
        // backgroundColor: '#ccc',
        // borderRadius: 10,
        // paddingLeft: 10,
        // paddingRight: 10,
        // paddingTop: 5,
        // paddingBottom: 5,
    },
    text: {
        backgroundColor: 'transparent',
        color: '#a3a3a3',
        fontSize: 12,
        fontWeight: '600',
        textAlign:'center',
    },
});

Day.contextTypes = {
    getLocale: React.PropTypes.func,
};

Day.defaultProps = {
    currentMessage: {
        // TODO test if crash when createdAt === null
        createdAt: null,
    },
    previousMessage: {},
    containerStyle: {},
    wrapperStyle: {},
    textStyle: {},
    //TODO: remove in next major release
    isSameDay: warnDeprecated(isSameDay),
    isSameUser: warnDeprecated(isSameUser),
};

Day.propTypes = {
    currentMessage: React.PropTypes.object,
    previousMessage: React.PropTypes.object,
    containerStyle: View.propTypes.style,
    wrapperStyle: View.propTypes.style,
    textStyle: Text.propTypes.style,
    //TODO: remove in next major release
    isSameDay: React.PropTypes.func,
    isSameUser: React.PropTypes.func,
};
