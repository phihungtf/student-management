import axios from 'axios';

const URL = 'http://localhost:8080/student';

export const newStudent = async (student) => {
  return axios
    .post(`${URL}/new`, student)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};