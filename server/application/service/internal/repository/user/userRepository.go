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

func (r *Repository) DeleteUser(ctx context.Context, userId string) (error) {
	
	id, uuidErr := uuid.Parse(userId)
	if uuidErr != nil {
		return uuidErr
	}
	err := r.db.DeleteUser(ctx, id)
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