import axios from 'axios';

const id = 3;

export default function requestEstimates () {
    axios.post('http://localhost:8000/all-estimates', id).then(response => {
        //do stuff with response if ok   
        console.log(response);          
        },
        response => {
        //do stuff about error
        })
    
}

