import {Dimensions, Image, NativeModules, PixelRatio, Platform, StatusBar} from "react-native";
import {images} from "../assets/images";
import React from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { StatusBarManager } = NativeModules;
export const DEVICE_WIDTH = Dimensions.get('window').width;
export const DEVICE_HEIGHT = Dimensions.get('window').height;

export const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
//Set mockup width in dp example IphoneXS 414
export const MOCKUP_WIDTH = 375;
//Set mockup height in dp example IphoneXS 896
export const MOCKUP_HEIGHT = 812;

//Converts dp from mockup to current device
export const mockupWidthToDP = (mockupWidth: number) => {
   return mockupWidth;
};
//1280 x 720
export const mockupHeightToDP = (mockupHeight: number) => {
    return mockupHeight
};

export function isIphoneX() {
    const dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTV &&
        (dimen.height === 780 ||
            dimen.width === 780 ||
            dimen.height === 812 ||
            dimen.width === 812 ||
            dimen.height === 844 ||
            dimen.width === 844 ||
            dimen.height === 896 ||
            dimen.width === 896 ||
            dimen.height === 926 ||
            dimen.width === 926)
    );
}

export function fontSizeDP(fontSize: number, standardScreenHeight = 812) {
    return fontSize
}




export const dateParser = (timestamp: any, localtime = 0): string => {
    const parser = new Date(Date.parse(timestamp));
    const day = parser.getDate() === 0 ? 1 : parser.getDate();
    const month = parser.getMonth() === 0 ? 1 : parser.getMonth();
    const hours = parser.getHours();
    const minutes = parser.getMinutes()
    return `${day < 10 ? "0" : ""}${day}.${month < 9 ? "0" : ""}${
        localtime === 1 ? month + 1 : month
    }.${parser.getFullYear()} at ${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
};


export const timeParse = (timestamp: any) => {
    const parsed = new Date(Date.parse(timestamp));
    const hours: number = parsed.getHours();
    const minutes: number = parsed.getMinutes();
    return `${hours < 10 ? "0" : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`
}


export async function isMe() {
    const currentUserId = await AsyncStorage.getItem('currentUserId');
    return currentUserId
}

export const getToken = (callback: Function) => {
    AsyncStorage.getItem('Access_TOKEN').then((el: string | null) => {
        try {
            callback(el);
        } catch (ex) {
            console.log('_useToken ex', ex);
        }
    });
};
