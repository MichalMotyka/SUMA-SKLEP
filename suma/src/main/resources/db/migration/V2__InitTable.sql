SET SCHEMA 'suma';

CREATE TABLE users (
       id SERIAL PRIMARY KEY,
       uuid VARCHAR(255) not null ,
       login VARCHAR(255) not null ,
       email VARCHAR(255) not null ,
       password VARCHAR(255) not null ,
       islock BOOLEAN default true,
       isenabled BOOLEAN default false,
       author BIGINT,
       FOREIGN KEY (author) REFERENCES users(id)
);

CREATE TABLE user_roles (
        id SERIAL PRIMARY KEY,
        user_id BIGINT,
        role VARCHAR(255),
        FOREIGN KEY (user_id) REFERENCES suma.users(id)
);


INSERT INTO users (id,uuid, login, email, "password", islock, isenabled)
VALUES(1,'513a7259-ca14-44ee-b914-70912ed4446b', 'Administrator', 'Administrator', '$2a$10$uOCn5iOMU9GdD26pnybvP.9pRSE3TDGeD98iD7dFMtcCYm10XdOim', false, true);

INSERT INTO suma.user_roles(user_id, "role") VALUES(1, 'ROLE_ADMIN');
