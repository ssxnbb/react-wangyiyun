import type {
  AxiosRequestConfig,
  InternalAxiosRequestConfig
} from 'axios'

interface HYInterceptor<T = any> {
  requestSuccessFn?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any
}

export interface HYRequestConfig<T = any> extends AxiosRequestConfig {
  interceptors?: HYInterceptor<T>
}
