import { setLocale } from 'yup';

setLocale({
    mixed: {
        notType: 'Esta informação não é valido!',
        default:'Este campo não é válido!' ,
        required: 'Este campo é obrigatório!',
    },
    string: {
        email: () => 'O campo deve conter um email válido!',
        max: ({ max }) => `O campo deve conter no maximo ${max} caracteres.`,
        min: ({ min }) => `O campo deve conter pelo menos ${min} caracteres.`,
        length: ({ length }) => `O campo deve conter exatamente ${length} caracteres.`,

    },
    date: {
        max: ({ max }) => `A data deve ser maior que ${max} caracteres.`,
        min: ({ min }) => `A data deve ser menor que ${min} caracteres.`,
    },
    number: {
        
        integer: () => 'O campo precisa ter um valor inteiro!',
        positive: () => 'O campo deve ter um valor positivo!',
        negative: () => 'O campo deve ter um valor negativo!',
        moreThan: ({more}) => `O campo deve ter mais de ${more} caracteres!`,
        lessThan: ({less}) => `O campo deve ter mais de ${less} caracteres!`,
        max: ({ max }) => `O campo deve conter no maximo ${max} caracteres.`,
        min: ({ min }) => `O campo deve conter pelo menos ${min} caracteres.`,
    },
    boolean: {},
    object: {
        noUnknown: "Deve ser passado um valor definido"
    },
    array: {
        min: ({ min }) => `Deve ter no minimo ${min} items`,
        max: ({ max }) => `Deve ter no minimo ${max} items`,
        length: ({ length }) => `Deve conter exatamente ${length} items`

    },
});
