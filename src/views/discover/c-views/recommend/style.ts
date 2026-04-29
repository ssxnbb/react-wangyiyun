import styled from "styled-components";
//>这个选择器代表子类选择器，准确来说是直接子类选择器。
//设置背景图片的时候需要require因为引入图片时候需要webpac一起打包
//与轮播图片通过http获取图片不同，这里的图片打包必须通过require操作
export const RecommendWrap = styled.div`
  > .content {
    border: 1px solid #d3d3d3;
    background-image: url(${require('@/assets/img/wrap-bg.png')});
    display: flex;

    > .left {
      padding: 20px;
      width: 729px;
    }

    > .right {
      margin-left: 1px;
      width: 250px;
    }
  }
`
