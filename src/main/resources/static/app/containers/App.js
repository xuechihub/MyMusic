import {Component} from "react";
import {connect} from "react-redux";
import {Route} from "react-router-dom";
import classname from "classnames/bind";
import styles from "./App.css";
import LeftMenu from "./components/LeftMenu";
import MusicPlayer from "../router/MusicPlayer";
import them from "../asset/them.css";

const cx = classname.bind(styles);

class App extends Component {
    constructor() {
        super();
    }

    componentWillMount() {
    }


    render() {
        // const {list} = this.props;
        // const {currentMusic} = this.state;

        return (
            <div>
                <LeftMenu/>
                <div className={`${them.clearfix} ${styles.rightPanel}`}>
                    <Route path="/player" component={MusicPlayer}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    // list: state.Music.MusicList.list ? state.Music.MusicList.list : []
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    // getMusicList: () => {
    //     return dispatch(getMusicList())
    // }
});


export default connect(mapStateToProps, mapDispatchToProps)(App);