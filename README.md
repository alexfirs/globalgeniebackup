# globegeniebackup
In memory of beloved project https://globegenie.com

## Why
Many, many years ago I found the Globegenie project - at that time, 2010, it was running on a personal page subfolder at https://web.mit.edu/~jmcmicha/www/globegenie/ and then moved to a dedicated website globegenie.com. I used to surf it from time to time to see the places I'll never visit but on one of November mornings the site was discontinued. To not to miss such a wonderful resource I recovered a copy and made it available through the docker image.

## Usage
### Docker
Build docker image locally and run 
```
docker build -t globegeniebackup .
docker run -d -p 8080:80 globegeniebackup
```
**or** download and run it from Dockerhub
```
docker pull alexfirs/globegeniebackup:latest
docker run -d -p 8080:80 alexfirs/globegeniebackup:latest
```
and surf to http://localhost:8080/

### Http server
You don't need to use docker/kubernetes, just serve static files with any http server such as IIS, Apache, nginx or any other you want. There's no business logic, just static html, styles and some javascript to integrate with google maps which runs by your browser

# Licensing
I'm not sure about the licensing here - meanwhile I'm trying to reach the original author Joseph G. McMichael http://www.joemcmichael.com/