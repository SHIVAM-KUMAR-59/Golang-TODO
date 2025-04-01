package main

import (
	"fmt"
	"net/http"
)

func homeHandler(w http.ResponseWriter, r *http.Request) {
	_, err := fmt.Fprintln(w, "Hello, World!")
	if err != nil {
		http.Error(w, "Failed to write response", http.StatusInternalServerError)
		return
	}
}

func main() {
	fmt.Println("Server running on http://localhost:8000") 

	http.HandleFunc("/", homeHandler)

	err := http.ListenAndServe(":8000", nil)
	if err != nil {
		panic(err) 
	}
}
