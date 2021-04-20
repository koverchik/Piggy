import axios from 'axios';


export default function requestEstimates () {
    
    axios.post('http://localhost:8000/all-estimates', {id: 9 } ).then(response => {
 
        let list = response.data.map(( item: any, i: number ) =>{
            console.log(item['full_name']);  
            return <li  key={"listEstimate"+i}><a href="#">{item['full_name']}</a></li>
        })
         return list;
      
        },
        response => {
            console.log("error request " + response);
            let notiseError : any = <li  key={"listEstimateEmpty"}> Упс, что-то пошло не так попробуйте перезагрузить стараницу.</li>
            return  notiseError;
        }
        )

}

