import React, { Component } from "react";
import PropTypes from "prop-types";
import Bowser from "bowser";

const isSafari = () => Bowser.getParser(window.navigator.userAgent).getBrowserName() === "Safari"


export default class CrossfadeImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            src: props.src,
            topSrc: props.src,
            bottomOpacity: 0,
            bottomSrc: props.src
        };
    }
    componentWillReceiveProps(newProps) {
        const oldSrc = this.state.topSrc;
        const newSrc = newProps.src;
        if (newSrc !== oldSrc) {
            this.setState({ bottomSrc: false, topSrc: false }, () =>
                this.setState(
                    { bottomSrc: oldSrc, topSrc: newSrc, bottomOpacity: 0.99 },
                    () => {
                        if (!this.timeout) clearTimeout(this.timeout);
                        this.timeout = setTimeout(
                            () => this.setState({ bottomOpacity: 0 }),
                            20
                        );
                    }
                )
            );
        }
    }
    render() {
        const { containerClass, duration, timingFunction, delay, style, src } = this.props;
        const { topSrc, bottomOpacity, bottomSrc } = this.state;

        return (
            <div className={containerClass} style={{ ...defaultStyle, ...{ position: "relative" } }}>
                { src && <img style={{ ...defaultStyle }} src={src}></img>}
                {/* {!isSafari() && topSrc &&
                    <img
                        style={{ ...defaultStyle, ...{ position: "absolute" } }}
                        src={topSrc} className={style}
                        alt=""
                    />}

                {!isSafari() && bottomSrc &&
                    <img
                        style={{
                            ...defaultStyle,
                            ...{
                                opacity: bottomOpacity,
                                transition: `opacity ${duration / 1000}s ${timingFunction} ${delay / 1000}s`
                            }
                        }}
                        alt=""
                        src={bottomSrc}
                        className={style}
                    />} */}
            </div>
        );
    }
}

const defaultStyle = { maxWidth: "100%", maxHeight: "100%" };

CrossfadeImage.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    duration: PropTypes.number,
    timingFunction: PropTypes.string,
    delay: PropTypes.number,
    style: PropTypes.string,
    containerClass: PropTypes.string,
};

CrossfadeImage.defaultProps = {
    duration: 1000,
    timingFunction: "linear",
    delay: 0,
    containerClass: "",
};
