package api

import (
	"context"
	"fmt"
	"net/http"

	connectcors "connectrpc.com/cors"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/rs/cors"
	"github.com/rs/zerolog"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
	"shivam.com/server/application/service/types"
	"shivam.com/server/config"
)

type Server struct {
	logger        *zerolog.Logger
	grpcApi       grpcApi
}

func NewServer(
	ctx context.Context,
	userService types.UserService,
) *Server {
	return &Server{
		logger:        zerolog.Ctx(ctx),
		grpcApi:       newGrpcApi(ctx, userService),
	}
}

func (s *Server) Start(ctx context.Context) error {
	mux := chi.NewRouter()
	mux.Use(middleware.Logger)

	// Configure CORS middleware
	corsMiddleware := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   connectcors.AllowedMethods(),
		AllowedHeaders:   append(connectcors.AllowedHeaders(), "grpc-status", "grpc-message", "Authorization"),
		ExposedHeaders:   append(connectcors.ExposedHeaders(), "grpc-status", "grpc-message", "Authorization"),
		AllowCredentials: true,
	})

	// Wrap the router with CORS middleware
	handler := corsMiddleware.Handler(mux)
	s.grpcApi.RegisterRoutes(mux)
	
	s.logger.Info().Msgf("Starting server on %s", config.C.HttpPort)
	return http.ListenAndServe(fmt.Sprintf(":%v", config.C.HttpPort), h2c.NewHandler(handler, &http2.Server{}))
}
