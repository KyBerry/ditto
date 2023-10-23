-- migrate:up
CREATE EXTENSION IF NOT EXISTS CITEXT;

CREATE TABLE IF NOT EXISTS role_type (
  role_id INTEGER PRIMARY KEY,
  role_name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS role_permission (
  role_permission_id INTEGER PRIMARY KEY,
  role_permission_name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS role_type_permission (
  role_permission_id INTEGER NOT NULL,
  role_id INTEGER NOT NULL,
  PRIMARY KEY (role_permission_id, role_id),
  FOREIGN KEY (role_permission_id) REFERENCES role_permission (role_permission_id),
  FOREIGN KEY (role_id) REFERENCES role_type (role_id)
);

CREATE TABLE IF NOT EXISTS role_capability (
  role_capability_id INTEGER PRIMARY KEY,
  role_capability_name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS role_permission_capability (
  role_permission_id INTEGER NOT NULL,
  role_capability_id INTEGER NOT NULL,
  PRIMARY KEY (role_permission_id, role_capability_id),
  FOREIGN KEY (role_permission_id) REFERENCES role_permission (role_permission_id),
  FOREIGN KEY (role_capability_id) REFERENCES role_capability (role_capability_id)
);

CREATE TABLE IF NOT EXISTS business (
  business_id SERIAL PRIMARY KEY,
  business_name VARCHAR(255) NOT NULL,
  business_description TEXT,
  phone_number VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS country (
  country_id SERIAL PRIMARY KEY,
  country_name VARCHAR(255) NOT NULL UNIQUE,
  country_code VARCHAR(2) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS business_email (
  business_email_id SERIAL PRIMARY KEY,
  email CITEXT NOT NULL,
  business_id INTEGER NOT NULL,
  FOREIGN KEY (business_id) REFERENCES business(business_id)
);

CREATE TABLE IF NOT EXISTS address (
  address_id INTEGER PRIMARY KEY,
  city VARCHAR(255) NOT NULL,
  country_id INT NOT NULL,
  postal_code VARCHAR(20) NOT NULL,
  region VARCHAR(50) NOT NULL,
  street_1 VARCHAR(255) NOT NULL,
  street_2 VARCHAR(255),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (country_id) REFERENCES country(country_id)
);

CREATE TABLE IF NOT EXISTS business_address (
  business_id INTEGER NOT NULL,
  address_id INTEGER NOT NULL,
  PRIMARY KEY (business_id, address_id),
  FOREIGN KEY (business_id) REFERENCES business(business_id) ON DELETE CASCADE,
  FOREIGN KEY (address_id) REFERENCES address(address_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS business_logo (
  business_logo_id SERIAL PRIMARY KEY,
  is_active BOOLEAN NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  alt_text VARCHAR(255),
  business_id INTEGER NOT NULL,
  FOREIGN KEY (business_id) REFERENCES business(business_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS product (
  product_id SERIAL PRIMARY KEY,
  product_description TEXT NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  business_id INTEGER NOT NULL,
  FOREIGN KEY (business_id) REFERENCES business(business_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_account (
  user_account_id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  avatar_id INTEGER,
  business_id INTEGER,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (business_id) REFERENCES business(business_id)
);

CREATE TABLE IF NOT EXISTS status_type (
  status_id SERIAL PRIMARY KEY,
  status_name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS user_invitation (
  user_invitation_id SERIAL PRIMARY KEY,
  token VARCHAR(255) NOT NULL,
  user_account_id INTEGER NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  status_id INTEGER NOT NULL,
  FOREIGN KEY (user_account_id) REFERENCES user_account(user_account_id),
  FOREIGN KEY (status_id) REFERENCES status_type(status_id)
);

CREATE TABLE IF NOT EXISTS user_account_role_type (
  user_account_id INTEGER NOT NULL,
  role_id INTEGER NOT NULL,
  PRIMARY KEY (user_account_id, role_id),
  FOREIGN KEY (user_account_id) REFERENCES user_account(user_account_id),
  FOREIGN KEY (role_id) REFERENCES role_type(role_id)
);

CREATE TABLE IF NOT EXISTS role_custom_permission (
  user_account_id INTEGER NOT NULL,
  role_permission_id INTEGER NOT NULL,
  PRIMARY KEY (user_account_id, role_permission_id),
  FOREIGN KEY (user_account_id) REFERENCES user_account(user_account_id),
  FOREIGN KEY (role_permission_id) REFERENCES role_permission(role_permission_id)
);

CREATE TABLE IF NOT EXISTS suggestion (
  suggestion_id SERIAL PRIMARY KEY,
  contents TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  user_account_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  business_id INTEGER NOT NULL,
  FOREIGN KEY (user_account_id) REFERENCES user_account(user_account_id),
  FOREIGN KEY (product_id) REFERENCES product(product_id),
  FOREIGN KEY (business_id) REFERENCES business(business_id)
);

CREATE TABLE IF NOT EXISTS comment (
  comment_id SERIAL PRIMARY KEY,
  content VARCHAR(255) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,      
  user_account_id INTEGER NOT NULL,
  suggestion_id INTEGER NOT NULL,
  FOREIGN KEY (user_account_id) REFERENCES user_account(user_account_id),
  FOREIGN KEY (suggestion_id) REFERENCES suggestion(suggestion_id)
);

CREATE TABLE IF NOT EXISTS comment_upvote (
  comment_upvote_id SERIAL PRIMARY KEY,
  date_created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  comment_id INTEGER NOT NULL,
  user_account_id INTEGER NOT NULL,
  FOREIGN KEY (comment_id) REFERENCES comment(comment_id) ON DELETE CASCADE,
  FOREIGN KEY (user_account_id) REFERENCES user_account(user_account_id)
);

CREATE TABLE IF NOT EXISTS comment_downvote (
  comment_downvote_id SERIAL PRIMARY KEY,
  date_created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  comment_id INTEGER NOT NULL,
  user_account_id INTEGER NOT NULL,
  FOREIGN KEY (comment_id) REFERENCES comment(comment_id) ON DELETE CASCADE,
  FOREIGN KEY (user_account_id) REFERENCES user_account(user_account_id)
); 

CREATE TABLE IF NOT EXISTS suggestion_upvote (
  suggestion_upvote_id SERIAL PRIMARY KEY,
  date_created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  suggestion_id INTEGER NOT NULL,
  user_account_id INTEGER NOT NULL,
  FOREIGN KEY (suggestion_id) REFERENCES suggestion(suggestion_id) ON DELETE CASCADE,
  FOREIGN KEY (user_account_id) REFERENCES user_account(user_account_id)
);

CREATE TABLE IF NOT EXISTS suggestion_downvote (
  suggestion_downvote_id SERIAL PRIMARY KEY,
  date_created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  suggestion_id INTEGER NOT NULL,
  user_account_id INTEGER NOT NULL,
  FOREIGN KEY (suggestion_id) REFERENCES suggestion(suggestion_id) ON DELETE CASCADE,
  FOREIGN KEY (user_account_id) REFERENCES user_account(user_account_id)
);

INSERT INTO status_type (status_id, status_name) VALUES
(1, 'PENDING'),
(2, 'ACCEPTED'),
(3, 'EXPIRED');

INSERT INTO role_type (role_id, role_name) VALUES 
(1, 'SUPER_ADMIN'),
(2, 'BUSINESS_ADMIN'),
(4, 'BUSINESS_ACCOUNT'),
(5, 'DEFAULT_ACCOUNT');

INSERT INTO role_permission (role_permission_id, role_permission_name) VALUES
(1, 'READ'),
(2, 'WRITE'),
(3, 'UPDATE'),
(4, 'DELETE'),
(5, 'REJECT'),
(6, 'APPROVE'),
(7, 'NO_ACCESS');

INSERT INTO country (country_name, country_code) VALUES 
  ('Afghanistan', 'AF'),
  ('Albania', 'AL'),
  ('Algeria', 'DZ'),
  ('American Samoa', 'AS'),
  ('Andorra', 'AD'),
  ('Angola', 'AO'),
  ('Anguilla', 'AI'),
  ('Antarctica', 'AQ'),
  ('Antigua and Barbuda', 'AG'),
  ('Argentina', 'AR'),
  ('Armenia', 'AM'),
  ('Aruba', 'AW'),
  ('Australia', 'AU'),
  ('Austria', 'AT'),
  ('Azerbaijan', 'AZ'),
  ('Bahamas', 'BS'),
  ('Bahrain', 'BH'),
  ('Bangladesh', 'BD'),
  ('Barbados', 'BB'),
  ('Belarus', 'BY'),
  ('Belgium', 'BE'),
  ('Belize', 'BZ'),
  ('Benin', 'BJ'),
  ('Bermuda', 'BM'),
  ('Bhutan', 'BT'),
  ('Bosnia and Herzegovina', 'BA'),
  ('Botswana', 'BW'),
  ('Bouvet Island', 'BV'),
  ('Brazil', 'BR'),
  ('British Indian Ocean Territory', 'IO'),
  ('Brunei Darussalam', 'BN'),
  ('Bulgaria', 'BG'),
  ('Burkina Faso', 'BF'),
  ('Burundi', 'BI'),
  ('Cambodia', 'KH'),
  ('Cameroon', 'CM'),
  ('Canada', 'CA'),
  ('Cape Verde', 'CV'),
  ('Cayman Islands', 'KY'),
  ('Central African Republic', 'CF'),
  ('Chad', 'TD'),
  ('Chile', 'CL'),
  ('China', 'CN'),
  ('Christmas Island', 'CX'),
  ('Cocos (Keeling) Islands', 'CC'),
  ('Colombia', 'CO'),
  ('Comoros', 'KM'),
  ('Congo', 'CG'),
  ('Cook Islands', 'CK'),
  ('Costa Rica', 'CR'),
  ('Croatia', 'HR'),
  ('Cuba', 'CU'),
  ('Cyprus', 'CY'),
  ('Czech Republic', 'CZ'),
  ('Denmark', 'DK'),
  ('Djibouti', 'DJ'),
  ('Dominica', 'DM'),
  ('Dominican Republic', 'DO'),
  ('Ecuador', 'EC'),
  ('Egypt', 'EG'),
  ('El Salvador', 'SV'),
  ('Equatorial Guinea', 'GQ'),
  ('Eritrea', 'ER'),
  ('Estonia', 'EE'),
  ('Ethiopia', 'ET'),
  ('Falkland Islands (Malvinas)', 'FK'),
  ('Faroe Islands', 'FO'),
  ('Fiji', 'FJ'),
  ('Finland', 'FI'),
  ('France', 'FR'),
  ('French Guiana', 'GF'),
  ('French Polynesia', 'PF'),
  ('French Southern Territories', 'TF'),
  ('Gabon', 'GA'),
  ('Gambia', 'GM'),
  ('Georgia', 'GE'),
  ('Germany', 'DE'),
  ('Ghana', 'GH'),
  ('Gibraltar', 'GI'),
  ('Greece', 'GR'),
  ('Greenland', 'GL'),
  ('Grenada', 'GD'),
  ('Guadeloupe', 'GP'),
  ('Guam', 'GU'),
  ('Guatemala', 'GT'),
  ('Guernsey', 'GG'),
  ('Guinea', 'GN'),
  ('Guinea-Bissau', 'GW'),
  ('Guyana', 'GY'),
  ('Haiti', 'HT'),
  ('Heard Island and McDonald Islands', 'HM'),
  ('Holy See (Vatican City State)', 'VA'),
  ('Honduras', 'HN'),
  ('Hong Kong', 'HK'),
  ('Hungary', 'HU'),
  ('Iceland', 'IS'),
  ('India', 'IN'),
  ('Indonesia', 'ID'),
  ('Iraq', 'IQ'),
  ('Ireland', 'IE'),
  ('Isle of Man', 'IM'),
  ('Israel', 'IL'),
  ('Italy', 'IT'),
  ('Jamaica', 'JM'),
  ('Japan', 'JP'),
  ('Jersey', 'JE'),
  ('Jordan', 'JO'),
  ('Kazakhstan', 'KZ'),
  ('Kenya', 'KE'),
  ('Kiribati', 'KI'),
  ('Kuwait', 'KW'),
  ('Kyrgyzstan', 'KG'),
  ('Lao Peoples Democratic Republic', 'LA'),
  ('Latvia', 'LV'),
  ('Lebanon', 'LB'),
  ('Lesotho', 'LS'),
  ('Liberia', 'LR'),
  ('Libya', 'LY'),
  ('Liechtenstein', 'LI'),
  ('Lithuania', 'LT'),
  ('Luxembourg', 'LU'),
  ('Macao', 'MO'),
  ('Madagascar', 'MG'),
  ('Malawi', 'MW'),
  ('Malaysia', 'MY'),
  ('Maldives', 'MV'),
  ('Mali', 'ML'),
  ('Malta', 'MT'),
  ('Marshall Islands', 'MH'),
  ('Martinique', 'MQ'),
  ('Mauritania', 'MR'),
  ('Mauritius', 'MU'),
  ('Mayotte', 'YT'),
  ('Mexico', 'MX'),
  ('Monaco', 'MC'),
  ('Mongolia', 'MN'),
  ('Montenegro', 'ME'),
  ('Montserrat', 'MS'),
  ('Morocco', 'MA'),
  ('Mozambique', 'MZ'),
  ('Myanmar', 'MM'),
  ('Namibia', 'NA'),
  ('Nauru', 'NR'),
  ('Nepal', 'NP'),
  ('Netherlands', 'NL'),
  ('New Caledonia', 'NC'),
  ('New Zealand', 'NZ'),
  ('Nicaragua', 'NI'),
  ('Niger', 'NE'),
  ('Nigeria', 'NG'),
  ('Niue', 'NU'),
  ('Norfolk Island', 'NF'),
  ('Northern Mariana Islands', 'MP'),
  ('Norway', 'NO'),
  ('Oman', 'OM'),
  ('Pakistan', 'PK'),
  ('Palau', 'PW'),
  ('Panama', 'PA'),
  ('Papua New Guinea', 'PG'),
  ('Paraguay', 'PY'),
  ('Peru', 'PE'),
  ('Philippines', 'PH'),
  ('Pitcairn', 'PN'),
  ('Poland', 'PL'),
  ('Portugal', 'PT'),
  ('Puerto Rico', 'PR'),
  ('Qatar', 'QA'),
  ('Romania', 'RO'),
  ('Russian Federation', 'RU'),
  ('Rwanda', 'RW'),
  ('Saint Kitts and Nevis', 'KN'),
  ('Saint Lucia', 'LC'),
  ('Saint Martin (French part)', 'MF'),
  ('Saint Pierre and Miquelon', 'PM'),
  ('Saint Vincent and the Grenadines', 'VC'),
  ('Samoa', 'WS'),
  ('San Marino', 'SM'),
  ('Sao Tome and Principe', 'ST'),
  ('Saudi Arabia', 'SA'),
  ('Senegal', 'SN'),
  ('Serbia', 'RS'),
  ('Seychelles', 'SC'),
  ('Sierra Leone', 'SL'),
  ('Singapore', 'SG'),
  ('Sint Maarten (Dutch part)', 'SX'),
  ('Slovakia', 'SK'),
  ('Slovenia', 'SI'),
  ('Solomon Islands', 'SB'),
  ('Somalia', 'SO'),
  ('South Africa', 'ZA'),
  ('South Georgia and the South Sandwich Islands', 'GS'),
  ('South Sudan', 'SS'),
  ('Spain', 'ES'),
  ('Sri Lanka', 'LK'),
  ('Sudan', 'SD'),
  ('Suriname', 'SR'),
  ('Svalbard and Jan Mayen', 'SJ'),
  ('Swaziland', 'SZ'),
  ('Sweden', 'SE'),
  ('Switzerland', 'CH'),
  ('Syrian Arab Republic', 'SY'),
  ('Tajikistan', 'TJ'),
  ('Thailand', 'TH'),
  ('Timor-Leste', 'TL'),
  ('Togo', 'TG'),
  ('Tokelau', 'TK'),
  ('Tonga', 'TO'),
  ('Trinidad and Tobago', 'TT'),
  ('Tunisia', 'TN'),
  ('Turkey', 'TR'),
  ('Turkmenistan', 'TM'),
  ('Turks and Caicos Islands', 'TC'),
  ('Tuvalu', 'TV'),
  ('Uganda', 'UG'),
  ('Ukraine', 'UA'),
  ('United Arab Emirates', 'AE'),
  ('United Kingdom', 'GB'),
  ('United States', 'US'),
  ('United States Minor Outlying Islands', 'UM'),
  ('Uruguay', 'UY'),
  ('Uzbekistan', 'UZ'),
  ('Vanuatu', 'VU'),
  ('Viet Nam', 'VN'),
  ('Wallis and Futuna', 'WF'),
  ('Western Sahara', 'EH'),
  ('Yemen', 'YE'),
  ('Zambia', 'ZM'),
  ('Zimbabwe', 'ZW');

-- migrate:down
DROP TABLE IF EXISTS suggestion_downvote;

DROP TABLE IF EXISTS suggestion_upvote;

DROP TABLE IF EXISTS comment_downvote;

DROP TABLE IF EXISTS comment_upvote;

DROP TABLE IF EXISTS comment;

DROP TABLE IF EXISTS suggestion;

DROP TABLE IF EXISTS role_custom_permission;

DROP TABLE IF EXISTS user_account_role_type;

DROP TABLE IF EXISTS user_invitation;

DROP TABLE IF EXISTS status_type;

DROP TABLE IF EXISTS user_account;

DROP TABLE IF EXISTS product;

DROP TABLE IF EXISTS business_logo;

DROP TABLE IF EXISTS business_address;

DROP TABLE IF EXISTS address;

DROP TABLE IF EXISTS country;

DROP TABLE IF EXISTS business;

DROP TABLE IF EXISTS role_permission_capability;

DROP TABLE IF EXISTS role_capability;

DROP TABLE IF EXISTS role_type_permission;

DROP TABLE IF EXISTS role_permission;

DROP TABLE IF EXISTS role_type;

DROP EXTENSION IF EXISTS CITEXT;