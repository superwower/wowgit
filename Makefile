DOCKER_WOWGIT:=docker-compose -f docker-compose.dev.yml run --service-ports wowgit
NPM_SCRIPTS:=$(shell $(DOCKER_WOWGIT) npm run-script | grep "^\s\s\w" | sed 's/:/-/g')
NPM_COMMANDS := access adduser audit bin bugs c cache ci cit completion config create ddp dedupe deprecate dist-tag docs doctor edit explore get help help-search hook i init install install-test it link list ln login logout ls outdated owner pack ping prefix profile prune publish rb rebuild repo restart root run run-script s se search set shrinkwrap star stars stop t team token tst un uninstall unpublish unstar up update v version view whoami

.PHONY: $(NPM_SCRIPTS)
$(NPM_SCRIPTS): %:
	@$(DOCKER_WOWGIT) npm run $@

.PHONY: $(NPM_COMMANDS)
$(NPM_COMMANDS): %:
	@$(DOCKER_WOWGIT) npm $@

.PHONY: prod
prod: clean install build start
