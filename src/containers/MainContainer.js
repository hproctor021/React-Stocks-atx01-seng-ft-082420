import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    stocks: [],  //list of our initial stocks
    portfolioStocks: [],  //list of stocks we want to add to our portfolio
    searchTerm: "",
    checked: "",
    filter: ""
  }

  componentDidMount(){
    fetch("http://localhost:3000/stocks")
    .then(res =>res.json())
    .then(stocks => {
      this.setState({
        stocks: stocks,
      })
    })
  }  


  buyStock =(stock) => {
    // console.log("this stock was bought", stock)
    this.setState({
      portfolioStocks: [...this.state.portfolioStocks, stock]
    })
  }

  sellStock = (soldStock) => {
    // console.log("this stock was sold", soldStock)
    this.setState({
      portfolioStocks: this.state.portfolioStocks.filter(stock => stock.id != soldStock.id)
    })
  }

  handleSearch = (e) => {
    // console.log(e.target.value)
    let {value} = e.target
    this.setState({
      searchTerm: value,
      filteredStocks: this.state.stocks.filter((stock => stock.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())))
    })
  }

  handleCheck = (e) => {
    let category = e.target.value
    switch (category){
      case('Alphabetically'):
        return this.setState({checked: 'Alphabetically'})
      case('Price'):
        return this.setState({checked: 'Price'})

    }
  }


  sortStocks = () => {
    if(this.state.checked === 'Alphabetically'){
      return this.state.stocks.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
    } else if(this.state.checked === 'Price'){
      return this.state.stocks.sort((a, b) => {
        return b.price - a.price //sorts from highest to lowest
      })
    } else {
      return this.state.stocks
    }
  }

  handleFilter = filter => {
    this.setState({ filter })
  }


  render() {

    return (
      <div>
        <SearchBar 
          handleSearch={this.handleSearch} 
          checked={this.state.checked}
          handleCheck={this.handleCheck}
          handleFilter={this.handleFilter}
        />

          <div className="row">
            <div className="col-8">
              <StockContainer 
                stocks={this.state.searchTerm.length > 0
                  ? this.state.filteredStocks
                  : this.state.stocks
                } 
                buyStock={this.buyStock} 
                sortStocks={this.sortStocks()}
                handleCheck={this.handleCheck}
              />
            </div>

            <div className="col-4">
              <PortfolioContainer 
                portfolioStocks={this.state.portfolioStocks} 
                sellStock={this.sellStock}
              />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
