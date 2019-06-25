import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteArticle } from "../ducks/article";

const mapStateToProps = state => {
    return { 
        articles: state.articles, 
        savedArticles: state.savedArticles 
    };
};

function mapDispatchToProps(dispatch) {
    return {
        deleteArticle: article => dispatch(deleteArticle(article)),
    };
}


export class ConnectedList extends Component {

    render() {
        return (<ul className="list-group list-group-flush">
            {this.props.articles.map((el) => (
                <li className="list-group-item" key={el.id}>
                    {el.title}
                    &nbsp;
                    <button className="btn btn-danger btn-sm" onClick={() => this.props.deleteArticle(el.id)}>Delete</button>
                </li>
            ))}
        </ul>
        )}
}

const List = connect(mapStateToProps, mapDispatchToProps)(ConnectedList);

export default List;