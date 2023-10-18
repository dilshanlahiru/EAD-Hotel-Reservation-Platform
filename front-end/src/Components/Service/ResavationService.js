import axios from 'axios'

const URL = "http://localhost:5286/api/Reservation";

class ReservationService{
    createResavation(resvation){
        return axios.post(URL, resvation);
    }
    getAllResavation(){
        return axios.get(URL).then((res)=>res.data);
    }
    deleteResavation(id){
        return axios.delete(URL + '/' + id)
    }
    updateReservation(resvation){
        return axios.put(URL, resvation);  
    }
    getReservationById(id){
        return axios.get(URL + '/' + id).then((resopnse)=>resopnse.data)
    }
}
export default new ReservationService();   