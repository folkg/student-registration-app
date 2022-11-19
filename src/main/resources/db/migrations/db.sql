-- create table if not exists student (
--     uuid varchar(36) not null,
--     first_name varchar(255) not null,
--     last_name varchar(255) not null,
--     email varchar(255) not null,
--     primary key (uuid)
-- );
-- create table if not exists course (
--     uuid varchar(36) not null,
--     name varchar(255) not null,
--     number varchar(255) not null,
--     department varchar(255) not null,
--     primary key (uuid)
-- );

-- create table if not exists registration (
--     uuid varchar(36) not null,
--     student_uuid varchar(36) not null,
--     course_uuid varchar(36) not null,
--     section_number int not null,
--     grade varchar(2),
--     status varchar(255) not null,
--     primary key (uuid),
--     foreign key (student_uuid) references student (uuid),
--     foreign key (course_uuid) references course (uuid)
-- );

-- create table if not exists prerequisite (
--     uuid varchar(36) not null,
--     course_uuid varchar(36) not null,
--     prerequisite_course_uuid varchar(36) not null,
--     primary key (uuid),
--     foreign key (course_uuid) references course (uuid),
--     foreign key (prerequisite_course_uuid) references course (uuid)
-- );

-- create table if not exists offering (
--     uuid varchar(36) not null,
--     course_uuid varchar(36) not null,
--     section_number int not null,
--     year int not null,
--     semester varchar(255) not null,
--     primary key (uuid),
--     foreign key (course_uuid) references course (uuid)
-- );


-- -- insert data course data
-- insert into course (uuid, name, number, department) values ('1', 'Introduction to Computer Science', 'CS 101', 'Computer Science');
-- insert into course (uuid, name, number, department) values ('2', 'Introduction to Computer Science II', 'CS 102', 'Computer Science');
-- insert into course (uuid, name, number, department) values ('3', 'Introduction to Computer Science III', 'CS 103', 'Computer Science');

-- -- insert data prerequisite data
-- insert into prerequisite (uuid, course_uuid, prerequisite_course_uuid) values ('1', '2', '1');
-- insert into prerequisite (uuid, course_uuid, prerequisite_course_uuid) values ('2', '3', '2');

-- -- insert data offering data
-- insert into offering (uuid, course_uuid, section_number, year, semester) values ('1', '1', 1, 2018, 'Fall');
-- insert into offering (uuid, course_uuid, section_number, year, semester) values ('2', '2', 1, 2018, 'Fall');
-- insert into offering (uuid, course_uuid, section_number, year, semester) values ('3', '3', 1, 2018, 'Fall');

-- insert data student data
-- insert into student (uuid, first_name, last_name, email, password) values ('4', 'John', 'Doe', 'jjfdj@example.com', 'password');
-- insert into student (uuid, first_name, last_name, email, password) values ('5', 'Jane', 'Doe', 'dj@example.com', 'password');

-- -- insert data registration data
-- insert into registration (uuid, student_uuid, course_uuid, section_number, grade, status) values ('1', '4', '1', 1, 'A', 'complete');
-- insert into registration (uuid, student_uuid, course_uuid, section_number, grade, status) values ('2', '4', '2', 1, 'A', 'complete');

