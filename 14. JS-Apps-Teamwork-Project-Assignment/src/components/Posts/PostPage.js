import React, {Component} from 'react';
import Post from './Post';
import './Posts.css';
import {loadPosts} from '../../models/post';


export default class PostsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
    }

    componentDidMount() {
        loadPosts(this.onLoadSuccess);
    }

    onLoadSuccess(response) {
        this.setState({posts: response});
    }



    render() {
        return (
            <div>
                <h1>View All Posts</h1>
                <div>
                    {this.state.posts.map((post, index) => {
                        return <Post key={index} title={post.title} id={post._id} content={post.content}/>
                    })}
                </div>
            </div>
        );
    }
}
