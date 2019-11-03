import React, { Component } from 'react'
import style from './movie.module.scss'
import MovieItem from '../Components/MovieItem/MovieItem'
import MovieItemBtn from '../Components/MovieItemBtn/MovieItemBtn'
import { getHitFilms } from '../api/index'
class Movie extends Component {
  constructor (props) {
    super(props)
    
    this.state = {
      // 热映电影列表数组
      hotList: [],
      // 即将上映列表
      futureList: [],
      // 当前电影
      active: 'hotFilm'
    }
  }
  componentDidMount () {
    // FIXME:暂时写死 cinemaCode,按理说，是要在路由或者redux中获取的
    getHitFilms({
      cinemaCode: '11070811'
    }).then(res => {
      console.log(res)
      if (res.status === 'success' && res.code === 200) {
        const hotList = res.data
        this.setState({
          hotList
        })
        // this.setState((state, props) => ({
        //   hotList
        // }))
      }
    })
  }
  render () {
    const { active, hotList, futureList } = this.state
    return (
      <div className={style.container}>
        {/* 影城信息 */}
        <div className={style.location}>
          <div className={style.detail}>
            <div className={style.cinemaName}>旧宫世界之花自由人影城</div>
            <div className={style.locationName}>大兴区旧宫镇久敬庄路世界之花</div>
          </div>
          <div className={style.icon}>
            <i className={`iconfont icondituweizhi ${style.icondituweizhi}`}></i>
          </div>
        </div>
        {/* banner区域 */}
        <div className={style.banner}>
        </div>
        <div className={style.header}>
          <div className={ active === 'hotFilm' ? `${style.film} ${style.active}` : `${style.film}` } onClick={this.toggleToHotFilm}>正在热映</div>
          <div className={ active === 'futureFilm' ? `${style.film} ${style.active}` : `${style.film}`} onClick={this.toggleToFutureFilm}>即将上映</div>
        </div>
        <div className={style.currentTime}>2019年06月28日(周五)</div>
        <div className={style.movieArea}>
          <div className={active === 'hotFilm' ? `${style.movieList}` : `${style.movieList} ${style.hidden}`}>
            {
              hotList.map((item) => {
                return (
                  item && (
                  <MovieItem key={item.id} list={item} handleMovieItemClick={this.handleMovieItemClick}>
                    {/* style text */}
                    <MovieItemBtn className={item.hitOrPresell === '1' ? `${style.buyBg}` : `${style.presellBg}`} text={item.hitOrPresell === '1' ? '购买' : '预售'}></MovieItemBtn>
                  </MovieItem>
                  )
                )
              })
            }
          </div>
          <div className={active === 'futureFilm' ? `${style.movieList}` : `${style.movieList} ${style.hidden}`}>
            {
              futureList.map((item) => {
                return (
                  <MovieItem key={item} list={item} handleMovieItemClick={this.handleMovieItemClick}>
                    {/* style text */}
                    <MovieItemBtn style={{backgroundColor: '#1AA5FF', color: '#fff'}} text={'预售'}></MovieItemBtn>
                  </MovieItem>
                )
              })
            }
          </div>
          </div>
      </div>
    )
  }
  toggleToHotFilm = () => {
    console.log(this.props)
    this.setState({
      active: 'hotFilm'
    })
  }
  toggleToFutureFilm = () => {
    this.setState({
      active: 'futureFilm'
    })
  }
  handleMovieItemClick = () => {
    this.props.history.push({
      pathname: '/movie/detail'
    })
  }
}

export default Movie
