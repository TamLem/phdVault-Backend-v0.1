docker run --rm --name some-mysql -p 3307:3306 -e MYSQL_ROOT_PASSWORD=pass -e MYSQL_DATABASE=db -e MYSQL_USER=admin -e MYSQL_PASSWORD=pass -d mysql:latest

