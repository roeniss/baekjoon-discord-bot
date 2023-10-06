const axios = require("axios")
const logger = require("../logger")
const dotenv = require("dotenv")

dotenv.config()
async function getSinglePersonalizedProblems(userId, problemNum){
    let problem_arr = [];
    try {
        const response = await axios.post(`${process.env.BASE_URL}/baekjun/user_id` , {
                user_id_list: [userId],
                problem_num: problemNum
            },
            {
                timeout: 3000
        });
        if (Array.isArray(response.data[userId])) {
            problem_arr = response.data[userId];
        }
    } catch(error) {
        logger.error(error.message)
    }
    return problem_arr;
}

async function getSimilarProbWithId(probId){
    let problem_arr = []
    try{
        const response = await axios.get(`${process.env.BASE_URL}/baekjun/similar_id` , {
            timeout: 3000,
            params:{
                problem_id: probId,
            }
        });
        if (Array.isArray(response.data['problems'])) {
            problem_arr = response.data['problems'];
        }
    }catch(error){
        logger.error(error.message)
    }
    return problem_arr;
}

async function getSimilarProbWithContext(probContext){
    let problem_arr= []
    try{
        const response = await axios.get(`${process.env.BASE_URL}/baekjun/similar_text` , {
            timeout: 3000,
            params:{
                problem_text: probContext,
            }
        });
        if (Array.isArray(response.data['problems'])) {
            problem_arr = response.data['problems'];
        }
    }catch(error){
        logger.error(error.message)
    }
    return problem_arr;
}


module.exports = { getSinglePersonalizedProblems, getSimilarProbWithId, getSimilarProbWithContext }