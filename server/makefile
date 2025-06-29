migrate:
    goose -dir infra/migrations postgres "$$DATABASE_URL"

sqlc:
    sqlc generate

run: migrate sqlc
    go run cmd/main.go