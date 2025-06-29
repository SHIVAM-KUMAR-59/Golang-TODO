package main

//go:generate go run github.com/bufbuild/buf/cmd/buf generate

import (
	"context"
	"log"

	"shivam.com/server/application/api"
	"shivam.com/server/application/logger"
	"shivam.com/server/application/service"
	"shivam.com/server/infra/database/postgres"
)

func main() {

	ctx := context.Background()
	ctx = postgres.WithContext(ctx)
	ctx = logger.NewLogger().WithContext(ctx)

	server := api.NewServer(ctx,
		service.NewUserService(ctx),
		)
	if err := server.Start(ctx); err != nil {
		log.Fatal(err)
	}
	
}
