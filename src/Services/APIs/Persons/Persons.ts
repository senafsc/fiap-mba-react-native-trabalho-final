import api from "../Common/api";

const getAllPersons = (url: string) => api.get(url + "/persons/getPersons");

export default {
  getAllPersons,
};
