import React from 'react';
import '../style/Navbar.css'
import Logo from "../image/news-logo.png"

class Navbar extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            categories : [],
            isShowCategory : false
        }
    }

    /*componentDidMount(){
        this.setState({
            categories : this.props.categoryList
        })
    }
    
    <div className = "category-container">{this.renderListOfCategory()}</div>

    <div className = "category-list-container" style = {{display : this.state.isShowCategory ? "flex" : "none"}}>{this.renderListOfCategory()}</div>
    */

    componentDidUpdate() {
        if(this.state.categories !== this.props.categoryList) {
          this.setState({categories: this.props.categoryList});
        }
      }

    renderListOfCategory = () => {
        return(
            this.props.categoryList.map((category, index) => {
                return(
                    <div key = {index} className = "category-element">{category.name}</div>
                )
            })
        )
    }

    showCategory = () => {
        if(!this.state.isShowCategory){
            this.setState({isShowCategory : true});
        } else {
            this.setState({isShowCategory : false});
        }
    }

    render(){
        /*console.log("from navbar props")
        console.log(this.props.categoryList)
        
        console.log("from navbar state")
        console.log(this.state.categories)

        console.log("isShowCategory : " + this.state.isShowCategory);*/
        return(
            <div className = "navbar">
                <div className = "navbar-top">
                    <div className = "logo"><img src = {Logo} alt = "Logo" style = {{width : "50px"}}/></div>
                    
                    <div className = "bookmark-category-container">
                        <div className = "bookmark-button">My Bookmark</div>
                        <div className = "category-button" onClick = {this.showCategory.bind(this)}>
                            Kategory
                            <i className= {this.state.isShowCategory ? "arrow down" : "arrow up"}></i>
                        </div>                   
                    </div>
                </div>
                <div className = "navbar-bottom">
                    <div className = {this.state.isShowCategory ? "category-list-container appear" : "category-list-container hidden"}>{this.renderListOfCategory()}</div>
                </div>
            </div>
        )
    }
}

export default Navbar;