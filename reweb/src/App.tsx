import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import MainNavigationScreen from './Screens/Core/MainNavigationScreen';
import { StylesOne } from './Styles/StylesOne';
import { actionImpl } from './redux/actions';
import { modulesImpl } from './redux/actions/modules';

type IProps = {
    checkUser(): void;
} & any;
type IState = {};

class App extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <SafeAreaView style={StylesOne.screenContainer}>
                <StatusBar />
                <MainNavigationScreen />
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = (state: any) => {
    return state;
};

export default connect(mapDispatchToProps, { checkUser: actionImpl.checkForConnection, getToken: modulesImpl.getToken })(App);
