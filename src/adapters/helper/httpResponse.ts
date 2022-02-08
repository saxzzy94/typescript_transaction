export default interface HttpResponse {
  statusCode: number;
  message?: string;
  body?: {};
  headers?: any;
}
