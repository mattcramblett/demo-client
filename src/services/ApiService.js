import { httpClient } from "@/api";

export default {
  getTestObjects() {
    return httpClient.get("/test");
  },
  createTestObject(obj) {
    return httpClient.post("/test/create", obj);
  },
  updateTestObject(obj) {
    return httpClient.post(`test/update/${obj.id}`, obj);
  },
  deleteTestObject(id) {
    return httpClient.post(`/test/delete/${id}`);
  },
};
