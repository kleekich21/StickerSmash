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
