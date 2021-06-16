import React from 'react';
import '../style/Navbar.css'
import Logo from "../image/news-logo.png"

class Navbar extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            categories : [],
            selectedCategory : "TOP",
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

        if(this.state.selectedCategory !== this.props.selectedCategory) {
            this.setState({selectedCategory: this.props.selectedCategory});
        }
    }

    changeCat(category){
        this.props.changeCategory(category);
    }

    renderListOfCategory = () => {
        return(
            this.props.categoryList.map((category, index) => {
                return(
                    <div 
                        key = {index} 
                        onClick = { () => this.changeCat(category.name)} 
                        className = {this.state.selectedCategory === category.name ? "category-element active" : "category-element"}>
                            {category.name}
                        
                    </div>
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
        return(
            <div className = "navbar">
                <div className = "navbar-top">
                    <a href = "/" className = "logo"><img src = {Logo} alt = "Logo" style = {{width : "50px"}}/></a>
                    
                    <div className = "bookmark-category-container">

                        <a href = "/bookmark" className = "bookmark-button" style = {{display : window.location.pathname !== "/bookmark" ? "inline-block" : "none"}}>My Bookmark</a>
                        <a href = "/" className = "bookmark-button" style = {{display : window.location.pathname === "/bookmark" ? "inline-block" : "none"}}>Back To Home</a>

                        <div 
                            style = {{display : window.location.pathname !== "/bookmark" ? "inline-block" : "none"}}
                            className = "category-button" 
                            onClick = {this.showCategory.bind(this)}>
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