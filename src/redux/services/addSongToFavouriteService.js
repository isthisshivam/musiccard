import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";

export const addSongToFavourite = async (payload) => {
  const response = await baseBackendApi.post(
    ApiConstant.ADD_SONG_TO_PLAYLIST_FAVOURITE,
    payload
  );

  return response.data;
};

export const removeSongFromFavorite = async (songId) => {
  const response = await baseBackendApi.delete(
    `${ApiConstant.REMOVE_FAVOURITE_SONG}/${songId}`
  );

  return response;
};
