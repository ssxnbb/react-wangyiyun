import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import './assets/css/index.less'
import App from '@/App'
import 'normalize.css'
import store from './store'
import { Provider } from 'react-redux'
//使用ThemeProvider提供通用的主题
import { ThemeProvider } from 'styled-components'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
import theme from './assets/them'
root.render(
  <Provider store={store}>
    {/* theme主题当中存在这通用变量的存储 */}
    <ThemeProvider theme={theme}>
      <HashRouter>
        <App />
      </HashRouter>
    </ThemeProvider>
  </Provider>
)
