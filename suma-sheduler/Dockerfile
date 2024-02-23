FROM maven:3.9.5-amazoncorretto-17 AS builder

WORKDIR /app
COPY . .

# Budujemy aplikację Mavenem
RUN mvn clean install -Dmaven.test.skip=true

FROM openjdk:17
WORKDIR /app
COPY --from=builder /app/target/suma-scheduler-0.0.1-SNAPSHOT.jar .

CMD ["java", "-jar" ,"suma-scheduler-0.0.1-SNAPSHOT.jar"]