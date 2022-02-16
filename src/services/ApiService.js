import { httpClient } from "@/api";

export default {
  getTestObjects() {
    return httpClient.get("/test");
  },
  createTestObject(obj) {
    return httpClient.post("/test/create", obj);
  },
  deleteTestObject(id) {
    return httpClient.post(`/test/delete/${id}`);
  },
};
