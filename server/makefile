migrate:
	goose -dir infra/database/postgres/migrations postgres "$$DATABASE_URL" up

sqlc:
	sqlc generate

run: migrate sqlc
	go run cmd/main.go
