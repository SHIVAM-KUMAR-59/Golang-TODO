package user

import (
	"context"
	"fmt"

	"github.com/google/uuid"
	"shivam.com/server/application/service/types/entity"
	"shivam.com/server/infra/database/postgres/gen"
)

type Repository struct {
	db *gen.Queries
}

func (r *Repository) CreateUser(ctx context.Context, user entity.User) (string, error) {

	createUserParams := gen.CreateUserParams{
		ID:        user.ID,
		Name:      user.Name,
		Email:     user.Email,
		Password:  user.Password,
	}
	genUser, err := r.db.CreateUser(ctx, createUserParams)
	if err != nil {
		// TODO: Replace with zerologger
		fmt.Println("Error creating user")
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

func NewRepository(db *gen.Queries) *Repository {
	return &Repository{
		db: db,
	}
}