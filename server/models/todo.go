package models

import "go.mongodb.org/mongo-driver/bson/primitive"

// User model
type Todo struct {
	Id primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Title string `json:"title" binding:"required"`
	Description string `json:"description"`
	Done bool `json:"done" binding:"required" default:"false"`
}