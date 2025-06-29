package application

import (
	"context"

	"shivam.com/server/application/service/types"
	"shivam.com/server/application/service/types/entity"
	"shivam.com/server/gen/go/application/models"
)

type grpcApi struct {
	userService   types.UserService
}

func (g *grpcApi) CreateUser(ctx context.Context, in *models.CreateUserRequest) (*models.CreateUserResponse, error) {
	name := in.Name
	email := in.Email
	password := in.Password
	user := entity.User {
		Name:     name,
		Email:    email,
		Password: password,
	}

	userId, err := g.userService.CreateUser(ctx, user)
	if err != nil {
		return nil, err
	}

	return &models.CreateUserResponse{Id: userId}, nil
}

func NewGrpcApi(userService types.UserService) *grpcApi {
	return &grpcApi{
		userService: userService,
	}
}