import { Component } from 'react';
import './styles.css';
import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utilis/loadPosts';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2,
    searchValue: '',
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state
    const postsAndPhotos = await loadPosts()

    this.setState({ 
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
     });
  }

  loadMorePosts = () =>{

    const {
      page,
      postsPerPage,
      allPosts,
      posts,
    } = this.state

    const nextPage = page+postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts)

    this.setState({posts, page: nextPage})
  }

  handleChange = (e)=>{
    const { value } = e.target
    this.setState({ searchValue: value})
  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePost = page + postsPerPage >= allPosts.length

    const filteredPosts = !!searchValue ?
    allPosts.filter(post=>{
      return post.title.toLowerCase().includes(searchValue.toLowerCase())
    }) : posts

    return (
      <section className="container">

        {!!searchValue && (
          <h2>Search Term: {searchValue}</h2>
        )}
        
        <TextInput
        type="search"
        handleChange={this.handleChange}
        searchValue={searchValue}
          />

          {filteredPosts.length > 0 &&(
             <Posts posts={filteredPosts}/>
          )}

          {filteredPosts.length === 0 && (
            <h4>Not Found</h4>
          )}
       
        {!searchValue && (
          <Button
            text="Load More"
            onClick={this.loadMorePosts}
            disabled={noMorePost}
          />
        )}
        
      </section>
    );
  }
}
export default Home;