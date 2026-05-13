import styled from 'styled-components'
//设置内部属性类型

export const PlayerBarWrapper = styled.div`
  position: fixed;
  z-index: 99;
  /* left,right,bottom相当于定位的偏移量 */
  left: 0;
  right: 0;
  bottom: 0;
  height: 52px;
  background-position: 0 0;
  background-repeat: repeat;

  .playlist-panel {
    position: absolute;
    left: 50%;
    bottom: 47px;
    transform: translateX(-50%);
    width: 980px;
    height: 300px;
    color: #ccc;
    background: linear-gradient(
      180deg,
      rgba(33, 33, 33, 0.98),
      rgba(17, 17, 17, 0.98)
    );
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-bottom: none;
    border-radius: 8px 8px 0 0;
    box-shadow: 0 -10px 28px rgba(0, 0, 0, 0.35);
    overflow: hidden;
  }

  .panel-header {
    height: 40px;
    display: flex;
    align-items: center;
    padding: 0 18px;
    color: #e2e2e2;
    background: rgba(0, 0, 0, 0.22);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .left-title {
    flex: 1;
    font-size: 20px;
    font-weight: 700;
  }

  .right-title {
    flex: 1;
    font-size: 18px;
    text-align: center;
    color: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: 230px;
  }

  .close-btn {
    width: 26px;
    height: 26px;
    margin-left: 16px;
    color: #8d8d8d;
    font-size: 22px;
    line-height: 26px;
    text-align: center;
    cursor: pointer;
    background: transparent;
    border: none;

    &:hover {
      color: #fff;
    }
  }

  .panel-body {
    display: flex;
    height: 260px;
  }

  .song-list {
    width: 55%;
    overflow-y: auto;
    background: rgba(0, 0, 0, 0.18);
    border-right: 1px solid rgba(255, 255, 255, 0.08);
  }

  .lyric-list {
    flex: 1;
    overflow-y: auto;
    padding: 18px 28px;
    text-align: center;
    background: rgba(0, 0, 0, 0.28);
  }

  .play-item {
    display: flex;
    align-items: center;
    height: 32px;
    padding: 0 14px;
    cursor: pointer;
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);

    &:hover {
      background: rgba(255, 255, 255, 0.05);
    }
  }

  .play-item .name {
    flex: 1;
    min-width: 0;
    color: #d7d7d7;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .play-item .artist {
    width: 120px;
    margin: 0 16px;
    color: #8f8f8f;
    text-align: right;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .play-item .time {
    width: 48px;
    color: #9b9b9b;
    text-align: right;
    font-variant-numeric: tabular-nums;
  }

  .play-item.active {
    background: rgba(255, 255, 255, 0.08);
  }

  .play-item.active .name,
  .play-item.active .artist,
  .play-item.active .time {
    color: #fff;
  }

  .lyric-item {
    line-height: 30px;
    color: #999;
    transition: color 0.2s ease;
  }

  .lyric-item.active {
    color: #fff;
  }

  .song-list::-webkit-scrollbar,
  .lyric-list::-webkit-scrollbar {
    width: 8px;
  }

  .song-list::-webkit-scrollbar-thumb,
  .lyric-list::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.12);
    border-radius: 4px;
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    height: 47px;
  }
`
interface IBarControlProps {
  $isPlaying: boolean
}
export const BarControl = styled.div<IBarControlProps>`
  display: flex;
  align-items: center;
  .prev,
  .next {
    width: 28px;
    height: 28px;
    cursor: pointer;
  }

  .prev {
    background-position: 0 -130px;
  }

  .play {
    width: 36px;
    height: 36px;
    margin: 0 8px;
    background-position: 0
      ${(props) => (props.$isPlaying ? '-165px' : '-204px')};
    cursor: pointer;
  }

  .next {
    background-position: -80px -130px;
  }
`
export const BarPlayinfo = styled.div`
  display: flex;
  width: 642px;
  align-items: center;

  .image {
    width: 34px;
    height: 34px;
    border-radius: 5px;
  }

  .info {
    flex: 1;
    color: #a1a1a1;
    margin-left: 10px;

    .song {
      color: #e1e1e1;
      position: relative;
      top: 8px;
      left: 8px;

      .singer-name {
        color: #a1a1a1;
        margin-left: 10px;
      }
    }

    .progress {
      display: flex;
      align-items: center;

      .ant-slider {
        position: relative;
        top: -3px;
        width: 493px;
        margin-right: 10px;
        /* 下面为全部轨迹 */
        .ant-slider-rail {
          height: 9px;
          background: url(${require('@/assets/img/progress_bar.png')}) right 0;
        }
        /* 下面为已播放轨迹 */
        .ant-slider-track {
          height: 9px;
          background: url(${require('@/assets/img/progress_bar.png')})
            left -66px;
        }
        /* 设置自定义slider小圆点 */
        .ant-slider-handle {
          width: 22px;
          height: 24px;
          border: none;
          margin-top: -7px;
          background: url(${require('@/assets/img/sprite_icon.png')}) 0 -250px;
          /* 将slider自带的默认小圆点删除掉 */
          &::after {
            display: none;
          }
        }
      }

      .time {
        .current {
          color: #e1e1e1;
        }
        .divider {
          margin: 0 3px;
        }
      }
    }
  }
`
interface IBarOperatorProps {
  $playmode: number
}
export const BarOperator = styled.div<IBarOperatorProps>`
  display: flex;
  align-items: center;
  position: relative;
  top: 3px;

  .btn {
    width: 25px;
    height: 25px;
  }

  .left {
    display: flex;
    align-items: center;
  }

  .pip {
    background: url(${require('@/assets/img/pip_icon.png')});
  }

  .favor {
    background-position: -88px -163px;
  }

  .share {
    background-position: -114px -163px;
  }

  .right {
    display: flex;
    align-items: center;
    width: 126px;
    padding-left: 13px;
    background-position: -147px -248px;

    .volume {
      background-position: -2px -248px;
    }
    //根据0，1，2进行图标的切换,1是随机播放，0是顺序播放，2是循环播放
    .loop {
      background-position: ${(props) => {
        switch (props.$playmode) {
          case 1:
            return '-66px -248px'
          case 2:
            return '-66px -344px'
          default:
            return '-3px -344px'
        }
      }};
      cursor: pointer;
    }
  }

  .playlist {
    padding-left: 18px;
    text-align: center;
    color: #ccc;
    width: 59px;
    background-position: -42px -68px;
  }
`
