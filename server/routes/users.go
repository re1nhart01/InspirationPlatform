package routes

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"server/database"
	"server/utils"
)

func Users(route *gin.Engine, db *database.DB) {
	router := route.Group("/users")
	{
		router.GET("/me", func(c *gin.Context) {
			if len(c.Request.Header.Get("Authorization")) > 10 {
				name, email, err := utils.ParseHeader(c)
				fmt.Println(name, email, 5427)
				data := db.Me(name)
				if err != nil {
					c.JSON(http.StatusLocked, map[string]interface{}{
						"message": "Bad Token!",
					})
				} else {
					c.JSON(http.StatusOK, map[string]interface{}{
						"me":   true,
						"data": data,
						"avatar" : "http://" + c.Request.Host + "/storage/" + name + "/avatar/avatar.png",
					})
				}
			}
		})
		router.GET("/check", func (c *gin.Context) {
			if len(c.Request.Header.Get("Authorization")) > 10 {
				name, _, err := utils.ParseHeader(c)
				if err != nil {
					c.JSON(http.StatusLocked, map[string]interface{}{
						"message": "Bad Token!",
					})
				} else {
					user, err := db.CheckToken(name)
					if err != nil {
						c.JSON(http.StatusLocked, map[string]interface{}{
							"message": "Bad Data!",
						})
					} else {
						c.JSON(http.StatusOK, map[string]interface{}{
							"message": "Accepted!",
							"currentUser": user,
						})
					}
				}
			}
		})
	}
}

//fmt.Println(c.Request.Host+c.Request.URL.Path)