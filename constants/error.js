"use strict";

module.exports = {
    INVALID_EMAIL: {
        code: 400,
        message: 'Email is invalid.',
        status: 'error'
    },
    INVALID_CREDENTIAL: {
        code: 400,
        message: 'You have entered invalid credential.',
        status: 'error'
    },
    INTERAL_SERVER_ERROR: {
        code: 500,
        message: 'Internal server error.',
        status: 'error'
    },
    PASSWORD_REQUIRED: {
        code: 400,
        message: 'Password is required',
        status: 'error'
    },
    EMAIL_REQUIRED: {
        code: 400,
        message: 'Email is required'
    },
    USER_ID_REQUIRED: {
        code: 400,
        message: 'User Id is required',
        status: 'error'
    },
    USER_NOT_FOUND: {
        code: 404,
        message: 'User not found.',
        status: 'error'
    },
    MISMATCH_PASSWORD: {
        code: 400,
        message: 'Invalid password.',
        status: 'error'
    },
    NAME_REQUIRED: {
        code: 400,
        message: 'Name is required.',
        status: 'error'
    }
}