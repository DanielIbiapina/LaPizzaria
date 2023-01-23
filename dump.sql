--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: clients; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.clients (
    id integer NOT NULL,
    name character varying NOT NULL,
    address character varying NOT NULL,
    phone character varying NOT NULL
);


--
-- Name: clients_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.clients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: clients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.clients_id_seq OWNED BY public.clients.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    "clientId" integer NOT NULL,
    "pizzaId" integer NOT NULL,
    quantity integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "totalPrice" numeric NOT NULL
);


--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: pizzas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pizzas (
    id integer NOT NULL,
    name character varying NOT NULL,
    price numeric NOT NULL,
    image character varying NOT NULL,
    description text NOT NULL
);


--
-- Name: pizzas_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.pizzas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pizzas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.pizzas_id_seq OWNED BY public.pizzas.id;


--
-- Name: clients id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clients ALTER COLUMN id SET DEFAULT nextval('public.clients_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: pizzas id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pizzas ALTER COLUMN id SET DEFAULT nextval('public.pizzas_id_seq'::regclass);


--
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.clients VALUES (1, 'Fulana', 'Rua tal', '2199999999');


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.orders VALUES (1, 1, 1, 2, '2023-01-23 16:03:45.153508', 26);


--
-- Data for Name: pizzas; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.pizzas VALUES (1, 'Calabresa', 25.00, 'encurtador.com.br/iDIX0', 'Pizza de calabresa com molho de tomate e cebola');
INSERT INTO public.pizzas VALUES (2, 'Marguerita', 10, 'encurtador.com.br/iDIX0', 'Pizza sem recheio');


--
-- Name: clients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.clients_id_seq', 1, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.orders_id_seq', 1, true);


--
-- Name: pizzas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.pizzas_id_seq', 2, true);


--
-- Name: clients clients_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: pizzas pizzas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pizzas
    ADD CONSTRAINT pizzas_pkey PRIMARY KEY (id);


--
-- Name: orders orders_clientId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "orders_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES public.clients(id);


--
-- Name: orders orders_pizzaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "orders_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES public.pizzas(id);


--
-- PostgreSQL database dump complete
--

