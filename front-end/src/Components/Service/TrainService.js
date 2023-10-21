import axios from "axios";
import { BASE_URL } from "../../config";
const URL = `${BASE_URL}/api/Train`;

class TrainService {
  createTrain(train) {
    return axios.post(URL, train);
  }
  getAllTrains() {
    return axios.get(URL).then((res) => res.data);
  }
  deleteTrain(id) {
    return axios.delete(URL + "/" + id);
  }
  updateTrain(train) {
    return axios.put(URL, train);
  }
  getTrainById(id) {
    return axios.get(URL + "/" + id).then((resopnse) => resopnse.data);
  }
  publishTrain(id) {
    return axios.put(URL + "/active/" + id);
  }
}
export default new TrainService();
