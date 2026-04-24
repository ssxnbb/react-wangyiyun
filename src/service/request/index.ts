import axios from 'axios'
import type {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'

import type { HYRequestConfig } from './type'

class HYRequest {
  instance: AxiosInstance

  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config)

    this.instance.interceptors.request.use(
      (config) => {
        console.log('全局请求成功的拦截')
        return config
      },
      (err) => {
        console.log('全局请求失败的拦截')
        return err
      }
    )
    //如果把res改为res.data的话，promise后面的泛型就不能是AxiosResponse，而是根据返回的data类型来进行决定的。
    this.instance.interceptors.response.use(
      (res) => {
        console.log('全局响应成功的拦截')
        //返回响应数据的时候，直接返回res.data，之后去接收数据的时候，就不用再去点data
        return res.data
      },
      (err) => {
        console.log('全局响应失败的拦截')
        return err
      }
    )
    //下面是针对不同实例，有的有特殊拦截器，有的没有特殊拦截器
    if (config.interceptors) {
      this.instance.interceptors.request.use(
        config.interceptors.requestSuccessFn,
        config.interceptors.requestFailureFn
      )
      this.instance.interceptors.response.use(
        config.interceptors.responseSuccessFn,
        config.interceptors.responseFailureFn
      )
    }
  }

  request<T = any>(config: HYRequestConfig<T>) {
    //不能把特殊request次的拦截器加入到instance，否则这个拦截器会被永久保留
    //下面对于特殊次的拦截器进行处理
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(
        config as InternalAxiosRequestConfig
      ) as HYRequestConfig<T>
    }
    //注意当前返回的是实例的request而不是当前类的request，如果想返回当前类的request，是return this.request()，这个返回直接调用instance上的request函数，然后返回这个函数执行后的返回值。
    //promise后面的这个泛型指定的是res的类型。
    //通过泛型T可以自由指定request得到的数据类型
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          //设置promise就是为了对响应成功进行处理，响应成功后就去执行响应成功拦截器。因为响应成功拦截器只能在响应成功的时候才能执行。
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res as any as T)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  get<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }

  post<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
}

export default HYRequest
