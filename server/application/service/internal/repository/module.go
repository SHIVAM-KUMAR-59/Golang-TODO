package repository

import (
	"context"

	"shivam.com/server/application/service/internal/repository/user"
	"shivam.com/server/application/service/internal/types"
)

func NewUserRepository(ctx context.Context) types.UserRepository {
	return user.NewRepository(ctx)
}