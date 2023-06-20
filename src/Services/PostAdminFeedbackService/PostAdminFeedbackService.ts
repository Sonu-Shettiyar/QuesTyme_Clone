import axios from "axios";

export const postAdminFeedback = (interviewId: number, userId: number, token: string, notes: string) => {
    console.log(interviewId, userId, token, notes)
    return axios({
        method: "post",
        url: `http://35.178.167.63:8888/api/interview/${interviewId}/admin-feedback/${userId}`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: notes
    }).then((res) => {
        console.log(res)
        return res
    })
        .catch((err) => {
            console.log(err)
        })
}
