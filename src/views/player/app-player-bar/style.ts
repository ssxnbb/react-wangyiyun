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
