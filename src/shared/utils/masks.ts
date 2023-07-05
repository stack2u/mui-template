const formatDocumento = (value: string) => {
  // Remove todos os caracteres não numéricos e limita a 11 ou 14 caracteres
  const cleanedValue = value?.replace(/\D/g, '')
  const isCNPJ = cleanedValue?.length > 11

  // Formata o CNPJ (99.999.999/9999-99) ou o CPF (999.999.999-99)
  const match = cleanedValue?.match(
    isCNPJ
      ? /^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})$/
      : /^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/,
  )

  if (match) {
    const formattedValue = isCNPJ
      ? `${match[1] || ''}${match[2] ? `.${match[2]}` : ''}${
          match[3] ? `.${match[3]}` : ''
        }${match[4] ? `/${match[4]}` : ''}${match[5] ? `-${match[5]}` : ''}`
      : `${match[1] || ''}${match[2] ? `.${match[2]}` : ''}${
          match[3] ? `.${match[3]}` : ''
        }${match[4] ? `-${match[4]}` : ''}`

    return formattedValue
  } else {
    return cleanedValue
  }
}

const formatTelefone = (value: string) => {
  // Remove todos os caracteres não numéricos
  const cleanedValue = value?.replace(/\D/g, '')

  // Verifica se é celular (9 dígitos) ou telefone (8 dígitos)
  const isCelular = cleanedValue?.length === 11
  const match = cleanedValue?.match(
    isCelular
      ? /^(\d{0,2})(\d{0,5})(\d{0,4})$/
      : /^(\d{0,2})(\d{0,4})(\d{0,4})$/,
  )

  if (match) {
    const formattedValue = `${match[1] ? `(${match[1]}` : ''}${
      match[2] ? `) ${match[2]}` : ''
    }${match[3] ? ` ${match[3]}` : ''}`

    return formattedValue
  } else {
    return cleanedValue
  }
}

export { formatDocumento, formatTelefone }
