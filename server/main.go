package main

import (
	"fmt"
	"net/http"
)

// Handler function
func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Hello, Go Server!")
}

func main() {
	// Register the route
	http.HandleFunc("/", handler)

	// Start the server
	port := ":8080"
	fmt.Println("🚀 Server running on http://localhost" + port)
	err := http.ListenAndServe(port, nil)
	if err != nil {
		fmt.Println("❌ Error starting server:", err)
	}
}