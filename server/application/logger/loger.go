package logger

import (
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/rs/zerolog"
	"shivam.com/server/config"
)

var Default = NewLogger()

func NewLogger() zerolog.Logger {

	if config.C.ProductionMode {
		logger := zerolog.New(os.Stdout).With().Timestamp().Caller().Logger().Level(zerolog.InfoLevel); 
		zerolog.TimeFieldFormat = zerolog.TimeFormatUnix
		return logger
	}

	// Set up zerolog with colored output
	output := zerolog.ConsoleWriter{Out: os.Stdout, TimeFormat: time.RFC3339}

	output.FormatLevel = func(i interface{}) string {
		level := strings.ToUpper(fmt.Sprintf("%s", i))
		var colorStart, colorEnd string
		switch level {
		case "INFO":
			colorStart = "\x1b[32m" // Green
		case "DEBUG":
			colorStart = "\x1b[34m" // Blue
		case "ERROR", "FATAL":
			colorStart = "\x1b[31m" // Red
		case "WARN":
			colorStart = "\x1b[33m" // Yellow
		default:
			colorStart = ""
		}
		colorEnd = "\x1b[0m"

		return fmt.Sprintf("| %s%-6s%s|", colorStart, level, colorEnd)
	}

	output.FormatMessage = func(i interface{}) string {
		return fmt.Sprintf("[ %s ]", i)
	}
	output.FormatFieldName = func(i interface{}) string {
		return fmt.Sprintf("%s:", i)
	}
	output.FormatFieldValue = func(i interface{}) string {
		return strings.ToUpper(fmt.Sprintf("%s", i))
	}

	logger := zerolog.New(output).With().
		Timestamp().
		Caller().
		Logger()

	return logger
}
