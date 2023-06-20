import axios from "axios";

export const postStudentNotes =(interviewId:number,userId:number,token:string,notes:string)=>{
    console.log(interviewId,userId,token,notes)
    return axios({
            method:"post",
            url:`http://35.178.167.63:8888/api/interview/${interviewId}/student-note/${userId}`,
            headers:{
                Authorization:`Bearer ${token}`
            },
            data:notes
    }).then((res)=>{
        return res
    })
    .catch((err)=>{
        console.log(err)
    }) 
}
