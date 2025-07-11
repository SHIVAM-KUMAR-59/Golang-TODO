package user

import (
	"context"
	"fmt"

	"github.com/google/uuid"
	"github.com/rs/zerolog"
	"shivam.com/server/application/service/types/entity"
	"shivam.com/server/infra/database/postgres"
	"shivam.com/server/infra/database/postgres/gen"
)

type Repository struct {
	logger *zerolog.Logger
	db *gen.Queries
}

func (r *Repository) CreateUser(ctx context.Context, user entity.User) (string, error) {
	userId := uuid.New()
	createUserParams := gen.CreateUserParams{
		ID:        userId,
		Name:      user.Name,
		Email:     user.Email,
		Password:  user.Password,
	}
	genUser, err := r.db.CreateUser(ctx, createUserParams)
	if err != nil {
		r.logger.Error().Msg(fmt.Sprintf("error creating user: %v", err))
		fmt.Println(err)
		return "", err
	}

	return genUser.ID.String(), nil
}

func (r *Repository) DeleteUser(ctx context.Context, userId uuid.UUID) (error) {

	err := r.db.DeleteUser(ctx, userId)
	if err != nil {
		return err
	}

	return nil
}

func NewRepository(ctx context.Context) *Repository {
	return &Repository{
		logger: zerolog.Ctx(ctx),
		db:     gen.New(postgres.Ctx(ctx)),
	}
}