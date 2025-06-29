import { useState, useCallback, useMemo } from 'react'
import { FormData } from '@/types/task.types'

export const useFormState = (
  initialState: FormData = { name: '', description: '' },
) => {
  const [formData, setFormData] = useState<FormData>(initialState)

  const updateField = useCallback((field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }, [])

  const resetForm = useCallback(() => {
    setFormData(initialState)
  }, [initialState])

  const isValid = useMemo(
    () => formData.name.trim().length > 0,
    [formData.name],
  )

  return { formData, updateField, resetForm, isValid, setFormData }
}
