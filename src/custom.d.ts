import 'styled-components'
import theme from './assets/them'

type ThemeType = typeof theme

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
