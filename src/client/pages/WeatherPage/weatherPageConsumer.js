import axios from 'axios';
import { appid } from '../../config'

// const appid = '166d00e26d3ff2c6149e89feccc5c59a';
export const openWeatherApiUrl = ({ cityQuery }) => `https://api.openweathermap.org/data/2.5/weather?q=${cityQuery},dk&appid=${appid}&units=metric`;

export const requestWeatherDataConsumer = ({ cityQuery }) => axios.get(openWeatherApiUrl({ cityQuery }))
