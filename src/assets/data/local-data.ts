export interface IDiscoverMenuItem {
  title: string
  link: string
}

export const discoverMenu = [
  {
    title: '推荐',
    link: '/discorver/recommend'
  },
  {
    title: '排行榜',
    link: '/discorver/ranking'
  },
  {
    title: '歌单',
    link: '/discorver/songs'
  },
  {
    title: '主播电台',
    link: '/discorver/djradio'
  },
  {
    title: '歌手',
    link: '/discorver/artist'
  },
  {
    title: '新碟上架',
    link: '/discorver/album'
  }
] satisfies IDiscoverMenuItem[]
