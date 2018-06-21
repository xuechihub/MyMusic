import {Component} from "react";
import {connect} from "react-redux";

class App extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>欢迎来到我的音乐！</div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    // active: ownProps.filter === state.visibilityFilter
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    // onClick: () => {
    //     dispatch(setVisibilityFilter(ownProps.filter))
    // }
});


export default connect(mapStateToProps, mapDispatchToProps)(App);