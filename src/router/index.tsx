import { RouteObject } from 'react-router-dom'
import React, { lazy } from 'react'
import { Navigate } from 'react-router-dom'
const Discover = lazy(() => import('@/views/discover'))
const Mine = lazy(() => import('@/views/mine'))
const Focus = lazy(() => import('@/views/focus'))
const Download = lazy(() => import('@/views/download'))
const Songs = lazy(() => import('@/views/discover/c-views/songs'))
const Recommend = lazy(() => import('@/views/discover/c-views/recommend'))
const Ranking = lazy(() => import('@/views/discover/c-views/ranking'))
const Djradio = lazy(() => import('@/views/discover/c-views/djradio'))
const Artist = lazy(() => import('@/views/discover/c-views/artist'))
const Album = lazy(() => import('@/views/discover/c-views/album'))
const router: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/discorver" />
  },
  {
    path: '/discorver',
    element: <Discover />,
    children: [
      {
        path: '/discorver',
        element: <Navigate to="/discorver/recommend" />
      },
      {
        path: '/discorver/songs',
        element: <Songs />
      },
      {
        path: '/discorver/recommend',
        element: <Recommend />
      },
      {
        path: '/discorver/ranking',
        element: <Ranking />
      },
      {
        path: '/discorver/djradio',
        element: <Djradio />
      },
      {
        path: '/discorver/artist',
        element: <Artist />
      },
      {
        path: '/discorver/album',
        element: <Album />
      }
    ]
  },
  {
    path: '/mine',
    element: <Mine />
  },
  {
    path: '/focus',
    element: <Focus />
  },
  {
    path: '/download',
    element: <Download />
  }
]
export default router
