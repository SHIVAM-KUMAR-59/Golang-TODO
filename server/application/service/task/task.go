package task

import (
	"context"

	"github.com/rs/zerolog"
	"shivam.com/server/application/service/internal/types"
)

type Service struct {
	logger         *zerolog.Logger
	userRepository types.UserRepository
}


func NewService(ctx context.Context, userRepository types.UserRepository) *Service {
	return &Service{
		userRepository: userRepository,
		logger:         zerolog.Ctx(ctx),
	}
}