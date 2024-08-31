module.exports = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  USER_EXISTS: 409,
  AUTH_ERROR: 401,
  NO_PERMISSION: 403
};


class NotFoundError extends Error {
	constructor(message) {
	super(message);
	this.statusCode = 404;
	}
}
module.exports.NotFoundError = NotFoundError;

class BadRequest extends Error {
	constructor(message) {
	super(message);
	this.statusCode = 400;
	}
}
module.exports.BadRequest = BadRequest

class ServerError extends Error {
	constructor(message) {
	super(message);
	this.statusCode = 500;
	}
}
module.exports.ServerError = ServerError;

class UserExists extends Error {
	constructor(message) {
	super(message);
	this.statusCode = 409;
	}
}
module.exports.UserExists = UserExists;

class AuthError extends Error {
	constructor(message) {
	super(message);
	this.statusCode = 401;
	}
}
module.exports.AuthError = AuthError;

class NoPermission extends Error {
	constructor(message) {
	super(message);
	this.statusCode = 403;
	}
}
module.exports.NoPermission = NoPermission;