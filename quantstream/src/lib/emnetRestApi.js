import Cookies from 'js-cookie';
import config from './config';

const BASE_URL = 'https://pentestrestapi.emnet.net/'

const PROXY_URL = 'http://localhost:8444/';

// Function to handle local development proxy
const getFullUrl = (url) => {
  console.log(BASE_URL);
  if (BASE_URL === 'https://pentestrestapi.emnet.net/') {
    console.log('Using proxy');
    return `${PROXY_URL}${url}`;
  }
  console.log('Not using proxy');
  return `${url}`;
}
// Function to obtain JWT tokens
export const obtainTokens = async (username, password) => {
  const url = getFullUrl(`${BASE_URL}/api/services/obtain-tokens/`);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data;
};

// Function to make authenticated API calls
export const apiCall = async (url, options = {}) => {
  console.log('apiCall url:', url);
  const accessToken = Cookies.get('accessToken');
  const refreshToken = Cookies.get('refreshToken');
  console.log('accessToken:', accessToken);
  console.log('refreshToken:', refreshToken);
  const fullUrl = process.env.NODE_ENV === 'development' ? getFullUrl(url) : url;

  const response = await fetch(fullUrl, {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) { // Unauthorized
      // Attempt to refresh the access token
      const refreshResult = await RefreshAccessTokenService(refreshToken);
      if (refreshResult.access) {
        // Access token refreshed successfully
        const newAccessToken = refreshResult.access;
        Cookies.set('access_token', newAccessToken);

        // Retry the API request with the new access token
        return apiCall(url, options);
      } else {
        // Handle unauthorized state
        throw new Error('Unable to refresh access token');
      }
    } else {
      throw new Error('Network response was not ok');
    }
  }

  return response.json();
};

const RefreshAccessTokenService = async (refreshToken) => {
  const refreshTokenEndpoint = getFullUrl(`${BASE_URL}/api/services/refresh-access-token/`)

  try {
    const response = await fetch(refreshTokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to refresh access token');
    }
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
};

// Function to fetch cities
export const fetchCities = () => apiCall(`${BASE_URL}/api/tables/cities/`);

// Function to fetch inodes for a given city
export const fetchInodes = (cityId) => apiCall(`${BASE_URL}/api/tables/inodes/${cityId}`);

// Function to fetch timeseries data
export const fetchTimeseriesData = (selectedCity, startTimeISO, endTimeISO, selectedSensors) => {
  const sensorIds = selectedSensors.map(sensorId => `${sensorId}`).join('&');
  const apiUrl = `${BASE_URL}/api/services/timeseries/retrieve/v3/${selectedCity}/?end-time=${encodeURIComponent(endTimeISO)}&${sensorIds}&start-time=${encodeURIComponent(startTimeISO)}&with-count=1`;
  console.log('fetchTimeseriesData apiUrl:', apiUrl);
  return apiCall(apiUrl);
};

export const fetchTimeseriesDataChunked = async (selectedCity, startTimeISO, endTimeISO, selectedSensors) => {
    try {
      const promises = [];
      const chunkSize = 20;
      const sensorIds = selectedSensors.map(sensor => `sensor-ids=${sensor}`);
  
      for (let i = 0; i < sensorIds.length; i += chunkSize) {
        const chunk = sensorIds.slice(i, i + chunkSize);
        promises.push(fetchTimeseriesData(selectedCity, startTimeISO, endTimeISO, chunk));
      }
  
      const results = await Promise.all(promises.map(async (promise) => {
        try {
          return await promise;
        } catch (error) {
          console.error(`Error fetching data for chunk: ${error}`);
          return { results: [] }; // Return an empty array for failed chunks
        }
      }));
  
      const data = { results: results.flatMap(result => result.results) };
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };