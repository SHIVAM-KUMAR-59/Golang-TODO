package types

import (
	"context"

	"github.com/google/uuid"
	"shivam.com/server/application/service/types/entity"
)

type UserRepository interface {
	CreateUser(ctx context.Context, user entity.User) (string, error)
	DeleteUser(ctx context.Context, userId uuid.UUID) (error)
}