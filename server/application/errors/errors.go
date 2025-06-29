package xerrors

import (
	"context"
	"errors"

	"connectrpc.com/connect"
)

type Error struct {
	error
	Code uint32
}

var (
	CodeNotFound   = uint32(connect.CodeNotFound)
	CodeBadRequest = uint32(connect.CodeInvalidArgument)
)

func NotFoundError(ctx context.Context, err error) Error {
	return Error{
		error: err,
		Code:  CodeNotFound,
	}
}

func BadRequestError(ctx context.Context, err error) Error {
	return Error{
		error: err,
		Code:  CodeBadRequest,
	}
}

func ToConnectError(err error) *connect.Error {
	if errors.As(err, &Error{}) {
		return connect.NewError(connect.Code(err.(Error).Code), err)
	}

	return connect.NewError(connect.CodeInternal, err)
}
