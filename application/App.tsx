import React from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import {Provider} from "react-redux";
import {AnyAction, applyMiddleware, compose, createStore, Store} from "redux";
import thunk, {ThunkDispatch} from "redux-thunk";
import reducers from "./src/redux/reducers/reducers";
import {composeWithDevTools} from 'remote-redux-devtools';
import MainNavigationScreen from "./src/Screens/Core/MainNavigationScreen";
import {StylesOne} from "./src/Styles/StylesOne";
import NavContext from './src/context/NavContext';



type IProps = {}
type IState = {}

class App extends React.Component<IProps, IState> {
    private readonly store: Store;
constructor(props: IState) {
    super(props);
    this.store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
    this.storeLogger();
}

    private storeLogger = () => {
        console.table('Redux STORE',this.store.getState())
    }

    render () {
        return (
            <Provider store={this.store}>
              <SafeAreaView style={StylesOne.screenContainer}>
                <StatusBar />
                <MainNavigationScreen />
              </SafeAreaView>
            </Provider>
        )
    }
}

export default App;
