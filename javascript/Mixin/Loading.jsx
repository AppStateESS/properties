import React from 'react';

class Loading extends React.Component {
    render() {
        return (
            <div style={{margin: '0 auto', textAlign: 'center'}}>
                <h2>
                    <i className="fa fa-cog fa-spin"></i>
                    &nbsp;Loading {this.props.label}...
                </h2>
            </div>
        );
    }
}

export default Loading;
