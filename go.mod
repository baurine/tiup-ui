module github.com/baurine/tiup-ui

go 1.14

require (
	github.com/gin-gonic/gin v1.6.3
	github.com/pingcap/tiup v1.0.9
	github.com/rs/cors v1.7.0
)

replace github.com/pingcap/tiup v1.0.9 => github.com/baurine/tiup v0.0.2-0.20200820094342-a42c8b41f696
