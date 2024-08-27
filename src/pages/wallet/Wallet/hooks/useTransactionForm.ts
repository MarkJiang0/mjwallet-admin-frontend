import { useMemo, useRef, useState } from "react";

export function useTransactionForm(): {
  formData: API.Transaction | undefined,
  initForm: () => void,
  setAmount: (val: number) => void,
  setToAddress: (val: string) => void,
  setFromAddress: (val: string) => void,
  submitForm: () => void,
} {
  const formDataRef = useRef<API.Transaction | undefined>(undefined)
  const [, forceUpdate] = useState<any>(null)

  const handleForm = useMemo(() => {
    const setAmount = (val: number) => {
      if (formDataRef.current) {
        formDataRef.current.amount = val
      }
      forceUpdate(val)
    }
    const setToAddress = (val: string) => {
      if (formDataRef.current) {
        formDataRef.current.toAddress = val
      }
      forceUpdate(val)
    }
    const setFromAddress = (val: string) => {
      if (formDataRef.current) {
        formDataRef.current.fromAddress = val
      }
      forceUpdate(val)
    }
    const initForm = () => {
      formDataRef.current = {
        amount: 0,
        toAddress: '',
        fromAddress: ''
      }
    }
    const  submitForm = () => {

    }

    return {initForm, setAmount, setToAddress, setFromAddress, submitForm}
  }, [])

  return {formData: formDataRef.current, ...handleForm}
}