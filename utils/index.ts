import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const createOrGetUser = async(response: any, addUser: any) => {
    const token = response.credential;
    const decoded: {name: string, picture: string, sub: string} = jwtDecode(token);

    const { name, picture, sub } = decoded;

    const user = {
        _id: sub,
        _type: 'user',
        userName: name,
        image: picture,
    }

    addUser(user)

    await axios.post('https://tiktok-three-phi.vercel.app/', user)
}