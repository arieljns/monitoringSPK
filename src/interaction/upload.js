import axios from "axios";

export default async function uploadFormData(context) {
    console.log(process.env.API_URL)
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

        if (res.status === 200) {
            console.log("all good");
        }
    } catch (error) {
        console.log(error);
    }
}
