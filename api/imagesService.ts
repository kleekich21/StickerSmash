import axios from "axios";

export const searchImages = async (term: string) => {
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    headers: {
      Authorization: "Client-ID TnbuEdajBQoWuPVfYI12DBgdaKriupSYRHO6CjV2xfA",
    },
    params: {
      query: term,
    },
  });

  return response.data.results;
};

export const searchRandomImages = async (term: string) => {
  const response = await axios.get("https://api.unsplash.com/photos/random", {
    headers: {
      Authorization: "Client-ID TnbuEdajBQoWuPVfYI12DBgdaKriupSYRHO6CjV2xfA",
    },
    params: {
      query: term,
      count: 10,
    },
  });
  return response.data;
};
