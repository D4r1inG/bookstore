export interface APIResponse<T = any> {
  data?: T;
  status: number;
  error?: string;
  message?: string;
}
