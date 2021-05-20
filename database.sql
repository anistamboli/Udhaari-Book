create table vendor(contact bigint primary key, name varchar(30) not null, shop_name varchar(30) not null, shop_address varchar(50) not null, password varchar(20));
create table consumer(contact bigint primary key, name varchar(30) not null, address varchar(50) not null, password varchar(20));
create table vendor_consumer(vendor_contact bigint, foreign key(vendor_contact) references vendor(contact), consumer_contact bigint, foreign key(consumer_contact) references consumer(contact), threshold float default 0 check (threshold>0 and threshold<1), start_date date not null, due_date date, balance float default 0, consumer_name varchar(20), billing_start_date date);
create table product(id serial primary key,  name varchar(30) not null, base_price float not null);
create table transaction_history (id bigint primary key, type varchar(10) not null check (type='payment' or type='purchase'), transaction_amount float not null, transaction_date date not null , transaction_time time not null, vendor_contact bigint  references vendor(contact), consumer_contact bigint  references consumer(contact));
create table consumer_product_vendor(id serial primary key, consumer_contact bigint, foreign key(consumer_contact) references consumer(contact), vendor_contact bigint, foreign key(vendor_contact) references vendor(contact), product_id int, foreign key(product_id) references product(id), quantity float not null, date_purchase date not null, time_purchase time, total_price float not null, tr_id bigint references transaction_history(id) );
create table payment_history(id serial primary key, consumer_contact bigint, foreign key(consumer_contact) references consumer(contact), vendor_contact bigint, foreign key(vendor_contact) references vendor(contact), total_amount float not null, payed_amount float not null, remaining_amount float not null, transaction_date date not null, transaction_time time, tr_id bigint references transaction_history(id) )