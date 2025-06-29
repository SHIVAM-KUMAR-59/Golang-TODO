package user

import (
	"context"
	"errors"

	"github.com/google/uuid"
	"github.com/rs/zerolog"
	xerrors "shivam.com/server/application/errors"
	"shivam.com/server/application/service/internal/types"
	"shivam.com/server/application/service/types/entity"
)

type Service struct {
	logger         *zerolog.Logger
	userRepository types.UserRepository
}

func (s *Service) CreateUser(ctx context.Context, user entity.User) (string, error) {
	email := user.Email
	if email == "" {
		s.logger.Error().Msg("email is required")
		return "", xerrors.BadRequestError(ctx, errors.New("Emailis required"))
	}

	password := user.Password
	if password == "" {
		s.logger.Error().Msg("password is required")
		return "", xerrors.BadRequestError(ctx, errors.New("Password is required"))
	}

	newUser := entity.User{
		ID:       uuid.New(),
		Name:     user.Name,
		Email:    email,
		Password: password,
	}

	userId, err := s.userRepository.CreateUser(ctx, newUser)
	if err != nil {
		s.logger.Error().Msg("error creating user")
		return "", err
	}

	s.logger.Debug().Msg("user created with id: " + userId)

	return userId, nil
}

func (s *Service) DeleteUser(ctx context.Context, userId string) (error) {
	if userId == "" {
		s.logger.Error().Msg("user id is required")
		return xerrors.BadRequestError(ctx, errors.New("user id is required"))
	}

	id, err := uuid.Parse(userId)
	if err != nil {
		s.logger.Error().Msg("error parsing user id")
		return err
	}

	s.logger.Debug().Msg("deleting user with id: " + userId)
	return s.userRepository.DeleteUser(ctx, id)
}

func NewService(ctx context.Context, userRepository types.UserRepository) *Service {
	return &Service{
		userRepository: userRepository,
		logger:         zerolog.Ctx(ctx),
	}
}