import axios from "axios";

export default async function uploadFormData(context) {
    try {
        let res = await axios.post(
            process.env.REACT_APP_API_URL,
            context,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

            
        console.log('Server Response:', res.status);

        if (res.status === 200) {
            return res;
        } else {
            console.log('This is the response from the server:', res);
        }
    } catch (error) {
        console.log('Error:', error);
    }
}
