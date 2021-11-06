package database

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"log"
)

type DB struct {
	database *gorm.DB
	config struct {
		dsn 	 string
		ip  	 string
		username string
	}
}

func CreateDB() *DB {
	Data := DB{
		config: struct {
			dsn      string
			ip       string
			username string
		}{
			dsn: "root:@tcp(127.0.0.1:3306)/users?charset=utf8mb4&parseTime=True&loc=Local",
			ip: "127.0.0.1:3306",
			username: "evgeniykokaiko",
		},
	}
	Data.database, _ = gorm.Open(mysql.Open(Data.config.dsn),  &gorm.Config{})
	if Data.database.Error != nil {
		log.Fatal("something went wrong with db")
	}
	return &Data
}