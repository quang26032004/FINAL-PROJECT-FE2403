import api from "./axiosClient";

const ENDPOINT = "users/";

const userService = {
  getAll(params = {}) {
    return api.get(ENDPOINT, { params });
  },
  get(id) {
    return api.get(ENDPOINT + id);
  },
  create(data) {
    return api.post(ENDPOINT, data);
  },
  update(id, data) {
    return api.patch(ENDPOINT + id, data);
  },
  delete(id) {
    return api.delete(ENDPOINT + id);
  },
};

export default userService;
