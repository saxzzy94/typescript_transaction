export default interface HttpRequest <Params,Headers,Body,Query> {
  param: Params;
  body?: Body;
  headers?: Headers;
  query?: Query;
}
