import ApiClient from '@/configs/ApiClient';

const BE_URL = `${process.env.NEXT_PUBLIC_BE_URL}/api`;
const api = new ApiClient(BE_URL).getInstance();

export { api };
