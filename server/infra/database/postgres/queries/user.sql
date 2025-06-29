-- name: CreateUser :one
INSERT INTO
users(id, name, email, password)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: GetUser :one
SELECT *
FROM users
WHERE id = $1;

-- name: DeleteUser :exec
DELETE FROM users
WHERE id = $1;

-- name: UpdateUser :one
UPDATE users
SET name = $2, email = $3, password = $4
WHERE id = $1
RETURNING *;