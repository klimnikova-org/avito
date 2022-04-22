export DOCKER_REPOSITORY := "klimnikova"
export APP_NAME := "avito"
export VERSION := $(if $(VERSION),$(VERSION),$(if $(COMMIT_SHA),$(COMMIT_SHA),$(shell git rev-parse --verify HEAD)))

.PHONY: build
build:
	@docker build -f ./Dockerfile -t ${DOCKER_REPOSITORY}/${APP_NAME}:${VERSION} .

.PHONY: psql_exec
psql_exec:
	@docker-compose run --rm postgres psql -h postgres -p 5432 -d avito -U db_user