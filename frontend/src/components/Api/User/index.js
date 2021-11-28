import axios from "axios";

export const RegisterID = async (value) => {
  try {
    const {email, password, confPassword, name} = value;
    const response = await axios.post("http://localhost:5000/api/user/register", {
      email, password, confPassword, name
    })

    if (response.status === 200) {
      return response.msg;
    }
  } catch (error) {
    console.log(error)
  }
};

export const Login = async(data) => {
    const {email, password} = data; 
    return await axios.post("http://localhost:5000/api/user/login", {
      email, password
    })
}

