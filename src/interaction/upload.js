import axios from "axios";

export default async function uploadFormData(context) {
    try {
        let res = await axios.post(
            `${process.env.REACT_APP_API_URL}`,
            context,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

            
        console.log('Server Response:', res.status);

        if (res.status === 200) {
            return res.data;
        } else if (res.status === 400 || res.status === 404) {
            console.log("user error")
        }
        else {
            console.log('This is the response from the server:', res);
        }
    } catch (error) {
        console.log('Error:', error);
    }
}
