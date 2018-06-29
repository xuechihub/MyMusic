import {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import classname from "classnames/bind";
import styles from "./LeftMenu.css";

const cx = classname.bind(styles);

class LeftMenu extends Component {
    constructor() {
        super();
        this.state = {
            list: [
                {name: "我的音乐", url: "/player"}
            ],
            current: {name: "我的音乐", url: "/player"}
        }
    }

    componentWillMount() {
    }


    render() {
        const {list, current} = this.state;

        return (
            <div className={styles.container}>
                <div className={styles.ul}>
                    {list.map((item) => {
                        let name = item.name;
                        return (
                            <li key={item.url} className={cx({
                                current: current.url === item.url,
                                item: true
                            })}>
                                <Link className={styles.link} to={item.url}
                                >
                                    {name}
                                </Link>
                            </li>
                        )
                    })}
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


export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);