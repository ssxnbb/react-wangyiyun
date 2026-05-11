import React, { memo } from 'react'
import type { ReactNode, FC } from 'react'
import { BarControl, BarOperator, BarPlayinfo, PlayerBarWrapper } from './style'
import { Slider } from 'antd'
import { NavLink } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@/store'
import { shallowEqual } from 'react-redux'
import { getImage } from '@/utils/format'
import { useRef, useState, useEffect } from 'react'
import { getPlayerUrl } from '@/utils/handle-player'
import { formatPlayerTime } from '@/utils/handle-player'
interface IProps {
  children?: ReactNode
}
//<IProps>默认将函数参数props设置为Iprops
const Playerbar: FC<IProps> = () => {
  //设置组件的局部变量
  const [isPlaying, setIsPlaying] = useState(false)
  //控制进度条的进度的局部变量
  const [progress, setProgress] = useState(0)
  //每首歌的总时常
  const [duration, setDuration] = useState(0)
  //控制组件
  const audioRef = useRef<HTMLAudioElement>(null)
  //state函数返回一个对象，最终去解构这个对象
  const { currentsong } = useAppSelector(
    (state) => ({
      currentsong: state.player.currentSong
    }),
    shallowEqual
  )
  //每次切换歌曲就自动播放歌曲,useRef保存DoM元素,current获取这个真实的DOM元素
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
    //设置歌的总时常，为了算出百分比显示进度
    setDuration(currentsong.dt)
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
    if (audioRef.current) {
      setProgress(((audioRef.current.currentTime * 1000) / duration) * 100)
    }
  }
  return (
    <PlayerBarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <BarControl $isPlaying={isPlaying}>
          <button className="btn sprite_playbar prev"></button>
          <button
            className="btn sprite_playbar play"
            onClick={handlePlayBtnClick}
          ></button>
          <button className="btn sprite_playbar next"></button>
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
              />
              <div className="time">
                <span className="current">
                  {formatPlayerTime(
                    // ?? 0：如果是 undefined，就用 0
                    (audioRef.current?.currentTime ?? 0) * 1000
                  )}
                </span>
                <span className="divider">/</span>
                <span className="duration">{formatPlayerTime(duration)}</span>
              </div>
            </div>
          </div>
        </BarPlayinfo>
        <BarOperator>
          <div className="left">
            <button className="btn pip"></button>
            <button className="btn sprite_playbar favor"></button>
            <button className="btn sprite_playbar share"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="btn sprite_playbar volume"></button>
            <button className="btn sprite_playbar loop"></button>
            <button className="btn sprite_playbar playlist"></button>
          </div>
        </BarOperator>
        {/* 这个标签的作用就是在html当中设置音频 */}
        {/* 没有参数函数就这样写，有参数函数就要写为匿名函数 */}
        <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} />
      </div>
    </PlayerBarWrapper>
  )
}
export default memo(Playerbar)
