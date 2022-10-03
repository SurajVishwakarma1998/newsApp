import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,discription, imgUrl,newsUrl,author,date,source} = this.props;
    return (
      <div className='my-3'>
        <div className="card" >
        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left: '90%', zIndex: '1'}}> {source} </span>
          <img src={!imgUrl?"https://images.livemint.com/img/2022/09/12/600x338/meta_1647871950170_1662984961578_1662984961578.JPG":imgUrl} className="card-img-top" alt="images" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{discription}</p>
            <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date (date).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" rel='noreferrer' className="btn btn-primary">Read More..</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem