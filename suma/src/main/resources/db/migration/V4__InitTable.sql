SET SCHEMA 'suma';

CREATE TABLE product(
    id serial primary key,
    uuid varchar,
    name varchar,
    description text,
    category bigint,
    available bigint,
    count bigint,
    price decimal(10,2),
    mainImg text,
    images text[],
    active boolean,
    create_date date
)