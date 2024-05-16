import React, { useEffect, useLayoutEffect, useState } from "react"
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { StylesOne } from "../Styles/StylesOne";
import { BaseProps } from "../Types/Types";
import { MP } from "../Styles/MP";
import { images } from "../assets/images";
import { colors } from "../Parts/colors";
import { Picker } from "@react-native-picker/picker";
import { actionImpl } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Reducers } from "../redux/reducers/reducers";
import { StackScreens } from "./Core/MainNavigationScreen";
import { INavigation } from "./Core/OverrideNavigation";
import { registerState } from "./RegisterComponent";
import DatePicker from "react-native-date-picker";

type IProps = {
    scrollToIndex(index: number): void;
    pipeState: {
        getter: registerState;
        setter: React.Dispatch<React.SetStateAction<registerState>>
    }
    onRegisterPress(): void;
} & BaseProps

const SetupAccountComponent: React.FC<IProps> = ({ scrollToIndex, pipeState, onRegisterPress }): JSX.Element => {
    const { getter, setter } = pipeState








    return (
        <View style={StylesOne.wh_device}>
            <View style={[StylesOne.flex_row, StylesOne.flex_jc_fs, StylesOne.flex_ai_c, MP.mv20]}>
                <View style={[StylesOne.flex_row, StylesOne.flex_jc_c, StylesOne.w100]}>
                    <Text style={StylesOne.CheckBox_text}>Setup Account</Text>
                </View>
            </View>

        </View>
    )
}


export default SetupAccountComponent
