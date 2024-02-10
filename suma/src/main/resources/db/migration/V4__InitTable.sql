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
    main_img text,
    images text[],
    active boolean,
    create_date date,
    properties jsonb,
    FOREIGN KEY (category) REFERENCES category(id)
)