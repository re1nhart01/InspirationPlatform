package routes

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"reflect"
	"server/database"
	"server/utils"
)

func Posts(route *gin.Engine, db *database.DB) {
	router := route.Group("/posts")
	{
		router.POST("/add", func (c *gin.Context) {
			var requestData = map[string]interface{}{}
			//var requestFiles = map[string]interface{}{}
			form, err := c.MultipartForm()
			val := form.Value
			files := form.File["image"]
			fmt.Println(files)
			var a int = 0
			for key, value := range val {
				fmt.Println(key, value)
				if len(value) > 1 {
					requestData[key] = value
				} else {
					requestData[key] = value[0]
				}
				a++
					fmt.Println(reflect.TypeOf(key), key, value, val[key])
			}
			name, _, _ := utils.ParseHeader(c)
			fileIndex := 0
			for _, file := range files {
				fileExtension := filepath.Ext(file.Filename)
				if _, err := os.Stat("storage/" + name + "/" + "posts/1"); os.IsNotExist(err) {
					os.Mkdir("storage/" + name + "/" + "posts", 777)
					os.Mkdir("storage/" + name + "/" + "posts/1", 777)
				}
				if err := c.SaveUploadedFile(file, fmt.Sprintf("storage/%s/posts/1/%d%s", name, fileIndex, fileExtension)); err != nil {
					c.String(http.StatusBadRequest, fmt.Sprintf("upload file err: %s", err.Error()))
					fmt.Println( fmt.Sprintf("/storage/%s/posts/1/%d%s", name, fileIndex, fileExtension), fileIndex)
					return
				}
				fileIndex++
			}
			if err != nil {
				log.Println("Error!, something went wrong on request body", err)
			}
			if err != nil {
				c.JSON(http.StatusLocked, map[string]interface{}{
					"message": "Locked!Bad Token",
				})
			} else {
				requestData["owner"] = name
				requestData["like_id"] = name
				result, errDB := db.AddPost(name, requestData)
				if errDB != nil {
					c.JSON(http.StatusLocked, map[string]interface{}{
						"message": "Locked!Bad RequestData",
					})
				} else {
					c.JSON(http.StatusOK, map[string]interface{}{
						"isGood": result,
						"data": requestData,
					})
				}
			}
		})
		router.POST("/test", func(c *gin.Context) {
			var requestData  = map[string]interface{}{}
			c.Request.ParseForm()
			for key, value := range c.Request.PostForm {
				requestData[key] = value
				fmt.Println(key, value)
			}
			fmt.Println(requestData)
		})
	}
}