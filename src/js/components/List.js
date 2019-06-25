import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteArticle, saveArticle, unsaveArticle, saveArticleOk, unsaveArticleOk, } from "../ducks/article";

const mapStateToProps = state => {
    return { 
        articles: state.articles, 
        savedArticles: state.savedArticles 
    };
};

function mapDispatchToProps(dispatch) {
    return {
        deleteArticle: article => dispatch(deleteArticle(article)),
        saveArticle: article => dispatch(saveArticle(article)),
        unsaveArticle: article => dispatch(unsaveArticle(article)),
        saveArticleOk: article => dispatch(saveArticleOk(article)),
        unsaveArticleOk: article => dispatch(unsaveArticleOk(article)),
    };
}


export class ConnectedList extends Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.saveArticleOk) {
            this.props.saveArticleOk();
            this.setState({saveArticleOk: false});
        }
        if (nextProps.unsaveArticleOk) {
            this.props.unsaveArticleOk();
            this.setState({unsaveArticleOk: false});
        }
    }

    render() {
        return (<ul className="list-group list-group-flush">
            {this.props.articles.map((el, index) => (
                <li className="list-group-item" key={el.id}>
                    {el.title}
                    &nbsp;
                    <button className="btn btn-danger btn-sm" onClick={() => this.props.deleteArticle(el.id)}>Delete</button>
                    &nbsp;
                    <button className="btn btn-success btn-sm" onClick={() => this.props.saveArticle(el)}>Pin</button>
                </li>
            ))}
            {this.props.savedArticles.map((el, index) => (
                <li className="list-group-item" key={el.id}>
                    {el.title}
                    &nbsp;
                    <button className="btn btn-warning btn-sm" onClick={() => this.props.unsaveArticle(el.id)}>Unpin </button>
                </li>
            ))}
        </ul>
        )}
}

const List = connect(mapStateToProps, mapDispatchToProps)(ConnectedList);

export default List;