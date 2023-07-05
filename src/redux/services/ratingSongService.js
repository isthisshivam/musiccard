import baseBackendApi from "../webservice/baseBackendApi";
import ApiConstant from "../../utility/constant/ApiConstants";
export const ratingASongPatch = async (songId, payload) => {
  const response = await baseBackendApi.patch(
    ApiConstant.SONG_DETAIL +
      `` +
      songId +
      `/` +
      ApiConstant.RATING +
      `?` +
      ApiConstant.RATING +
      `=` +
      payload.rating,
    payload
  );

  return response.data;
};
