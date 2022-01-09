import React, {useCallback, useEffect, useState} from "react";
import {View, Text} from "react-native";
import {BaseProps} from "../../Types/Types";
import RequestListComponent from "../RequestListComponent";
import {actionImpl} from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import {Requests} from "../../Types/Models";
import {StackScreens} from "../Core/MainNavigationScreen";

interface IProps extends BaseProps {

}
type IState = {
    requestList: Requests[];
    refresh: boolean
}

const RequestListContainer: React.FC<IProps> = (props) => {
    const dispatch = useDispatch()
    const store: any = useSelector<any>(state => state)
    const [getState, setState] = useState<IState>({
        requestList: [],
        refresh: false,
    })

    const onBackBtn = () => {
        props.navigation.navigate(StackScreens.Settings);
    };

    const onRefresh = useCallback(() => {
        dispatch(actionImpl.getRequestList())
        console.log(getState.requestList)
    }, [])

    const STATE = {
        onRefresh,
        refresh:getState.refresh,
        onBackBtn,
    }

    useEffect(() => {
        dispatch(actionImpl.getRequestList())
    }, [])

    useEffect(() => {
        if (store.requestListReducer?.statusCode === 200) {
            setState({...getState, requestList: store.requestListReducer.data})
        }
    }, [store.requestListReducer])

    return <RequestListComponent {...STATE} />
}


export default RequestListContainer