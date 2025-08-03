export type RouterParams = {
  symbolId: string;
};

export class ApiResponseError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: unknown,
  ) {
    super(message);
    this.name = "ApiResponseError";
  }
}

export type APIResponse<T> =
  | {
      data: T;
      success: true;
    }
  | {
      data: undefined;
      success: false;
      error: ApiResponseError;
    };
