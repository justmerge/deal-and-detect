import React, {Component} from 'react';

class Button extends Component {
    constructor(props) {
        super(props);

        this.ref = React.createRef();
        this._disableOnClick = this._disableOnClick.bind(this);
    }

    render() {
        return (
            <button 
                ref={this.ref}
                className="btn" 
                onClick={this._disableOnClick}>
                {this.props.label}
            </button>
        );
    }

    _disableOnClick() {
        setTimeout(() => {
            this.ref.current.removeAttribute('disabled');
        }, 1500);
    
        this.ref.current.setAttribute('disabled', 'disabled');
        this.props.callback();
    }
}

export default Button;