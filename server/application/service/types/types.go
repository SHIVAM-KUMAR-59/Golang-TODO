package types

import (
	"context"

	"shivam.com/server/application/service/types/entity"
)

type UserService interface {
	CreateUser(ctx context.Context, user entity.User) (string, error)
	DeleteUser(ctx context.Context, userId string) (error)
}