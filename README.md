# LIMITED STREAM API

Initialize project
Project is using docker & docker-compose for running - docker compose rund two containers: Express API (api) and Redis session storage (redis)

```
git clone https://github.com/sebastianluszczek/limited_stream_API.git

cd limited_stream_API

npm i

docker-compose up --build
```

Application use session and cookies to store informations about currently watched videos. Normaly when video stream is played client ask for parial response & server send responses to client with 206 status code. Each of this request will be catched by utility function witch:

1. check if user have streams info saved in session
2. if not: save new object with video ID and time of request
3. if yes: check if current requestet video in session
4. filter saved streams info - remove those objects older than 10s (if stream play user send request more often than 10s)
5. if user have in filtered session 3 or more streams and current request video not in those 3, utility function return error, end user get response 403 with info that he could only stream max 3 videos at the same time
6. else updated streams are returned to be saved in session object

## API only simulate how this kind of service should work. Videos resources are hardcoded!

Session is stored in redis service so it could be used by more than one instance of API service.
