import React, {useState} from "react";
import {FormTextBoxContainer} from "../Controllers/FormTextBoxContainer";
import {View, Text, TouchableOpacity, TextInput, Image} from "react-native";
import {chatStyles} from "../../Styles/ChatStyles";
import {images} from "../../assets/images";
import {StylesOne} from "../../Styles/StylesOne";
import {MP} from "../../Styles/MP";
import {mockupWidthToDP} from "../../Parts/utils";
import {colors} from "../../Parts/colors";

type IProps = {
    onMessageSend(text: string): void;
    onEmojiButtonPress():void;
}
type IState = {
    inputValue: string
}
const FormTextBoxSegment: React.FC<IProps> = (props: IProps): JSX.Element => {
    const [getState, setState] = useState<IState>({
        inputValue: '',
    })

    const onMessageSendPress = () => {
        // if (getState.inputValue === void 0 || getState.inputValue.length <= 0) {
        //     return
        // }
        if (getState.inputValue === '' || getState.inputValue === ' ') {
            return;
        }
        props.onMessageSend && props.onMessageSend(getState.inputValue.trim())
        setState({...getState, inputValue: ''})
    }

    const onEmojiPress = () => {
        props.onEmojiButtonPress && props.onEmojiButtonPress()
    }


    return (
        <View style={[chatStyles.chatInput, StylesOne.flex_row, StylesOne.flex_jc_sb, MP.ph6, StylesOne.flex_ai_c]}>
            <View style={[StylesOne.flex_row, StylesOne.flex_ai_c, { width: "80%", paddingLeft: 40 }]}>
                <TextInput
                    multiline
                    placeholder={"Enter Your Message"}
                    placeholderTextColor={colors.Placeholder}
                    style={[{ width: "80%", alignItems: 'center', paddingVertical: 20 }, StylesOne.fontInputText_black14,]}
                    value={getState.inputValue}
                    maxLength={500}
                    onChangeText={(value) => setState({...getState, inputValue: value})} />
            </View>
            <TouchableOpacity style={[StylesOne.image25, StylesOne.flex_center ,{width: mockupWidthToDP(65), height: '100%'}]} onPress={onMessageSendPress}>
                <Image style={[StylesOne.image25]} source={images.send} />
            </TouchableOpacity>
        </View>
    )
}


export {FormTextBoxSegment}
