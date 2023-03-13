import axios from "axios";

const main = async () => {
  const response = await axios({
    method: "GET",
    url: `https://top-one-uwu-clone-2.onrender.com/api/openai/get-servers?payload={%22openaiStates%22:%22{\\%22search\\%22:\\%22\\%22,\\%22sort\\%22:\\%22name\\%22,\\%22isAscending\\%22:true,\\%22filter\\%22:\\%22Online\\%22,\\%22limit\\%22:8}%22}`
  });
  return response?.data[0]?.api_key
}

export default main;