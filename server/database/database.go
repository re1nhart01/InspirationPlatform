package database

import (
	"errors"
	"fmt"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"log"
	"math"
	models "server/models"
	typedDB "server/types"
	"server/utils"
	"time"
)

type DB struct {
	database *gorm.DB
	config struct {
		dsn 	 string
		ip  	 string
		username string
		databaseName string
	}
}


func CreateDB() *DB {
	Data := DB{
		config: struct {
			dsn      	 string
			ip       	 string
			username 	 string
			databaseName string
		}{
			dsn: "root:@tcp(127.0.0.1:3306)/valhalla?charset=utf8mb4&parseTime=True&loc=Local",
			ip: "127.0.0.1:3306",
			username: "evgeniykokaiko",
			databaseName: "valhalla",
		},
	}
	Data.database, _ = gorm.Open(mysql.Open(Data.config.dsn),  &gorm.Config{})
	if Data.database.Error != nil {
		log.Fatal("something went wrong with db")
	}
	return &Data
}



func (db *DB) CreateEmptyUser(item *models.EmptyUser) error {
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(item.Password), 8)
	item.Password = string(hashedPassword)
	item.IsPrivate = false
	fmt.Println(item)
	err := db.database.Table(typedDB.TABLES.USERS).Create(&item)
	if err != nil {
		fmt.Println("Something went wrong", err)
	}
	return err.Error
}

//при тому коли ми создали емпті юзера і вишли з аппки, при заході назад дивитись чи він сетапнувся, якщо ні, тоді перекидувати на скрін сетапа!

func (db *DB) SetupAccount(item *models.User) error {
	err := db.database.Table(typedDB.TABLES.USERS).Where("username = ?", item.Username).Updates(&item)
	if err != nil {
		fmt.Println(err)
	}
	return err.Error
}


func (db *DB) Login(item *models.EmptyUser) (models.EmptyUser, string) {
	var result models.User
	var tokenModel models.EmptyUser
	db.database.Raw("SELECT username, email, password, token FROM users WHERE username= ? ;", item.Username).Scan(&result)
	err := bcrypt.CompareHashAndPassword([]byte(result.Password), []byte(item.Password))
	if err != nil {
		return models.EmptyUser{}, "Denied"
	} else {
		tokenModel.Token = utils.CreateToken(result.Username, result.Email)
		db.database.Table("users").Where("username = ?", result.Username).Updates(&tokenModel)
		return tokenModel, "Accepted"
	}
}


func (db *DB) Me(username string) *models.User {
	var result *models.User
	var resultPointer = &result
	db.database.Table(typedDB.TABLES.USERS).Where("username = ?", username).Take(&result).Scan(&result)
	(*resultPointer).Token = ""
	(*resultPointer).Password = ""
	return result
}


func (db *DB) Avatar(username string) string {
	var result *models.User
	db.database.Table(typedDB.TABLES.USERS).Where("username = ?", username).Take(&result).Scan(&result)
	fmt.Println(result.Avatar, "5454")
	return result.Avatar
}


func (db *DB) AddPost(username string, data map[string]interface{}) (string, error) {
	data["date_of_creation"] = time.Now()
	fmt.Println(data["date_of_creation"])
	response := db.database.Table(typedDB.TABLES.POSTS).Create(data)
	if response.Error != nil {
		return "", errors.New("ERROR! Something went wrong on post creation")
	}
	return "Good", nil
}

func (db *DB) DeletePost(username string, hash string, owner string) (string, error) {
	result := db.database.Table(typedDB.TABLES.POSTS).Where("owner = ? AND image = ?", username, hash).Delete(&models.Post{})
	if result.Error != nil || owner != username {
		return "", errors.New("ERROR! Something went wrong")
	}
	return "Accept", nil
}


func (db *DB) GetMyPosts(username string) ([]*models.Post, error) {
	var result []*models.Post
	db.database.Table(typedDB.TABLES.POSTS).Where("owner = ?", username).Find(&result).Scan(&result)
	return result, nil
}


func (db *DB) Logout(username string) error {
	result := db.database.Table(typedDB.TABLES.USERS).Where("username = ?", username).Update("token", "")
	if result.Error != nil {
		return errors.New("ERROR! Something went wrong on database")
	}
	return nil
}


func (db *DB) CheckToken(username string) (string, error) {
	var result *models.EmptyUser
	err := db.database.Table(typedDB.TABLES.USERS).Where("username = ?", username).Find(&result).Scan(&result)
	if err.Error != nil && len(result.Token) < 10 {
		fmt.Println(result)
		return "", err.Error
	}
	name, _, error := utils.ParseToken(result.Token)
	if error != nil && username != name {
	return "", error
	}

	return result.Username, nil
}

