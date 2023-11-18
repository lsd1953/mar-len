export const BASE_URL = "https://5edc-45-70-55-136.ngrok-free.app/";

const getUrl = ()=>{
    if (process.env.REACT_APP_DEBUG==='1'){
        return process.env.REACT_APP_URL
    }else{
        return BASE_URL
    }
}
const backEnd = {
    url: `${getUrl()}api/`,
};

export default backEnd;