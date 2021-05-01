/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Alert,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {first, forEach} from 'lodash';

import CustomButton from './Button';
import Api from '../helper/api';

const Discover = props => {
  const {token} = props.route.params;

  const [invites, setinvites] = useState(null);
  const [likes, setlikes] = useState(null);

  useEffect(() => {
    if (!invites || !likes) {
      const url = 'https://testa2.aisle.co/V1/users/test_profile_list';
      Api.getData(url, {
        auth: token,
      }).then(response => {
        if (response) {
          setinvites(response.invites.profiles);
          setlikes(response.likes.profiles);
        }
      });
    }
  });

  const onUpgradePress = () => {
    Alert('Upgrade button pressed!!');
  };

  const primarySuggestion = () => {
    if (invites) {
      return (
        <ImageBackground
          key="prima-suggestion"
          style={styles.topImage}
          resizeMode="cover"
          imageStyle={{borderRadius: 15}}
          source={{uri: first(invites).photos[0].photo}}>
          <Text style={styles.namePrimaryImage}>
            {first(invites).general_information.first_name}
          </Text>
          <Text style={styles.secondaryTextPrimaryImage}>Tap to view</Text>
        </ImageBackground>
      );
    }
    return null;
  };

  const seccondarySuggestionList = () => {
    const formattedSuggestions = [];
    let innerSuggestionList = [];

    if (likes) {
      const updatedSuggestions = likes;
      forEach(updatedSuggestions, (eachSuggestion, index) => {
        if (innerSuggestionList.length >= 2) {
          formattedSuggestions.push(
            <View style={styles.flexRow} key={`row-${index}`}>
              {innerSuggestionList}
            </View>,
          );
          innerSuggestionList = [];
        }
        innerSuggestionList.push(
          <ImageBackground
            key={`suggestion-${index}`}
            style={styles.bottomImage}
            resizeMode="cover"
            source={{uri: eachSuggestion.avatar}}
            imageStyle={{borderRadius: 10}}
            blurRadius={5}>
            <Text style={styles.nameBottomImage}>
              {eachSuggestion.first_name}
            </Text>
          </ImageBackground>,
        );
      });
      if (innerSuggestionList.length !== 0) {
        formattedSuggestions.push(
          <View style={styles.flexRow} key={'last-suggestion'}>
            {innerSuggestionList}
          </View>,
        );
        innerSuggestionList = [];
      }
      return formattedSuggestions;
    }
    return null;
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.mainContainer}>
        <Text style={styles.notes}>Notes</Text>
        <Text style={[styles.personalise, {marginTop: 5}]}>
          Personal messages to you
        </Text>
        {primarySuggestion()}
        <View style={[styles.flexRow, {paddingVertical: 15}]}>
          <View style={[styles.flexColumn, styles.flexOne]}>
            <Text style={styles.interested}>Interested In You</Text>
            <Text style={styles.premiumMessage}>
              Premium members can view all their likes at once
            </Text>
          </View>
          <View style={[styles.flexColumn, styles.marginTop25]}>
            <CustomButton
              text={'Upgrade'}
              style={{backgroundColor: '#FCDF03'}}
              onPress={onUpgradePress}
            />
          </View>
        </View>
        <View>{seccondarySuggestionList()}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  marginRight5: {
    marginRight: 5,
  },
  marginTop25: {
    marginTop: 25,
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexOne: {
    flex: 1,
  },
  flexColumn: {
    flexDirection: 'column',
  },
  verticalCenter: {
    alignItems: 'center',
  },
  personalise: {
    fontSize: 18,
    fontWeight: '600',
    fontStyle: 'normal',
  },
  notes: {
    fontSize: 27,
    fontWeight: '800',
    fontStyle: 'normal',
  },
  interested: {
    fontSize: 22,
    fontWeight: '800',
    fontStyle: 'normal',
  },
  premiumMessage: {
    fontSize: 15,
    fontWeight: '600',
    fontStyle: 'normal',
    color: '#9B9B9B',
    paddingTop: 5,
  },
  bottomImage: {
    borderRadius: 10,
    margin: 5,
    width: 170,
    height: 260,
  },
  topImage: {
    borderRadius: 10,
    margin: 5,
    width: '100%',
    height: 260,
  },
  nameBottomImage: {
    color: 'white',
    fontSize: 18,
    fontWeight: '800',
    fontStyle: 'normal',
    paddingLeft: 10,
    bottom: -220,
  },
  namePrimaryImage: {
    color: 'white',
    fontSize: 18,
    fontWeight: '800',
    fontStyle: 'normal',
    paddingLeft: 10,
    bottom: -205,
  },
  secondaryTextPrimaryImage: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
    fontStyle: 'normal',
    paddingLeft: 10,
    bottom: -210,
  },
});

export default Discover;
