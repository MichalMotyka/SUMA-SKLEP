SET SCHEMA 'suma';

CREATE TABLE category(
    id serial primary key,
    uuid varchar not null,
    name varchar not null,
    is_subcategory boolean default false,
    supercategory bigint,
    FOREIGN KEY (supercategory) REFERENCES category(id)
)