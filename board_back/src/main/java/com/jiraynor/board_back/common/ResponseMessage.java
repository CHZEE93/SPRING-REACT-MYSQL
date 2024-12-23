package com.jiraynor.board_back.common;

public interface ResponseMessage {

    // HTTP Status 200
    String SUCCESS = "Success.";

    // HTTP Status 400
    String VALIDATION_FAILED = "Validation_failed.";
    String DUPLICATE_EMAIL = "Duplicate_email.";
    String DUPLICATE_NICKNAME = "Duplicate_nickname.";
    String DUPLICATE_TEL_NUMBER = "Duplicate_tel_number.";
    String NOT_EXISTED_USER = "Not_existed_user.";
    String NOT_EXISTED_BOARD = "Not_existed_board.";

    // HTTP Status 401
    String SIGN_IN_FAIL = "Sign_in_fail.";
    String AUTHORIZED_FAIL = "Authorized_fail.";

    // HTTP Status 403
    String NO_PERMISSION = "No_permission.";

    // HTTP Status 500
    String DATABASE_ERROR = "Database_error.";
}
