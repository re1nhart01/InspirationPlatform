import React from "react";
import {View, Text, TouchableOpacity, Image, FlatList} from "react-native";
import {StylesOne} from "../Styles/StylesOne";
import {MP} from "../Styles/MP";
import {St} from "../Styles/StylesTwo";
import {images} from "../assets/images";
import {Requests} from "../Types/Models";
import {apiURL} from "../redux/actions";
import { fontSizeDP } from "../Parts/utils";

type IProps = {
    onRefresh(): void;
    refresh: boolean;
    onBackBtn():void;
    data: Requests[];
    onAcceptOrDeclinePress(subscriber: string, status: boolean, index: number): void;
}

const RequestListComponent: React.FC<IProps> = (state) => {

    const renderList = ({ item,index }: { item: Requests; index: number }) => {
            let avatar = `http://${apiURL}/storage/${item.subscriber}/avatar/avatar.png`
            return (
                <View key={index} style={[StylesOne.flex_row, MP.mv10, MP.ph15, {width: '100%'}]}>
                    <View style={[MP.mr10]}>
                    <Image style={[St.round100image40]} source={{ uri: avatar }}/>
                    </View>
                    <View style={[StylesOne.flex_column, StylesOne.flex_jc_c]}>
                    <Text numberOfLines={1} style={[StylesOne.requests_username]}>{item.subscriber}</Text>
                    <Text numberOfLines={1} style={[StylesOne.requests_fullName]}>{item.full_name}</Text>
                    </View>
                    <View style={[StylesOne.flex_row, {justifyContent: "flex-end", alignItems: 'center', width: "90%"}]}>
                        <TouchableOpacity style={[MP.mr5, StylesOne.requests_accept]} onPress={() => {state.onAcceptOrDeclinePress(item.subscriber, true, index)}}>
                            <Text style={[StylesOne.requests_username, {fontSize: fontSizeDP(12),color: 'white'}]}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[StylesOne.requests_decline]} onPress={() => {state.onAcceptOrDeclinePress(item.subscriber, false, index)}}>
                            <Text style={[StylesOne.requests_username, {fontSize: fontSizeDP(12), color: 'white'}]}>Decline</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
    }

if (state.data.length > 0) {
    return (
        <View style={[StylesOne.screenContainer]}>
            <View style={[StylesOne.w100, MP.ph25]}>
                <View style={[StylesOne.flex_row, StylesOne.flex_jc_sb, StylesOne.flex_ai_c, MP.mv20]}>
                    <TouchableOpacity onPress={state.onBackBtn} style={StylesOne.image24}>
                        <Image style={[StylesOne.wh100,StylesOne.rm_c, St.blackArrow]} source={images.arrowLeft} />
                    </TouchableOpacity>
                    <Text style={StylesOne.CheckBox_text}>Request List</Text>
                    <View/>
                </View>
            </View>
            <View style={{ width: "100%", height: 1400 }}>
                <FlatList
                    data={state.data}
                    renderItem={renderList}
                />
            </View>
        </View>
    )
}
    return (
        <View style={[StylesOne.screenContainer, MP.ph25]}>
            <View style={[StylesOne.w100]}>
                <View style={[StylesOne.flex_row, StylesOne.flex_jc_sb, StylesOne.flex_ai_c, MP.mv20]}>
                    <TouchableOpacity onPress={state.onBackBtn} style={StylesOne.image24}>
                        <Image style={[StylesOne.wh100,StylesOne.rm_c, St.blackArrow]} source={images.arrowLeft} />
                    </TouchableOpacity>
                    <Text style={StylesOne.CheckBox_text}>Request List</Text>
                    <View/>
                </View>
            </View>
            <View>
               <Text style={{color:'black'}}>No requests</Text>
            </View>
        </View>
    )

}


export default RequestListComponent
