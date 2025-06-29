package task

import (
	"context"

	"shivam.com/server/application/service/types/entity"
	"shivam.com/server/infra/database/postgres/gen"
)

type Repository struct {
	db *gen.Queries
}

func (r *Repository) CreateTask(ctx context.Context, task entity.Task) (string, error) {
	
	return "", nil
	
}

func NewRepository(db *gen.Queries) *Repository {
	return &Repository{
		db: db,
	}
}