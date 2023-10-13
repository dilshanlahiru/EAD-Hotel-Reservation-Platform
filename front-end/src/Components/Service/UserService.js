import axios from 'axios'

const URL = "http://localhost:5286/api/User";

class UserService{
    createUser(user){
        return axios.post(URL, user);
    }
    getAllOfficeUsers(){
        return axios.get(URL).then((res)=>res.data);
    }
    getAllTravelerUsers(){
        return axios.get(URL+ '/travelers').then((res)=>res.data);
    }
    deleteUserById(id){
        return axios.delete(URL + '/' + id)
    }
    updateUser(user){
        return axios.put(URL, user);  
    }
    getUserById(id){
        return axios.get(URL + '/' + id).then((resopnse)=>resopnse.data)
    }
    updateStatus(userId, status){
        return axios.put(URL + '/' + userId + '/' + status)
    }
    login(user){
        return axios.post(URL + '/login', user);
    }
}
export default new UserService();   