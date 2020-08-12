.PHONY: server run

DASHBOARD_PKG := github.com/baurine/tiup-ui

BUILD_TAGS ?=

LDFLAGS ?=

default: server

server: 
	go build -o bin/tiup-ui -ldflags '$(LDFLAGS)' -tags "${BUILD_TAGS}" cmd/main.go

run:
	bin/tiup-ui
