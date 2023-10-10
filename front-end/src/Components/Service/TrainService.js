import axios from 'axios'

const URL = "http://localhost:5286/api/Train";

class TrainService{
    createTrain(train){
        return axios.post(URL, train);
    }
    getAllTrains(){
        return axios.get(URL).then((res)=>res.data);
    }
    deleteTrain(id){
        return axios.delete(URL + '/' + id)
    }
    updateTrain(train){
        return axios.put(URL, train);  
    }
    getTrainById(id){
        return axios.get(URL + '/' + id).then((resopnse)=>resopnse.data)
    }
}
export default new TrainService();   