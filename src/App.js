import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from '../src/component/Navbar.js';
import PageBody from '../src/component/PageBody.js';
import Bookmark from '../src/component/Bookmark.js';
import Footer from '../src/component/Footer.js';
import './App.css';

class App extends React.Component {

  constructor(props){
    super(props);
    
    this.state = {
      error: null,
      isLoaded: false,
      selectedCategory : "TOP",
      allData: [],
      categoryList : [],
      bookmarked : []
    }
}

  componentDidMount() {

    fetch("https://today.line.me/id/portaljson")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            allData : result.result.categories,
            categoryList: result.result.categoryList
          });

        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

      this.setState({bookmarked : JSON.parse(localStorage.getItem('bookmarkData'))})
    
  }

  
  componentDidUpdate() {
    if(JSON.parse(localStorage.getItem('bookmarkData')) !== this.state.bookmarked){
      localStorage.setItem('bookmarkData', JSON.stringify(this.state.bookmarked));
    }
  }

  
  changeCategory(category){
    if(this.state.selectedCategory !== category){
      this.setState({
        selectedCategory : category
      })
    }
  }

  addBookmark(id){
    if(!(this.state.bookmarked.indexOf(id) > -1)){
      this.setState({
        bookmarked:[...this.state.bookmarked, id]
      });
    }
  }

  deleteFromBookmark(id){
    var bookmarkList = this.state.bookmarked;
    var toRemove = id;
    var index = bookmarkList.indexOf(toRemove);

    if(index > -1){
      bookmarkList.splice(index, 1);
    }

    this.setState({bookmarked : bookmarkList});
  }

  
  render(){
    console.log("Bookmark id")
    console.log(this.state.bookmarked);
    console.log("Bookmark localStorage")
    console.log(localStorage.getItem('bookmarkData'));
    return (
      <div className="App">
        <div className = "App-body">
          <Navbar 
            categoryList = {this.state.categoryList} 
            selectedCategory = {this.state.selectedCategory} 
            changeCategory = {this.changeCategory.bind(this)}/>

          <Switch>

            <Route exact path = "/" >
              <PageBody
                isLoaded = {this.state.isLoaded}
                allData = {this.state.allData} 
                selectedCategory = {this.state.selectedCategory}
                bookmarked = {this.state.bookmarked}
                addBookmark = {this.addBookmark.bind(this)}
                deleteFromBookmark = {this.deleteFromBookmark.bind(this)}/>
            </Route>

            <Route exact path = "/bookmark" >
              <Bookmark
                allData = {this.state.allData}
                deleteFromBookmark = {this.deleteFromBookmark.bind(this)}
                bookmarked = {this.state.bookmarked}/>
            </Route>
            
          </Switch>
          

          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
