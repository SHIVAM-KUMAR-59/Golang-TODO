package api

import (
	"context"

	"connectrpc.com/connect"
	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
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
	taskService   types.TaskService
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

func (g *grpcApi) CreateTask(ctx context.Context, in *connect.Request[pb.CreateTaskRequest]) (*connect.Response[pb.CreateTaskResponse], error) {

	userUUID, err := uuid.Parse(in.Msg.UserId)
	if err != nil {
		return nil, err
	}

	task := entity.Task {
		Name:        in.Msg.Name,
		Description: in.Msg.Description,
		UserId:      userUUID,
	}

	createdTaskId, err := g.taskService.CreateTask(ctx, task)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(&pb.CreateTaskResponse{Id: createdTaskId}), nil
}

func (g *grpcApi) UpdateTask(ctx context.Context, in *connect.Request[pb.UpdateTaskRequest]) (*connect.Response[pb.UpdateTaskResponse], error) {

	taskID, err := uuid.Parse(in.Msg.Id)
	if err != nil {
		return nil, err
	}

	task := entity.Task {
		ID:          taskID,
		Name:        in.Msg.Name,
		Description: in.Msg.Description,
		IsCompleted: in.Msg.IsCompleted,
	}

	updatedTask, err := g.taskService.UpdateTask(ctx, task)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(&pb.UpdateTaskResponse{
		Id: updatedTask.ID.String(), 
		Name: updatedTask.Name, 
		Description: updatedTask.Description, 
		IsCompleted: updatedTask.IsCompleted,
		}), nil
}

func (g *grpcApi) DeleteTask(ctx context.Context, in *connect.Request[pb.DeleteTaskRequest]) (*connect.Response[emptypb.Empty], error) {

	taskID := in.Msg.Id
	err := g.taskService.DeleteTask(ctx, taskID)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(&emptypb.Empty{}), nil
}

func (g *grpcApi) ListTasks(ctx context.Context, in *connect.Request[pb.ListTasksRequest]) (*connect.Response[pb.ListTasksResponse], error) {

	userId := in.Msg.UserId
	tasks, err := g.taskService.ListTasks(ctx, userId)
	if err != nil {
		return nil, err
	}

	var pbTasks []*pb.Task
	for _, t := range tasks {
		pbTasks = append(pbTasks, &pb.Task{
			Id:          t.ID.String(),
			Name:        t.Name,
			Description: t.Description,
			IsCompleted: t.IsCompleted,
		})
	}

	return connect.NewResponse(&pb.ListTasksResponse{Tasks: pbTasks}), nil
}

func newGrpcApi(ctx context.Context, userService types.UserService, taskService types.TaskService) grpcApi {
	assert.NotNil(userService)
	return grpcApi{
		logger:      *zerolog.Ctx(ctx),
		userService: userService,
		taskService: taskService,
	}
}