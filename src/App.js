import Navbar from '../src/component/Navbar.js';
import PageBody from '../src/component/PageBody.js';
import Footer from '../src/component/Footer.js';
import './App.css';
import React from 'react';

/*
this.state.allData.map((dataElmt, index) => {
            let dataTemplate = dataElmt.templates;
            //Ambil category -> dataElmt.name
            dataTemplate.map((templateElmt, index) => {
              if(templateElmt.title != null){
                let templateSection = templateElmt.sections;

                templateSection.map((sectionElmt, index) => {
                  //let sectionArticles = templateSection.articles;

                  if(sectionElmt.articles.length !== 0){
                    console.log("Categori : " + dataElmt.name);
                    console.log("categori title : " + templateElmt.title)
                    console.log("sectionElmt.articles : " + sectionElmt.articles.length)
                  }
                })
              }
            })
          })
*/

class App extends React.Component {

  constructor(props){
    super(props);
    
    this.state = {
      scrolled : false,
      error: null,
      isLoaded: false,
      nowCategory : "TOP",
      allData: [],
      categoryList : [],
      //esentialData : [],
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
    
  }

  renderArticle = () => {
    if(this.state.isLoaded){
      /*return(  
        console.log("dari function"),
        console.log(this.state.allData),
        console.log(this.state.isLoaded)
        this.state.allData.map((dataElmt, index) => {
          return(
            <div>{dataElmt.name}</div>
          )
        })
      )*/
      return(
        this.state.allData.map((dataElmt, index) => {
          //let dataTemplate = dataElmt.templates
          return(
            dataElmt.templates.map((templateElmt, index) => {
              return(
                templateElmt.sections.map((sectionElmt, index) => {
                  if((sectionElmt.articles.length !== 0) && (sectionElmt.articles[0].source !== "AD")){
                    return(
                      sectionElmt.articles.map((article, index) => {
                        if((article.thumbnail != null) && (article.url != null)){
                          return(
                            <div key = {index} className = "news-card">
                              <div>{dataElmt.name}</div>
                            </div>
                          )
                        }
                      })
                    )
                  }
                })
              )
              /*return(
                <div  key = {index}>
                  <div>{templateElmt.id}</div>
                </div>
              )*/
            })
            /*<div>
              <div key = {index}>{dataElmt.id}</div>
            </div>*/
            /*dataTemplate.map((templateElmt, index) => {
              let templateSection = templateElmt.sections;
              templateSection.map((sectionElmt, index) => {
                if((sectionElmt.articles.length !== 0) && (sectionElmt.articles[0].source !== "AD")){
                  return(
                    <div>
                      <div>{dataElmt.name}</div>
                      <div>{templateElmt.title}</div>
                    </div>
                  )
                }
              })
            })*/
          )
          
        })
      )
    }
  }

  render(){
    console.log("isLoaded " + this.state.isLoaded);
    console.log("allData");
    console.log(this.state.allData);
    console.log("categoryList");
    console.log(this.state.categoryList);
    console.log("esential data");
    console.log(this.state.esentialData);
    return (
      <div className="App">
        <div className = "App-body">
          <Navbar categoryList = {this.state.categoryList}/>
          <PageBody />
          <div>{this.renderArticle()}</div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
