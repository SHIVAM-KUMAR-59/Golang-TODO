-- name: CreateTask :one
INSERT INTO
task(id, title, description, user_id)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: GetTask :one
SELECT *
FROM task
WHERE id = $1;

-- name: DeleteTask :exec
DELETE FROM task
WHERE id = $1;

-- name: UpdateTask :one
UPDATE task
SET title = $2, description = $3, is_completed = $4
WHERE id = $1
RETURNING *;

-- name: ListTasks :many
SELECT *
FROM task
WHERE user_id = $1;