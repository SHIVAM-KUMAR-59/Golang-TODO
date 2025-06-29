package api

import (
	"context"

	"connectrpc.com/connect"
	"github.com/go-chi/chi/v5"
	"github.com/rs/zerolog"
	"google.golang.org/protobuf/types/known/emptypb"
	"shivam.com/server/application/assert"
	"shivam.com/server/application/models/pb"
	"shivam.com/server/application/models/pb/pbconnect"
	"shivam.com/server/application/service/types"
	"shivam.com/server/application/service/types/entity"
)

type grpcApi struct {
	logger        zerolog.Logger
	userService   types.UserService
}

func (g *grpcApi) RegisterRoutes(mux chi.Router) {
	path, handler := pbconnect.NewUserManagementHandler(g)
	mux.Handle(path+"*", handler)
}

func (g *grpcApi) CreateUser(ctx context.Context, in *connect.Request[pb.CreateUserRequest]) (*connect.Response[pb.CreateUserResponse], error) {
	name := in.Msg.Name
	email := in.Msg.Email
	password := in.Msg.Password
	user := entity.User {
		Name:     name,
		Email:    email,
		Password: password,
	}

	userId, err := g.userService.CreateUser(ctx, user)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(&pb.CreateUserResponse{Id: userId}), nil
}

func (g *grpcApi) DeleteUser(ctx context.Context, in *connect.Request[pb.DeleteUserRequest]) (*connect.Response[emptypb.Empty], error) {

	userId := in.Msg.Id
	err := g.userService.DeleteUser(ctx, userId)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(&emptypb.Empty{}), nil
}

func newGrpcApi(ctx context.Context, userService types.UserService) grpcApi {
	assert.NotNil(userService)
	return grpcApi{
		logger:      *zerolog.Ctx(ctx),
		userService: userService,
	}
}