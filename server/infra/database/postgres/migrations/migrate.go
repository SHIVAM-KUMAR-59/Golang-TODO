package migrations

import (
	"embed"
	"fmt"
	"os"
	"sync"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/stdlib"
	"github.com/pressly/goose/v3"
	"shivam.com/server/config"
)

//go:embed *.sql
var embedMigrations embed.FS
var once sync.Once

func Migrate() {
	once.Do(func() {

		config, err := pgx.ParseConfig(config.C.DatabaseURL)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Unable to parse database config: %v\n", err)
			os.Exit(1)
		}

		db := stdlib.OpenDB(*config)
		defer db.Close()

		goose.SetBaseFS(embedMigrations)

		if err := goose.SetDialect("postgres"); err != nil {
			panic(err)
		}

		if err := goose.Up(db, ".", goose.WithAllowMissing()); err != nil {
			panic(err)
		}

	})
}
