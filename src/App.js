import Navbar from '../src/component/Navbar.js';
import PageBody from '../src/component/PageBody.js';
import Footer from '../src/component/Footer.js';
import './App.css';
import React from 'react';


class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      scrolled : false,
      error: null,
      isLoaded: false,
      allData: [],
      categoriesList : []
    }
  }
  
  componentDidMount() {

    fetch("https://today.line.me/id/portaljson")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            allData : result.result,
            categoriesList: result.result.categories,
            //categories : allData.result.categories
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

  render(){
    console.log("isLoaded " + this.state.isLoaded);
    console.log("allData");
    console.log(this.state.allData);
    console.log("categoriesList");
    console.log(this.state.categoriesList);
    return (
      <div className="App">
        <div className = "App-body">
          <Navbar categoriesList = {this.state.categoriesList}/>
          <PageBody />
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
