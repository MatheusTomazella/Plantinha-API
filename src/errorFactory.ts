interface RequestError {
    code: string,
    error: any
}

export function error_DATABASE_ERROR ( error: any ) : RequestError {
    return {
        code: "DATABASE_ERROR",
        error: error
    }
}
    export function error_FAILED_TO_CREATE_OBJECT ( error : any ) : RequestError {
        return {
            code: "FAILED_TO_CREATE_OBJECT",
            error: error
        }
    }

    export function error_OBJECT_NOT_FOUND ( error : any ) : RequestError {
        return {
            code: "OBJECT_NOT_FOUND",
            error: error
        }
    }

    export function error_FAILED_TO_DELETE_OBJECT ( error : any ) : RequestError {
        return {
            code: "FAILED_TO_DELETE_OBJECT",
            error: error
        }
    }

    export function error_INACTIVE_PLANT ( error : any ) : RequestError {
        return {
            code: "INACTIVE_PLANT",
            error: error
        }
    }
    
export function error_FAILED_TO_SET_DATA ( error : any ) : RequestError {
    return {
        code: "FAILED_TO_SET_DATA",
        error: error
    }
}

export function error_FAILED_TO_GET_DATA ( error : any ) : RequestError {
    return {
        code: "FAILED_TO_GET_DATA",
        error: error
    }
}

export function error_FAILED_TO_ADD_POINT ( error : any ) : RequestError {
    return {
        code: "FAILED_TO_ADD_POINT",
        error: error
    }
}

export function error_FAILED_TO_GET_GRAPH_POINTS ( error : any ) : RequestError {
    return {
        code: "FAILED_TO_GET_GRAPH_POINTS",
        error: error
    }
}

export function error_MISSING_PARAMETER ( error : any ) : RequestError {
    return {
        code: "MISSING_PARAMETER",
        error: error
    }
}

export function error_FAILED_TO_CREATE_OR_UPDATE_CONFIG ( error : any ) : RequestError {
    return {
        code: "FAILED_TO_CREATE_OR_UPDATE_CONFIG",
        error: error
    }
}

export function error_FAILED_TO_GET_CONFIG ( error : any ) : RequestError {
    return {
        code: "FAILED_TO_GET_CONFIG",
        error: error
    }
}