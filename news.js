import React, { Component } from 'react';
import NewsItem from './newsItem';
import Spin from './spin';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
 static defaultProps={
     country:"in",
     pageSize:8,
     category:"general" 
 }

 static propTypes={
     country:PropTypes.string,
     pageSize:PropTypes.number,
     category:PropTypes.string
 }
 
 capitalFirstLet = (string)=>{
  return string.charAt(0).toUpperCase()+ string.slice(1);
 }

  constructor(props){
    super(props);
    this.state={
      articles:[],
      loading:false,
      page:1
    }
    document.title=`${this.capitalFirstLet(this.props.category)}-NewsMonkey`;
  }

  async updateNews(){
    let URL=` https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7b5ffd90d12745b58f54c36feeaede57&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(URL);
    let parseData = await data.json();
    this.setState({ 
      articles: parseData.articles,
      totalResults:parseData.totalResults,
      loading:false
    })
  }
  
 async componentDidMount(){
   this.updateNews();
  }

  handlePrevClick =async()=>{
    this.setState({page:this.state.page -1});
    this.updateNews();
  }

  handleNextClick =async()=>{
    this.setState({page:this.state.page +1});
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=dbe57b028aeb41e285a226a94865f7a7&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
        loading: false,
    })
};
  render() {
    return (
      <>
    
        <h1 className='text-center'>🐒NewsMonkey - Today Top {this.capitalFirstLet(this.props.category)} News </h1>
        {this.state.loading && <Spin />}
      <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spin />}
        >
      <div className='container my-3'></div>
        <div className='row'>
        {!this.state.loading && this.state.articles.map((element)=>{
          return <div className='col-md-4' key={element.url}>
          <NewsItem title={element.title}  discription={element.description} imgUrl={element.urlToImage} newsUrl={element.url}
           author={element.author} date={element.publishedAt} source={element.source.name}
          />
          </div>
        })}
        </div>
        {/* <div className='container d-flex justify-content-between'>
           <button disabled={this.state.page <=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
          <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
        */}
      </InfiniteScroll>
      
    </>  
    )
  }
}

export default News