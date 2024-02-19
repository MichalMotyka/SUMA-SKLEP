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

CREATE TABLE IF NOT EXISTS wm_documents (
       id BIGINT PRIMARY KEY,
       uuid VARCHAR,
       createDate DATE,
       state VARCHAR
);

CREATE TABLE IF NOT EXISTS wm_products (
      id serial PRIMARY KEY,
      uuid VARCHAR,
      product_id BIGINT,
      wmDocuments_id BIGINT,
      quantity BIGINT,
      FOREIGN KEY (product_id) REFERENCES Product(id) ON DELETE CASCADE,
      FOREIGN KEY (wmDocuments_id) REFERENCES wm_documents(id) ON DELETE CASCADE
);

CREATE TABLE deliver(
    id serial primary key,
    uuid varchar,
    type varchar,
    image text,
    price decimal(10,2)
);

CREATE TABLE zm_documents (
      id serial PRIMARY KEY,
      uuid VARCHAR NOT NULL,
      create_date DATE,
      document_id BIGINT,
      state VARCHAR,
      name VARCHAR,
      surname VARCHAR,
      company_name VARCHAR,
      nip VARCHAR,
      invoicing BOOLEAN,
      home_number VARCHAR,
      street VARCHAR,
      city VARCHAR,
      post_code VARCHAR,
      email VARCHAR,
      phone_number VARCHAR,
      info TEXT,
      FOREIGN KEY (document_id) REFERENCES wm_documents(id)
);

