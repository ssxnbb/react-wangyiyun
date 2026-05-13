import React, { memo } from 'react'
import type { ReactNode, FC } from 'react'
import { BarControl, BarOperator, BarPlayinfo, PlayerBarWrapper } from './style'
import { Slider, message } from 'antd'
import { NavLink } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@/store'
import { shallowEqual } from 'react-redux'
import { getImage } from '@/utils/format'
import { useRef, useState, useEffect } from 'react'
import { getPlayerUrl } from '@/utils/handle-player'
import { formatPlayerTime } from '@/utils/handle-player'
import {
  changeCurrentPlayMode,
  fetchCurrentLyric,
  fetchCurrentSongDataAction
} from '../store/player'
interface IProps {
  children?: ReactNode
}
//<IProps>默认将函数参数props设置为Iprops
const Playerbar: FC<IProps> = () => {
  //设置组件的局部变量
  const [isPlaying, setIsPlaying] = useState(false)
  //控制进度条的进度的局部变量
  const [progress, setProgress] = useState(0)
  //每首歌的总时长
  const [duration, setDuration] = useState(0)
  //拖拽进度条的时候禁止播放器实时检测时间
  const [ifsliding, setsliding] = useState(false)
  //避免重复渲染歌词
  const [lyindex, setlyindex] = useState(-1)
  //控制组件
  const audioRef = useRef<HTMLAudioElement>(null)
  const dispatch = useAppDispatch()
  //state函数返回一个对象，最终去解构这个对象,获取对应的歌声，歌词和播放模式
  const { currentSonglist, currentsong, currentlric, playmode, currentindex } =
    useAppSelector(
      (state) => ({
        currentsong: state.player.currentSong,
        playmode: state.player.playmode,
        currentlric: state.player.currentlyric,
        currentindex: state.player.currentSongindex,
        currentSonglist: state.player.currentSonglist
      }),
      shallowEqual
    )
  //每次切换歌曲就自动播放歌曲，useRef保存DOM元素，current获取这个真实的DOM元素
  useEffect(() => {
    if (!audioRef.current) return
    if (!currentsong?.id) return
    //设置音频播放地址
    audioRef.current.src = getPlayerUrl(currentsong.id)
    //进行自动播放
    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true)
      })
      .catch(() => {
        setIsPlaying(false)
      })
    //设置歌的总时长，为了算出百分比显示进度
    setDuration(currentsong.dt)
    //获取当前歌曲对应的歌词
    dispatch(fetchCurrentLyric(currentsong.id))
  }, [currentsong])
  //这个函数用于手动操纵播放与暂停
  //设置isPlaying的目的就是控制图标的变化
  //将参数传递给组件控制css变化
  function handlePlayBtnClick() {
    if (!audioRef.current) return

    if (audioRef.current.paused) {
      audioRef.current.play()
      setIsPlaying(true)
    } else {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }
  function handleTimeUpdate() {
    if (!ifsliding && audioRef.current) {
      setProgress(((audioRef.current.currentTime * 1000) / duration) * 100)
      //转化为毫秒
      const curTime = audioRef.current.currentTime * 1000
      if (currentlric.length === 0) return
      //利用二分法查找当前时间对应的歌词
      let left = 0
      let right = currentlric.length - 1
      let index = -1
      let mid = -1
      while (left <= right) {
        mid = left + Math.floor((right - left) / 2)
        if (curTime >= currentlric[mid].time) {
          left = mid + 1
        } else {
          right = mid - 1
        }
      }
      index = right
      if (index < 0 || index === lyindex) return
      setlyindex(index)
    }
  }
  function handlechanging(value: number) {
    setsliding(true)
    setProgress(value)
    const current = ((value / 100) * duration) / 1000
    if (audioRef.current) {
      audioRef.current.currentTime = current
    }
  }
  function handlechanged(value: number) {
    const current = ((value / 100) * duration) / 1000
    if (audioRef.current) {
      audioRef.current.currentTime = current
    }
    setsliding(false)
  }
  function handleLoopChange() {
    let mode = playmode
    mode = (mode + 1) % 3
    dispatch(changeCurrentPlayMode(mode))
  }
  function handleSongtoggle(Nextflag = true) {
    const n = currentSonglist.length
    if (n === 0) {
      return
    }
    if (playmode === 1) {
      let r = Math.floor(Math.random() * n)
      while (r === currentindex) {
        r = Math.floor(Math.random() * n)
      }
      const s = currentSonglist[r]
      dispatch(fetchCurrentSongDataAction(s.id))
    } else {
      const nowindex = currentindex
      const newindex = Nextflag ? (nowindex + 1) % n : (nowindex - 1 + n) % n
      const s = currentSonglist[newindex]
      dispatch(fetchCurrentSongDataAction(s.id))
    }
  }
  function IFloop() {
    if (playmode === 2) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play()
      }
    } else {
      handleSongtoggle(true)
    }
  }
  //下面实现展示歌曲列表功能
  const [showPanel, setShowPanel] = useState(false)

  function handlePlaylistToggle() {
    //这个函数是点击最右侧按钮会导致面板的显示与隐藏
    setShowPanel((prev) => !prev)
  }
  return (
    <PlayerBarWrapper className="sprite_playbar">
      {showPanel && (
        <div className="playlist-panel">
          <div className="panel-header">
            <div className="left-title">播放列表</div>
            <div className="right-title">{currentsong.name}</div>
            <button className="close-btn" onClick={handlePlaylistToggle}>
              ×
            </button>
          </div>

          <div className="panel-body">
            <div className="song-list">
              {currentSonglist.map((item, index) => (
                <div
                  key={item.id}
                  className={`play-item ${index === currentindex ? 'active' : ''}`}
                  onClick={() => dispatch(fetchCurrentSongDataAction(item.id))}
                >
                  <span className="name">{item.name}</span>
                  <span className="artist">{item.ar?.[0]?.name}</span>
                  <span className="time">{formatPlayerTime(item.dt)}</span>
                </div>
              ))}
            </div>

            <div className="lyric-list">
              {currentlric.map((item: any, index: number) => (
                <div
                  key={index}
                  className={`lyric-item ${index === lyindex ? 'active' : ''}`}
                >
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="content wrap-v2">
        <BarControl $isPlaying={isPlaying}>
          <button
            className="btn sprite_playbar prev"
            onClick={() => handleSongtoggle(false)}
          ></button>
          <button
            className="btn sprite_playbar play"
            onClick={handlePlayBtnClick}
          ></button>
          <button
            className="btn sprite_playbar next"
            onClick={() => handleSongtoggle(true)}
          ></button>
        </BarControl>
        <BarPlayinfo>
          <NavLink to="/discorver/player">
            <img
              className="image"
              src={getImage(currentsong.al.picUrl, 50)}
              alt=""
            />
          </NavLink>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentsong.name}</span>
              <span className="singer-name">{currentsong.ar?.[0].name}</span>
            </div>
            <div className="progress">
              <Slider
                step={0.5}
                tooltip={{ formatter: null }}
                value={progress}
                onChange={handlechanging}
                onChangeComplete={handlechanged}
              />
              <div className="time">
                <span className="current">
                  {formatPlayerTime(
                    (audioRef.current?.currentTime ?? 0) * 1000
                  )}
                </span>
                <span className="divider">/</span>
                <span className="duration">{formatPlayerTime(duration)}</span>
              </div>
            </div>
          </div>
        </BarPlayinfo>
        <BarOperator $playmode={playmode}>
          <div className="left">
            <button className="btn pip"></button>
            <button className="btn sprite_playbar favor"></button>
            <button className="btn sprite_playbar share"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="btn sprite_playbar volume"></button>
            <button
              className="btn sprite_playbar loop"
              onClick={handleLoopChange}
            ></button>
            <button
              className="btn sprite_playbar playlist"
              onClick={handlePlaylistToggle}
            ></button>
          </div>
        </BarOperator>
        {/* 这个标签的作用就是在html当中设置音频 */}
        {/* 没有参数函数就这样写，有参数函数就要写为匿名函数 */}
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onEnded={IFloop}
        />
      </div>
    </PlayerBarWrapper>
  )
}
export default memo(Playerbar)
