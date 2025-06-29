package postgres

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
	"shivam.com/server/config"
)

type pgxPoolContextKey struct{}
var ctxKey = pgxPoolContextKey{}

func WithContext(ctx context.Context) context.Context {
	conn, err := pgxpool.New(ctx, config.C.DatabaseURL)
	if err != nil {
		panic(fmt.Errorf("failed to connect to postgres: %w", err))
	}

	return context.WithValue(ctx, ctxKey, conn)
}

func Ctx(ctx context.Context) *pgxpool.Pool {
	conn := ctx.Value(ctxKey)
	if conn == nil {
		panic("no connection found in context")
	}

	return conn.(*pgxpool.Pool)
}
