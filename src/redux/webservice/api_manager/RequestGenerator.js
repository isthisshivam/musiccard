import RequestCreator from "./RequestCreater";

export async function ApiWorkerPost(ref, url, param) {
  return await RequestCreator.postRequest(url, param);
}
export async function ApiWorkerGet(ref, url, param) {
  return await RequestCreator.getRequest(url, param);
}
export async function ApiWorkerPatch(ref, url, param) {
  return await RequestCreator.patchRequest(url, param);
}
