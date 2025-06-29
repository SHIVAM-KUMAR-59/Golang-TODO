package config

import (
	"fmt"
	"log"
	"strings"
	"sync"

	"github.com/go-playground/validator/v10"
	"github.com/spf13/viper"
)


type Config struct {
	ProductionMode bool `mapstructure:"production_mode"`

	HttpPort           string `mapstructure:"http_port" validate:"required"`
	DatabaseURL        string `mapstructure:"database_url" validate:"required"`

}

var (
	C    Config
	once sync.Once
)

func loadConfig() error {
	v := viper.New()
	v.SetConfigFile("config.yaml")
	v.AddConfigPath(".")

	// Add these lines to enable environment variables
	v.AutomaticEnv()
	v.SetEnvPrefix("")
	v.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))

	if err := v.ReadInConfig(); err != nil {
		log.Fatal(err)
	}
	err := v.Unmarshal(&C)
	if err != nil {
		return err
	}

	err = validateConfig(&C)
	if err != nil {
		return err
	}
	return nil
}

func validateConfig(config *Config) error {
	validate := validator.New()

	if err := validate.Struct(config); err != nil {
		// Type assert err to use validator.ValidationErrors
		if validationErrors, ok := err.(validator.ValidationErrors); ok {
			var errorMessages []string
			for _, e := range validationErrors {
				errorMessages = append(errorMessages, fmt.Sprintf("field '%s' failed on '%s' tag", e.Field(), e.Tag()))
			}
			return fmt.Errorf("config validation failed: %s", strings.Join(errorMessages, ", "))
		}
		return fmt.Errorf("config validation failed: %w", err)
	}

	return nil
}

func init() {
	once.Do(func() {
		if err := loadConfig(); err != nil {
			log.Fatal(err)
		}
	})
}
