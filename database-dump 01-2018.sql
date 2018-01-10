--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.6
-- Dumped by pg_dump version 9.6.3

-- Started on 2018-01-09 23:45:43 SGT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2160 (class 1262 OID 16384)
-- Name: govtech; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE govtech WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';


ALTER DATABASE govtech OWNER TO postgres;

\connect govtech

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 12393)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2163 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- TOC entry 187 (class 1259 OID 16399)
-- Name: student_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE student_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE student_id OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 188 (class 1259 OID 16406)
-- Name: students; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE students (
    id integer DEFAULT nextval('student_id'::regclass) NOT NULL,
    email character varying,
    insert_date timestamp without time zone DEFAULT now(),
    status character varying DEFAULT 'active'::character varying
);


ALTER TABLE students OWNER TO postgres;

--
-- TOC entry 186 (class 1259 OID 16396)
-- Name: teacher_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE teacher_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE teacher_id OWNER TO postgres;

--
-- TOC entry 189 (class 1259 OID 16416)
-- Name: teacher_student; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE teacher_student (
    teacher_id integer,
    student_id integer
);


ALTER TABLE teacher_student OWNER TO postgres;

--
-- TOC entry 185 (class 1259 OID 16385)
-- Name: teachers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE teachers (
    id integer DEFAULT nextval('teacher_id'::regclass) NOT NULL,
    email character varying,
    insert_date timestamp without time zone DEFAULT now()
);


ALTER TABLE teachers OWNER TO postgres;

--
-- TOC entry 2169 (class 0 OID 0)
-- Dependencies: 187
-- Name: student_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('student_id', 91, true);


--
-- TOC entry 2154 (class 0 OID 16406)
-- Dependencies: 188
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2170 (class 0 OID 0)
-- Dependencies: 186
-- Name: teacher_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('teacher_id', 8, true);


--
-- TOC entry 2155 (class 0 OID 16416)
-- Dependencies: 189
-- Data for Name: teacher_student; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2151 (class 0 OID 16385)
-- Dependencies: 185
-- Data for Name: teachers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO teachers (id, email, insert_date) VALUES (3, 'teacherken@example.com', '2018-01-03 10:49:05.441789');
INSERT INTO teachers (id, email, insert_date) VALUES (4, 'teacherjoe@example.com', '2018-01-03 10:49:21.050552');
INSERT INTO teachers (id, email, insert_date) VALUES (5, 'teacher1@test.com', '2018-01-07 15:08:44.089966');
INSERT INTO teachers (id, email, insert_date) VALUES (6, 'teacher2@test.com', '2018-01-07 15:08:47.377107');
INSERT INTO teachers (id, email, insert_date) VALUES (7, 'teacher3@test.com', '2018-01-08 14:52:46.456137');
INSERT INTO teachers (id, email, insert_date) VALUES (8, 'teachermary@example.com', '2018-01-09 15:30:02.932118');


--
-- TOC entry 2027 (class 2606 OID 16423)
-- Name: students students_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY students
    ADD CONSTRAINT students_email_key UNIQUE (email);


--
-- TOC entry 2029 (class 2606 OID 16415)
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);


--
-- TOC entry 2031 (class 2606 OID 16465)
-- Name: teacher_student teacher_student_teacher_id_student_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY teacher_student
    ADD CONSTRAINT teacher_student_teacher_id_student_id_key UNIQUE (teacher_id, student_id);


--
-- TOC entry 2023 (class 2606 OID 16395)
-- Name: teachers teachers_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY teachers
    ADD CONSTRAINT teachers_email_key UNIQUE (email);


--
-- TOC entry 2025 (class 2606 OID 16393)
-- Name: teachers teachers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY teachers
    ADD CONSTRAINT teachers_pkey PRIMARY KEY (id);


--
-- TOC entry 2032 (class 2606 OID 16452)
-- Name: teacher_student teacher_student_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY teacher_student
    ADD CONSTRAINT teacher_student_student_id_fkey FOREIGN KEY (student_id) REFERENCES students(id);


--
-- TOC entry 2033 (class 2606 OID 16457)
-- Name: teacher_student teacher_student_teacher_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY teacher_student
    ADD CONSTRAINT teacher_student_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES teachers(id);



--
-- PostgreSQL database dump complete
--

