migrate:
	goose -dir infra/database/postgres/migrations postgres "$$DATABASE_URL" up

sqlc:
	sqlc generate

run:
	go run main.go
