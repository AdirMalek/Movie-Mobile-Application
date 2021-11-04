import axios from 'axios';

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = 'api_key=619183ebc6ad0e26fcb83db1fc06b7c5';

export const getUpcomingMovies = async () => {
  const response = await axios.get(`${apiUrl}/movie/upcoming?${apiKey}`);
  return response.data.results;
};

export const getPopularMovies = async () => {
  const response = await axios.get(`${apiUrl}/movie/popular?${apiKey}`);
  return response.data.results;
};

export const getTopRatedMovies = async () => {
  const response = await axios.get(`${apiUrl}/movie/top_rated?${apiKey}`);
  return response.data.results;
};

export const getFamilyMovies = async () => {
  const response = await axios.get(
    `${apiUrl}/discover/movie?${apiKey}&with_genres=10751`,
  );
  return response.data.results;
};

export const getDocumentaryMovies = async () => {
  const response = await axios.get(
    `${apiUrl}/discover/movie?${apiKey}&with_genres=99`,
  );
  return response.data.results;
};

export const getPopularTV = async () => {
  const response = await axios.get(`${apiUrl}/tv/popular?${apiKey}`);
  return response.data.results;
};

export const getTopRatedTV = async () => {
  const response = await axios.get(`${apiUrl}/tv/top_rated?${apiKey}`);
  return response.data.results;
};

export const getFamilyTv = async () => {
  const response = await axios.get(
    `${apiUrl}/discover/tv?${apiKey}&with_genres=10751`,
  );
  return response.data.results;
};

export const getDocumentaryTv = async () => {
  const response = await axios.get(
    `${apiUrl}/discover/tv?${apiKey}&with_genres=99`,
  );
  return response.data.results;
};

export const getMovie = async id => {
  const response = await axios.get(`${apiUrl}/movie/${id}?${apiKey}`);
  return response.data;
};

export const searcgMovieOrTv = async (query, type) => {
  const response = await axios.get(
    `${apiUrl}/search/${type}?${apiKey}&query=${query}`,
  );
  return response.data.results;
};