func (db *DB) GetNewsLine(_ string, page int) ([]*models.Post, int ,error) {
	var dbResult []*models.Post
	var dbPageResult = map[string]interface{}{}
	const postBunch int = 30
	dbResponse := db.database.Table(typedDB.TABLES.POSTS).Offset(postBunch * page).Limit(postBunch).Order("date_of_creation desc").Scan(&dbResult)
	dbPageCount := db.database.Raw("SELECT COUNT(*) FROM posts").Scan(&dbPageResult)
	pageCount := math.Ceil(float64(dbPageResult["COUNT(*)"].(int64) / 30))
	fmt.Println(dbPageCount, pageCount)
	if dbResponse.Error != nil {
		log.Println("GetNewsLine ex", dbResponse.Error)
		return []*models.Post{}, 0 ,errors.New("ERROR! You got error on GetNewsLine method in DB")
	}

	return dbResult, int(pageCount) ,nil
}


func (db *DB) GetUserDataWithPosts(username string, name string ,page int) (map[string]interface{}, error) {
	var userData *models.User
	var userPosts *[]models.Post
	var userSubscription *models.Subscriptions
	var userCounts = map[string]interface{}{}
	dbResult :=  utils.StandardMap{}
	dbUserDataResponse := db.database.Table(typedDB.TABLES.USERS).Where("username = ?", username).Take(&userData)
	dbSubscription := db.database.Table(typedDB.TABLES.SUBSCRIPTIONS).Where("owner = ? AND subscriber = ?", username, name).Find(&userSubscription)
	dbCounter := db.database.Table(typedDB.TABLES.SUBSCRIPTIONS).Raw("SELECT x.owner_count, y.subscriber_count FROM (SELECT COUNT(*) AS owner_count from user_subscription WHERE OWNER = ?) AS x, (SELECT COUNT(*) AS subscriber_count FROM user_subscription WHERE subscriber = ?) as y", username, username).Scan(&userCounts)
	if (userData.IsPrivate == 1 && userSubscription.Status == 2) || userData.IsPrivate == 0 {
		dbUserPostsResponse := db.database.Table(typedDB.TABLES.POSTS).Where("owner = ?", username).Scan(&userPosts)
		if  dbUserPostsResponse.Error != nil {
			return map[string]interface{}{}, errors.New("ERROR! You got an error on database catching")
		}
		dbResult.AddToMap("userPosts", userPosts)
		dbResult.AddToMap("isPrivate", false)
	} else {
		dbResult.AddToMap("userPosts", map[string]interface{}{
			"status": "Locked.User doesn't give permission",
			"statusCode": 1,
		})
		dbResult.AddToMap("isPrivate", true)
	}
	dbResult.AddToMap("counts", userCounts)

	if userSubscription.Owner == "" && userSubscription.Subscriber == "" {
		dbResult.AddToMap("isSubscribe", false)
	} else {
		dbResult.AddToMap("isSubscribe", true)
	}


	if dbUserDataResponse.Error != nil || dbSubscription.Error != nil || dbCounter.Error != nil {
		return map[string]interface{}{}, errors.New("ERROR! You got an error on database catching")
	}
		if userData.Password != "" {
	userData.Password = ""
	}
	dbResult.AddToMap("isSubscribed", userSubscription)
	dbResult.AddToMap("userData", userData)
	return dbResult, nil
}


func (db *DB) SubscribeUser(owner string, subscriber string) (bool, error) {
	subscription :=  models.Subscriptions{}
	subscription.Subscriber = subscriber
	subscription.Owner = owner
	subscription.CreatedAt = time.Now()
	subscription.UpdatedAt = time.Now()
	ownerUser := models.User{}
	var countOfResponses int = 0

	dbUserResponse := db.database.Table(typedDB.TABLES.USERS).Where("username = ?", owner).Take(&ownerUser)
	dbSubscriptionResponse := db.database.Raw("Select COUNT(*) FROM user_subscription WHERE owner = ? AND subscriber = ?", owner, subscriber).Scan(&countOfResponses)

	if dbUserResponse.Error != nil || countOfResponses != 0 || dbSubscriptionResponse.Error != nil || owner == subscriber {
		return false, errors.New("ERROR!This user doesnt exists")
	}
	if ownerUser.IsPrivate == 1 {
		subscription.Status = 1
	} else {
		subscription.Status = 2
	}
	if dbSubscriptionResponse := db.database.Table(typedDB.TABLES.SUBSCRIPTIONS).Create(&subscription); dbSubscriptionResponse.Error != nil {
		return false, errors.New("ERROR!Something went wrong")
	}
	return true, nil
}


//TODO сделать на флаг isLock, ed если да, и есть доступ(новая таблица user_permissions) тогда возращать и посты пользователя, а если нет тогда возращать только данные пользователя