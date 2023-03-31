import { useMutation } from 'react-query'
import axios from 'axios'

const sendToken = async (token) => {
  try {
    const response = await axios.get(
      `metacon-api.conun.io/api/partners/getCode?token=${token}`
    )

    return response.data
  } catch (error) {
    throw new Error('Failed to send token to the server')
  }
}

export const useSendToken = (token) => {
  return useMutation(() => sendToken(token))
}
