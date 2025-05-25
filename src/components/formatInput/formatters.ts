// Funções para máscaras
export const formatCPF = (value: string) => {
  const cleanValue = value.replace(/\D/g, "");
  return cleanValue
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

export const formatPhone = (value: string) => {
  const cleanValue = value.replace(/\D/g, "");
  return cleanValue
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})\d+?$/, "$1");
};