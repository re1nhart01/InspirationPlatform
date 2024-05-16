import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput, Alert, LayoutAnimation, Pressable } from "react-native";
import { images } from "../assets/images";
import { StylesOne } from "../Styles/StylesOne";
import { colors } from "../Parts/colors";
import { noGoBack, StackScreens } from "./Core/MainNavigationScreen";
import { MP } from "../Styles/MP";
import CheckBox from "@react-native-community/checkbox";
import { KeyboardAvoidingComponent } from "./Core/KeyboardAvoidingComponent";
import { useDispatch, useSelector } from "react-redux";
import { actionImpl } from "../redux/actions";
import { BaseProps } from "../Types/Types";
import { Reducers } from "../redux/reducers/reducers";
import { INavigation } from "./Core/OverrideNavigation";
import { registerState } from "./RegisterComponent";
import {backgrounds} from "../Styles/Backgrounds";
import {Picker} from "@react-native-picker/picker";

type IProps = {
    scrollToIndex(index: number): void;
    pipeState: {
        getter: registerState;
        setter: React.Dispatch<React.SetStateAction<registerState>>
    }
    onRegisterPress(): void | Promise<void>;
} & BaseProps
//dispatch(Register(username, email, password))
const SignUpComponent: React.FC<IProps> = ({ scrollToIndex, pipeState, onRegisterPress }) => {
    const { getter, setter } = pipeState
    const [getState, setState] = useState<boolean>(true);
    const goBack = () => {
        INavigation.navigate(StackScreens.SignIn);
    }

    function onShowPasswordPress() {
        setState((prev) => !prev)
    }

    function onTermOfUserHandler() {
        Alert.alert('Be carefully on using this app :)')
    }

    // useEffect(() => {
    //     if (state.setupReducer.statusCode === 200) {
    //         INavigation.erase(true)
    //         INavigation.navigate(StackScreens.SignIn)
    //         dispatch(actionImpl.clear())
    //     } else if (state.statusCode === 208) {
    //         Alert.alert("Oops", "Something went wrong");
    //     }
    // }, [state.setupReducer])

    async function registerUser() {
        try {
            const { about, birth, cPassword, checkbox, email, fName, gender, location, name, password, refer, site } = getter
            if (email === ' ' || email === '' ) {
                Alert.alert("Warning! Email can not be empty");
                return;
            }
            if (fName === ' ' || fName === '') {
                Alert.alert("Warning! Full Name can not be empty");
                return;
            }
            if (gender === ' ' || gender === '') {
                Alert.alert("Warning! Gender can not be empty");
                return;
            }
            if (location === ' ' || location === '') {
                Alert.alert("Warning! Location can not be empty");
                return;
            }
            if (name === ' ' || name === '') {
                Alert.alert("Warning! Username can not be empty");
                return;
            }
            if (password === ' ' || password === '') {
                Alert.alert("Warning! Password can not be empty");
                return;
            }
            await onRegisterPress?.()
        } catch (ex) {

        }
    }

    const onSendBtnHandler = async () => {
        try {
            const username = getter.name;
            const password = getter.password;
            const cPassword = getter.cPassword;
            if (username.length <= 6) {
                Alert.alert("Warning!", "Invalid username! Username should be longer than 6 symbols")
                return;
            }
            if (password.length <= 8) {
                Alert.alert("Warning!", "Invalid password! Password should be longer than 8 symbols")
                return;
            }
            if (password.trim() !== cPassword.trim()) {
                Alert.alert("Warning!", "Invalid password! Passwords are not similar!")
                return;
            }
            scrollToIndex(1);
        } catch (ex) {
            console.log('onSendBtnHandler ex', ex);
        }
    }

    const onCheckBoxPress = (val: boolean) => {
        LayoutAnimation.configureNext(LayoutAnimation.create(250, 'linear', 'opacity'));
        setter({ ...getter, checkbox: val })
    }

    return (
        <View style={[StylesOne.screenContainer]}>
            <View style={[StylesOne.flex_row, StylesOne.flex_jc_sb, MP.mv20, MP.ml20, StylesOne.w100]}>
                <TouchableOpacity onPress={goBack} style={StylesOne.image24}>
                    <Image style={[StylesOne.wh100, StylesOne.rm_c]} source={images.arrowLeft} />
                </TouchableOpacity>
                <View style={[StylesOne.flex_jc_c]}>
                    <Text style={StylesOne.CheckBox_text}>Sign up</Text>
                </View>
                <View style={StylesOne.image24} />
            </View>
                <View style={[StylesOne.flex_column, StylesOne.flex_ai_c]}>
                    <View style={MP.mbminus50}>
                        <Text style={StylesOne.fontLogo_black}>Valhalla</Text>
                    </View>
                    <View style={[]}>
                        <Image
                            style={[StylesOne.whc_img100, {tintColor: getter.checkbox ? 'black' : colors.inactive_btn}]}
                            source={images.logo}/>
                    </View>
                </View>
            <View style={[StylesOne.inputContainer]}>
            <TextInput placeholder="Username"
                        placeholderTextColor={colors.Placeholder}
                        underlineColorAndroid={colors.Underline_rgba_black}
                        style={StylesOne.fontInputText}
                        onChangeText={(val) => setter({ ...getter, name: val })}
                        value={getter.name}
                    />
                    <TextInput placeholder="Password"
                        placeholderTextColor={colors.Placeholder}
                        underlineColorAndroid={colors.Underline_rgba_black}
                        style={StylesOne.fontInputText}
                        onChangeText={(val) => setter({ ...getter, password: val })}
                        value={getter.password}
                        secureTextEntry={getState}
                    />
                    <TextInput placeholder="Confirm password"
                        placeholderTextColor={colors.Placeholder}
                        underlineColorAndroid={colors.Underline_rgba_black}
                        style={StylesOne.fontInputText}
                        onChangeText={(val) => setter({ ...getter, cPassword: val })}
                        value={getter.cPassword}
                        secureTextEntry={getState}
                    />
                    <TextInput placeholder="Email"
                               placeholderTextColor={colors.Placeholder}
                               underlineColorAndroid={colors.Underline_rgba_black}
                               style={StylesOne.fontInputText_black}
                               onChangeText={(val) => setter({ ...getter, email: val })}
                               value={getter.email}
                    />
                    <TextInput placeholder="Full name"
                               placeholderTextColor={colors.Placeholder}
                               underlineColorAndroid={colors.Underline_rgba_black}
                               style={StylesOne.fontInputText_black}
                               onChangeText={(val) => setter({ ...getter, fName: val })}
                               value={getter.fName}
                    />
                    <TextInput placeholder="Location"
                               placeholderTextColor={colors.Placeholder}
                               underlineColorAndroid={colors.Underline_rgba_black}
                               style={StylesOne.fontInputText_black}
                               onChangeText={(val) => setter({ ...getter, location: val })}
                               value={getter.location}
                    />
                    <TextInput placeholder="About yourself"
                               placeholderTextColor={colors.Placeholder}
                               underlineColorAndroid={colors.Underline_rgba_black}
                               style={StylesOne.fontInputText_black}
                               onChangeText={(val) => setter({ ...getter, about: val })}
                               value={getter.about}
                    />
                    <TextInput placeholder="Personal site"
                               placeholderTextColor={colors.Placeholder}
                               underlineColorAndroid={colors.Underline_rgba_black}
                               style={StylesOne.fontInputText_black}
                               onChangeText={(val) => setter({ ...getter, site: val })}
                               value={getter.site}
                    />
                    {/* <DatePicker
                    style={[StylesOne.w100, {backgroundColor: 'transparent'}]}
                    mode={'date'}
                    date={new Date()}
                    onDateChange={(val) => {
                    setter({ ...getter, birth: `${val.getTime()}` });
                    }}
                /> */}
                    <View style={[StylesOne.DropdownStyles]}>
                        <Picker selectedValue={getter.gender}
                                onValueChange={(val, itemIndex) =>
                                    setter({ ...getter, gender: val })}
                                dropdownIconColor={colors.SignIn_Font}
                                itemStyle={StylesOne.fontInputText_black}
                                dropdownIconRippleColor={colors.SignIn_BG}
                                mode="dropdown">
                            <Picker.Item style={StylesOne.fontInputText_dd} label="Male" value="Male" />
                            <Picker.Item style={StylesOne.fontInputText_dd} label="Female" value="Female" />
                            <Picker.Item style={StylesOne.fontInputText_dd} label="Unrecognized" value="Unrecognized" />
                            <Picker.Item style={StylesOne.fontInputText_dd} label="Digigender" value="Digigender" />
                        </Picker>
                        <View style={StylesOne.borderBottom} />
                    </View>
                    <View style={[StylesOne.flex_row, StylesOne.flex_ai_c, StylesOne.flex_jc_c]}>
                        <TouchableOpacity onPress={registerUser} style={[StylesOne.SignInButton, StylesOne.shadowRed]}>
                            <View style={[StylesOne.flexCenter, StylesOne.h100]}>
                                <Text style={StylesOne.SignIn_textStyle}>Sign Up</Text>
                                <Image style={StylesOne.SignIn_image} source={images.arrowRight} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            <Pressable hitSlop={20} style={[MP.mt20, MP.mb20]} onPress={onShowPasswordPress}><Text  style={[StylesOne.CheckBox_pass]}>Show Password</Text></Pressable>
            <View style={[StylesOne.flex_row, StylesOne.flex_jc_c, StylesOne.flex_ai_c]}>
                <input onChange={() => onCheckBoxPress(!getter.checkbox)} defaultChecked={getter.checkbox} style={{backgroundColor: "black"}} type="checkbox"/>
                <Text><Text style={[StylesOne.CheckBox_text]}>I agree to the </Text><Text onPress={onTermOfUserHandler}
                                                                                          style={StylesOne.CheckBox_terms}>Terms
                    of Use</Text></Text>
            </View>
        </View>
    )
}


export default SignUpComponent
