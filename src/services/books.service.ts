import { api } from '.';
import { ROUTES } from './routes';

export const login = (params) => {
  return api.post(ROUTES.LOGIN, params);
};

export const getBooks = () => {
  return api.get(ROUTES.BOOKS);
};

export const orderBook = (code: string) => {
  return api.post(`${ROUTES.ORDER}/${code}`);
};

export const getPaymentQR = () => {
  return api.get(`${ROUTES.ORDER}/payment-qr`);
};

export const getBookTransactions = () => {
  return api.get(ROUTES.TRANSACTION);
};

export const confirmTransaction = (params: { transactionId: string; status: string }) => {
  return api.post(`${ROUTES.TRANSACTION}/confirm`, params);
};

export const getPaymentCodes = () => {
  return api.get(ROUTES.PAYMENT_CODE);
};

export const getTransactionLogs = () => {
  return api.get(ROUTES.TRANSACTION_LOG);
};
