import React from 'react';
import '../style/PageBody.css';

class PageBody extends React.Component {
    
    constructor(props){
        super(props);
        
        this.state = {
          isLoaded: false,
          selectedCategory : "TOP",
          allData: [],
          bookmarked : []
        }
    }

    componentDidUpdate() {
        if(this.state.isLoaded !== this.props.isLoaded) {
            this.setState({isLoaded: this.props.isLoaded});
        }

        if(this.state.allData !== this.props.allData) {
            this.setState({allData: this.props.allData});
        }

        if(this.state.selectedCategory !== this.props.selectedCategory) {
            this.setState({selectedCategory: this.props.selectedCategory});
        }

        if(this.state.bookmarked !== this.props.bookmarked) {
            this.setState({bookmarked: this.props.bookmarked});
        }
    }
    
    renderArticle = () => {
        if(this.state.isLoaded){
            return(
                this.state.allData.map((dataElmt, index) => {
                    if(dataElmt.name === this.state.selectedCategory){ 
                    return(
                        dataElmt.templates.map((templateElmt, index) => {              
                            if((templateElmt.title != null) && (templateElmt.sections[0].articles.length !== 0)){
                                return(
                                <div className = "article-group-card">
                                    <div className = "group-card-title">{templateElmt.title}</div>
                                    <div>{this.renderArticleGroup(templateElmt.title)}</div>
                                </div>
                                )  
                            } 
                        })
                    )
                    }      
                })
            )
        }
    }

    addToBookmark(id){
        this.props.addBookmark(id);
    }

    delFromBookmark(id){
        this.props.deleteFromBookmark(id);
    }
    
    renderArticleGroup = (group) => {
        if(this.state.isLoaded){
            return(
                this.state.allData.map((dataElmt, index) => {
                    if(dataElmt.name === this.state.selectedCategory){ 
                    return(
                        dataElmt.templates.map((templateElmt, index) => {
                        if(templateElmt.title === group){
                            return(
                            templateElmt.sections.map((sectionElmt, index) => {
                                if((sectionElmt.articles.length !== 0) && (sectionElmt.articles[0].source !== "AD")){
                                return(
                                    sectionElmt.articles.map((article, index) => {
                                    if((article.thumbnail != null) && (article.url != null)){
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
                                }
                            })
                            )
                        }
                        })
                    )
                    }      
                })
            )
        }
    }

    render(){
        return(
            <div className = "body">
                <div className = "TITLE">{this.state.selectedCategory}</div>
                <div>{this.renderArticle()}</div>
            </div>
        )
    }
}

export default PageBody;