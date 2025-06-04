// api.js
import axios from 'axios';

const applyOutpass = async (data) => {
  try {
    const response = await axios.post('http://localhost:5000/api/gatepass/apply', data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error while applying for outpass:', error);
    throw error;
  }
};

export { applyOutpass };
