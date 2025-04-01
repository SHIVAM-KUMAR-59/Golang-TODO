package main

import "github.com/gin-gonic/gin"

func main(){
	r := gin.Default()
	data := "35e635e25e263e525e38"
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": data,
			"code": 200,
		})
	})
	r.Run(":8000")
}