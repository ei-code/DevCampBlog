import React, { Component } from "react";
import axios from "axios";
import BlogItem from "./blog-item";

class Blog extends Component {
  constructor() {
    super();

    this.state = {
      blogItems: []
    };
    this.getBlogItems = this.getBlogItems.bind(this);
  }

  getBlogItems() {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/publicaciones`, {})
      .then(response => {
        const sortedBlogItems = response.data.sort((a, b) => {
          return new Date(b.fechaPublicacion) - new Date(a.fechaPublicacion);
        });
        this.setState({
          blogItems: sortedBlogItems
        });
      })
      .catch(error => {
      });
  }

  componentDidMount() {
    this.getBlogItems();
  }

  render() {
    const blogPublicaciones = this.state.blogItems.map(blogItem => {
      return <BlogItem key={blogItem._id} blogItem={blogItem} />;
    });
    return (
      <div>
        <div className="titulo-blog">
        </div>
        {blogPublicaciones}
      </div>
    );
  }
}
export default Blog;