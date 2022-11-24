drop table if exists offering;
drop table if exists prerequisite;
drop table if exists registration;
drop table if exists course;


create table if not exists student (
    uuid varchar(36) not null,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    email varchar(255) not null,
    primary key (uuid)
);
create table if not exists course (
    uuid varchar(36) not null,
    name varchar(255) not null,
    number varchar(255) not null,
    department_uuid varchar(36) not null,
    primary key (uuid)
);

create table if not exists registration (
    student_uuid varchar(36) not null,
    course_uuid varchar(36) not null,
    section_number int not null,
    grade varchar(2),
    status varchar(255) not null,
    primary key (student_uuid, course_uuid, section_number),
    foreign key (student_uuid) references student (uuid),
    foreign key (course_uuid) references course (uuid)
);

create table if not exists prerequisite (
    uuid varchar(36) not null,
    course_uuid varchar(36) not null,
    prerequisite_course_uuid varchar(36) not null,
    primary key (uuid),
    foreign key (course_uuid) references course (uuid),
    foreign key (prerequisite_course_uuid) references course (uuid)
);

create table if not exists offering (
    uuid varchar(36) not null,
    course_uuid varchar(36) not null,
    section_number int not null,
    year int not null,
    semester varchar(255) not null,
    primary key (uuid),
    foreign key (course_uuid) references course (uuid)
);


create table if not exists department (
    uuid varchar(36) not null,
    name varchar(255) not null,
    primary key (uuid)
);

create table if not exists admin (
    uuid varchar(36) not null,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    email varchar(255) not null,
    password varchar(255) not null,
    department_uuid varchar(36) not null,
    primary key (uuid),
    foreign key (department_uuid) references department (uuid)
);


