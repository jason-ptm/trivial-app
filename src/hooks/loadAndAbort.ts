import { AxiosResponse } from 'axios'
import { useEffect } from 'react'
import Swal from 'sweetalert2'

export const useAsync = (
  asyncFn: () => Promise<AxiosResponse<unknown, unknown>>,
  // eslint-disable-next-line @typescript-eslint/ban-types
  successFunction: Function,
  returnFunction: () => void,
  dependencies: unknown[] = []
) => {
  useEffect(() => {
    let isActive = true //inicializa el componente
    asyncFn()
      .then((result) => {
        //realiza la petición a la api
        if (isActive && result) successFunction(result.data) //verifica si sigue activo el activo
      })
      .catch(async () => {
        await Swal.fire({
          customClass: {
            container: 'swal-container',
          },
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
        returnFunction()
      })
    return () => {
      returnFunction && returnFunction()
      isActive = false
    }
  }, dependencies)
}
