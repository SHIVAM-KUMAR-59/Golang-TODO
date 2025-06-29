package types

import (
	"context"

	"shivam.com/server/application/service/types/entity"
)

type UserRepository interface {
	CreateUser(ctx context.Context, user entity.User) (string, error)
	Deleteuser(ctx context.Context, userId string) (error)
}