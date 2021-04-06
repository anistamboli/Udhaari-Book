PGDMP         	                y            udhaari_book    13.2    13.2 (    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16394    udhaari_book    DATABASE     h   CREATE DATABASE udhaari_book WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_India.1252';
    DROP DATABASE udhaari_book;
                postgres    false            �            1259    16400    consumer    TABLE     �   CREATE TABLE public.consumer (
    contact bigint NOT NULL,
    name character varying(30) NOT NULL,
    address character varying(50) NOT NULL,
    password character varying(20)
);
    DROP TABLE public.consumer;
       public         heap    postgres    false            �            1259    16431    consumer_product_vendor    TABLE       CREATE TABLE public.consumer_product_vendor (
    id integer NOT NULL,
    consumer_contact bigint,
    vendor_contact bigint,
    product_id integer,
    quantity double precision NOT NULL,
    date_purchase date NOT NULL,
    time_purchase time without time zone
);
 +   DROP TABLE public.consumer_product_vendor;
       public         heap    postgres    false            �            1259    16429    consumer_product_vendor_id_seq    SEQUENCE     �   CREATE SEQUENCE public.consumer_product_vendor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.consumer_product_vendor_id_seq;
       public          postgres    false    206            �           0    0    consumer_product_vendor_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.consumer_product_vendor_id_seq OWNED BY public.consumer_product_vendor.id;
          public          postgres    false    205            �            1259    16454    payment_history    TABLE     %  CREATE TABLE public.payment_history (
    id integer NOT NULL,
    consumer_contact bigint,
    vendor_contact bigint,
    total_amount double precision NOT NULL,
    payed_amount double precision NOT NULL,
    remaining_amount double precision NOT NULL,
    transaction_date date NOT NULL
);
 #   DROP TABLE public.payment_history;
       public         heap    postgres    false            �            1259    16452    payment_history_id_seq    SEQUENCE     �   CREATE SEQUENCE public.payment_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.payment_history_id_seq;
       public          postgres    false    208            �           0    0    payment_history_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.payment_history_id_seq OWNED BY public.payment_history.id;
          public          postgres    false    207            �            1259    16423    product    TABLE     �   CREATE TABLE public.product (
    id integer NOT NULL,
    name character varying(30) NOT NULL,
    base_price double precision NOT NULL
);
    DROP TABLE public.product;
       public         heap    postgres    false            �            1259    16421    product_id_seq    SEQUENCE     �   CREATE SEQUENCE public.product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.product_id_seq;
       public          postgres    false    204            �           0    0    product_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;
          public          postgres    false    203            �            1259    16395    vendor    TABLE     �   CREATE TABLE public.vendor (
    contact bigint NOT NULL,
    name character varying(30) NOT NULL,
    shop_name character varying(30) NOT NULL,
    shop_address character varying(50) NOT NULL,
    password character varying(20)
);
    DROP TABLE public.vendor;
       public         heap    postgres    false            �            1259    16405    vendor_consumer    TABLE     i  CREATE TABLE public.vendor_consumer (
    vendor_contact bigint,
    consumer_contact bigint,
    threshold double precision DEFAULT 0,
    start_date date NOT NULL,
    due_date date,
    balance double precision DEFAULT 0,
    CONSTRAINT vendor_consumer_threshold_check CHECK (((threshold > (0)::double precision) AND (threshold < (1)::double precision)))
);
 #   DROP TABLE public.vendor_consumer;
       public         heap    postgres    false            >           2604    16434    consumer_product_vendor id    DEFAULT     �   ALTER TABLE ONLY public.consumer_product_vendor ALTER COLUMN id SET DEFAULT nextval('public.consumer_product_vendor_id_seq'::regclass);
 I   ALTER TABLE public.consumer_product_vendor ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    206    205    206            ?           2604    16457    payment_history id    DEFAULT     x   ALTER TABLE ONLY public.payment_history ALTER COLUMN id SET DEFAULT nextval('public.payment_history_id_seq'::regclass);
 A   ALTER TABLE public.payment_history ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    208    207    208            =           2604    16426 
   product id    DEFAULT     h   ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);
 9   ALTER TABLE public.product ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    204    203    204            �          0    16400    consumer 
   TABLE DATA           D   COPY public.consumer (contact, name, address, password) FROM stdin;
    public          postgres    false    201   �3       �          0    16431    consumer_product_vendor 
   TABLE DATA           �   COPY public.consumer_product_vendor (id, consumer_contact, vendor_contact, product_id, quantity, date_purchase, time_purchase) FROM stdin;
    public          postgres    false    206   �3       �          0    16454    payment_history 
   TABLE DATA           �   COPY public.payment_history (id, consumer_contact, vendor_contact, total_amount, payed_amount, remaining_amount, transaction_date) FROM stdin;
    public          postgres    false    208   4       �          0    16423    product 
   TABLE DATA           7   COPY public.product (id, name, base_price) FROM stdin;
    public          postgres    false    204   #4       �          0    16395    vendor 
   TABLE DATA           R   COPY public.vendor (contact, name, shop_name, shop_address, password) FROM stdin;
    public          postgres    false    200   @4       �          0    16405    vendor_consumer 
   TABLE DATA           u   COPY public.vendor_consumer (vendor_contact, consumer_contact, threshold, start_date, due_date, balance) FROM stdin;
    public          postgres    false    202   ]4       �           0    0    consumer_product_vendor_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.consumer_product_vendor_id_seq', 1, false);
          public          postgres    false    205            �           0    0    payment_history_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.payment_history_id_seq', 1, false);
          public          postgres    false    207            �           0    0    product_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.product_id_seq', 1, false);
          public          postgres    false    203            C           2606    16404    consumer consumer_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.consumer
    ADD CONSTRAINT consumer_pkey PRIMARY KEY (contact);
 @   ALTER TABLE ONLY public.consumer DROP CONSTRAINT consumer_pkey;
       public            postgres    false    201            G           2606    16436 4   consumer_product_vendor consumer_product_vendor_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.consumer_product_vendor
    ADD CONSTRAINT consumer_product_vendor_pkey PRIMARY KEY (id);
 ^   ALTER TABLE ONLY public.consumer_product_vendor DROP CONSTRAINT consumer_product_vendor_pkey;
       public            postgres    false    206            I           2606    16459 $   payment_history payment_history_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.payment_history
    ADD CONSTRAINT payment_history_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.payment_history DROP CONSTRAINT payment_history_pkey;
       public            postgres    false    208            E           2606    16428    product product_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.product DROP CONSTRAINT product_pkey;
       public            postgres    false    204            A           2606    16399    vendor vendor_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.vendor
    ADD CONSTRAINT vendor_pkey PRIMARY KEY (contact);
 <   ALTER TABLE ONLY public.vendor DROP CONSTRAINT vendor_pkey;
       public            postgres    false    200            L           2606    16437 E   consumer_product_vendor consumer_product_vendor_consumer_contact_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.consumer_product_vendor
    ADD CONSTRAINT consumer_product_vendor_consumer_contact_fkey FOREIGN KEY (consumer_contact) REFERENCES public.consumer(contact);
 o   ALTER TABLE ONLY public.consumer_product_vendor DROP CONSTRAINT consumer_product_vendor_consumer_contact_fkey;
       public          postgres    false    2883    206    201            N           2606    16447 ?   consumer_product_vendor consumer_product_vendor_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.consumer_product_vendor
    ADD CONSTRAINT consumer_product_vendor_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(id);
 i   ALTER TABLE ONLY public.consumer_product_vendor DROP CONSTRAINT consumer_product_vendor_product_id_fkey;
       public          postgres    false    2885    206    204            M           2606    16442 C   consumer_product_vendor consumer_product_vendor_vendor_contact_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.consumer_product_vendor
    ADD CONSTRAINT consumer_product_vendor_vendor_contact_fkey FOREIGN KEY (vendor_contact) REFERENCES public.vendor(contact);
 m   ALTER TABLE ONLY public.consumer_product_vendor DROP CONSTRAINT consumer_product_vendor_vendor_contact_fkey;
       public          postgres    false    206    2881    200            O           2606    16460 5   payment_history payment_history_consumer_contact_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.payment_history
    ADD CONSTRAINT payment_history_consumer_contact_fkey FOREIGN KEY (consumer_contact) REFERENCES public.consumer(contact);
 _   ALTER TABLE ONLY public.payment_history DROP CONSTRAINT payment_history_consumer_contact_fkey;
       public          postgres    false    2883    208    201            P           2606    16465 3   payment_history payment_history_vendor_contact_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.payment_history
    ADD CONSTRAINT payment_history_vendor_contact_fkey FOREIGN KEY (vendor_contact) REFERENCES public.vendor(contact);
 ]   ALTER TABLE ONLY public.payment_history DROP CONSTRAINT payment_history_vendor_contact_fkey;
       public          postgres    false    200    208    2881            K           2606    16416 5   vendor_consumer vendor_consumer_consumer_contact_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.vendor_consumer
    ADD CONSTRAINT vendor_consumer_consumer_contact_fkey FOREIGN KEY (consumer_contact) REFERENCES public.consumer(contact);
 _   ALTER TABLE ONLY public.vendor_consumer DROP CONSTRAINT vendor_consumer_consumer_contact_fkey;
       public          postgres    false    202    201    2883            J           2606    16411 3   vendor_consumer vendor_consumer_vendor_contact_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.vendor_consumer
    ADD CONSTRAINT vendor_consumer_vendor_contact_fkey FOREIGN KEY (vendor_contact) REFERENCES public.vendor(contact);
 ]   ALTER TABLE ONLY public.vendor_consumer DROP CONSTRAINT vendor_consumer_vendor_contact_fkey;
       public          postgres    false    200    202    2881            �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �     