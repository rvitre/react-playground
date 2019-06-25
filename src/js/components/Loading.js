import React, { Component } from "react";

let divStyle = {
    background: "red",
    WebkitTransition: "all", // note the capital 'W' here
    msTransition: "all", // 'ms' is the only lowercase vendor prefix
    height: "100vh",
    width: "100vw"
};

export class Loading extends Component {
    render() {
        return (
            <div style={divStyle} className="">
                Loading
            </div>
        );
    }
}

export default Loading;
