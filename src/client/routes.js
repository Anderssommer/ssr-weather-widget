import React from 'react'
import { WeatherPage } from './pages'

export default [
    {
        ...WeatherPage,
        path: '/',
        exact: true
    },
    // ... other routes
]
