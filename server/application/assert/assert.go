package assert

import (
	assertlib "github.com/stretchr/testify/assert"
	"shivam.com/server/application/logger"
)

type assertLogger struct{}

var _ (assertlib.TestingT) = (*assertLogger)(nil)

var defaultLogger = logger.NewLogger()

// Errorf implements assert.TestingT.
func (a *assertLogger) Errorf(format string, args ...any) {
	defaultLogger.Fatal().Msgf(format, args...)
}

func NotNil(v any, messageArgs ...any) {
	assertlib.NotNil(&assertLogger{}, v, messageArgs...)
}

func True(v bool, messageArgs ...any) {
	assertlib.True(&assertLogger{}, v, messageArgs...)
}

func NoError(err error, args ...any) {
	assertlib.NoError(&assertLogger{}, err, args...)
}
