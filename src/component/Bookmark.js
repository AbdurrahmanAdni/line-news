import React from 'react';
import '../style/Bookmark.css';

class Bookmark extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        isLoaded: false,
        allData: [],
        //bookmarked : []
    }
  }

  /*componentDidMount(){
    var getBookmark = localStorage.getItem('bookmarkData');
    this.setState({bookmarked: JSON.parse(getBookmark)});
  }*/

  componentDidUpdate() {
      if(this.state.bookmarked !== this.props.bookmarked) {
          this.setState({bookmarked: this.props.bookmarked});
      }

      if(this.state.allData !== this.props.allData) {
        this.setState({allData: this.props.allData});
    }

  }

  delFromBookmark(id){
      this.props.deleteFromBookmark(id);
  }
  
  renderBookmarkedArticle = () => {
    return(
      this.state.allData.map((dataElmt, index) => {
        return(
          dataElmt.templates.map((templateElmt, index) => {         
            return(
              templateElmt.sections.map((sectionElmt, index) => {
                return(
                  sectionElmt.articles.map((article, index) => {
                    if(this.state.bookmarked.indexOf(article.id) > -1){
                      return(
                        <div key = {index} className = "news-card">
                            <a href = {article.url.url} className = "news-image"><img src = {"https://obs.line-scdn.net/" + article.thumbnail.hash} style = {{width : "112px", height : "64px"}}/></a>
                            <div className = "news-detail">
                                <a href = {article.url.url} className = "news-title">{article.title}</a>
                                <div className = "card-addition">
                                    <div className = "news-publisher">{article.publisher}</div>
                                    <div 
                                        className = "news-bookmark"
                                        style = {{display : this.state.bookmarked.indexOf(article.id) > -1 ? "none" : "inline-block"}}
                                        onClick = {() => this.addToBookmark(article.id)}>
                                        Bookmark
                                    </div>

                                    <div 
                                        className = "news-bookmark"
                                        style = {{display : this.state.bookmarked.indexOf(article.id) > -1 ? "inline-block" : "none"}}
                                        onClick = {() => this.delFromBookmark(article.id)}>
                                        Delete Bookmark
                                    </div>
                                </div>                                  
                            </div>
                        </div>
                      )
                    }
                  })
                ) 
              })
            )
          
          })
        )        
      })
    )
  }
    
  render(){
      console.log("Bookmarked Page");
      //console.log(localStorage.getItem('bookmarkData'));
      console.log(this.state.bookmarked);
      return (
      <div className = "bookmark-page">{this.renderBookmarkedArticle()}</div>
    );
  }
}

export default Bookmark;
