import React, { Component } from "react";
import { connect } from "react-redux";
import { requestPosts } from "../ducks/article";

export class Post extends Component {

    aaa() {
        console.log('did');
    }
    bbb() {
        console.log('didnt');
    }
    componentDidMount() {
        this.props.requestPosts();
    }
    render() {
        return (
            <ul className="list-group list-group-flush">
                {this.props.articles.map(el => (
                    <li className="list-group-item" key={el.id}>
                        {el.title}
                    </li>
                ))}
                {this.props.postsLoading ? "Loading..." : ""}
            </ul>
        );
    }
}

function mapStateToProps(state) {
    return {
        articles: state.remoteArticles.slice(0, 10),
        postsLoading: state.postsLoading
    };
}

export default connect(
    mapStateToProps,
    { requestPosts }
)(Post);