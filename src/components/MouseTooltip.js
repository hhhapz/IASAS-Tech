import React from 'react';
import PropTypes from 'prop-types';

class MouseTooltip extends React.PureComponent {
    static defaultProps = {
        visible: true,
        offsetX: 0,
        offsetY: 0,
    };

    state = {
        xPosition: 0,
        yPosition: 0,
        mouseMoved: false,
        listenerActive: false,
    };

    componentDidMount() {
        this.addListener();
    }

    componentDidUpdate() {
        this.updateListener();
    }

    componentWillUnmount() {
        this.removeListener();
    }

    getTooltipPosition = ({ clientX: xPosition, clientY: yPosition }) => {
        this.setState({
            xPosition: xPosition || 0,
            yPosition: yPosition || 0,
            mouseMoved: true,
        });
    };

    addListener = () => {
        window.addEventListener('mousemove', this.getTooltipPosition);
        this.setState({ listenerActive: true });
    };

    removeListener = () => {
        window.removeEventListener('mousemove', this.getTooltipPosition);
        this.setState({ listenerActive: false });
    };

    updateListener = () => {
        if (!this.state.listenerActive && this.props.visible) {
            this.addListener();
        }

        if (this.state.listenerActive && !this.props.visible) {
            this.removeListener();
        }
    };


    getData = () => {
        if (this.childNode) {
            return { width: this.childNode.clientWidth, height: this.childNode.clientHeight }
        }

        return 0
    }


    getStyle() {
        const style = {
            display: 'block',
            pointerEvents: 'none',
            position: 'fixed',
            top: this.state.yPosition + this.getData().height + 10 < document.body.clientHeight - 10
                ? this.state.yPosition + 10
                : document.body.clientHeight - this.getData().height - 10,
            ...this.props.style,
        }
        if (this.props.side === "left") {
            style.left = this.state.xPosition - this.getData().width - 20
        } else {
            style.left = this.state.xPosition + 20
        }

        return style
    }

    render() {
        return (
            <div
                className={this.props.className}
                style={this.getStyle()}
                ref={(r) => this.childNode = r}
            >
                {this.props.children}
            </div>
        );
    }
}

MouseTooltip.propTypes = {
    visible: PropTypes.bool,
    children: PropTypes.node.isRequired,
    offsetX: PropTypes.number,
    offsetY: PropTypes.number,
    className: PropTypes.string,
    style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default MouseTooltip;