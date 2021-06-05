import { FORM_SET, FORM_RESET, LOADING_SET, ERROR_SET } from './actionTypes';

export function formSet(field, id) {
    return {
        type: FORM_SET,
        field,
        id
    };
}

export function formReset() {
    return {
        type: FORM_RESET
    };
}


export function setLoading(slug, loading) {
    return {
        type: LOADING_SET,
        slug,
        loading
    };
}

export function setError(slug, error) {
    return {
        type: ERROR_SET,
        slug,
        error
    };
}