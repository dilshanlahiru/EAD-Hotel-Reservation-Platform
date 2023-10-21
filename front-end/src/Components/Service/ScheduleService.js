import axios from "axios";
import { BASE_URL } from "../../config";
const URL = `${BASE_URL}/api/Schedule`;

class ScheduleService {
  createSchedule(Schedule) {
    return axios.post(URL, Schedule);
  }
  getAllSchedules() {
    return axios.get(URL).then((res) => res.data);
  }
  deleteSchedule(id) {
    return axios.delete(URL + "/" + id);
  }
  updateSchedule(Schedule) {
    return axios.put(URL, Schedule);
  }
  getSchduleById(id) {
    return axios.get(URL + "/" + id).then((resopnse) => resopnse.data);
  }
  getSchduleByTrainId(id) {
    return axios.get(URL + "/train/" + id).then((resopnse) => resopnse.data);
  }
}
export default new ScheduleService();
