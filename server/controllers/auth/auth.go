package auth

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/shivamkumar/todobackend/config"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type AuthRequest struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

func RegisterUser(w http.ResponseWriter, r *http.Request) {
	// Read request body
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Failed to read request body", http.StatusBadRequest)
		return
	}
	defer r.Body.Close() // Ensure body is closed

	if len(body) == 0 {
		http.Error(w, "Request body is empty", http.StatusBadRequest)
		return
	}

	// Parse JSON
	var authRequest AuthRequest
	err = json.Unmarshal(body, &authRequest)
	if err != nil {
		http.Error(w, "Failed to parse request body", http.StatusBadRequest)
		return
	}

	fmt.Println("Received Request:", authRequest)

	// Get MongoDB collection
	collection := config.GetCollection("user")

	// Check if the email already exists
	filter := bson.D{{Key: "email", Value: authRequest.Email}}
	var existingUser AuthRequest
	err = collection.FindOne(context.TODO(), filter).Decode(&existingUser)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			// Email does not exist → Proceed with registration
			w.WriteHeader(http.StatusOK)
			w.Write([]byte(`{"message": "User can be registered"}`))
			return
		}
		fmt.Println("Database error:", err)
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}

	// If user already exists
	http.Error(w, "User already exists", http.StatusConflict)

	fmt.Println("User does not exist")
	w.WriteHeader(http.StatusCreated)
}
