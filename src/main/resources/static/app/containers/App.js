import {Component} from "react";
import {connect} from "react-redux";
import classname from "classnames/bind";
import {getMusicList} from "../action";
import Music from "../reducer/music";
import styles from "./App.css";

const cx = classname.bind(styles);

class App extends Component {
    constructor() {
        super();
        this.setCurrentMusic = this.setCurrentMusic.bind(this);
        this.nextMusic = this.nextMusic.bind(this);
        this.state = {
            currentMusic: {}
        }
    }

    componentWillMount() {
        this.props.getMusicList()
            .then(() => {
                this.setState({
                    currentMusic: {...this.props.list[0], index: 0}
                });
            });
    }

    setCurrentMusic(item, index) {
        this.setState({
            currentMusic: {...item, index: index}
        });
        this.refs.player.autoplay = true;
    }

    nextMusic() {
        const {list} = this.props;
        const {index} = this.state.currentMusic;
        let nextIndex = index + 1 > list.length - 1 ? 0 : index + 1;
        this.setState({
            currentMusic: {...list[nextIndex], nextIndex}
        });
        this.refs.player.autoplay = true;
    }

    download(href, title) {
        const a = document.createElement('a');
        a.setAttribute('href', href);
        a.setAttribute('download', title);
        a.click();
    }

    render() {
        const {list} = this.props;
        const {currentMusic} = this.state;
        if (!currentMusic || !currentMusic.id) {
            return null;
        }
        return (
            <div className={styles.app}>
                <audio ref="player" className={styles.audio} controls
                       src={`${__site__}/rest/music/player/${currentMusic.id}`}
                       type="audio/mpeg"
                       preload="auto"
                       onEnded={(e) => this.nextMusic()}
                >
                    {"您的浏览器不支持 audio 元素。"}
                </audio>
                <ul className={styles.musicList}>
                    {list.map((item, index) => {
                        let name = item.name.split(".")[0];
                        return (
                            <li key={item.id} className={cx({
                                currentMusic: currentMusic.id === item.id,
                                musicItem: true
                            })}
                                onClick={(e) => this.setCurrentMusic(item)}
                            >
                                {name}
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    list: state.Music.MusicList.list ? state.Music.MusicList.list : []
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    getMusicList: () => {
        return dispatch(getMusicList())
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(App);