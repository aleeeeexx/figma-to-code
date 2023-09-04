import Service from './service'
import { useModel } from './model'

export const usePresenter = () => {
  const model = useModel()
  const service = new Service(model)
  const a = (b: number) => {
    console.log(b)
  }
  return {
    model,
    service,
    a
  }
}
