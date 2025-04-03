package main

import (
	"fmt"
	"net/http"

	"github.com/shivamkumar/todobackend/config"
	"github.com/shivamkumar/todobackend/controllers/auth"
)

func homeHandler(w http.ResponseWriter, r *http.Request) {
	_, err := fmt.Fprintln(w, "Hello, World!")
	if err != nil {
		http.Error(w, "Failed to write response", http.StatusInternalServerError)
		return
	}
}

func main() {
	config.ConnectDB()
	fmt.Println("Server running on http://localhost:8000") 

	http.HandleFunc("/", homeHandler)
	http.HandleFunc("/auth", auth.RegisterUser)

	err := http.ListenAndServe(":8000", nil)
	if err != nil {
		panic(err) 
	}
}
