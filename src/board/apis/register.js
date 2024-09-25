import axios from 'axios';

export const register = async (data) => {
    try {
        const response = await axios.post('/api/board/register', data);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || '게시판 등록 실패');
    }
};