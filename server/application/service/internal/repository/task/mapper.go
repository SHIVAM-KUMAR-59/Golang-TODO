package task

import (
	"shivam.com/server/application/service/types/entity"
	"shivam.com/server/infra/database/postgres/gen"
)

func (r *Repository) mapToTaskEntity(task gen.Task) entity.Task {
	return entity.Task{
		ID:          task.ID,
		Name:        task.Title,
		Description: task.Description,
		UserId:      task.UserID,
	}
}