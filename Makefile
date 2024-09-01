deploy:
	./bin/deploy
	ssh -A fdm 'cd domains/ousseine.site/public_html && php bin/console importmap:install && php bin/console asset-map:compile && composer2 dump-env prod && composer2 update --no-dev --optimize-autoloader && APP_ENV=prod APP_DEBUG=0 php bin/console cache:clear'
