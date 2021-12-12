FROM openjdk:8-jdk-stretch
WORKDIR /java
ENV JAVA_HOME=/java/openjdk-8
ENV PATH=/java/openjdk-8/bin

FROM maven:3.6-jdk-8-slim AS build
COPY . /usr/src/app/
WORKDIR /usr/src/app/
RUN mvn -f /usr/src/app/pom.xml clean package
CMD ["mvn", "spring-boot:run"]


