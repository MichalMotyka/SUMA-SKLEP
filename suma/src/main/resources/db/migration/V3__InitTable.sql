SET SCHEMA 'suma';

CREATE TABLE category(
    id serial primary key,
    uuid varchar not null,
    name varchar not null,
    is_subcategory boolean default false,
    supercategory bigint,
    FOREIGN KEY (supercategory) REFERENCES category(id)
);


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
);

CREATE TABLE basket(
   id serial primary key,
   uuid varchar not null unique,
   last_edit date default now()
);

CREATE TABLE basket_item(
    id serial primary key,
    uuid varchar not null unique,
    product bigint not null,
    basket bigint not null,
    quantity int default 1,
    price decimal(10,2),
    FOREIGN KEY (product) REFERENCES  product(id),
    FOREIGN KEY (basket) REFERENCES basket(id)
);

