package config

import (
	"context"
	"fmt"
	"log"

	"github.com/spf13/viper"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB *mongo.Database

func LoadEnv() {
	viper.SetConfigFile(".env")
	err := viper.ReadInConfig()
	if err != nil {
		log.Fatal("Error loading .env file. Ensure .env exists and contains MONGODB_URI and DB_NAME")
	}
}

func ConnectDB() {
	LoadEnv()

	mongoURI := viper.GetString("MONGODB_URI")
	if mongoURI == "" {
		log.Fatal("MONGODB_URI is missing in the .env file")
	}

	clientOptions := options.Client().ApplyURI(mongoURI)
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatal("MongoDB Connection Failed:", err)
	}

	// **Ping the database to check connection**
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal("MongoDB Ping Failed:", err)
	} else {
		fmt.Println("✅ Successfully connected to MongoDB!")
	}

	DB = client.Database(viper.GetString("DB_NAME"))
}


func GetCollection(collectionName string) *mongo.Collection {
	if DB == nil {
		log.Fatal("Database connection is not initialized. Call ConnectDB() first.")
	}
	return DB.Collection(collectionName)
}
