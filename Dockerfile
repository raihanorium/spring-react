FROM amazoncorretto:21-alpine3.16
COPY build/libs/spring-react-0.0.1-SNAPSHOT.jar /app.jar
ENTRYPOINT ["java","-jar","/app.jar"]