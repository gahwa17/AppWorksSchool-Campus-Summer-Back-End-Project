const errorMessages = {
    client: {
        // 400 Client Error
        // user
        inputFeild: 'Missing input feild',
        lostParams: 'Lost params',
        emailValidate: 'Invalid email format.',
        userNotFound: 'User not found',
        wrongPassword: 'Sign In Failed (wrong password)',
        wrongProvider: 'Sign In Failed (wrong provider)',
        wrongToken: 'Wrong token',
        // friend
        sendRequestToSelf: 'Can not send friend request to yourself',
        friendshipRequestSent: 'Friendship request already sent',
        friendshipRequestNotFound: 'Friendship request not found',
        friendshipNotFound: 'Friendship not found',
        // event
        eventNotExist: 'Event does not exist',
        eventAlreadyRead: 'Event is already read',
        notReceiverEvent: 'This is not the receiver\'s event',
        // post
        missingContext: 'Missing context in the request',
        postNotExist: 'Post does not exist',
        invalidPostUpdate: 'Invalid post update (You are not the author)',
        alreadySetLike: 'Already set like',
        alreadySetUnlike: 'Already set unlike',
        // group
        missingGroupName: 'Missing group name',
        duplicateGroupName: 'Group name already used',
        groupNotExist: 'Group does not exist',
        notGroupOwner: 'You are not the owner of this group',
        userNotPendingInGroup: 'User does not in pending',
        userAlreadyJoinedGroup: 'User have already joined this group',
        userNotJoinedGroup: 'User have not joined this group',

        // 401 Client Error (Token error)
        noToken: 'No token provided',
        
        // 403 Client Error (DB error)
        emailExist: 'Email already exists',
        invalidToken: 'Invalid token',
        signInFailed: 'Sign In Failed (Wrong Password, User Not Found, Wrong provider)'
    },
    server: {
        // 500 Server Error
        internalServer: 'Internal server error',
        dbConnection: 'Connecting to db failed',
        sqlquery: 'MySQL error: query failed'
    }
};

module.exports = {
    handleClientError: (res, errorKey, statusCode = 400) => {
        const errorMessage = errorMessages.client[errorKey];
        res.status(statusCode).json({ error: errorMessage });
    },
    handleServerError: (res, error, errorKey) => {
        const errorMessage = errorMessages.server[errorKey];
        if(errorKey == 'internalServer'){
            console.error('Error message:', error.message);
            console.error('Stack trace:', error.stack);
        }
        else if(errorKey == 'sqlquery') {
            console.error('MySQL error message:', error.sqlMessage);
            console.error('MySQL query:', error.sql);
        }
        res.status(500).json({ error: errorMessage });
    }
};