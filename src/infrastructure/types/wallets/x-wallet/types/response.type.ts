export type BaseResponse = {
  message: string;
  status: 'success' | 'fail';
};

export type Response<T> = T extends undefined ? BaseResponse : BaseResponse & T;
