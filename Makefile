.PHONY: install build serve clean

install: ## Install dependencies
	bundle install

build: ## Build the site
	bundle exec jekyll build

serve: ## Serve the site locally with live reload
	bundle exec jekyll serve --livereload

clean: ## Clean the generated site
	bundle exec jekyll clean

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help
