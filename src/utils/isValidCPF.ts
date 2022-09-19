enum validValues {
  MAX_CPF_SIZE_STRING = 11,
}

const isValidCPF = (validCpf: string): boolean => {
  const isCpfOnlyNumber = /^[0-9]+$/.test(validCpf);

  return validCpf.length > validValues.MAX_CPF_SIZE_STRING ||
    isCpfOnlyNumber === false
    ? false
    : true;
};

export { isValidCPF };
