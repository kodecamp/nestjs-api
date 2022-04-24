
SELECT * FROM DEPARTMENT;
SELECT * FROM EMPLOYEE;

drop table Order_Item;
drop table Customer_Order;

create table Customer (id serial primary key, name varchar(100), address varchar(100));

create table Customer_Order (id serial primary key, title varchar(100));
create table Order_Item (id serial, title varchar(100), fk_order_id int,
  primary key(id), foreign key(fk_order_id) references Customer_Order(id));

insert into Customer(name, address) values ('Rakesh', 'Delhi');
insert into Customer(name, address) values ('Sunil', 'Allahabad');
insert into Customer(name, address) values ('Sushil', 'Lucknow');
-- Customer Order
insert into Customer_Order(title) values ('Heathcare Products');
insert into Customer_Order(title) values ('Cosmatics');
insert into Customer_Order(title) values ('Electronics');

-- Orders
insert into Order_Item (title , fk_order_id) values ('Proteinex', 1);
insert into Order_Item (title , fk_order_id) values ('Fish Oil', 1);
insert into Order_Item (title , fk_order_id) values ('Omega 3', 1);

insert into Order_Item (title , fk_order_id) values ('Lipstics', 2);
insert into Order_Item (title , fk_order_id) values ('Eye Shadows', 2);
insert into Order_Item (title , fk_order_id) values ('Lib Balm', 2);

insert into Order_Item (title , fk_order_id) values ('t1', 3);
insert into Order_Item (title , fk_order_id) values ('t2', 3);
insert into Order_Item (title , fk_order_id) values ('t3', 3);

create table customer(cust_id bigint auto_increment,name varchar2);
insert into customer (name) values ('suresh');
insert into customer (name) values ('rakesh');
insert into customer (name) values ('dinesh');

create table shipping_address(fk_cust_id bigint,address varchar2, primary key(fk_cust_id), foreign key(fk_cust_id) references customer(cust_id));

insert into shipping_address (fk_cust_id, address) values (1,'surat');
insert into shipping_address (fk_cust_id, address) values (2,'raipur');
insert into shipping_address (fk_cust_id, address) values (3,'delhi');


create table new_order_details(
  id1 bigint auto_increment,
  id2 bigint auto_increment,
  title varchar2,
  primary key(id1, id2));

create table new_order_item(
  id bigint auto_increment,
  title varchar2,
  fk_order_id1 bigint,
  fk_order_id2 bigint,
  primary key(id),
  foreign key(fk_order_id1,fk_order_id2) references new_order_details(id1,id2)
);

insert into customer (name) values ('suresh');
insert into customer (name) values ('rakesh');
insert into customer (name) values ('dinesh');
