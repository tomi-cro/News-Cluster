import React, { Component } from 'react';
import './NewsFeedStyle.css';
import News from '../News/News';
import Navbar from '../Navbar/Navbar';
import { connect } from 'react-redux';
import { fetchPosts } from '../../store/actions';



class NewsFeed extends Component {
    state = {
      filterString: ''
}
  componentDidMount () {
    this.props.fetchPosts();
  }

  render () {
    const posts = this.props.posts.filter(post => 
      post.title.toLowerCase().includes(
        this.state.filterString.toLowerCase())
      ).map(post => { 
        return <News 
            key={post.id}
            title={post.title} 
            link={post.link}
            description={post.description} 
            picture={post.picture}/>;
    });
    return (
      <div>
          <Navbar 
            onTextChange={text => this.setState({filterString: text})}
            handleAgeChange = {this.props.ageChange}
            handlePortalChange = {this.props.portalChange}
            ageValue = {this.props.age}
            indexValue = {this.props.index}
            jutarnjiValue = {this.props.jutarnji}
            dva4SataValue = {this.props.dva4Sata}
          />
          <section className="Posts">
            {posts}
          </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    age: state.age,
    posts: state.posts,
    index: state.checkBoxes.index,
    jutarnji: state.checkBoxes.jutarnji,
    dva4Sata: state.checkBoxes.dva4Sata
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ageChange: () => dispatch({type: 'AGE_CHANGE'}),
    portalChange: (changeEvent) => dispatch({type: 'PORTAL_CHANGE', portalName: changeEvent.target.name}),
    fetchPosts: () => dispatch(fetchPosts())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);
