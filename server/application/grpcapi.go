package application

import (
	"context"

	"shivam.com/server/application/models/pb"
	"shivam.com/server/application/service/types"
	"shivam.com/server/application/service/types/entity"
)

type grpcApi struct {
	userService   types.UserService
}

func (g *grpcApi) CreateUser(ctx context.Context, in *pb.CreateUserRequest) (*pb.CreateUserResponse, error) {
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

	return &pb.CreateUserResponse{Id: userId}, nil
}

func NewGrpcApi(userService types.UserService) *grpcApi {
	return &grpcApi{
		userService: userService,
	}
}