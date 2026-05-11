import { createSlice, Slice } from '@reduxjs/toolkit'
import { Interface } from 'readline'
import { getSongDetail } from '../service/player'
import { createAsyncThunk } from '@reduxjs/toolkit'
//建立一个数据中转的store，每次播放从当中提取数据
interface currentsongtype {
  currentSong: any
}
export const fetchCurrentSongDataAction = createAsyncThunk(
  'player/fetchCurrentSong',
  async (id: number, { dispatch }) => {
    const res = await getSongDetail(id)
    const song = res.songs[0]
    if (!song) return

    dispatch(changeCurrentSongAction(song))
  }
)
//必须设置initialState
const initialState: currentsongtype = {
  currentSong: {
    name: '温柔',
    mainTitle: null,
    additionalTitle: null,
    id: 386538,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 13193,
        name: '五月天',
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 100,
    st: 0,
    rt: '600902000000534560',
    fee: 1,
    v: 115,
    crbt: null,
    cf: '',
    al: {
      id: 38285,
      name: '我们是五月天',
      picUrl:
        'https://p1.music.126.net/-Md-YgTBiVsbpmVXIZz00w==/109951170702056876.jpg',
      tns: [],
      pic_str: '109951170702056876',
      pic: 109951170702056880
    },
    dt: 269800,
    h: {},
    m: {},
    l: {},
    sq: {},
    hr: null,
    a: null,
    cd: '1',
    no: 2,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 0,
    s_id: 0,
    mark: 17179877888,
    originCoverType: 1,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 81,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    displayTags: null,
    artistClassics: false,
    markTags: [],
    songFeature: null,
    single: 0,
    noCopyrightRcmd: null,
    mv: 10929721,
    rtype: 0,
    rurl: null,
    mst: 9,
    cp: 684010,
    publishTime: 1049126400000
  }
}

const player_slice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeCurrentSongAction(state, { payload }) {
      state.currentSong = payload
    }
  }
})
export const { changeCurrentSongAction } = player_slice.actions
export default player_slice.reducer
