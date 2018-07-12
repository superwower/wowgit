DOCKER_WOWGIT:=docker-compose -f docker-compose.dev.yml run wowgit

.PHONY: dev
dev:
	$(DOCKER_WOWGIT) npm run dev

.PHONY: test
test:
	$(DOCKER_WOWGIT) npm run test

.PHONY: install
install:
	$(DOCKER_WOWGIT) npm ci

