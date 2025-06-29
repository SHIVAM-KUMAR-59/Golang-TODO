package entity

import "github.com/google/uuid"

type Task struct {
	ID  		uuid.UUID 
	Name 		string
	Description string
	UserId 		uuid.UUID 
	IsCompleted bool
}