package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/pingcap/tiup/pkg/cluster"
	"github.com/pingcap/tiup/pkg/cluster/spec"
)

var tidbSpec *spec.SpecManager
var manager *cluster.Manager

func main() {
	if err := spec.Initialize("cluster"); err != nil {
		panic("initialize spec failed")
	}
	tidbSpec = spec.GetSpecManager()
	manager = cluster.NewManager("tidb", tidbSpec)

	router := gin.Default()
	api := router.Group("/api")
	{
		api.POST("/deploy", deployHandler)
	}
	router.Run()
}

func deployHandler(c *gin.Context) {
	fmt.Println("start to deploy")
	// parse request parameters
	// manager.Deploy()
	c.JSON(http.StatusOK, gin.H{
		"message": "success",
	})
}
